// 跳转到指定路径
export var toPath = function(path) {
	wx.navigateTo({
		url: path
	})
}


export function toGet(requestUrl, paramData, headers) {
	console.log(requestUrl);
	return sendReq(requestUrl, paramData, headers, 'GET');
}

export function toPost(requestUrl, data, headers) {
	console.log(requestUrl);
	return sendReq(requestUrl, data, headers, 'POST');
}

export function openid() {
	wx.login({
			success: function(value) {
				getOpenId({
					code: value.code
				}).then(function(res) {
					// 得到openid放入缓存
					console.log('获取OpenId成功', res.data);
				}).catch(function(err)) {
					console.log('获取OpenId失败', err);
				}
			} else {
				console.log('登录失败：' + res.errMsg);
			}
		}
	});
}


async function sendReq(requestUrl, paramData, headers, method) {

	return await uni.request({
		url: requestUrl,
		data: paramData,
		method: method,
		header: headers
	});
}
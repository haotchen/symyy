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


async function sendReq(requestUrl, paramData, headers, method) {
	
	return await uni.request({
		url: requestUrl,
		data: paramData,
		method: method,
		header: headers
	});
}
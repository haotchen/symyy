// 跳转到指定路径
export var toPath = function(path) {
	wx.navigateTo({
		// '/pages/yuyue/yuyue'
		url: path
	})
}


export var toGet = function (requestUrl,data,headers) {
	return new Promise((resolve, reject) => {
	    uni.request({
	        url: requestUrl,
	        data: data,
	        method: 'GET',
	        header: headers,
	        success: (res) => {
	            // 下面会直接写请求成功的代码
				resolve(res)
	        },
	        fail: (err) => {
	            // 下面会直接写请求失败的代码
	            reject(err)
	        },
	    })
	})
}
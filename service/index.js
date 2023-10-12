// 跳转到指定路径
export var toPath = function (path){
	wx.navigateTo({
		// '/pages/yuyue/yuyue'
		url: path
	})
}
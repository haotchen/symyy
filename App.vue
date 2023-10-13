<script>
	import {openid} from '@/service/index.js'
	
	export default {
		onLaunch: function() {
			if(!wx.getStorageSync('openid')){
				// 执行获取openid存入缓存
				openid()
			}
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

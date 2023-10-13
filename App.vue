<script>
	export default {
		onLaunch: function() {
			wx.login({
				success: (res)=>{
					console.log(res);
					let code = res.code
					wx.getSetting({
						success (res) {
							console.log(res);
						}
					})
				}
			})
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

<template>
	<view class="form-box">
		<view class="form-data">
			<view class="feedback-title">
				意见反馈给我们,为您提供更好的服务!
			</view>
			<form>
				<view class="uni-textarea">
					<textarea placeholder="点我填写!" :maxlength="300" />
				</view>
				<view class="tishi">
					当前输入文字数量: 
				</view>
				<button class="feedback-btn" type="primary">提交反馈</button>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.form-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 90%;
		margin: 10px auto;
		border: 1px solid #ddd;
		text-align: center;
		height: 94vh;
		border-radius: 10px;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
		position: relative;
	}

	.feedback-title {
		font-weight: 900;
		margin-top: 20px;
		font-size: 1em;
	}

	textarea {
		height: 200px;
		width: 92%;
		margin-top: 20px;
		background-color: #eaeaea;
		text-align: left;
		line-height: 25px;
		padding-top: 15px;
		padding-bottom: 15px;
		padding-left: 15px;
		padding-right: 5px;
	}

	.feedback-btn {
		position: absolute;
		bottom: 10px;
		left: 20%;
		width: 60%;
	}
	
	.tishi {
		font-size: 12px;
		color: #cfced0;
	}
</style>
<template>
	<view class="form-box">
		<view class="form-data">
			<view class="feedback-title">
				意见反馈给我们,为您提供更好的服务!
			</view>
			<form>
				<view class="uni-textarea">
					<textarea placeholder="点我填写!" />
				</view>
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
	}

	.feedback-title {
		font-weight: 900;
		margin-top: 20px;
		font-size: 1em;
	}

	.uni-textarea {
		height: 80px;
		width: 98%;
		margin-top: 20px;
		background-color: #eaeaea;
	}
</style>
<template>
	<view class="form-box">
		<view class="form-data">
			<view class="feedback-title">
				意见反馈给我们,为您提供更好的服务!
			</view>
			<form>
				<view class="uni-textarea">
					<textarea placeholder="点我填写!" :maxlength="300" v-model:value="body.textValue" />
				</view>
				<view class="tishi">
					当前输入文字数量: {{textValueLength}}
				</view>
				<button class="feedback-btn" type="primary" @click="saveFeedBack">提交反馈</button>
			</form>
		</view>
		<uni-popup ref="popup" type="message">
			<uni-popup-message :type="type" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import {addFeedBack} from '@/api/index.js';
	import { toPath } from "@/service/index.js"
	export default {
		data() {
			return {
				type: '',
				message: '',
				body: {
					textValue: '',
					memberId: '123'
				}
			}
		},
		methods: {
			async saveFeedBack(){
				const feedBackRes = await addFeedBack(this.body)
				// 请求成功
				if (feedBackRes.statusCode === 200) {
					// console.log('请求成功! ', feedBackRes.data);
					this.type = 'success'
					this.message = '您的反馈提交成功了!'
					this.$refs.popup.open()
					setTimeout(()=>{
						uni.switchTab({
							url: "/pages/index/index"
						})
					},2000)
					
				} else {
					console.log('请求失败! ', feedBackRes.statusCode);
					this.type = 'error'
					this.message = '您的反馈提交失败了,请稍后重试!'
					this.$refs.popup.open()
				}
				
			}
		},
		computed: {
			'textValueLength' () {
				return this.body.textValue.length
			}
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
		margin: 20px auto;
		border: 1px solid #ddd;
		text-align: center;
		height: 90vh;
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
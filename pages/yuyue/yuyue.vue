<template>
	<view class="form-box">

		<view class="title-text">
			<uni-icons type="contact" size="30"></uni-icons>
			提交您的预约信息
		</view>
		<view class="form-card">
			<!-- <uni-card :is-shadow="false"  :border="false" class="form-card"> -->
			<form @submit="formSubmit" @reset="formReset" class="form-data">
				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">姓名:</text></view>
					<view class="uni-input-wrapper">
						<input class="uni-input" placeholder="填写姓名" v-model:value="customer.name" />
						<view v-if="check_data.name_is_null" class="check_text">{{ errMsg.nameNull }}</view>
					</view>
				</view>

				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">电话:</text></view>
					<view class="uni-input-wrapper">
						<input class="uni-input" placeholder="填写电话" v-model:value="customer.phone" />
						<view v-if="check_data.phone_is_null" class="check_text">{{ errMsg.phoneError }}</view>
					</view>
				</view>

				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">服务:</text></view>
					<view class="example-body">
						<uni-combox :candidates="candidates" placeholder="选择服务类型,可搜索如: 美容"
							v-model="customer.serverType"></uni-combox>
						<view v-if="check_data.serverType_is_null" class="check_text">{{ errMsg.serverTypeError }}
						</view>
					</view>
				</view>


				<!-- 时间选择器 -->
				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">预约开始时间:</text></view>
					<view class="example-body">
						<uni-datetime-picker type="datetime" hide-second :start="start" :end="end"
							v-model:value="customer.startTime" />
						<view v-if="check_data.startTime_is_null" class="check_text">{{ errMsg.timeError }}
						</view>

					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">预约结束时间:</text></view>
					<view class="example-body">
						<uni-datetime-picker type="datetime" hide-second :start="start" :end="end"
							v-model:value="customer.endTime" />
						<view v-if="check_data.endTime_is_null" class="check_text">{{ errMsg.timeError }}
						</view>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">备注:</text></view>
					<view class="uni-textarea" style="border: 1rpx solid #ddd;">
						<textarea @blur="bindTextAreaBlur" placeholder="留言给我们,你想说的写在这里!" style="height: 80px;" />
					</view>
				</view>
				<view class="btn-yy">
					<button type="primary" @click="sendForm">提交</button>
				</view>
				<view style="width: 100%; height: 60px;">
				</view>
			</form>
			<view class="logo">
				<image src="../../static/logo.png" alt="" mode="widthFix" style="width: 100%;"></image>
			</view>
			<!-- </uni-card> -->
		</view>
		<view class="schedule">
			<uni-steps :options="[{title: '填写信息'}, {title: '提交信息'}, {title: '待确认'}]" :active="0"></uni-steps>
		</view>
		<uni-popup ref="popup" type="message">
			<uni-popup-message :type="type" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'input',
				focus: false,
				inputValue: '',
				showClearIcon: false,
				changeValue: '',
				showPassword: true,
				candidates: ['美白', '去皱', '紧致', '提亮', '常规检测'],
				start: '',
				end: '',
				check_data: {
					name_is_null: false,
					phone_is_null: false,
					serverType_is_null: false,
					startTime_is_null: false,
					endTime_is_null: false,
				},
				errMsg: {
					nameNull: '姓名不能为空!',
					phoneError: '电话号码不能为空!',
					serverTypeError: '请选择预约服务类型!',
					timeError: '请勾选预约时间!',
				},
				customer: {
					name: '',
					phone: '',
					serverType: '',
					startTime: '',
					endTime: ''
				},
				type: 'success',
				message: '预约信息已提交,请耐心等待确认! 即将返回首页'
			}
		},
		mounted() {
			var time = new Date()
			this.start = new Date()
			this.end = new Date(time.setDate(time.getDate() + 7))
		},
		watch: {

			'customer.name'(newValue, oldValue) {
				if (newValue === '') {
					this.check_data.name_is_null = true
					return
				}
				this.check_data.name_is_null = false
			},

			'customer.phone'(newValue, oldValue) {
				if (newValue === '') {
					this.check_data.phone_is_null = true
					this.errMsg.phoneError = '电话号码不能为空!'
					return
				}
				const phoneRegex = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
				if (!phoneRegex.test(newValue)) {
					this.check_data.phone_is_null = true
					this.errMsg.phoneError = '电话号码不合法!'
					return
				}
				this.check_data.phone_is_null = false
			},

			'customer.serverType'(newValue, oldValue) {
				if (newValue === '') {
					this.check_data.serverType_is_null = true
					return
				}
				this.check_data.serverType_is_null = false
			},


			'customer.startTime'(newValue, oldValue) {
				if (newValue === '') {
					this.check_data.startTime_is_null = true
					return
				}
				this.check_data.startTime_is_null = false
			},
			'customer.endTime'(newValue, oldValue) {
				if (newValue === '') {
					this.check_data.endTime_is_null = true
					return
				}
				this.check_data.endTime_is_null = false
			},
		},
		methods: {
			sendForm(e) {
				let flag = false;
				if (this.check_data.name_is_null || this.customer.name === '') {
					flag = true
				}
				if (this.check_data.phone_is_null || this.customer.phone === '') {
					flag = true
				}
				if (this.check_data.serverType_is_null || this.customer.serverType === '') {
					flag = true
				}
				if (this.check_data.startTime_is_null || this.customer.startTime === '') {
					flag = true
				}
				if (this.check_data.endTime_is_null || this.customer.endTime === '') {
					flag = true
				}
				
				if (flag) {
					// TODO 消息提醒用户信息不完整
					this.type = 'error';
					this.message = '预约信息不完整,请重新填写提交! '
					this.$refs.popup.open()
					return
				} 
				// 提交表单信息
				this.$refs.popup.open()
				setTimeout(function (){
					wx.navigateBack({
						delta: 1
					})
				}, 1500);
			}
		}
	}
</script>

<style scoped>
	.form-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.title-text {
		vertical-align: middle;
		padding-top: 40rpx;
	}

	.schedule {
		width: 600rpx;
		margin-top: 80rpx;
		height: 60px;
		background-color: white;
		position: fixed;
		bottom: 0px;
	}

	.form-card {
		width: 80%;
		margin-top: 20px;
		overflow-y: scroll;
	}

	.form-data {
		height: 100vh;
	}

	.example-body {
		background-color: #FFFFFF;
	}

	.uni-form-item {
		padding-bottom: 10px;
	}

	.uni-form-item__title {
		font-weight: 700;
	}

	.logo {
		width: 60px;
		height: 80px;
		position: absolute;
		top: 70px;
		right: 50px;
	}

	.check_text {
		color: red;
	}

	.button-text {
		color: #fff;
		font-size: 12px;
	}

	.success-text {
		color: #09bb07;
	}

	.error-text {
		color: #f56c6c;
	}
</style>
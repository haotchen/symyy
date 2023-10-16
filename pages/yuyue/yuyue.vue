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
						<input class="uni-input" placeholder="填写姓名" v-model:value="customer.userName" />
						<view v-if="check_data.name_is_null" class="check_text">{{ errMsg.nameNull }}</view>
					</view>
				</view>

				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">电话:</text></view>
					<view class="uni-input-wrapper">
						<input class="uni-input" placeholder="填写电话" v-model:value="customer.userPhone" />
						<view v-if="check_data.phone_is_null" class="check_text">{{ errMsg.phoneError }}</view>
					</view>
				</view>

				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">服务:</text></view>
					<view class="example-body">
						<uni-combox :candidates="candidates" placeholder="选择服务类型,可搜索如: 美容"
							v-model="customer.typeName"></uni-combox>
						<view v-if="check_data.serverType_is_null" class="check_text">{{ errMsg.serverTypeError }}
						</view>
					</view>
				</view>


				<!-- 时间选择器 -->
				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">预约开始时间:</text></view>
					<view class="example-body">
						<uni-datetime-picker type="datetime" hide-second :start="start" :end="end"
							v-model:value="customer.reservationStartTime" />
						<view v-if="check_data.startTime_is_null" class="check_text">{{ errMsg.timeError }}
						</view>

					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">预约结束时间:</text></view>
					<view class="example-body">
						<uni-datetime-picker type="datetime" hide-second :start="start" :end="end"
							v-model:value="customer.reservationEndTime" />
						<view v-if="check_data.endTime_is_null" class="check_text">{{ errMsg.timeError }}
						</view>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">备注:</text></view>
					<view class="uni-textarea" style="border: 1rpx solid #ddd;">
						<textarea placeholder="留言给我们,你想说的写在这里!" style="height: 80px;" v-model:value="customer.notes" />
					</view>
				</view>
				<view class="check-code uni-form-item">
					<view class="title"><text class="uni-form-item__title">短信验证:</text></view>
					<uni-row class="demo-uni-row" :width="nvueWidth">
						<uni-col :span="16" style="height: 40px;">
							<uni-section title="去除空格" subTitle="使用 trim 属性 ,可以控制返回内容的空格 " type="line" padding>
								<uni-easyinput class="uni-mt-5" trim="all" placeholder="请输入验证码"
									@input="inputSmsCode"></uni-easyinput>
							</uni-section>
						</uni-col>
						<uni-col :span="6" :offset="2">
							<button type="primary" plain="true" size="mini" @click="smsCode"
								style="margin-top: 1px">{{smsSecond !== 0 ? smsSecond + '秒' : '获取'}}</button>
						</uni-col>
					</uni-row>



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
	import {
		addRecord,
		getServerType,
		getSmsCode
	} from '@/api/index.js'

	export default {
		data() {
			return {
				title: 'input',
				focus: false,
				inputValue: '',
				showClearIcon: false,
				changeValue: '',
				showPassword: true,
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
				serverTypeList: [],
				customer: {
					userName: '',
					userPhone: '',
					typeName: '',
					reservationStartTime: '',
					reservationEndTime: '',
					notes: '',
					smsCode: ''
				},
				type: 'success',
				message: '预约信息已提交,请耐心等待确认! 即将返回首页',
				smsCodeSecond: 0,
				timer: '',
				smsCodeSecondStatus: true
			}
		},
		async mounted() {
			var time = new Date()
			this.start = new Date()
			this.end = new Date(time.setDate(time.getDate() + 7))
			let serverTypeList = await getServerType();
			if (serverTypeList.statusCode === 200) {
				console.log('请求成功! ', serverTypeList.data);
				this.serverTypeList = serverTypeList.data.data;

			} else {
				console.log('请求失败! ', serverTypeList.statusCode);
			}

			// console.log('123', this.candidates);
		},
		watch: {
			'customer.userName'(newValue, oldValue) {
				if (newValue === '') {
					this.check_data.name_is_null = true
					return
				}
				this.check_data.name_is_null = false
			},

			'customer.userPhone'(newValue, oldValue) {
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

			'customer.typeName'(newValue, oldValue) {
				if (newValue === '') {
					this.check_data.serverType_is_null = true
					return
				}
				this.check_data.serverType_is_null = false
			},


			'customer.reservationStartTime'(newValue, oldValue) {
				if (newValue === '') {
					this.check_data.startTime_is_null = true
					return
				}
				this.check_data.startTime_is_null = false
			},
			'customer.reservationEndTime'(newValue, oldValue) {
				if (newValue === '') {
					this.check_data.endTime_is_null = true
					return
				}
				this.check_data.endTime_is_null = false
			},
		},
		methods: {
			checkUserPhone() {
				const phoneRegex = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;

				if (this.customer.userPhone.length !== 11) {
					this.type = 'error';
					this.message = '电话号码未填写,请检查! '
					this.$refs.popup.open()
					return false
				}
				if (!phoneRegex.test(this.customer.userPhone)) {
					this.type = 'error';
					this.message = '电话号码不合法,请检查! '
					this.$refs.popup.open()
					return false
				}
				return true
			},
			inputSmsCode(e){
				this.customer.smsCode = e 
			},
			async sendForm(e) {
				let openid = wx.getStorageSync('openid')
				let flag = false;
				if (this.check_data.name_is_null || this.customer.userName === '') {
					console.log('1');
					flag = true
				}
				if (this.check_data.phone_is_null || this.customer.userPhone === '') {
					console.log('2');
					flag = true
				}
				if (this.check_data.serverType_is_null || this.customer.typeName === '') {
					console.log('3');
					flag = true
				}
				if (this.check_data.startTime_is_null || this.customer.reservationStartTime === '') {
					console.log('4');
					flag = true
				}
				if (this.check_data.endTime_is_null || this.customer.reservationEndTime === '') {
					console.log('5');
					flag = true
				}
				this.customer.miniId = openid
				if (flag) {
					// TODO 消息提醒用户信息不完整
					this.type = 'error';
					this.message = '预约信息不完整,请重新填写提交! '
					this.$refs.popup.open()
					return
				}

				// 提交表单信息
				console.log('提交预约信息', this.customer);
				const add = await addRecord(this.customer);

				if (add.statusCode === 200) {
					console.log('请求成功! ', add.data);
					this.type = 'success';
					this.message = '预约信息提交成功,即将跳转回首页! '
					this.$refs.popup.open()
					setTimeout(function() {
						wx.navigateBack({
							delta: 1
						})
					}, 1500);
				} else {
					console.log('请求失败! ', add.statusCode);
					this.type = 'error';
					this.message = '信息提交失败,请稍后重试! '
					this.$refs.popup.open()
				}
			},
			startCountdown() {
				this.smsCodeSecond = 60; // 重置倒计时的秒数
				clearInterval(this.timer); // 清除之前的计时器
				var that = this;
				// 更新倒计时的秒数，并在页面显示
				that.timer = setInterval(function() {
					that.smsCodeSecond--;
					console.log(that.smsCodeSecond);
					if (that.smsCodeSecond === 0) {
						clearInterval(that.timer)
						that.smsCodeSecondStatus = true
					}
				}, 1000); // 每隔一秒执行一次
			},
			async smsCode() {
				// 校验表单手机号是否填写
				if (!this.checkUserPhone()) {
					return
				}
				if (this.smsCodeSecondStatus) {
					this.smsCodeSecondStatus = false
					this.startCountdown()
					let openid = wx.getStorageSync('openid');
					console.log(openid);
					await getSmsCode({
						openId: openid,
						phone: this.customer.userPhone
					}).then((res) => {}).catch((err) => {
						console.log(err);
					});
				} else {
					return
				}

			}


		},
		computed: {
			candidates() {
				let list = new Array();
				for (var i = 0; i < this.serverTypeList.length; i++) {
					list.push(this.serverTypeList[i].typeName)
				}
				return list;
			},
			smsSecond() {
				return this.smsCodeSecond
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

	.demo-uni-row {
		display: flex;
		align-items: center;
	}
</style>
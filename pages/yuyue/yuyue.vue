<template>
	<view class="form-box">

		<view class="title-text">
			<uni-icons type="contact" size="30"></uni-icons>
			提交您的预约信息
		</view>

		<uni-card :is-shadow="false" is-full class="form-card">
			<form @submit="formSubmit" @reset="formReset" class="form-data">
				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">姓名:</text></view>
					<view class="uni-input-wrapper">
						<input class="uni-input" placeholder="填写姓名" :value="inputClearValue" @input="clearInput" />
						<uni-icons type="close" v-if="showClearIcon" size="30" @click="clearIcon"></uni-icons>
					</view>
				</view>

				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">电话:</text></view>
					<view class="uni-input-wrapper">
						<input class="uni-input" placeholder="填写电话" :value="inputClearValue" @input="clearInput" />
						<uni-icons type="close" v-if="showClearIcon" size="30" @click="clearIcon"></uni-icons>
					</view>
				</view>

				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">服务:</text></view>
					<view class="example-body">
						<uni-combox :candidates="candidates" placeholder="选择服务类型,可搜索如: 美容"
							v-model="serverType"></uni-combox>
					</view>
				</view>


				<!-- 时间选择器 -->
			</form>
			<view class="schedule">
				<uni-steps :options="[{title: '填写信息'}, {title: '提交信息'}, {title: '待确认'}]" :active="0"></uni-steps>
			</view>
		</uni-card>




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
				inputClearValue: '',
				changeValue: '',
				showPassword: true,
				candidates: ['美白', '去皱', '紧致', '提亮', '常规检测'],
				serverType: ''
			}
		},
		methods: {
			onKeyInput: function(event) {
				this.inputValue = event.target.value
			},
			replaceInput: function(event) {
				var value = event.target.value;
				if (value === '11') {
					this.changeValue = '2';
				}
			},
			hideKeyboard: function(event) {
				if (event.target.value === '123') {
					uni.hideKeyboard();
				}
			},
			clearInput: function(event) {
				this.inputClearValue = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			clearIcon: function() {
				this.inputClearValue = '';
				this.showClearIcon = false;
			},
			changePassword: function() {
				this.showPassword = !this.showPassword;
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
	}

	.form-card {
		margin-top: 20px;
	}

	.form-data {
		height: 100vh;
	}

	.example-body {
		background-color: #FFFFFF;
	}

	.result-box {
		text-align: center;
		padding: 20px 0px;
		font-size: 16px;
	}

	.uni-form-item {
		padding-bottom: 10px;
	}

	.uni-form-item__title {
		font-weight: 700;
	}
</style>
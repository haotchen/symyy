<template>
	<view class="form-box">

		<view class="title-text">
			<uni-icons type="contact" size="30"></uni-icons>
			提交您的预约信息
		</view>
		<view class="form-card">
		<!-- <uni-card :is-shadow="false"  :border="false" class="form-card"> -->
			<form @submit="formSubmit" @reset="formReset" class="form-data">
				<view class="uni-form-item uni-column" >
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
				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">预约开始时间:</text></view>
					<view class="example-body">
						<uni-datetime-picker type="datetime" hide-second :start="start" :end="end" v-model="startTime" @change="startChange" />
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">预约结束时间:</text></view>
					<view class="example-body">
						<uni-datetime-picker type="datetime" hide-second :start="start" :end="end" v-model="endTime" @change="endChange" />
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title"><text class="uni-form-item__title">备注:</text></view>
					<view class="uni-textarea" style="border: 1rpx solid #ddd;">
						<textarea @blur="bindTextAreaBlur" placeholder="占位符字体是红色的" style="height: 80px;" />
					</view>
				</view>
				<view class="btn-yy">
					<button type="primary" >提交</button>
				</view>
				<view style="width: 100%; height: 60px;">
				</view>
			</form>
			
		<!-- </uni-card> -->
		</view>
		<view class="schedule">
			<uni-steps :options="[{title: '填写信息'}, {title: '提交信息'}, {title: '待确认'}]" :active="0"></uni-steps>
		</view>
		<view class="logo">
			<image src="../../static/logo.png" alt="" mode="widthFix" style="width: 100%;"></image>
		</view>

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
				serverType: '',
				startTime: '',
				endTime: '',
				start:'',
				end: ''
			}
		},
		mounted() {
			var time = new Date()
			this.start = new Date()
			this.end = new Date(time.setDate(time.getDate()+7))
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
			},
			startChange (e) {
				this.startTime = e.detail.value
			},
			endChange (e) {
				this.endTime = e.detail.value
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
		background-color: white;
		position: fixed;
		bottom: 20px;
	}

	.form-card {
		width: 80%;
		margin-top: 20px;
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
		position: fixed;
		top:70px;
		right: 50px;
	}
</style>
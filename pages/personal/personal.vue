<template>
	<view class="page">
		<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<img class="avatar" :src="avatarUrl" mode="widthFix" ></img>
		</button>
		<view style="width: 90%; margin: auto; margin-top: 20px; font-size: 18px;">
			<input type="nickname" class="uni-input" :value="nickname" placeholder="请输入昵称" @blur="nickChange" />
		</view>
		<view style="width: 90%; margin: auto; margin-top: 20px; font-size: 18px;">
			<input type="tel" class="uni-input" :value="memberPhone" placeholder="请输入联系电话" @blur="telChange" />
		</view>
	</view>

</template>

<script>
	import {getMemberInfo} from '@/api/index.js'
	
	export default {
		data() {
			return {
				avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				nickname:""
			}
		},
		onLoad() {

		},
		async mounted() {
			let openId = wx.getStorageSync('openid')
			const memberInfoRes = await getMemberInfo({ openId }) 
			// 请求成功
			if (memberInfoRes.statusCode === 200) {
				this.memberInfo = memberInfoRes.data.data;
			} else {
				console.log('请求失败! ', memberInfoRes.statusCode);
			}
		},
		methods: {
			onChooseAvatar(e) {
				this.avatarUrl = e.detail.avatarUrl
			},
			async nickChange (e) {
				console.log(e);
			},
			telChange(e) {
				console.log(e);
			}
		}
	}
</script>

<style>
	.page {
		margin-top: 10px;
	}
	.avatar-wrapper {
		width: 200px;
		height: 200px;
		position: relative;
	}
	.avatar {
		width: 200px;
		height: 200px;
		position: absolute;
		left: 0;
		z-index: 9;
	}
</style>
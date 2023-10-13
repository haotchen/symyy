<template>
	<view class="header">
		<view class="uesr">
			<view class="top-xh">
				<view class="h2">
					个人中心
				</view>
				
			</view>
			<view class="fot-xh">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/pic-m1.png" style="width: 130rpx;" mode="widthFix">
						</image>
					</view>
					<view class="txt">
						<view class="name">
							<view class="h3">
								{{memberInfo.memberName}}
							</view>
							<view class="phone">
								{{memberInfo.memberPhone}}
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
		
		<view class="ul-list1-xh">
			
			<view class="li">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/dingdan.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt" @click="toRecord">
						<text>预约记录</text>
					</view>
				</navigator>
			</view>
			
			<view class="li">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/yijian.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt" @click="toFeedback">
						<text>意见反馈</text>
					</view>
				</navigator>
			</view>
			<view class="li">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/guanyhu.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt" @click="toAbout">
						<text>关于我们</text>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {toPath} from '@/service/index.js'
	import {getMemberInfo} from '@/api/index.js'
	
	export default {
		data() {
			return {
				memberInfo: ''
			}
		},
		onLoad() {

		},
		async mounted(){
			const memberInfoRes = await getMemberInfo({
				openId: '123123'
			}) 
			// 请求成功
			if (memberInfoRes.statusCode === 200) {
				console.log('请求成功! ', memberInfoRes.data);
				this.memberInfo = memberInfoRes.data.data;
			
			} else {
				console.log('请求失败! ', memberInfoRes.statusCode);
			}
			
		},
		methods: {
			toRecord() {
				toPath('/pages/myRecord/myRecord')
			},
			toFeedback(){
				toPath('/pages/feedback/feedback')
			},
			toAbout(){
				toPath('/pages/about/about')
			}
		}
	}
</script>

<style>
	@import url("cy-my.css");
</style>

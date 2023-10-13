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
								用户昵称
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
					<view class="txt">
						<text>预约记录</text>
					</view>
				</navigator>
			</view>
			
			<view class="li">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/yijian.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>意见反馈</text>
					</view>
				</navigator>
			</view>
			<view class="li">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/guanyhu.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt">
						<text>关于我们</text>
					</view>
				</navigator>
			</view>
			<!-- <view class="li">
				<navigator url="" hover-class="none">
					<view class="pic">
						<image src="../../static/cy-my/shehzi.png" style="width: 35rpx;" mode="widthFix"></image>
					</view>
					<view class="txt" style="border-bottom: none;">
						<text>设置</text>
					</view>
				</navigator>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	@import url("cy-my.css");
</style>

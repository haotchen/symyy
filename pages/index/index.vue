<template>
	<view class="content">
		<view class="uni-margin-wrap bgi-title">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item,index) in background" :key="index">
					<view class="swiper-item uni-bg-red">
						<img :src="item" alt="">
					</view>s
				</swiper-item>
			</swiper>
		</view>

		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
			<view>
				<uni-section title="卡片标题+额外信息" type="line">
					<uni-card title="工作室历史" extra="前情回顾">
						<img src="https://th.bing.com/th/id/OIP.ZkoPhpKfJwsvGmpm8RsragHaFp?pid=ImgDet&rs=1"
							style="width: 100%; height: 160px;" alt="">
						<text class="uni-body">这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text>
					</uni-card>
				</uni-section>
			</view>

			<view>
				<uni-section title="卡片标题+额外信息" type="line">
					<uni-card title="医生工作史" extra="前情回顾">
						<img src="https://th.bing.com/th/id/OIP.ZkoPhpKfJwsvGmpm8RsragHaFp?pid=ImgDet&rs=1"
							style="width: 100%; height: 160px;" alt="">
						<text class="uni-body">这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text>
					</uni-card>
				</uni-section>
			</view>
		</scroll-view>

		<button class="btn-yy" type="primary" @click="toForm">立即预约</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['https://th.bing.com/th/id/OIP.ZkoPhpKfJwsvGmpm8RsragHaFp?pid=ImgDet&rs=1',
					'https://th.bing.com/th/id/R.b0ea268fa1be279d112489ce83ad4696?rik=qItsh%2fBiy33hlg&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140303%2f1-140303215009.jpg&ehk=S6PLWamt%2bMzQV8uO9ugcU5d5M19BpXtCpNz2cRJ7q9M%3d&risl=&pid=ImgRaw&r=0'
				],
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				cover: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
				avatar: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png',
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				}
			}
		},
		onLoad() {

		},
		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			onClick(e) {
				console.log(e)
			},
			actionsClick(text) {
				uni.showToast({
					title: text,
					icon: 'none'
				})
			},
			toForm() {
				wx.navigateTo({
					url: '/pages/yuyue/yuyue'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}

	.swiper {
		height: 300rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}

	.info {
		position: absolute;
		right: 20rpx;
	}

	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}

	.btn-yy {
		position: fixed;
		bottom: 5px;
		right: 52px;
		width: 200px;
		background-color: #ffa84e;
	}

	.bgi-title {
		position: fixed;
		top: 0px;
		height: 300rpx;
		z-index: 2;
		background-color: #fff;
		padding-bottom: 50rpx;
	}

	.scroll-Y {
		margin-top: 350rpx;
		/* flex: auto; */
		/* height: 100vh; */
		padding-bottom: 100rpx;
	}
</style>
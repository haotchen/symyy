<template>
	<view class="content">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item,index) in background" :key="index">
					<view class="swiper-item uni-bg-red">
						<img :src="item.url" alt="" style="width: 100%;">
					</view>s
				</swiper-item>
			</swiper>
		</view>

		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
			<view>
				<uni-section title="卡片标题+额外信息" type="line">
					<uni-card title="工作室历史" extra="前情回顾">
						<img :src="studioInfo.studioImg[1].url" style="width: 100%; height: 160px;" alt="">
						<text class="uni-body"> {{studioInfo.description}}</text>
					</uni-card>
				</uni-section>
			</view>

			<view>
				<uni-section title="卡片标题+额外信息" type="line">
					<uni-card title="医生工作史" extra="前情回顾">
						<img :src="studioInfo.studioImg[0].url" style="width: 100%; height: 160px;" alt="">
						<text class="uni-body">{{doctorInfoText}}</text>
					</uni-card>
				</uni-section>
			</view>
		</scroll-view>

		<button class="btn-yy" type="primary" @click="toForm">立即预约</button>
	</view>
</template>

<script>
	import {
		toPath
	} from '@/service/index.js'
	import {
		getStudioInfo,
		getDoctorInfo,
		getIndexImgs,
		getOpenId
	} from '@/api/index.js'
	
	export default {
		data() {
			return {
				background: [],
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
				},
				studioInfo: '',
				doctorInfo: '',
				wxCode: '',
				openId: ''
			}
		},
		async onLoad() {
			const studioInfoRes = await getStudioInfo();
			// 请求成功
			if (studioInfoRes.statusCode === 200) {
				this.studioInfo = studioInfoRes.data.data;

			} else {
				console.log('请求失败! ', studioInfoRes.statusCode);
			}

			const doctorInfoRes = await getDoctorInfo();

			// 请求成功
			if (doctorInfoRes.statusCode === 200) {
				this.doctorInfo = doctorInfoRes.data.data;

			} else {
				console.log('请求失败! ', doctorInfoRes.statusCode);
			}

			const indexImgs = await getIndexImgs();

			// 请求成功
			if (indexImgs.statusCode === 200) {
				this.background = indexImgs.data.data;

			} else {
				console.log('请求失败! ', indexImgs.statusCode);
			}
			

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
				toPath('/pages/yuyue/yuyue')
			}
		},
		computed: {
			doctorInfoText() {
				return `
				医生姓名: ${this.doctorInfo.doctorName}
				医生年龄: ${this.doctorInfo.doctorAge}
				联系方式: ${this.doctorInfo.doctorPhone}
				医生简介: ${this.doctorInfo.description}
				`
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
		height: 400rpx;
	}

	.swiper-item {
		display: block;
		height: 400rpx;
		line-height: 400rpx;
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
		bottom: 2rpx;
		left: 50%;
		width: 200px;
		background-color: #ffa84e;
		transform: translate(-50%, -50%);
	}

	.bgi-title {
		position: fixed;
		top: 0px;
		height: 400rpx;
		z-index: 2;
		background-color: #fff;
		padding-bottom: 50rpx;
	}

	.scroll-Y {
		margin-top: 20rpx;
		/* flex: auto; */
		/* height: 100vh; */
		padding-bottom: 150rpx;
	}
</style>
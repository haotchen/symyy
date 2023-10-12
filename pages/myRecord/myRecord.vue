<template>
	<view class="record-content">
		<view class="my-record-title">
			我的预约记录
		</view>
		<view class="card-list" v-for="(item,index) in recordList" :key="index">
			<uni-card :title="item.title" :sub-title="item.subTitle" :extra="item.extra">
				<text class="uni-body">{{item.textValue === '' ? '此次预约无备注信息' : item.textValue }}</text>
			</uni-card>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordList: [{
					'title': '美白',
					'subTitle': '2023-10-09 10:53:11',
					'extra': '门店信息',
					'textValue': ''
				}]
			}
		},
		methods: {

		}
	}
</script>

<style>
	.record-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.my-record-title {
		font-weight: 900;
		margin-top: 20px;
	}

	.card-list {
		width: 100%;
	}
</style>
<template>
	<view class="record-content">
		<navigation style="height: 44px;"></navigation>
		<view class="my-record-title">
			我的预约记录
		</view>
		<view class="card-list" v-for="(item,index) in recordList" :key="index">
			<uni-card :title="item.typeName"
				:sub-title="'提交时间: \\n' + item.createTime.replace('T',' ') + '\\n' + '预约时间段: \\n' + item.reservationStartTime.replace('T',' ') + ' - ' + item.reservationEndTime.replace('T',' ')"
				:extra="item.extra">
				<text class="uni-body">{{item.notes === '' ? '此次预约无备注信息' : item.notes }}</text>
			</uni-card>
		</view>

	</view>
</template>

<script>
	import {
		getMyRecord
	} from '@/api/index.js'
	import navigation from "@/components/navigation/navigation"
	export default {
		data() {
			return {
				recordList: []
			}
		},
		async mounted() {
			let openId = wx.getStorageSync('openid')
			const myRecordRes = await getMyRecord({
				memberId: openId
			});
			// 请求成功
			if (myRecordRes.statusCode === 200) {
				console.log('请求成功! ', myRecordRes.data);
				this.recordList = myRecordRes.data.data;
			} else {
				console.log('请求失败! ', myRecordRes.statusCode);
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
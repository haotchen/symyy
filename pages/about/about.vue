<template>
	<view class="form-box">
		<navigation style="height: 44px;"></navigation>
		<view class="about-title">
			{{ aboutValue }}
		</view>
	</view>
</template>

<script>
	import {
		getAboutInfo
	} from '@/api/index.js'
	import navigation from "@/components/navigation/navigation"
	export default {
		data() {
			return {
				aboutValue: '',
			}
		},
		async mounted() {
			const aboutInfo = await getAboutInfo();
			if (aboutInfo.statusCode === 200) {
				console.log('请求成功! ', aboutInfo.data);
				this.aboutValue = aboutInfo.data.data;
			
			} else {
				console.log('请求失败! ', aboutInfo.statusCode);
			}
		},
		methods: {

		}
	}
</script>

<style>
	.form-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
		width: 90%;
		margin: 20px auto;
		border: 1px solid #ddd;
		/* text-align: center; */
		height: 90vh;
		border-radius: 10px;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
		position: relative;
	}

	.about-title {
		padding: 10px;
		margin-top: 30px;
		text-indent: 2em;
	}
</style>
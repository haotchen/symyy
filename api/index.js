import {
	toGet,
	toPost
} from '@/service/index.js'

const baseUrlDev = 'https://localhost:11000'
const baseUrlPublic = 'https://www.haotchen.top:11000'
// const baseUrlPublic = 'https://192.168.1.181:11000'
// 控制使用线上或线下服务器, dev 本地开发地址, public 线上开发地址
let flag = 'public';
// let flag = 'dev';

var getBaseUrl = function(uri){
	if (flag === 'dev') {
		return baseUrlDev + uri
	}
	if (flag === 'public') {
		return baseUrlPublic + uri
	}
}


// 获取工作室信息
export function getStudioInfo() {
	return toGet(getBaseUrl('/studio/info'), null, null)
}
// 获取医生信息
export function getDoctorInfo() {
	return toGet(getBaseUrl('/doctor/info'), null, null)
}
// 获取服务类别信息
export function getServerType() {
	return toGet(getBaseUrl('/serverType/list'), null, null)
}
// 获取OpenId
export function getOpenId(data) {
	return toGet(getBaseUrl('/members/open'), data, null)
}
// 新增预约
export function addRecord(data) {
	return toPost(getBaseUrl('/reservationInfo/add'), data, {
		'Content-type': 'application/json'
	})
}
// 获取首页轮播
export function getIndexImgs() {
	return toGet(getBaseUrl('/studio/index/imgs'), null, null)
}
// 获取用户信息
export function getMemberInfo(data) {
	return toGet(getBaseUrl('/members/getMember'), data, null)
}
// 获取我的预约记录
export function getMyRecord(data) {
	return toGet(getBaseUrl('/reservationInfo/my'), data, null)
}
// 获取关于我们
export function getAboutInfo() {
	return toGet(getBaseUrl('/about/info'), null, null)
}
// 请求发送短信验证码校验
export function getSmsCode(data) {
	return toGet(getBaseUrl('/reservationInfo/smsCode'), data, null)
}
// 新增反馈
export function addFeedBack(data) {
	return toPost(getBaseUrl('/feedBack/add'), data, {
		'Content-type': 'application/json'
	})
}


import {toGet,toPost} from '@/service/index.js'


// 获取工作室信息
export var getStudioInfo = async function() {
	return await toGet('http://localhost:11000/studio/info')
}
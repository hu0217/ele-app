import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import cartModule from './cart.js'
import center from '../common/notificationCenter.js'

const state = {
	longitude: 114.059563,
	latitude: 22.54286
}

const mutations = {
	initLocation(state, params){
		state.longitude = params.lon;
		state.latitude = params.lat;
	}
}

const actions = {
	//app初始化定位地址
	getLocation(stroe){
		//异步执行地理定位
		setTimeout(()=>{
			let lon = 114.059563;
			let lat = 22.54286;
			
			stroe.commit('initLocation', {
				lon,
				lat
			});
			//通知组件去根据经纬度请求数据
			center.$emit('init-data');
		}, 200);
	},
	//app修改地址
	changeLocation(store, params){
		store.commit('initLocation', params);
		//通知组件去根据经纬度重新请求数据
		center.$emit('init-data');
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	modules:{
		cart: cartModule
	}
});

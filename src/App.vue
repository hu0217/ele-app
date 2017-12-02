<template>
<div id="root">
	<nav class="tabs one-top-px">
		<router-link class="tab" v-for="tabItem in tabsData" :to="tabItem.path">
			<span class="icon iconfont" :class="tabItem.icon"></span>
			<span class="text">{{tabItem.title}}</span>
		</router-link>
	</nav>
	
	
	<keep-alive>
		<router-view></router-view>
	</keep-alive>
	
	
</div>
</template>

<script>
export default{
	data(){
		return {
			tabsData: [
				{title: '外卖', icon: 'icon-eleme', path: '/home'},
				{title: '发现', icon: 'icon-discover', path: '/discover'},
				{title: '订单', icon: 'icon-order', path: '/order'},
				{title: '我的', icon: 'icon-me', path: '/me'}
			]
		}
	},
	created(){
		//初始化全局的经纬度
		this.$store.dispatch('getLocation');
	}
}
</script>

<style scoped>
.tabs{
	display: flex;
	width: 100%;
	height: 49px;
	position: absolute;
	left: 0;
	bottom: 0;
}
.tabs .tab{
	flex: 1;
}
.tabs .tab span{
	display: block;
	color: #666;
}
.tabs .tab.router-link-active span{
	color: #0089dc;
}
.tabs .tab .icon{
	width: 100%;
	height: 30px;
	font-size: 20px;
	text-align: center;
	line-height: 32px;
}
.tabs .tab .text{
	width: 100%;
	height: 19px;
	text-align: center;
	line-height: 17px;
	font-size: 12px;
}

</style>
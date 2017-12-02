<template>
<div id="seller-detail" class="page subpage">
	<!-- 头部 -->
	<header-com :id="sellerId"></header-com>
	
	<!-- 商品，评价，店铺 -->
	<nav class="nav one-bottom-px">
		<li v-for="item in tabList" @click="navClick(item.com)" 
			:class="{active: activeCom==item.com}">
			<span>
				{{item.title}}
			</span>
		</li>
	</nav>
	<keep-alive>
		<component :is="activeCom" :id="sellerId"></component>
	</keep-alive>
	
	<!-- 购物车 -->
	<cart-com v-show="activeCom=='menu-com'" :id="sellerId"></cart-com>
	
</div>
</template>

<script>
import Header from '../../components/home/homeDetailPage/Header.vue'
import Menu from '../../components/home/homeDetailPage/Menu.vue'
import Rating from '../../components/home/homeDetailPage/Rating.vue'
import Info from '../../components/home/homeDetailPage/Info.vue'
import Cart from '../../components/home/homeDetailPage/Cart.vue'
export default {
	data(){
		return {
			sellerId: this.$route.params.id,
			activeCom: 'menu-com',
			tabList: [
				{title: '商品', com: 'menu-com'},
				{title: '评价', com: 'rating-com'},
				{title: '店铺', com: 'info-com'},
			]
		}
	},
	components: {
		'header-com': Header,
		'menu-com': Menu,
		'rating-com': Rating,
		'info-com': Info,
		'cart-com': Cart
	},
	methods: {
		navClick(componentName){
			this.activeCom = componentName;
		}
	},
	created(){
		//请求数据
		
	}
}
</script>

<style scoped>
#seller-detail{
	background: #fff;
}
.nav{
	display: flex;
	width: 100%;
	height: 30px;
}
.nav li{
	flex: 1;
	line-height: 30px;
	text-align: center;
	font-size: 14px;
	font-weight: bold;
	color: #666;	
}
.nav li span{
	padding: 4px;
	border-bottom: 2px solid transparent;
}
.nav li.active span{
	color: #3190e8;
	border-bottom: 2px solid #3190E8;
}
#seller-detail .block{
	width: 100%;
	position: absolute;
	top: 180px;
	bottom: 0;
	left: 0;
}

	
</style>
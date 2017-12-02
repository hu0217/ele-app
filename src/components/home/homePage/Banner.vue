<template>
<div class="swiper-container banner">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="list in bannerList">
        	<ul class="banner-list">
        		<li class="banner-item" v-for="item in list">
        			<img :src="handleUrl(item.imagePath)"/>
        			<p>{{item.name}}</p>
        		</li>
        	</ul>
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
</div>	
</template>

<script>
import {mapState} from 'vuex'
import {getHomeBanner} from '../../../services/home/homeService.js'
import {handleUrl} from '../../../common/common.js'
let bannerSwiper = null;
export default {
	data(){
		return {
			bannerList: []
		}
	},
	computed: mapState(['longitude', 'latitude']),
	methods: {
		handleUrl,
		getData(){
			//发送请求的得到数据
			getHomeBanner(this.latitude, this.longitude)
			.then(result=>{
				this.bannerList = result;
			});
		}
	},
	created(){
		this.$event.$on('init-data', ()=>{
			//有了经纬度，可以请求banner数据
			this.getData();
		})
	},
	mounted(){
		//创建轮播图
		bannerSwiper = new Swiper('.banner', {
			pagination: '.swiper-pagination',
		});
	},
	updated(){
		//更新轮播图
		bannerSwiper.update();
	}
}
</script>

<<style scoped>
.banner{
	width: 100%;
	position: relative;
}
.banner-list{
	width: 100%;
	overflow: hidden;
}
.banner-item{
	width: 25%;
	float: left;
}
.banner-item img{
	margin:0 auto;
	width: 50px;
	display:block;
}
.banner-item p{
	width: 100%;
	font-size:12px;
	text-align: center;
}
.swiper-pagination{
	position:relative;
	bottom:5px;
}
</style>
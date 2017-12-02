<template>
<header class="header">
	<div class="header-top">
		<div class="address">
			<router-link to="/home/location">
				<img src="/static/images/address.png" alt="" />
				{{locationName}}
			</router-link>
		</div>
		<div class="user">
			
		</div>
		<div class="weather">
			<div class="weather-l">
				<span>{{weatherInfo.temperature}}°</span>
				<span>{{weatherInfo.description}}</span>
			</div>
			<div class="weather-r">
				<img :src="handleUrl(weatherInfo.image_hash)"/> 
			</div>
		</div>
	</div>
	<router-link to="/home/search">
		<div id="search" :class="{fixed:isFixed}">
			<div class="search">
				<img src="/static/images/search.png" alt="">
					搜索商家、商品名称	
			</div>
		</div>
	</router-link>
	
	
	<div class="hotwords">
		<ul>
			<li v-for="word in wordArr" @click.stop="searchResult(word)">{{word}}</li>
		</ul>	
	</div>
	
	
</header>
</template>

<script>
import {mapState} from 'vuex'
import {getLocation, getWeather, getHotWord} from '../../../services/home/homeService.js'
import {handleUrl} from '../../../common/common.js'
export default {
	data(){
		return {
			locationName: '',
			weatherInfo: {},
			wordArr: [],
			searchBarFixed:false,
			isFixed:false
		}
	},
	computed: mapState(['longitude', 'latitude']),
	methods: {
		handleUrl,
		getData(){
//			地址
			getLocation(this.latitude, this.longitude)
			.then((result)=>{
					this.locationName = result;
			})
				
			//天气
			getWeather(this.latitude, this.longitude)
			.then(result=>{
				this.weatherInfo = result;
			})
//			
//			//热门搜索词汇
			getHotWord(this.latitude, this.longitude)
			.then(result=>{
				this.wordArr = result;
			})
			
		},
		searchResult(good){
            this.$router.push('/home/search/'+good);
        }
	},
	created(){
		
		this.$event.$on('init-data', ()=>{
			console.log('监听到了');
			this.getData();
		})
		
		//第一次进入app并且定位成功，更换地址时也要执行
		
	},
	mounted(){
		 var searchScroll = new IScroll ('.hotwords',{
		 	scrollX: true, 
		 	scrollY: false, 
		 	mouseWheel: true
		})
		 
		this.$event.$on('scrolly',(dis)=>{
//			console.log(dis);
			document.querySelector('#search').style.top=dis*(-1)-100+"px";
			this.isFixed = true;
		})
		this.$event.$on('scrolly2',(dis)=>{
			console.log(dis);
			document.querySelector('#search').style.top=dis*(-1)-40+"px";
			this.isFixed = false;
		})
	}
}
</script>

<style scoped>
.header{
	width: 100%;
	height: 150px;
	background: #0089DC;
	padding: 0 10px;
	box-sizing: border-box;
	position: relative;
}
.header .header-top{
	height:50px;
	display: flex;
	color:#fff;
}
.header .header-top .address{
	flex:4;
	padding-left:30px;
	overflow:hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	line-height: 50px;
	font-weight:bold;
}
.header .header-top .address a{
	color:#fff;
}
.header .header-top .address img{
	transform: translateY(7px);
	width:25px;
	height:25px;
}
.header .header-top .user{
	flex:3;
}
.header .header-top .weather{
	flex:2;
	display: flex;
	font-size:10px;
	padding-top:10px;
}
.header .header-top .weather .weather-l{
	text-align: center;
	flex:2;
}
.header .header-top .weather .weather-l span{
	display: block;
}
.header .header-top .weather .weather-r{
	flex:1;
}
.header .header-top .weather .weather-r img{
	width:30px;
	height:30px;
}
.fixed{
	position: fixed;
	width:100%;
	left:0;
	padding:0 10px;
	margin:10px 0;
	background:#0089DC;
}
.header #search{
	margin-top:10px;
	width:100%;
	height:40px;
	background:#0089DC;
	position: relative;
	z-index:100;
}
.header .search{
	height:40px;
	text-align:center;
	line-height: 40px;
	color:#999;
	background: #fff;
	width:90%;
	margin:0 auto;
}
.header .search img{
	transform: translateX(20%px) translateY(-10px);
	width:20px;
	height: 20px;
}
.header .hotwords{
	height:50px;
	line-height: 50px;
	overflow: hidden;
}
.header .hotwords ul{
	height:50px;
	width:200%;
}
.header .hotwords li{
	height:50px;
	font-size: 12px;
	color:#fff;
	float:left;
	padding:0 10px;
}
</style>
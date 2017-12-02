<template>
<header class="header">
	<p class="header-top">
		<span class="back" @click="backAction()"><</span>
		<i class="icon-close"></i>
	</p>
	<div class="seller-content">
		<img :src="handleUrl(sellerInfo.img)"/>
		<div class="seller-info">
				<h3>{{sellerInfo.name}}</h3>
				<p class="mode">
					<span>{{sellerInfo.send}}</span>/
					<span>{{sellerInfo.time}}分钟送达</span>/
					<span>{{sellerInfo.sendprice}}</span>
				</p>
				<p class="notice">公告：{{sellerInfo.notice}}</p>
		</div>
	</div>
	<div v-if="sellerInfo.activities" class="activities" v-show="sellerInfo.activities.length>1">
		<p v-for="(item,index) in sellerInfo.activities" v-if="index<1">
			 <span :style="{background:'#'+item.icon_color}">{{item.icon_name}} </span> 
			 <span>{{item.description}}</span> 
		</p>
		 <div class="hd" v-show="sellerInfo.activities" @click="showDetail()">
				{{sellerInfo.activities.length}}个活动
				<span class="arrow"></span>
		</div>
		
	</div>
	<div class="background">
		<img :src="handleUrl(sellerInfo.img)" width="100%" height="100%"/>
	</div>
	<div v-show="detailShow" class="detail">
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<h1 class="detail-name">{{sellerInfo.name}}</h1>
					<div  id="detail-score"></div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul v-if="sellerInfo.activities" class="sellerAct">
						<li v-for="item in sellerInfo.activities" class="act-item">
						<span :style="{background:'#'+item.icon_color}" class="seller-icon">{{item.icon_name}} </span>
						<span class="seller-des">{{item.description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p class="content">{{sellerInfo.notice}}</p>
					</div>
				</div>
			</div>
			<div class="detail-close" @click="hideDetail()">
				<i class="icon-remove_circle_outline"></i>
			</div>
	</div>
</header>
</template>

<script>
import {mapState} from 'vuex'
import {handleUrl} from '../../../common/common.js'
import {getSellerInfo} from '../../../services/home/homeService.js'
export default{
	props: {
		id: String
	},
	data(){
		return{
			sellerInfo:{},
			detailShow:false
		}
	},
	methods: {
		handleUrl,
		getData(){
			getSellerInfo(this.id)
			.then(result=>{
				this.sellerInfo = result;
				console.log(result);
			})
		},
		backAction(){
			this.$router.back();
		},
		showDetail(){
			this.detailShow = true;
		},
		hideDetail(){
			this.detailShow = false;
		}
	},
	created(){
		this.$event.$on('init-data', ()=>{
			this.getData();
		});
	 },
	updated(){
		$.fn.raty.defaults.path = 'static/images';
		$('#detail-score').raty({
			readOnly: true,
			score: this.sellerInfo.rating
				//半颗星: .26 -> .75
		});
	}	
}
</script>

<style scoped>
.header{
	width: 100%;
	position: relative;
	background:rgba(7,17,27,0.5);
}
.header .header-top{
	position: relative;
}
.header .header-top i{
	position: absolute;
	right: 10px;
	font-size:26px;
	top:6px;
	color:#fff;
}
.header .back{
	font-size:24px;
	color:#fff;
}
.header .seller-content{
	display: flex;
}
.header .seller-content img{
	margin:0 10px;
	width:80px;
	height:80px;
	border:1px solid #fff;
}
.header .seller-content .seller-info{
	flex:1;
	color:#fff;
}
.header .seller-content .seller-info .mode{
	font-size:12px;
}
.header .seller-content .seller-info p{
	padding:10px 0;
}
.header .seller-content .seller-info p.notice{
	white-space:nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size:12px;
	padding-top:2px;
	width:200px;
}
.header .activities{
	position: relative;
	margin-top:10px;
	font-size:12px;
	color:#fff;
	padding-bottom:6px;
}
.header .activities span{
	margin-left:8px;
}
.header .activities .hd{
	position: absolute;
	right:20px;
	top:0px;
}
.header .activities .arrow{
	display: inline-block;
	position:absolute;
	right:-13px;
	top:5px;
	width:0;
	height:0;
	border-left:5px solid #fff;
	border-right:5px solid transparent;
	border-top:4px solid transparent;
	border-bottom:4px solid transparent;
}
.header .background{
	position: absolute;
	left:0;
	top:0;
	width:100%;
	height: 100%;
	z-index:-1;
	filter:blur(10px);
}
.header .detail{
	position: fixed;
	top:0;
	left:0;
	z-index:100;
	width:100%;
	height:100%;
	overflow: auto;
	background:rgba(7,17,27,0.9);
}
.detail-wrapper{
	min-height:100%;
	width:100%;
}
.detail-wrapper .clearfix{
	display: inline-block;
}
.detail-wrapper .clearfix:after{
	display: block;
	content:".";
	height:0;
	line-height: 0;
	clear: both;
	visibility: hidden;
}
.detail-main{
	margin-top:64px;
	padding-bottom:64px;
	color:#fff;
}
.detail .detail-name{
	line-height:16px;
	text-align: center;
	font-size:16px;
	font-weight:700;
}
#detail-score{
	text-align: center;
	width:80%;
	margin:20px auto;
}
.detail-close{
	position: relative;
	width:32px;
	height:32px;
	margin:-64px auto 0 auto;
	clear:both;
	font-size:32px;
}
.title{
	display: flex;
	width:80%;
	margin:28px auto 24px auto;
}
.title .line{
	flex:1;
	position: relative;
	top:-6px;
	border-bottom:1px solid  rgba(255,255,255,.2);
}
.title .text{
	padding:0 12px;
	font-size:14px;
	font-weight:700;
}
.sellerAct{
	width:80%;
	margin:0 auto;
}
.sellerAct .act-item{
	padding:0 12px;
	margin-bottom:12px;
	font-size:12px;
}
.sellerAct .act-item:last-child{
	margin-bottom:0;
}
.sellerAct .seller-icon{
	width:16px;
	height:16px;
	vertical-align:top;
	margin-right:6px;
}
.bulletin{
	width:80%;
	margin:0 auto;
}
.bulletin .content{
	padding:0 12px;
	line-height:24px;
	font-size:12px;
}
</style>
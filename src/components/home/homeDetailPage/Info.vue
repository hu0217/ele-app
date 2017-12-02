<template>
<div class="block">
   <div class="wraper-info">
	   <div>
		   <h3>活动与服务</h3>
			<div class="service">
				<ul v-if="information.activities" class="sellerAct">
					<li v-for="item in information.activities" class="act-item">
						<span :style="{background:'#'+item.icon_color}" class="seller-icon">{{item.icon_name}} </span>
						<span>{{item.description}}</span>
					</li>
				</ul>
				<ul v-if="information.supports" class="sellerAct">
					<li v-for="item in information.supports" class="act-item">
						<span :style="{background:'#'+item.icon_color}" class="seller-icon">{{item.icon_name}} </span>
						<span>{{item.description}}</span>
					</li>
				</ul>
			</div>
			<div class="space"></div>
			<div class="seller-pic" v-if="information.albums">
				<h3>商家实景</h3>
				<ul class="clearfix">
					<li v-for="pic in information.albums" class="picture">
						<img :src="handleUrl(pic.cover_image_hash)" />
						<span class="info">{{pic.name}}</span> 
					</li>
				</ul>
			</div>
			<div class="space" v-if="information.albums"></div>
			<div class="seller-in">
				<h3>商家信息</h3>
				<p class="one-bottom-px">{{information.name}}</p>
				<p class="phone one-bottom-px" v-if="information.phone">
					<span class="left">商家电话</span>
					<span class="right">{{information.phone}}</span>
				</p>
				<p class="address one-bottom-px">
					<span class="left">地址</span>
					<span class="right">{{information.address}}</span>
				</p>
				<p class="open-time ">
					<span class="left">营业时间</span>
					<span class="right" v-for="time in information.opening_hours">{{time}}</span>
				</p>
			</div>
			<div class="space" style="clear:both"></div>
			<div class="quality">
				<span class="left">营业资质</span>
				<span class="right"> ></span>
			</div>
	   </div>
		
	</div>

</div>


</template>

<script>
let infoScroll = null;
import {mapState} from 'vuex'
import {handleUrl} from '../../../common/common.js'
import {getSellerInfo} from '../../../services/home/homeService.js'
export default{
	props: {
		id: String
	},
	data(){
		return{
			information:{}
		}
	},
	methods:{
      handleUrl
	},
	created(){
		//请求菜单数据
		getSellerInfo(this.id)
		.then(result=>{
			console.log(result);
			this.information = result;
		})
	},
	mounted(){
	 	infoScroll = new IScroll(".wraper-info",{});
	},
	updated(){
		infoScroll.refresh();
	}
}
</script>

<style>
.wraper-info{
	width:100%;
	height:100%;
	overflow: hidden;
}
.block h3{
	font-size:14px;
	padding-left:10px;
	font-weight:normal;
	line-height:50px;
}
.service{
	padding-left:10px;
}
.service .sellerAct .act-item{
	margin-bottom:8px;
	font-size:12px;
}
.service .sellerAct .act-item span{
	margin-right:4px;
}
.space{
	width:100%;
	height:10px;
	background:rgba(0,17,27,0.1);
}
.seller-pic{
	padding-left:10px;
}
.seller-pic ul{
	min-height:80px;
	clear:both;
	margin-bottom:10px;
}
.seller-pic .picture{
	float: left;
	margin-right:10px;
	width:80px;
	height:80px;
	position: relative;
}
.seller-pic img{
	width:80px;
	height:80px;
}
.seller-pic .info{
	position: absolute;
	bottom:0px;
	color:#fff;
	width:100%;
	height: 20px;
	background:rgba(7,17,27,0.6);
	font-size:12px;
	text-align: center;
}
.seller-in{
	padding-left:10px;
}
.seller-in p{
	height:45px;
	line-height:45px;
	clear:both;
}
.seller-in p span{
	line-height:45px;
}
.seller-in p .left{
	float:left;
}
.seller-in p .right{
	float:right;
	overflow: hidden;
	font-size:12px;
}
.quality{
	line-height:40px;
	height:40px;
	padding:0 10px;
	clear:both;
}
.quality .left{
	float:left;
}
.quality .right{
	float:right;
}
</style>
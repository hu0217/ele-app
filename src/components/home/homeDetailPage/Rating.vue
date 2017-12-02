<template>
<div class="block">
	<div class="rating-wrap">
		<div>
			<div class="totalRating clearfix" v-if="totalRating">
				<div class="rating-left">
					<p class="score">{{Math.floor(totalRating.overall_score*10)/10}}</p>
					<p>综合评价</p>
					 <p>高于周边商家{{Math.floor((totalRating.compare_rating*100)*100)/100}}%</p> 
				</div>
				<div class="rating-right">
					<div>
						<span>服务态度</span>
						<span class="service"></span>
						<span class="rating">{{Math.floor(totalRating.service_score*10)/10}}</span>
					</div>
					<div>
						<span>菜品评价</span>
						<span class="food-rating"></span>
						<span class="rating">{{Math.floor(totalRating.food_score*10)/10}}</span>
					</div>
					<div>
						<span>送达时间</span>
						<span>{{totalRating.deliver_time}} 分钟</span>
					</div>
				</div>
			</div>
			<div class="space"></div> 
			<div class="rating-select">
				<div class="rating-type one-bottom-px">
					<span v-for="(type,index) in ratingCount" class="block" :class="{has:tagIndex == index}"  @click.stop="tabsChange(type.name,index)">
						{{type.name}} <span class="count">({{type.count}})</span>
					</span>	
				</div>
			</div>
			<ul class="user-rating">
				<li v-for="ratingInfo in allRating">
					<div class="logo">
						<img src="/static/images/logo.png" alt="">
					</div>
					<div class="rating-content">
						<p>
							<span>{{ratingInfo.username}}</span>
							<span>{{ratingInfo.rated_at}}</span>
						</p>
						<p class="rating-service">
							<span class="rating-score"></span>
							<span class="rating-time">{{ratingInfo.time_spent_desc}}</span>
						</p>
						
						<p v-if="ratingInfo.rating_text">
							{{ratingInfo.rating_text}}
						</p>
						<ul class="rating-pic" v-if="ratingInfo.item_ratings" >
							<li v-for="pic in ratingInfo.item_ratings">
								<img :src="handleUrl(pic.image_hash)"  alt="">
							</li>
						</ul>
						<ul class="rating-text" v-if="ratingInfo.item_ratings">
							<li v-for="pic in ratingInfo.item_ratings">
								{{pic.food_name}}
							</li>
						</ul>
					</div>
				</li>
				
			</ul>
		</div>
	</div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import {getRatingCount,getTotalRating,getUserRating} from '../../../services/home/homeService.js'
import {handleUrl} from '../../../common/common.js'
export default{
	props: {
		id: String
	},
	data(){
		return{
           ratingCount:{},
		   totalRating:{},
		   allRating:[],
		   tagIndex:0
		}		
	},
	methods:{
	  handleUrl,
	  tabsChange(tag,index){
	  	this.tagIndex = index;
	  	getUserRating(this.id,tag)
		.then(result=>{
			this.allRating = result;
//			console.log(result);
		})
	  	
	  }
	},
	created(){
		getRatingCount(this.id)
		.then(result=>{
			this.ratingCount = result;
		    //console.log(result);
		}),
		getTotalRating(this.id)
		.then(result=>{
			this.totalRating = result;
			//console.log(result);
		}),
		getUserRating(this.id,'')
		.then(result=>{
			this.allRating = result;
//			console.log(result);
		})
	},
	mounted(){
		this.ratingScroll = new IScroll('.rating-wrap',{});
	},
	updated(){
		$.fn.raty.defaults.path = 'static/images';
		$('.service').raty({
			readOnly: true,
			score: this.totalRating.service_score
		});
		$('.food-rating').raty({
			readOnly: true,
			score: this.totalRating.food_score
		});
		for(var i = 0; i < this.allRating.length;i++){
			$('.rating-score').raty({
				readOnly:true,
				score:this.allRating[i].rating_star
			})
		}
	 	this.ratingScroll.refresh(); 
	}
}
</script>

<style>
.rating-wrap{
	width:100%;
	height:100%;
	overflow: hidden;
}
.space{
	width:100%;
	height: 10px;
	border-top:1px solid rgba(7,17,27,0.1);
	border-bottom:1px solid rgba(7,17,27,0.1);
	background:rgba(7,17,27,0.2);
	clear:both;
}
.rating-select .rating-type{
		padding:18px 0;
		margin:0 18px;
}
.rating-select .rating-type span.block{
	padding:8px;
	margin-right:4px;
	border-radius:1px;
	color:rgb(77,85,93);
	font-size:12px;
	line-height:16px;
	background:rgba(0,160,220,0.2);
	margin-bottom: 8px;
    display: inline-block;
}
.rating-select .rating-type span.block .count{
	font-size:8px;
	margin-left:2px;
}
.totalRating{
	padding:20px;
	clear:both;
}
.rating-left{
	float:left;
	text-align: center;
	width:120px;
	border-right:1px solid #ddd;
}
.rating-left .score{
	font-size:16px;
	color:red;
	font-weight:bold;
}
.rating-left p{
	font-size:12px;
	color:#666;
}
.rating-right{
	float:left;
	padding-left:20px;
	color:#666;
}
.rating-right div  {
	font-size:12px;
	line-height: 20px;
}
.rating-right div .rating{
	color:red;
}
.rating-right img{
	width:10px;
	height:10px;
}
.user-rating{
	padding:20px;
	width:100%;
}
.user-rating li{
	clear: both;
	overflow: hidden;
	margin-bottom:10px;
}
.user-rating .logo{
	float:left;
	width:60px;
	margin-right:10px;
}
.user-rating .logo img{
	width:40px;
	height:40px;
}
.user-rating .rating-content{
	float:left;
	width:60%;
}
.user-rating .rating-content p{
	font-size:12px;
}
.user-rating .rating-content p.rating-service{
	position: relative;
}
.user-rating .rating-content p.rating-service .rating-time{
	position: absolute;
	right:20px;
}
.user-rating .rating-content .rating-score img{
	width:10px;
	height: 10px;
}
.rating-pic,.rating-text{
	display: flex;
}
.rating-pic li{
	margin-top:4px;
	flex:1;
	width:60px;
}
.rating-pic li img{
	width:60px;
	height:60px;
}
.rating-text li{
	font-size:12px;
	width:60px;
	border:1px solid #ccc;
	padding-left:10px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	margin-right:10px;
}
.rating-select .rating-type span.block.has{
	background:cornflowerblue;
}
</style>
<template>
 <div>
 	<div class="seller-recommand">
 		商家推荐	
 	</div>
 	<ul class="list">
		<li class="item one-bottom-px" v-for="listItem in listData" @click="toDetail(listItem)">
			<div class="item-image">
				<img :src="handleUrl(listItem.image_path)" />
			</div>
			<div class="item-content">
				<div class="item-head">
					<h3>{{listItem.name}}</h3>	
					<div>
						<span v-for="support in listItem.supports">{{support.icon_name}}</span>
					</div>
					
				</div>
				<div class="month-info">
					<span data-score="4" class="score"></span>
					<span>{{listItem.rating}}</span>
					<span>月售 {{listItem.recent_order_num}}单</span>
					<span class="send" v-if="listItem.delivery_mode" :style="{background: '#'+listItem.delivery_mode.color,color:'#'+listItem.delivery_mode.text_color}">{{listItem.delivery_mode.text}}</span>
				</div>
				<div class="goodsInfo clearfix">
					<div class="goodsInfo-l">
						<span>￥20起送</span>&nbsp;&nbsp;|
						<span>{{listItem.piecewise_agent_fee.description}}</span>
					</div>
					<div class="goodsInfo-r">
						<span>{{listItem.distance/1000}}km</span>&nbsp;&nbsp;|
						<span>{{listItem.order_lead_time}}分钟</span>
					</div>
				</div>
				<div class="reason" v-show="listItem.recommend.image_hash">
					<img :src="handleUrl(listItem.recommend.image_hash)" />
					<span :style="{color: listItem.recommend.color}">{{listItem.recommend.reason}}</span>
				</div>
				<div class="activities-info one-top-px">
					<ul class="activities">
						<li v-for="(activity, index) in listItem.activities" 
							v-if="index<=1 || listItem.isexpend">
							<span :style="{background: '#'+activity.icon_color}">
								{{activity.icon_name}}
							</span>
							{{activity.description}}
						</li>
					</ul>
					<div class="btn" v-if="listItem.activities.length>0"
						@click.stop="activityActon(listItem)">
						{{listItem.activities.length}}个活动
						<span class="arrow" :class="{active:listItem.isexpend==true}"></span>
					</div>
				</div>
				
			</div>
		</li>
	</ul>
</div>

</template>

<script>
import {mapState} from 'vuex'
import {handleUrl} from '../../../common/common.js'
import {getHomeList} from '../../../services/home/homeService.js'
export default {
	data(){
		return {
			limit: 20,
			listData: [],
			loadmoreFlag: false
		}
	},
	computed: mapState(['longitude', 'latitude']),
	methods: {
		handleUrl,
		getData(){
			let offset = this.listData.length;
			getHomeList(this.latitude, this.longitude, offset, this.limit)
			.then(result=>{
				console.log(result)
				if(!this.loadmoreFlag){
					this.listData = result;
				}else{
					this.listData = this.listData.concat(result);
				}
				//关闭父组件加载更多
				if(this.loadMoreCallback){
					this.loadMoreCallback();
				}
				this.$emit('refreshContent');
			})
		},
		//展开活动的点击事件
		activityActon(listItem){
			console.log(listItem);
			listItem.isexpend = !listItem.isexpend;
			this.$emit('refreshContent');
		},
		//进入商家详情页
		toDetail(listItem){
			this.$router.push('/home/seller-detail/'+listItem.id);
		}
	},
	created(){
		//初始化请求列表数据
		this.$event.$on('init-data', ()=>{
			this.loadmoreFlag = false;
			console.log('列表触发了');
			this.getData();
		});
		//请求更多列表数据
		this.$event.$on('loadmore-list', (callback)=>{
			this.loadmoreFlag = true;
			this.getData();
			this.loadMoreCallback = callback;
		});
	},
	updated(){
		$.fn.raty.defaults.path='/static/images';
		for(var i = 0; i < this.listData.length;i++){
			$('.score').raty({
				readOnly:true,
				score:this.listData[i].rating
			})
		}
	
	}
}
</script>

<style scoped>
.seller-recommand{
	padding:10px 0;
	width:100%;
	line-height: 30px;
	text-align: center;
}
.seller-recommand:after,.seller-recommand:before{
	content:'';
	display: inline-block;
	position: relative;
    top: -5px;
	width:20px;
	margin-right:10px;
	height:1px;
	background:#999;
}
.list{
	width: 100%;
}
.list .item{
	display: flex;
	padding: 6px;
}
.item .item-image{
	margin-right:10px;
	width: 50px;
	height: 50px;
}
.item .item-image img{
	width: 100%;
}
.item .item-content{
	flex: 1;
}
.item .item-content .item-head{
	position: relative;
}
.item .item-content .item-head div{
	position: absolute;
	right:0;
	top:-6px;
}
.item .item-content .item-head div span{
	margin-right:4px;
	font-size:12px;
	color:#999;
}
.item .item-content h3{
	font-size: 14px;
	color: #333;
}
.month-info span{
	color:#999;
	font-size:12px;
}
.item .item-content .activities{
	color: #999;
	font-size: 12px;
}
.item .item-content .activities span{
	color: #fff;
	border-radius: 2px;
	font-size: 12px;
}
.item .item-content .activities li:first-child{
	padding-top:6px;
}
.item .item-content .activities li{
	margin-bottom: 8px;
}
.item .item-content .activities-info{
	position: relative;
	border-top-color:#999;
}
.item .item-content .activities-info .btn{
	padding-top:10px;
	color:#999;
	font-size:12px;
	position: absolute;
	top: 2px;
	right: 2px;
	padding-right:10px;
}
.arrow{
	display: inline-block;
	position:absolute;
	right:0;
	top:14px;
	width:0;
	height:0;
	border-top:8px solid #999;
	border-bottom:8px solid transparent;
	border-left:5px solid transparent;
	border-right:5px solid transparent;
}
.arrow.active{
	transform:translateY(-10px) rotate(180deg);
}
.goodsInfo{
	height:30px;
	line-height: 30px;
	font-size: 12px;
	color:#999;
}
.goodsInfo-l{
	float:left;
}
.goodsInfo-r{
	float:right;
}
.reason{
	padding-bottom:10px;
}
.reason img{
	display: inline-block;
	width:15px;
	height:15px;
}
.reason span{
	display: inline-block;
	font-size: 12px;
}
.month-info .send{
	position: absolute;
	right:0;
}
.month-info span.score img{
	width:50px;
	height:50px;
}
</style>
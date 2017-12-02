<template>
<div class="page subpage" id="searchResult">
   <div class="header">
        <span @click.stop="backTo()"><</span>
        <span class="search-input">
            <img src="/static/images/search.png" alt="">
            <input v-model="txtVal" type="text">
        </span>
        <span @click.stop="searchGoods()">搜索</span>
    </div>
    <div class="select-type">
        <p>
            <span @click.stop="typeShow()" >分类</span>
            <span @click.stop="sortShow()" >综合排序</span>
            <span @click.stop="delierShow()" >筛选</span>
        </p>
        <!--分类-->
        <div class="type one-top-px" v-show="showType">
            <div class="type-content">
                <ul>
                    <li class="type-in" v-for="item in type">
                        <span>{{item.name}}</span>
                        <span>{{item.count}}</span>
                    </li>
                </ul>
            </div>
            <div clas="space"></div>
        </div>
        <!--综合排序-->
        <div class="type one-top-px" v-show="showSort">
            <div class="typeContent">
                <div>
                	<ul class="sort">
                		<li>综合排序</li>
                		<li>销量最高</li>
                		<li>起送价最低</li>
                		<li>配送最快</li>
                	</ul>
                </div>
            </div>
            <div clas="space"></div>
        </div>
        <!--筛选-->
        <div class="type" v-show="showeDeliver">
            <div class="typeContent">
                <div>
                	<p>配送方式</p>
                	<ul class="deliver-type">
                		<li v-for="deliver in deliverType">{{deliver.text}}</li>
                	</ul>
                	<p>人均消费</p>
                	<ul class="average">
                		<li v-for="ave in average">{{ave.description}}</li>
                	</ul>
                	<p>优惠活动</p>
                	<ul class="activities">
                		<li v-for="act in activities">
                			<span :style="{background:'#'+act.icon_color}">{{act.icon_name}}</span>
                			<span>{{act.name}}</span>
                		</li>
                	</ul>
                	<p>商家属性</p>
                	<ul class="attr">
                		<li v-for="attr in sellerAttr">
                			<span :style="{background:'#'+attr.icon_color}">{{attr.icon_name}}</span>
                			<span>{{attr.name}}</span>
                		</li>
                	</ul>
                	
                </div>
            </div>
            <div clas="space"></div>
        </div>
        
    </div>
    <div class="nav">
        <ul class="nav-list">
            <li v-for="multi in searchNav.multi">{{multi.name}}</li>
            <li v-for="single in searchNav.single">{{single.name}}</li>
        </ul>
    </div>
    <div class="all-goods">
        <div class="all-goods-in">
             <ul>
                <li v-for="all in searchNav.foodsall">
                    <div class="seller one-bottom-px">
                        <img :src="handleUrl(all.image_path)" />
                        <div class="content">
                            <p>{{all.name}}</p>
                            <p class="seller-info">
                                <span>评价{{all.rating}}</span>
                                <span>起送费￥20</span>
                                <span>{{all.piecewise_agent_fee.tips}}</span>
                                <span class="info-right">
                                    <span>{{all.distance/1000}}km</span>|
                                    <span>{{all.order_lead_time}}分钟</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <ul class="goods-list">
                        <li v-for="(stores,index) in all.allfoods" class="stores one-bottom-px" v-if="index<=1||isShow">
                            <img :src="handleUrl(stores.image_path)" />
                            <div class="store-content">
                                <p>{{stores.name}}</P>
                                <p>
                                    <span>月售{{stores.month_sales}}份</span>
                                    <span>好评率{{stores.satisfy_rate}}%</span>
                                </P>
                                <p class="price">￥{{stores.price}}</P>
                            </div>
                        </li>
                        <p class="more" @click="getMore()">{{more}}</p>
                    </ul>
                </li>
            </ul>
            </div>
        </div>
       
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import {handleUrl} from '../../common/common.js'
import {getSearchNav,getType,getDeliverType,getAverage,getActivities,getAttr} from '../../services/home/homeService.js'
export default{
    data(){
        return{
            txtVal:this.$route.params.keyword,
            searchNav:{},
            more:'展示更多商品',
            isShow:false,
            type:[],
            showType:false,
            showeDeliver:false,
            showSort:false,
            deliverType:[],
            average:[],
            activities:[],
            sellerAttr:[]
        }
    },
    computed: mapState(['latitude', 'longitude']),
    methods:{
        handleUrl,
        backTo(){
            this.$router.back();
        },
        getData(){
            getSearchNav(this.latitude, this.longitude,this.txtVal)
			.then(result=>{
                // console.log(result)
				this.searchNav = result;
            }),
            getType(this.latitude, this.longitude)
            .then(result=>{
//              console.log(result);
                this.type = result;
            }),
            getDeliverType(this.latitude, this.longitude)
            .then(result=>{
//              console.log(result);
                this.deliverType = result;
            }),
            getAverage(this.latitude, this.longitude)
            .then(result=>{
//              console.log(result);
                this.average = result;
            }),
            getActivities(this.latitude, this.longitude)
            .then(result=>{
//              console.log(result);
                this.activities = result;
            }),
            getAttr(this.latitude, this.longitude)
            .then(result=>{
                console.log(result);
                this.sellerAttr = result;
            })
        },
        getMore(){
            this.isShow = !this.isShow;
            this.more="向上收起";
        },
        typeShow(){
            this.showType = !this.showType;
        },
        delierShow(){
        	this.showeDeliver = !this.showeDeliver;
        },
        sortShow(){
        	this.showSort = !this.showSort;
        }
       
    },
    created(){
        this.getData();
		this.$event.$on('init-data', ()=>{
			this.getData();
		})
    },
    mounted(){
        this.navScroll = new IScroll('.nav',{
            scrollX: true, 
		    scrollY: false, 
		 	mouseWheel: true
            
        });
        this.foodScroll = new IScroll('.all-goods-in',{});
        this.typeScroll = new IScroll('.type-content',{});
    },
    updated(){
        this.foodScroll.refresh();
        this.typeScroll.refresh();
    }

}
</script>

<style>
#searchResult{
    background:#fff;
}
.header{
    margin-top:10px;
    line-height: 40px;
    overflow: hidden;
}
.header span{
    float:left;
}
.header span:first-child{
    font-size:20px;
    margin-right:4px;
}
.header span:last-child{
    margin-left:4px;
}
.header span.search-input{
    width:80%;
    display: inline-block;
    height:40px;
    margin:0 auto;
    position: relative;
}
.header span.search-input img{
    position: absolute;
    left: 18%;
    width:20px;
    height: 20px;
    top:13px;
}
.header span.search-input input{
    border:none;
    width:100%;
    height:100%;
    padding-left:25%;
    box-sizing: border-box;
    background:#ddd;
}
.deliver-type,.average,.activities,.attr{
	clear: both;
	overflow: hidden;
}
.deliver-type li,.average li,.activities li,.attr li{
	width:30%;
	float:left;
	font-size:14px;
}
.select-type{
    margin:10px auto;
    position: relative;
}
.select-type .type{
    background:#fff;
    width:100%;
    height:400px;
    position: absolute;
    z-index:10;
    display: flex
}
.type-content{
    width:120px;
    padding-left:10px;
    overflow: hidden;
}
.typeContent{
	width:100%;
    padding-left:10px;
    overflow: hidden;
}
.typeContent p{
	line-height:30px;
}
.sort{
	line-height: 40px;
}
.type-in{
    display: flex;
    font-size:12px;
    line-height: 30px;
}
.type-in span{
    flex:1;
}
.space{
    flex:1;
}
.select-type p{
    display: flex;
}
.select-type span{
    text-align: center;
    flex:1;
    font-size:12px;
}
.nav{
    padding:0 10px;
    width:100%;
    overflow: hidden;
}
.nav .nav-list{
    width:200%;
}
.nav .nav-list li{
    float:left;
    padding:4px;
    line-height:24px;
    background: #ddd;
    margin-right:4px;
    font-size:12px;
}
.all-goods{
    width:100%;
    margin-top:20px;
    padding:0 10px; 
    position: absolute;
    top: 100px;
    left:0;
    bottom:0;
}
.all-goods .all-goods-in{
    width:100%;
    height:100%;
    overflow: hidden;
}
.all-goods .seller{
    display: flex;
    padding:10px;
}
.all-goods .seller img{
    width:30px;
    height:30px;
}
.all-goods .seller .content{
    flex:1;
    margin-left:4px;
}
.all-goods .seller .content p{
    font-size:12px;
}
.all-goods .seller .content p.seller-info{
    position: relative;
}
.all-goods .seller .content p.seller-info .info-right{
    position: absolute;
    right:10px;
}
.goods-list li{
    margin-top:4px;
    display: flex;
}
.goods-list li img{
    width:40px;
    height:40px;
}
.goods-list li .store-content{
    flex:1;
    margin-left:4px;
}
.goods-list li .store-content p{
    font-size:12px;
    line-height:24px;
}
.goods-list li .store-content p.price{
    color:red;
}
.more{
    text-align: center;
    font-size:12px;
    line-height:30px;
}
</style>
<template>
<div class="block menu">
	<div  class="menu-nav">
		<nav class="wrap">
			<li v-for="(menuItem, index) in menuList" 
				class="one-bottom-px good-num"
				:class="{active: index==selectMenuIndex}"
				@click="menuAction(index)">
				<img class="icon":src="handleUrl(menuItem.icon_url)" v-show="menuItem.icon_url"  alt="" />
				{{menuItem.name}}
				<div class="num"></div>
			</li>
		</nav>
	</div>
	<div class="menu-list">
		<ul class="wrap">
			<li class="menu-sm-list" v-for="(menuItem, i1) in menuList">
				<h3 class="title one-bottom-px">
					{{menuItem.name}}
					<span>{{menuItem.description}}</span>
				</h3>
				<ul class="foods">
					<li class="food one-bottom-px" v-for="(food,i2) in menuItem.foods" @click="foodDetail(i1,i2)">
						<div class="food-img">
							<img :src="handleUrl(food.image_path)" />
						</div>
						<div class="food-content">
							<h4>{{food.name}}</h4>
							<p class="food-description">
								{{food.description}}
							</p>
							<p class="food-month">
								<span>月售{{food.month_sales}}份</span>
								<span>好评率{{food.satisfy_rate}}%</span>
							</p>
							<p class="discount" v-if="food.activity">
								<span :style="{background:'#'+food.activity.image_text_color}">{{food.activity.benefit_text}}</span>
								<span :style="{color:'#'+food.activity.applicable_quantity_text_color}">{{food.activity.applicable_quantity_text}}</span>
							</p>
							<p class="select">
								<span v-for="(specfood,index) in food.specfoods" class="price" v-if="index<1">
									<span class="now-price">
										<span>￥{{specfood.price}}</span>
									</span>
									<span class="old-price" v-if="specfood.original_price">
										<del>￥{{specfood.original_price}}</del>
									</span>
								</span>
								<span class="select-in">
									
									<span class="reduce-out">
										<span v-for="good in cartList">
											<span v-for='cartgoods in good.goods'>
												<span v-if='food.item_id==cartgoods.item_id&&cartgoods.count>=1' :class="{reduce:food.item_id==cartgoods.item_id&&cartgoods.count>=1}"@click.stop="reduceCount(food)">
													-
												</span>
											</span>
										</span>
										
									</span>
									
									<span class="num" >
										<span v-for="good in cartList">
											<span v-for='cartgoods in good.goods'>
												<span v-if='food.item_id==cartgoods.item_id'>
													{{cartgoods.count}}
												</span>
											</span>
										</span>
									</span>
									
									<span class="add" v-if="food.specfoods.length<=1" @click.stop="addCart(food)">+</span> 
									<span class="chose" v-else="food.specfoods.length>1" @click.stop="choseDetail(i1,i2,food)">选规格</span>
								</span>
							
							</p>
							
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</div>

    <div class="foodDetail" v-if="isShow" @click="hideDetail()">
		<div class="detail">
			<div class="detail-img" >
				<img :src="handleUrl(menuList[detailIndex1].foods[detailIndex].image_path)" />
				 <p>{{menuList[detailIndex1].foods[detailIndex].description}}</p>
			</div> 
			<p class="detail-name">{{menuList[detailIndex1].foods[detailIndex].name}}</p>
			<p class="detail-mouth">
				<span>月售{{menuList[detailIndex1].foods[detailIndex].month_sales}}份</span>
				<span>好评率{{menuList[detailIndex1].foods[detailIndex].satisfy_rate}}%</span>
			</p>
			<p v-for="(specfood,index) in menuList[detailIndex1].foods[detailIndex].specfoods" class="detail-price" v-if="index<1">
				<span class="now-price">
					<span>￥{{specfood.price}}</span>
				</span>
			</p>
		</div>
		
	</div>  
	<div class="chose-detail" v-if="isBg">
		<div class="choseDetail">
			<p class="chose-title">
				{{menuList[detailIndex1].foods[detailIndex].name}}
				<span @click="hideDetail()">x</span>
			</p>
			<div class="guize">
				<p class="guize-in">规则</p>
				<span class="spe-value" v-for="(specfood,index) in menuList[detailIndex1].foods[detailIndex].specfoods">
					<span v-for="specs in specfood">
						<span  v-for="spe in specs" @click="getPrice(specfood,index)" :class="{bg:priceIndex == index}">{{spe.value}}</span>
					</span> 
				</span> 
			</div>
			<div class="choice-price">
				 ￥{{selectPrice}}
				 <span class="chosed">选好了</span>
			</div>
			
		</div>
	</div>  
	
</div>
</template>

<script>
import {handleUrl} from '../../../common/common.js'
import {getSellerMenu} from '../../../services/home/homeService.js'
import Cart from '../../../store/cart.js'
export default {
	props: {
		id: String
	},
	data(){
		return {
			menuList: [],
			selectMenuIndex: 0,
			detailIndex:0,
			detailIndex1:0,
			isShow:false,
			isBg:false,
			selectPrice:'',
			priceIndex:0,
			cartList:[]
		}
	},
	methods: {
		handleUrl,
		//左边菜单栏点击事件
		menuAction(index){
			//1.让左边的菜单按钮选中
			this.selectMenuIndex = index;
			//2.让右边的菜单滚动到对应位置上
			let offsetHeight = 0;
			for(let i = 0; i < index; i++){
				offsetHeight -= this.heightArr[i];
			}
			// console.log(offsetHeight)
			this.menuScroll.scrollTo(0, offsetHeight, 100);
		},
		handleList(){
			let smallListDoms = document.querySelectorAll('.menu-sm-list');
			this.heightArr = [];
			for (let i = 0; i < smallListDoms.length; i++) {
				this.heightArr.push(smallListDoms[i].offsetHeight);
			}
			// console.log(this.heightArr);
			
			let navLiDoms = document.querySelectorAll('.menu-nav li');
			this.navHeightArr = [];
			for (let i = 0; i < navLiDoms.length; i++) {
				this.navHeightArr.push(navLiDoms[i].offsetHeight);
			}
			// console.log(this.navHeightArr);
		},
		foodDetail(i1,i2){
			this.detailIndex = i2;
			this.detailIndex1 = i1;
			// alert(i1);alert(i2);
			this.isShow = true;
		},
		hideDetail(){
			this.isShow = false;
			this.isBg = false;
		},
		choseDetail(i1,i2,foods){
			this.detailIndex = i2;
			this.detailIndex1 = i1;
			this.isBg = true;
			this.selectPrice = foods.specfoods[0].price;
		},
		getPrice(select,index){
			this.selectPrice = select.price;
			this.priceIndex = index;
		},
		addCart(item){
			
			this.$store.dispatch('cart/addGoods',{
				sellerId: this.id,
				item_id: item.item_id,
				foodname: item.name,
				foodImg:item.image_path,
				foodPrice:item.specfoods.length==0?'':item.specfoods[0].price
			});
			this.$event.$emit('goods',this.cartList);
		},
		reduceCount(item){
			this.$store.dispatch('cart/deleteGoods',{
				sellerId: this.id,
				item_id: item.item_id,
				foodname: item.name,
				foodImg:item.image_path,
				foodPrice:item.specfoods.length==0?'':item.specfoods[0].price
			});
			this.$event.$emit('goods',this.cartList);
		}
	},
	created(){
		//请求菜单数据
		getSellerMenu(this.id)
		.then(result=>{
			// console.log(result);
			this.menuList = result;
		})
		
		this.cartList=Cart.state.list;
//		console.log(this.$store.state.cart.list);
		
		
	},
	mounted(){
		this.navScroll = new IScroll('.menu-nav', {});
		this.menuScroll = new IScroll('.menu-list', {
			probeType: 3
		});
		//监听菜单的滚动，让菜单栏对应的按钮选中
		this.menuScroll.on('scroll', ()=>{
			
			// console.log('***************************')
			
			for (let i = 0; i < this.heightArr.length; i++) {
				let min = 0;
				let max = 0;
				for (let j = 0; j < i; j++) {
					min += this.heightArr[j];
				}
				max = min+this.heightArr[i];
//				console.log('index='+i+':'+min+"~"+max);
				
				let y = this.menuScroll.y * (-1);
				//如果menuScroll.y值介于max和min之间,那么this.selectMenuIndex = i
				if( y > min && y < max ){
					this.selectMenuIndex = i;
					//判断左边的按钮是否可见。
					let y = 0;
					for(let i = 0; i < this.selectMenuIndex; i++){
						y -= this.navHeightArr[i];
					}
					// console.log(y)
					//是否可以滚动到y的位置
					if(y > this.navScroll.maxScrollY){
						this.navScroll.scrollTo(0, y, 100);
					}
					break;
				}
				
			}
		})
		
	},
	updated(){
		this.navScroll.refresh();
		this.menuScroll.refresh();
		//如果还不知道列表高度，去取得列表高度
		if(!this.heightArr){
			this.handleList();
		}
	}
}
</script>

<style>
.menu{
	display: flex;
	bottom: 40px!important;
	margin-top:10px;
}
.menu .menu-nav{
	width: 75px;
	overflow: hidden;
}
.menu .menu-nav li{
	padding: 14px 6px;
	font-size: 12px;
	line-height: 18px;
	color: #666;
	background: #f5f5f5;
}
.menu .menu-nav li.active{
	color: #333;
	background: #fff;
}
.menu .menu-nav .good-num{
	position: relative;
}
.menu .menu-nav .good-num .num{
	position: absolute;
	width:15px;
	height:15px;
	background:red;
	color:#fff;
	border-radius:50%;
	top:0;
	right:0;
	text-align: center;
	line-height: 15px;
}
.menu .menu-nav .icon{
	display: inline-block;
	transform: translateY(2px);
	width:15px;
	height:15px;
}
.menu .menu-list{
	margin-left: 8px;
	flex: 1;
	overflow: hidden;
}
.menu .menu-sm-list .title{
	font-size: 14px;
	color: #666666;
	line-height:30px;
}
.menu .menu-sm-list .title span{
	font-size: 12px;
	font-weight: normal;
	color: #999;
}
.food{
	display: flex;
	padding: 10px 8px 28px 0px;
}
.food .food-img{
	width: 60px;
	height: 60px;
}
.food .food-img img{
	width: 100%;
}
.food .food-content{
	flex: 1;
	margin-left:10px;
}
.food .food-content h4{
	padding-right:20px;
	word-break: break-word;
	color:#666;
}
.food-description{
	padding:2px 0;
	font-size: 12px;
	color:#999;
	width:200px;
	overflow:hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.discount span{
	font-size:12px;	
}
.select{
	position: relative;
}
.price{
	padding:2px 0;
}
.select-in{
	position: absolute;
	right:0px;
}
.select-in .add,.select-in .reduce{
	display: inline-block;
	text-align: center;
	line-height:20px;
	font-size:14px;
	width:20px;
	height: 20px;
	border-radius:50%;
	color:#fff;
	background:#0089DC;
}
.num{
	width:20px;
	display: inline-block;
}
.chose{
	display: inline-block;
	line-height:20px;
	font-size:12px;
	text-align:center;
	padding:0 10px;
	border-radius:15px;
	color:#fff;
	background:#0089DC;
}
.price .now-price{
	color:red;
	font-weight:bold;
}
.price .old-price{
	color:#999;
}
.food-month{
	padding-top:2px;
	font-size:14px;
	color:#666;
	font-size:12px;
}
.food-month span{
	margin-right:10px;
}

.foodDetail,.chose-detail{
	position: fixed;
	top:0;
	left: 0;
	width:100%;
	height:100%;
	background:rgba(7,17,27,0.8);
	z-index:11;
}
.foodDetail .detail{
	background:#fff;
	width:80%;
	height:50%;
	border-radius:10px;
	margin:150px auto;
}
.detail-img{
	width:100%;
	height:75%;
	position: relative;
	z-index:12;
}
.detail-img img{
	width:100%;
	height:100%;
}
.detail-img p{
	position: absolute;
	padding:14px;
	color:#fff;
	font-size:12px;
	bottom:10px;
}
.foodDetai .detail p{
	color:#ddd;
} 
.detail-name{
	padding:10px;
	font-size:14px;
}
.detail-mouth{
	font-size:12px;
	padding-left:10px;
	color:#999;
}
.detail-mouth span{
	margin-right:10px;
}
.detail-price{
	color:red;
	font-weight:bold;
	padding:10px;
	margin-bottom:10px;
}
.choseDetail{
	background:#fff;
	width:80%;
	height:40%;
	border-radius:5px;
	margin:150px auto;
	z-index:13;
	padding:10px;
}
.chose-detail{
	z-index:10;
}
.choseDetail .chose-title{
	text-align:center;
	line-height:24px;
	position: relative;
}
.choseDetail .chose-title span{
	position: absolute;
	right:10px;
	font-size:14px;
}
.choseDetail .guize{
	padding-left:10px;
}
.choseDetail .guize .guize-in{
	font-size:12px;
}
.spe-value{
	line-height:24px;
	border:1px solid #ddd;
	margin-bottom:6px;
	display: inline-block;
	margin-right:4px;
	border-radius:10px;
}
 .choice-price{
	 color:red;
	 font-weight:bold;
	 position: relative;
	 font-size:16px;
} 
.bg{
	color:#0089DC;
	
}
.choice-price .chosed{
	position: absolute;
	padding:0 10px;
	line-height: 20px;
	display: inline-block;
	color:#fff;
	background:#0089DC;
	border-radius:4px;
	right:10px;
	font-size:12px;
	font-weight:normal;
}
</style>
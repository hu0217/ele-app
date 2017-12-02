<template>
<div class="cart">
	<div class="content">
		<div class="content-left" @click="cartInfo()">
			<div class="logo-wrapper">
				<div class="logo" :class="{hightColor:allNum}">
					<i class="icon-close"></i>
					<div class="allnum" v-if="allNum">{{allNum}}</div>
				</div>
			</div> 
			<div class="price" v-if="allNum">￥{{allPrice}}</div>
			<div class="desc"></div>
		</div>
		<div class="content-right">
			<div class="pay" :class="{toPay:allPrice>=20}">
				{{payText}}
			</div>
		</div>
	</div>
	<div class="cart-info" v-if="isShow">
		<div class="cart-in">
			<p class="select-good clearfix">
				<span class="left">已选商品</span>
				<span class="right" @click.stop="clearCart(cartGoods)">清空</span>
			</p>
			<div class="good-info" v-for="info in cartGoods">
				<div v-for="(good,index) in info.goods" class="good one-bottom-px">
					<div>{{good.name}}</div>
					<div>
						<span class="price">￥{{Math.floor(good.price*good.count*10)/10}}</span>
						<span class="reduce" @click.stop="red(info,index)">-</span>
						<span>{{good.count}}</span>
						<span class="add" @click.stop='add(info,index)'>+</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import Cart from '../../../store/cart.js'
	export default{
		props: {
			id: String
		},
		data(){
			return{
				isShow:false,
				payText:'20元起送',
				cartGoods:[],
				allNum:null,
				allPrice:null
			}
		},
		methods:{
			cartInfo(){
				this.isShow = !this.isShow;
			},
			
			add(item,index){
				console.log(item);
				this.$store.dispatch('cart/addGoods',{
					sellerId: item.sellerId,
					item_id: item.goods[index].item_id,
					foodname: item.goods[index].name,
					foodImg:item.goods[index].image,
					foodPrice:item.goods[index].price
				});
				this.$event.$emit('goods',this.cartGoods);
			},
			red(item,index){
  				this.$store.dispatch('cart/deleteGoods',{
					sellerId: item.sellerId,
					item_id: item.goods[index].item_id,
					foodname: item.goods[index].name,
					foodImg:item.goods[index].image,
					foodPrice:item.goods[index].price
				});
//				console.log(this.id)
				this.$event.$emit('goods',this.cartGoods);
			},
			clearCart(item){
//				console.log(item[0].sellerId);
				this.$store.dispatch('cart/removeGoods',{
					sellerId:item[0].sellerId
				})
				this.$event.$emit('goods',this.cartGoods);
			}
		},
		created(){
			this.cartGoods = Cart.state.list;
//			console.log(this.cartGoods )
		},
		mounted(){
			this.$event.$on('goods',(params)=>{
//				console.log(params)
				let num =[];
				let price = [];
				for(let i = 0; i < params.length; i++){
					for (let j = 0; j < params[i].goods.length; j++){
//						this.allNum=params[i].goods[j].count;
						num.push(params[i].goods[j].count);
						price.push(params[i].goods[j].price);
					}           
				}
//				console.log(price)
//				console.log(num)
				let count = 0;
				for(let i = 0; i <num.length;i++){
					count+=num[i]
				}
				
				let prices = 0;
				
				for(let i = 0; i <num.length;i++){
					for(let j = 0; j<price.length;j++){
						if(i == j){
							prices+=num[i]*price[j];
						}
					}
				}
				
//				console.log(count)
				this.allNum = count;
				this.allPrice  = prices;
				
				if(this.allPrice>=20){
					console.log(this.allNum)
					this.payText = "去结算";
				}else{
					this.payText = "20元起送";
				}
			})
		}
	}
</script>

<style scoped>
.cart{
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: inherit 50;
	height:48px;
}
.cart .content{
	display: flex;
	background:#141d27;
}
.cart .content .content-left{
	flex:1;
}
.allnum{
	position: absolute;
	width:20px;
	height:20px;
	border-radius:50%;
	background: red;
	color:#fff;
	line-height: 20px;
	text-align: center;
	top: 0;
    right: 0;
}
.cart .content .content-left .logo-wrapper{
	display: inline-block;
	position: relative;
	top:-10px;
	margin:0 12px;
	padding:6px;
	width:56px;
	height: 56px;
	box-sizing: border-box;
	vertical-align: top;
	border-radius:50%;
	background:#141d27;
	z-index:999;
}
.cart .content .content-left .logo-wrapper .logo{
	width:100%;
	height: 100%;
	border-radius:50%;
	background:#2b343c;
	text-align: center;
}
.cart .content .content-left .logo-wrapper .hightColor{
	background:#0000FF;
}
.cart .content .content-left .logo-wrapper .logo .icon-close{
	font-size:24px;
	line-height: 44px;
	color:#80858a;
}
.cart .content .content-left .price{
	display: inline-block;
	vertical-align: top;
	line-height: 24px;
	margin-top:12px;
	box-sizing: border-box;
	padding-right:12px;
	border-right:1px solid rgba(255,255,255,0.1);
	font-size:16px;
	font-weight:700;
	color:#fff;
}
.cart .content .content-left .desc{
	display: inline-block;
	vertical-align: top;
	line-height: 24px;
	margin:12px 0 0 12px;
	color:rgba(255,255,255,0.4);
	font-size:10px;
}
.cart .content .content-right{
	flex:0 0 105px;
	width:105px;
}
.cart .content .content-right .pay{
	height: 48px;
	line-height: 48px;
	text-align: center;
	font-size:12px;
	color:rgba(255,255,255,0.4);
	font-weight:700;
	background:#2b333a;
}
.cart .content .content-right  .toPay{
	background:green;
	color:#fff;
}
.cart-info{
	width:100%;
	position: fixed;
	left:0;
	top:0;
	bottom:48px;
	background:rgba(7,17,27,0.7);
	z-index:100;
}
.cart-info .cart-in{
	position: absolute;
	bottom:0;
	background: #fff;
	width:100%;
	padding:10px;
	box-sizing: border-box;
}
.select-good{
	height:30px;
	margin-top:10px;
	overflow: hidden;
	line-height: 30px;
	width:100%;
	background:#D4D4D4;
}
.select-good .left{
	float:left;
}
.select-good .right{
	float:right;
}
.good-info{
	min-height: 40px;
	margin-top:10px;
}
.good-info .good{
	margin-top:10px;
	min-height: 40px;
	width:100%;
	display: flex;
}
.good-info  .good div:first-child{
	width:60%;
}
.good-info .good div:last-child{
	flex:1;
	font-size:12px;
}
.price{
	color:red;
	font-weight: bold;
	font-size: 14px;
}
.add,.reduce{
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
</style>
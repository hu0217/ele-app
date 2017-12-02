<template>
<div class="page subpage" id="location">
	<div class="top">
		<span @click=goback()><</span>
		<p>选择收货地址</p>
	</div>	
	<div class="search-out">
		<div class="search-result">
			<div class="search-wrap">
				<input type="search" v-model="inputVal" placeholder="请输入地址"  class="search-address"/>
				<ul class="result-list">
					<li v-for="item in result" class="one-bottom-px" @click="changeLocation(item)">
						<p>{{item.name}}</p>
						<p>{{item.address}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
	

</div>
</template>

<script>
import {mapState} from 'vuex'
import {getLocationList} from '../../services/home/homeService.js'
let timer = null;
export default {
	//生命周期方法 props data computed  methods components 
	data(){
		return {
			inputVal: '',
			result: []
		}
	},
	computed: mapState(['latitude', 'longitude']),
	methods: {
		//请求地址列表
		requestData(){
			getLocationList(this.inputVal, this.latitude, this.longitude)
			.then((result)=>{
				this.result = result;
			})
		},
		//选择地址的点击事件
		changeLocation(item){
			//将数据告诉store
			this.$store.dispatch(
				'changeLocation',
				{
					lat: item.latitude,
					lon: item.longitude
				}
			);
			
			//返回上一页
			this.$router.back();
		},
		goback(){
			this.$router.back();
		}
		
	},
	created(){
		this.$watch('inputVal', (newVal)=>{
			//当用户在1秒之内没有输入内容之后再发送请求
			clearTimeout(timer);
			timer = setTimeout(()=>{
				console.log('发送请求出去');
				this.requestData();
			}, 1000);
		})
	},
	mounted(){
		this.locaScroll = new IScroll('.search-result',{});
	},
	updated(){
		this.locaScroll.refresh();
	}
}
</script>

<style scoped>
#location{
	background:#fff;
	width:100%;
	height:100%;
}
.search-out{
	position: absolute;
	bottom: 0px;
	top:43px;
	left: 0;
	width: 100%;
	box-sizing: border-box;
}
.top{
	height: 40px;
	width:100%;
	padding:0 10px;
	text-align: center;
	position: relative;
	color:#fff;
	background:blue;
	line-height: 40px;
}
.top span{
	position: absolute;
	left: 10px;
}
.search-result{
	overflow: hidden;
	width:100%;
	height: 100%;
}
#location .search-address{
	margin-top:2px;
	display: inline-block;
	border:none;
	width:80%;
	margin-left:40px;
	background:#ddd;
	height: 30px;
	text-align: center;
}
#location .result-list{
	margin-top:10px;
	padding:0 20px;
}
#location .result-list li{
	min-height:40px;
	padding:10px;
}
#location .result-list li p{
	font-size:14px;
}
#location .result-list li p:first-child{
	font-weight:bold;
}
</style>
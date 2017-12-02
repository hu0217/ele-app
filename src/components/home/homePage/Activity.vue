<template>
<div class="activity">
	<div class="home-qiang">
		<img src="/static/images/home-qiang.png" alt="" />
	</div>
	<div class="home-hot">
		<div class="limit">
			<h3 class="h3-1">限量抢购</h3>
			<p class="p-1">超值美味 9.9元起</p>
			<div class="div-1">
				<span>2343</span>
				人正在抢>套餐
			</div>
			<div class="img">
				<img src="/static/images/home-foods1.png" alt="" />
			</div>
			
		</div>
		<div class="hot-sell">
			<h3 class="h3-2">热卖</h3>
			<p class="p-2">销量最高，好评最多</p>
			<div class="div-2">
				TOP 100 >
			</div>
			<div class="img">
				<img src="/static/images/home-foods2.png" alt="" />
			</div>
			
		</div>
	</div>
	<div class="activities">
		<div class="tejia">
			<h3>天天特价</h3>
			<span class="count">低至1折</span>
			<img src="/static/images/home-foods3.png" alt="" />
		</div>
		<div class="tejia">
			<h3>乐享鲜果</h3>
			<span >鲜果乐享7折</span>
			<img src="/static/images/home-foods4.png" alt="" />
		</div>
		<div class="tejia">
			<h3>品质优选</h3>
			<span>尖货来袭</span>
			<img src="/static/images/home-foods5.png" alt="" />
		</div>
	</div>
</div>
</template>

<script>
</script>

<style scoped>
.activity{
	width: 100%;
}
.activity .home-qiang{
	padding: 0 10px;
}
.activity .home-qiang img{
	width:100%;
	height:100px;
}
.home-hot{
	display: flex;
	padding:0 10px;
}
.home-hot .limit,.home-hot .hot-sell{
	position: relative;
	flex:1;
	padding:10px 0 0 10px;
	background: #ddd;
}
.home-hot .hot-sell{
	margin-left:10px;
	padding-right:10px;
}
.limit .h3-1{
	font-size:14px;
	font-weight: bold;
	color:#e81919;
	margin-bottom:4px;
}
.limit .p-1,.hot-sell .p-2{
	color:#777;
	font-size:12px;
	margin-bottom:8px;
}
.limit .div-1{
	font-size:12px;
	color:#333;
	font-weight:bold;
}
.limit .div-1 span{
	color:#e81919;
}
.limit .img{
	width:100%;
	height:100%;
	
}
.limit img{
	position: absolute;
	right:0;
	width:100px;
	height:80px;
}
.hot-sell .h3-2{
	font-size:14px;
	font-weight: bold;
	color:#333;
	margin-bottom:4px;
}
.hot-sell .div-2{
	font-size:12px;
	color:#af8260;
	font-weight:bold;
}
.hot-sell .img{
	width:100%;
	height:80px;
}
.hot-sell img{
	position: absolute;
	right:0;
	width:100px;
	height:80px;
}
.activities{
	display: flex;
	padding:10px;
	text-align: center;
}
.activities .tejia{
	flex:1;
	background: #ddd;
	margin-right:4px;
}
.activities h3{
	padding-top:10px;
	color:#333;
	font-weight:bold;
	font-size:14px;
}
.activities span {
	margin:10px 0;
	font-size:12px;
	border: 1px solid #bbb;
	color:#777;
}
.activities span.count{
	color: #ff5339;
    border-color: #ffa89b;
}
.activities img{
	width:80px;
	height:60px;
	margin:0 auto;
}
</style>
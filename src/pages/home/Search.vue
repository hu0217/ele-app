<template>
<div class="page subpage" id="search">
    <div class="header">
        <span @click.stop="backTo()"><</span>
        <span class="search-input">
            <img src="/static/images/search.png" alt="">
            <input v-model="txtVal" type="text" placeholder="输入商家、商品名称">
        </span>
       
        <span @click.stop="searchGoods(txtVal)">搜索</span>
    </div>
    <div class="history-search">
        <p>历史搜索</p>
    </div>
    <div class="hot-search">
        <p>热门搜索</p>
        <ul>
            <li v-for="hotWords in hotResult" @click.stop="searchGoods(hotWords)">
                {{hotWords}}
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import {getHotWord} from '../../services/home/homeService.js'
export default{
    data(){
        return{
            hotResult:[],
            txtVal:''
        }
    },
    computed: mapState(['latitude', 'longitude']),
    methods:{
        backTo(){
            this.$router.back();
        },
        getData(){
            //热门搜索词汇
            console.log('result')
			getHotWord(this.latitude, this.longitude)
			.then(result=>{
                console.log(result)
				this.hotResult = result;
			})
        },
        searchGoods(good){
            this.$router.push('/home/search/'+good);
            
            
            
        }
    },
    created(){
        this.getData();
		this.$event.$on('init-data', ()=>{
			this.getData();
		})
    }
}
</script>

<style scoped>
    #search{
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
        left: 20%;
        width:20px;
        height: 20px;
        top:13px;
    }
    .header span.search-input input{
        border:none;
        width:100%;
        height:100%;
        text-align: center;
        background:#ddd;
    }
    .history-searc,.hot-search{
        margin-top:10px;
    }
    .history-search  p,.hot-search p{
        line-height: 24px;
    }
    .hot-search li{
        font-size:16px;
        line-height: 20px;
        float: left;
        padding:0 10px;
        margin:5px;
        background:#ddd
    }
</style>
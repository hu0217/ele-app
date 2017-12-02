export default {
	/*
	 获得地址
	 参数：
	 	latitude   纬度
	 	longitude  经度
	  */
	locationUrl: '/bgs/poi/reverse_geo_coding',
	/*
	 获得天气
	 参数：
	 	latitude   纬度
	 	longitude  经度
	  */
	weatherUrl: '/bgs/weather/current',
	/*
	 获得热门搜索词汇
	 参数：
	 	latitude   纬度
	 	longitude  经度
	  */
	hotWordUrl: '/shopping/v3/hot_search_words',
	/*
	 搜索得到地址列表
	 参数：
	 	?keyword=搜索关键字
		&offset=0&limit=20 请求的长度以及位置
		&longitude=114.059563&latitude=22.54286 经纬度
	 * */
	locationListUrl: '/bgs/poi/search_poi_nearby',
	/*
	 首页轮播图
	 latitude=22.534607&longitude=113.972976 经度纬度
	 &templates[]=main_template
	 * */
	bannerUrl: '/shopping/v2/entries',
	
	/*
	 首页商家列表数据
	 ?latitude=22.54286&longitude=114.059563
	 &offset=20&limit=20
	 &extras[]=activities&extras[]=tags&extra_filters=home
	 &terminal=h5
	 * */
	homeListUrl: '/shopping/restaurants',
	/*
	 商家商品数据
	 参数restaurant_id
	 * */
	sellerMenuUrl: '/shopping/v2/menu',
	
	/*
	 商家头部数据
	 参数restaurant_id
	 * */
	sellerInfoUrl: '/shopping/restaurant',

	/**
	 * 
	 * 评价满意程度
	 */
	ratingUrl:'/ugc/v2/restaurants',
	/**
	 * 搜索结果导航部分
	 */
	searchResultUrl:'/shopping/v2/restaurants/search',
	/**
	 * 分类部分
	 */
	typeUrl:'/shopping/v2/restaurant/category',
	/*
	 筛选配送方式
	 * */
	deliverTypeUrl:'/shopping/v1/restaurants/delivery_modes',
	
	/*
	 人均消费*/
	averageUrl:'/shopping/v1/restaurants/filter/attributes/average',
	
	/*
	 优惠活动*/
	
	activitieUrl:'/shopping/v1/restaurants/activity_types',
	/*商家属性
	 */
	sellerAttrUrl:'/shopping/v1/restaurants/activity_attributes'
}

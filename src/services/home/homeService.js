import axios from 'axios'
import URL_API from '../../common/urlApi.js'
//请求地址
export function getLocation(lat, lon){
	return new Promise((resolve, reject)=>{
		
		axios.get(`${URL_API.locationUrl}?latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
//			console.log(response.data);
			const locationName = response.data.name;
			resolve(locationName);
		})
		.catch((error)=>{
//			reject();
		})
		
	});
}

//天气
export function getWeather(lat, lon){
	return new Promise((resolve, reject)=>{
		axios.get(`${URL_API.weatherUrl}?latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
//			console.log(response.data);
			resolve(response.data);
		})
	})
	
}



//热门搜索词汇
export function getHotWord(lat, lon){
	return new Promise((resolve, reject)=>{
		axios.get(`${URL_API.hotWordUrl}?latitude=${lat}&longitude=${lon}`)
		.then((response)=>{
//			console.log(response.data);
			
			let words = response.data.map(item=>{
				return item.word
			})
			
			resolve(words);
		})
	})
	
}

//export default{
//	getLocation,
//	getWeather,
//	getHotWord
//}

export function getLocationList(keyword, lat, lon){
	return new Promise((resolve, reject)=>{
		axios.get(`${URL_API.locationListUrl}?keyword=${keyword}&offset=0&limit=20&longitude=${lon}&latitude=${lat}`)
		.then(response=>{
//			console.log(response)
			let newData = response.data.map((item)=>{
				let newItem = {};
				newItem.name = item.name;
				newItem.address = item.address;
				newItem.latitude = item.latitude;
				newItem.longitude = item.longitude;
				return newItem;
			})
			resolve(newData);
		})
		
	})
}

//请求轮播图数据
export function getHomeBanner(lat, lon){
	return new Promise((resolve, reject)=>{
		//请求
		axios.get(`${URL_API.bannerUrl}?latitude=${lat}&longitude=${lon}&templates[]=main_template`)
		.then((response)=>{
//			console.log(response.data[0].entries);
			let newData = response.data[0].entries.map(item=>{
				return {
					name: item.name,
					imagePath: item.image_hash
				}
			})
			let newArr = [];
			while(newData.length > 0){
				let arr = newData.splice(0, 8);
				newArr.push(arr);
			}
			resolve(newArr);
		})
		
		
	})
}


export function getHomeList(lat, lon, offset, limit){
	return new Promise((resolve, reject)=>{
		axios.get(`${URL_API.homeListUrl}?latitude=${lat}&longitude=${lon}&offset=${offset}&limit=${limit}&extras[]=activities&extras[]=tags&extra_filters=home&terminal=h5`)
		.then(response=>{
//			console.log(response)
			let newData = response.data.map(item=>{
				let newItem = {};
				newItem.id = item.id;
				newItem.image_path = item.image_path;
				newItem.name = item.name;
				newItem.activities = item.activities;
				newItem.distance = item.distance;
				newItem.piecewise_agent_fee = item.piecewise_agent_fee;
				newItem.recommend = item.recommend;
				newItem.order_lead_time = item.order_lead_time;
				newItem.supports = item.supports;
				newItem.rating = item.rating;
				newItem.recent_order_num = item.recent_order_num;
				newItem.delivery_mode = item.delivery_mode;
						
				//使用变量记录item的展开状态
				newItem.isexpend = false;
				return newItem;
			})
			resolve(newData);
//			console.log(newData);
		})
		
	})
	
	
}

// 商家信息
export function getSellerMenu(id){
	return new Promise((resolve, reject)=>{
		axios.get(`${URL_API.sellerMenuUrl}?restaurant_id=${id}`)
		.then(response=>{
     		console.log(response.data);
			let menu = response.data.map(menuItem=>{
				let newItem = {};
				newItem.name = menuItem.name;
				newItem.icon_url = menuItem.icon_url;
				newItem.description = menuItem.description;
				newItem.foods = menuItem.foods.map(food=>{
					let newFood = {};
					newFood.name = food.name;
					newFood.image_path = food.image_path;
					newFood.description = food.description;
					newFood.month_sales = food.month_sales;
					newFood.satisfy_rate = food.satisfy_rate;
					newFood.activity = food.activity;
					newFood.item_id = food.item_id;

					newFood.specfoods = food.specfoods.map(spec=>{
						let specFoods ={};
						specFoods.food_id = spec.food_id
						specFoods.price = spec.price;
						specFoods.original_price = spec.original_price;
						specFoods.specs = spec.specs.map(sp=>{
							let spFood ={};
							spFood.value = sp.value;
							return spFood;
						});
						return specFoods;
					})

					
					return newFood;
				})
				return newItem;
			})
			resolve(menu);
		})
		
	})
}


/*商家头部信息*/
export function getSellerInfo(id){
	return new Promise((resolve, reject)=>{
		axios.get(`${URL_API.sellerInfoUrl}/${id}?extras[]=activities&extras[]=albums`)
		.then(response=>{
//			console.log(response);
				let info ={};
				info.name = response.data.name;
				info.send = response.data.delivery_mode.text;
				info.time = response.data.order_lead_time;
				info.sendprice = response.data.piecewise_agent_fee.description;
				info.notice = response.data.promotion_info;
				info.img = response.data.image_path;
				info.rating = response.data.rating;
				info.supports = response.data.sopports;
				info.phone = response.data.phone;
				info.address = response.data.address;
				info.opening_hours = response.data.opening_hours;
				if(response.data.albums){
					info.albums = response.data.albums.map(albums=>{
						let album = {};
						album.cover_image_hash = albums.cover_image_hash;
						album.name = albums.name;
						return album;
					});
				}
				
				
				info.activities = response.data.activities.map(activities=>{
					let activity = {};
					activity.description = activities.description;
					activity.icon_color = activities.icon_color;
					activity.icon_name = activities.icon_name;
					return activity;
				})

			  resolve(info);
		})
	})
}


// 评价
export function getRatingCount(id){
    return new Promise((resolve, reject)=>{
		axios.get(`${URL_API.ratingUrl}/${id}/ratings/tags`)
		.then(response=>{
			//console.log(response.data);
			resolve(response.data);
		})
	})
	
}

//综合评价
export function getTotalRating(id){
    return new Promise((resolve, reject)=>{
		axios.get(`${URL_API.ratingUrl}/${id}/ratings/scores`)
		.then(response=>{
//			console.log(response.data);
			resolve(response.data);
		})
	})
	
}

//用户评价
export function getUserRating(id,tag){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.ratingUrl}/${id}/ratings/?has_content=true&tag_name=${''||tag}&offset=0&limit=10`)
		.then(response=>{
//			console.log(response.data);
			let user=response.data.map(ratings=>{
				let userRating={};
				userRating.rating_star = ratings.rating_star;
				userRating.time_spent_desc = ratings.time_spent_desc;
				userRating.rating_text = ratings.rating_text;
				userRating.rated_at = ratings.rated_at;
				userRating.username = ratings.username;
				userRating.item_ratings = ratings.item_ratings.map(pic=>{
					let pics={};
					pics.food_name = pic.food_name;
					pics.image_hash = pic.image_hash;
					return pics;
				})
				
				
				return userRating;
			})
			resolve(user);
		})
	})
}

// 搜索结果导航部分
export function getSearchNav(lat, lon, keyword){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.searchResultUrl}?offset=0&limit=20&keyword=${keyword}%95&latitude=${lat}&longitude=${lon}&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`)
		.then(response=>{
			let searchnav ={};
			if(response.data.inside[0]){
				searchnav.multi = response.data.inside[0].filter.multi;
				searchnav.single = response.data.inside[0].filter.single;
				searchnav.foodsall = response.data.inside[0].restaurant_with_foods.map(allFoods=>{
					let all ={};
					all.allfoods = allFoods.foods.map(food=>{
						let foods ={};
						foods.activities = food.activities;
						foods.food_id = food.food_id;
						foods.image_path = food.image_path;
						foods.month_sales = food.month_sales;
						foods.name = food.name;
						foods.price = food.price;
						foods.satisfy_rate = food.satisfy_rate;
						foods.stock = food.stock;
						return foods;
					})
					all.activities = allFoods.restaurant.activities;
					all.address = allFoods.restaurant.address;
					all.description = allFoods.restaurant.description;
					all.image_path = allFoods.restaurant.image_path;
					all.name = allFoods.restaurant.name;
					all.distance = allFoods.restaurant.distance;
					all.recent_order_num = allFoods.restaurant.recent_order_num;
					all.piecewise_agent_fee = allFoods.restaurant.piecewise_agent_fee;
					all.rating = allFoods.restaurant.rating;
					all.order_lead_time = allFoods.restaurant.order_lead_time;
					return all;
				})
			}else if(response.data.inside[3]){
				searchnav.multi = response.data.inside[0].filter.multi;
				searchnav.single = response.data.inside[0].filter.single;
				searchnav.foodsall = response.data.inside[0].restaurant_with_foods.map(allFoods=>{
					let all ={};
					all.allfoods = allFoods.foods.map(food=>{
						let foods ={};
						foods.activities = food.activities;
						foods.food_id = food.food_id;
						foods.image_path = food.image_path;
						foods.month_sales = food.month_sales;
						foods.name = food.name;
						foods.price = food.price;
						foods.satisfy_rate = food.satisfy_rate;
						foods.stock = food.stock;
						return foods;
					})
					all.activities = allFoods.restaurant.activities;
					all.address = allFoods.restaurant.address;
					all.description = allFoods.restaurant.description;
					all.image_path = allFoods.restaurant.image_path;
					all.name = allFoods.restaurant.name;
					all.distance = allFoods.restaurant.distance;
					all.recent_order_num = allFoods.restaurant.recent_order_num;
					all.piecewise_agent_fee = allFoods.restaurant.piecewise_agent_fee;
					return all;
				})
			}
			resolve(searchnav);
		})
	})
}

//分类部分
export function getType(lat, lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.typeUrl}?latitude=${lat}&longitude=${lon}`)
		.then(response=>{
//			console.log(response.data);
			resolve(response.data);
		})
	})
}

//配送方式
export function getDeliverType(lat, lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.deliverTypeUrl}?latitude=${lat}&longitude=${lon}&kw=`)
		.then(response=>{
//			console.log(response.data);
			resolve(response.data);
		})
	})
}

//人均消费
export function getAverage(lat, lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.averageUrl}?latitude=${lat}&longitude=${lon}&kw=`)
		.then(response=>{
//			console.log(response.data);
			resolve(response.data);
		})
	})
}
//优惠活动
export function getActivities(lat, lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.activitieUrl}?latitude=${lat}&longitude=${lon}&kw=`)
		.then(response=>{
//			console.log(response.data);
			resolve(response.data);
		})
	})
}

//商家属性
export function getAttr(lat, lon){
	return new Promise((resolve,reject)=>{
		axios.get(`${URL_API.sellerAttrUrl}?latitude=${lat}&longitude=${lon}&kw=`)
		.then(response=>{
//			console.log(response.data);
			resolve(response.data);
		})
	})
}
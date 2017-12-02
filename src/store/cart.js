
const state = {
	list:[]
}
const actions = {
	addGoods(store, params){
//		console.log('触发了');
//		console.log(params);
		
		//查找这个商家有没有商品添加到购物车
		let isExist = false;
		store.state.list.map((seller)=>{
			if(seller.sellerId == params.sellerId){
				//该商家已经有商品添加到购物车了
				isExist = true;
				
				//将商品添加到商家对应的goods字段中去
				//判断这个商品有没有添加购物车
				let isFoodExist = false;
				seller.goods.map((good)=>{
					if(good.item_id == params.item_id){
						good.count += 1;
						isFoodExist = true;
					}
				})
				if(!isFoodExist){
					//没有，那么将商品数据push进入goods字段中去
					seller.goods.push({
						name: params.foodname,
						image: params.foodImg,
						item_id: params.item_id,
						price:params.foodPrice,
						count:1
					});
				}
			}
			
		})
		
		if(!isExist){
			//该商家从来没有商品添加到购物车
			//将这个商家的商家数据以及商品数据push到state的list中去
			//1创建商家数据
			let newSeller = {
				sellerId: params.sellerId,
				sellerName: params.sellerName,
				goods: []
			}
			//2将商品数据添加到goods中
			newSeller.goods.push({
				name: params.foodname,
				image: params.foodImg,
				item_id: params.item_id,
				price:params.foodPrice,
				count: 1
			});
			store.state.list.push(newSeller);
		}
//		console.log(store.state);
	},
	deleteGoods(store,params){
		store.state.list.map((seller,sellerIndex)=>{
			if(seller.sellerId == params.sellerId){
				seller.goods.map((good,goodIndex)=>{
					if(good.item_id == params.item_id){
						good.count -= 1;
						if(good.count<=0){
							seller.goods.splice(goodIndex,1)
						}
					}
				})
			}
			if(seller.goods.length<=0){
				store.state.list.splice(sellerIndex,1);
			}
//			console.log(seller.length)
		})
	},
	removeGoods(store,params){
		store.state.list.map((seller,sellerIndex)=>{
			if(seller.sellerId == params.sellerId){
				store.state.list.splice(sellerIndex,1);
			}
		})
	}
}


export default {
	namespaced:true,
	state,
	actions
}








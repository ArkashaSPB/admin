import {$host} from "./index.js";

export const getCityAPI = async (name) => {
	const {data} = await $host.get(`city/?name=`+ name)
	return data
}

export const getUsersAllAPI = async () => {
	const {data} = await $host.get(`users`)
	return data
}



//товары

export const getGoodsAPI = async () => {
	const {data} = await $host.get(`goods`)
	return data
}


export const addGoodsAPI = async (massive) => {
	const {data} = await $host.post(`goods`, massive)
	return data
}

export const editGoodsAPI = async (id, massive) => {
	const {data} = await $host.patch(`goods/`+id, massive)
	return data
}

export const deleteGoodsAPI = async (id) => {
	const {data} = await $host.delete(`goods/`+id)
	return data
}

//Категории

export const getCategoryAPI = async () => {
	const {data} = await $host.get(`goods/category`)
	return data
}


export const addCategoryAPI = async (massive) => {
	const {data} = await $host.post(`goods/category`, massive)
	return data
}

export const editCategoryAPI = async (id, massive) => {
	const {data} = await $host.patch(`goods/category/`+id, massive)
	return data
}

export const deleteCategoryAPI = async (id) => {
	const {data} = await $host.delete(`goods/category/`+id)
	return data
}

//страны


export const getCountryAPI = async () => {
	const {data} = await $host.get(`goods/country`)
	return data
}


export const addCountryAPI = async (massive) => {
	const {data} = await $host.post(`goods/country`, massive)
	return data
}

export const editCountryAPI = async (id, massive) => {
	const {data} = await $host.patch(`goods/country/`+id, massive)
	return data
}

export const deleteCountryAPI = async (id) => {
	const {data} = await $host.delete(`goods/country/`+id)
	return data
}

//картинки

export const uploadImgAPI = async (file) => {
	const formData = new FormData();
	formData.append('image', file); // 'image' — это имя поля, которое ожидается на сервере

	const { data } = await $host.post('upload', formData, {
		headers: {
			'Content-Type': 'multipart/form-data', // Указываем, что отправляем форму с файлом
		},
	});

	return data;
};

//заказы

export const getOrdersAPI = async () => {
	const {data} = await $host.get(`goods/order/`)
	return data
}


export const getCountNewAPI = async () => {
	const {data} = await $host.get(`goods/order/new`)
	return data
}

export const getOrderStatusAPI = async (id) => {
	const {data} = await $host.patch(`goods/order/status/`+id)
	return data
}


export const getUserOneAPI = async (id) => {
	const {data} = await $host.get(`users/`+id)
	return data
}

// настройки

export const getSettingAPI = async () => {
	const {data} = await $host.get(`setting`)
	return data
}

export const getLogAPI = async () => {
	const {data} = await $host.get(`setting/log`)
	return data
}


export const editSettingAPI = async (mas) => {
	const {data} = await $host.post(`setting`, mas)
	return data
}


export const getTronHistoryAPI = async () => {
	const {data} = await $host.get(`setting/tron`)
	return data
}


export const getOplataHistoryAPI = async () => {
	const {data} = await $host.get(`setting/oplata`)
	return data
}

export const addPromoAPI = async (mas) => {
	const {data} = await $host.post(`goods/promo`, mas)
	return data
}

export const getAllPromoAPI = async () => {
	const {data} = await $host.get(`goods/promo`)
	return data
}

export const delPromoAPI = async (id) => {
	const {data} = await $host.delete(`goods/promo/`+id)
	return data
}

export const getAllMailAPI = async () => {
	const {data} = await $host.get(`mail`)
	return data
}

export const getMailAPI = async (id) => {
	const {data} = await $host.get(`mail/`+id)
	return data
}
export const editMailAPI = async (id, mas) => {
	const {data} = await $host.put(`mail/`+id, mas)
	return data
}







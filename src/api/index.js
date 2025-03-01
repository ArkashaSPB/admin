import axios from "axios";

const url =  import.meta.env.VITE_URL;

const $host = axios.create({
	baseURL: url
})

const $authHost = axios.create(({
	baseURL: url
}))

const authInterceptor = config => {
	config.headers.Authorization = localStorage.getItem('token')
	return config
}

$authHost.interceptors.request.use(authInterceptor)
export {
	$host,
	$authHost
}
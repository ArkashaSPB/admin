import React, { useEffect, useState } from 'react';
import {addPromoAPI, getGoodsAPI} from '../api/siteAPI.js';
import {
	TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Typography
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from "react-toastify";
import AllPromo from "./promo/AllPromo.jsx";

const Promo = () => {
	const [goods, setGoods] = useState([]); // Доступные товары
	const [promoName, setPromoName] = useState(''); // Название промокода
	const [selectedProducts, setSelectedProducts] = useState([]); // Выбранные товары с ценами
	// Функция загрузки товаров с API
	const getFunc = async () => {
		try {
			const data = await getGoodsAPI();
			setGoods(data);
		} catch (error) {
			console.error('Ошибка загрузки товаров:', error);
		}
	};

	useEffect(() => {
		getFunc();
	}, []);

	// Добавление нового товара в список
	const handleAddProduct = () => {
		setSelectedProducts([...selectedProducts, { id: '', price: '', oldPrice: '', title: '' }]);
	};

	// Удаление товара из списка
	const handleRemoveProduct = (index) => {
		const updatedProducts = [...selectedProducts];
		updatedProducts.splice(index, 1);
		setSelectedProducts(updatedProducts);
	};

	// Обновление выбранного товара
	const handleProductChange = (index, field, value) => {
		const updatedProducts = [...selectedProducts];
		updatedProducts[index][field] = value;
		setSelectedProducts(updatedProducts);
	};



	const handleSubmit = () => {
		const promoData = {
			name: promoName,
			product: selectedProducts.filter(p => p.id && p.price) // Исключаем пустые записи
		};
		addPromoAPI(promoData).then(data => {
			if(data.success){
				toast.success(data.message);
				getFunc();
			}else{
				toast.error(data.message);
			}
		})
		console.log('Созданный промокод:', promoData);
	};

	// Фильтрация товаров: исключаем уже выбранные
	const availableGoods = goods.filter(
		(product) => !selectedProducts.some((item) => item.id === product.id)
	);
	return (
		<Box sx={{ p: 3, maxWidth: 700, mx: 'auto' }}>
			<Typography variant="h5" gutterBottom>
				<LocalOfferIcon /> Создать промокод
			</Typography>
			{/* Поле для ввода названия промокода */}
			<TextField
				fullWidth
				label="Название промокода"
				variant="outlined"
				value={promoName}
				onChange={(e) => setPromoName(e.target.value)}
				sx={{ mb: 2 }}
			/>

			{/* Список выбранных товаров */}
			{selectedProducts.map((item, index) => (
				<Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
					{/* Выпадающий список товаров */}

					{item.id ? <Box sx={{flexGrow:1}}> id:{item.id},  {item.title}, oldPrice: {item.oldPrice}$ </Box> :
						<FormControl fullWidth>
							<InputLabel>Выберите товар</InputLabel>
							<Select
								value={item.id}
								onChange={(e) => {
									const selectedProduct = goods.find(product => product.id === e.target.value);
									handleProductChange(index, 'id', selectedProduct.id);
									handleProductChange(index, 'title', selectedProduct.title);
									handleProductChange(index, 'oldPrice', selectedProduct.price);
								}}
							>
								{availableGoods.map((product) => (
									<MenuItem key={product.id} value={product.id}>
										{product.title}:{product.price}$
									</MenuItem>
								))}
							</Select>
						</FormControl>
					}
					{/* Поле для ввода цены */}
					<TextField
						label="Цена"
						variant="outlined"
						value={item.price}
						onChange={(e) => handleProductChange(index, 'price', e.target.value)}
						sx={{ width: '100px' }}
					/>

					{/* Кнопка удаления товара */}
					<Button color="error" onClick={() => handleRemoveProduct(index)}>
						<DeleteIcon />
					</Button>
				</Box>
			))}

			{/* Кнопка добавления нового товара */}
			<Button variant="contained" startIcon={<AddIcon />} onClick={handleAddProduct} sx={{ mb: 2 }}
							disabled={availableGoods.length === 0} // Отключаем кнопку, если больше нет доступных товаров
			>
				Добавить товар
			</Button>

			{/* Кнопка отправки */}
			<Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
				Создать промокод
			</Button>
			<AllPromo/>
		</Box>
	);
};

export default Promo;

import React, {useEffect, useState} from 'react';
import {addGoodsAPI, deleteGoodsAPI, editGoodsAPI, getCategoryAPI, getCountryAPI, getGoodsAPI} from "../api/siteAPI.js";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle, IconButton, List, ListItem, MenuItem,
	Paper, Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow, TextField,
	Typography
} from "@mui/material";
import Country from "./goods/Country.jsx";
import CategoryModal from "./goods/CategoryModal.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import {toast} from "react-toastify";

const Goods = () => {

	const [goods, setGoods] = useState([])
	const [massive, setMassive] = useState([])
	const [countryView, setCountryView] = useState(false)
	const [categoryView, setCategoryView] = useState(false)


	const [editId, setEditId] = useState(null)
	const [massiveEdit, setMassiveEdit] = useState({})

	const [country, setCountry] = useState([])
	const [category, setCategory] = useState([])


	const getFunc = () => {
		getGoodsAPI().then(data => {
			setGoods(data)
		})
	}

	const getCountryFunc = () => {
		getCountryAPI().then(data => {
			setCountry(data)
		})
	}

	const getCategoryFunc = () => {
		getCategoryAPI().then(data => {
			setCategory(data)
		})
	}

 	useEffect(() => {
		getFunc()
		getCountryFunc()
		getCategoryFunc()
	}, [])


	// Обработчик изменения значения в массиве massive
	const handleChange = (index, field, value) => {
		const newMassive = [...massive];
		newMassive[index][field] = value;
		setMassive(newMassive);
	};

	// Добавить новый элемент в массив massive
	const addNewItem = () => {
		setMassive([...massive, {title: '', price: '', priceBefore: '', country: country[0].kod || '', category: category[0].kod || '', available: '' }]);
	};


	const removeItem = (index) => {
		const newMassive = massive.filter((_, i) => i !== index);
		setMassive(newMassive);
	};

	const addGoods = () => {
		const filteredMassive = massive.filter(item => item.name && item.kod);
		setMassive(filteredMassive);

		if(massive.length > 0) {
			addGoodsAPI(massive).then(data => {
				toast.success(data)
				setMassive([])
				getFunc()
			}).catch(() => {
				toast.error("Ошибка при добавлении")
			})
		}

	}


	const editGood = () => {
		editGoodsAPI(editId, massiveEdit).then(data => {
			getFunc()
			toast.success(data)
			setEditId(null)
		}).catch(()=> {
			toast.error('Не получилось изменить')
		})
	}

	const removeGood = (id) => {

		deleteGoodsAPI(id).then(data => {
			getFunc()
			toast.success(data)
		}).catch(() => {
			toast.error('Не удалилось')
		})
	}


	return (
		<div>
			<Box sx={{
				display: 'flex',
				gap: '1rem',
				marginY: '1rem',
			}}>
				<Button variant="contained"  color="warning" onClick={()=>setCountryView(true) }>Страны</Button>
				<Button variant="contained"  color="success" onClick={()=>setCategoryView(true) }>Категории</Button>
			</Box>
			<Typography variant="h4" sx={{marginY : 3}} >Товары</Typography>
			<TableContainer component={Paper} >
			<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Название</TableCell>
							<TableCell>Категория</TableCell>
							<TableCell>Страна</TableCell>
							<TableCell>Цена</TableCell>
							<TableCell>Цена до</TableCell>

							<TableCell>Остаток</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{goods.map((row) => (
							<TableRow key={row.id}>
								<TableCell>{row.id}</TableCell>
								<TableCell>{editId === row.id ?
									<TextField
										label="Название"
										variant="standard"
										value={massiveEdit.title}
										onChange={(e) => setMassiveEdit({...massiveEdit, title: e.target.value})}
									/>
									:
									row.title
								}</TableCell>


								<TableCell>
									{editId === row.id ?
									<Select
										label="Категория"
										variant="standard"
										value={massiveEdit.category || category[0]?.kod} // Значение по умолчанию
										onChange={(e) => setMassiveEdit({...massiveEdit, category: e.target.value})}
									>
										{category.map((option) => (
											<MenuItem key={option.kod} value={option.kod}>
												{option.name}
											</MenuItem>
										))}
									</Select>
										: category.find((c) => c.kod === row.category)?.name || ''}
								</TableCell>

								<TableCell>
									{editId === row.id ?
										<Select
											label="Категория"
											variant="standard"
											value={massiveEdit.country || category[0]?.kod} // Значение по умолчанию
											onChange={(e) => setMassiveEdit({...massiveEdit, country: e.target.value})}
										>
											{country.map((option) => (
												<MenuItem key={option.kod} value={option.kod}>
													{option.name}
												</MenuItem>
											))}
										</Select>
										: country.find((c) => c.kod === row.country)?.name || ''}
								</TableCell>


								<TableCell>{editId === row.id ?
									<TextField
										type="number"
										label="Цена"
										variant="standard"
										value={massiveEdit.price}
										onChange={(e) => setMassiveEdit({...massiveEdit, price: e.target.value})}
									/>
									:
									row.price
								}</TableCell>


								<TableCell>{editId === row.id ?
									<TextField
										type="number"
										label="Цена"
										variant="standard"
										value={massiveEdit.priceBefore}
										onChange={(e) => setMassiveEdit({...massiveEdit, priceBefore: e.target.value})}
									/>
									:
									row.priceBefore
								}</TableCell>

								<TableCell>{editId === row.id ?
									<TextField
										type="number"
										label="Остаток"
										variant="standard"
										value={massiveEdit.available}
										onChange={(e) => setMassiveEdit({...massiveEdit, available: e.target.value})}
									/>
									:
									row.available
								}</TableCell>

								<TableCell>
									<Box
										sx={{
											display: "flex",
											gap:1
										}}
									>
										{editId === row.id ?
											<IconButton  onClick={() => editGood()}
											>
												<CheckIcon color="success" />
											</IconButton>
											:
											<IconButton  onClick={() => {
												setEditId(row.id)
												setMassiveEdit({
													title: row.title, price: row.price, priceBefore: row.priceBefore, country: row.country, category: row.category, available: row.available })
											}}
											>
												<EditIcon color="warning" />
											</IconButton>
										}


										<IconButton edge="end" onClick={() => {
											removeGood(row.id)
										}}>
											<DeleteIcon color="error" />
										</IconButton>
									</Box>

								</TableCell>


							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Box sx={{ background: '#eee', padding: 2 }}>
				<Typography component="h3" variant="h5">Создание списка для добавления</Typography>
				{massive.map((item, index) => (
					<List key={index}>
						<ListItem>

							<Box
								sx={{
									display: "flex", justifyContent: "space-between", alignItems: "bottom", gap: "1rem",
								}}
							>
								<TextField
									label="Название"
									variant="standard"
									value={item.title}
									onChange={(e) => handleChange(index, 'title', e.target.value)}
								/>

								<Select
									label="Категория"
									variant="standard"
									value={item.category || category[0]?.kod} // Значение по умолчанию
									onChange={(e) => handleChange(index, 'category', e.target.value)}
								>
									{category.map((option) => (
										<MenuItem key={option.kod} value={option.kod}>
											{option.name}
										</MenuItem>
									))}
								</Select>

								<Select
									label="Страна"
									variant="standard"
									value={item.country || country[0]?.kod} // Значение по умолчанию
									onChange={(e) => handleChange(index, 'country', e.target.value)}
								>
									{country.map((option) => (
										<MenuItem key={option.kod} value={option.kod}>
											{option.name}
										</MenuItem>
									))}
								</Select>



								<TextField
									type="number"
									label="Цена"
									variant="standard"
									value={item.price}
									onChange={(e) => handleChange(index, 'price', e.target.value)}
								/>

								<TextField
									type="number"
									label="Цена до"
									variant="standard"
									value={item.priceBefore}
									onChange={(e) => handleChange(index, 'priceBefore', e.target.value)}
								/>

								<TextField
									type="number"
									label="Остаток"
									variant="standard"
									value={item.available}
									onChange={(e) => handleChange(index, 'available', e.target.value)}
								/>
								<IconButton edge="end" onClick={() => removeItem(index)}>
									<DeleteIcon color="error" />
								</IconButton>
							</Box>
						</ListItem>
					</List>
				))}

				<Box sx={{ display: 'flex', gap: 3 }}>
					<Button variant="outlined" onClick={addNewItem} sx={{ marginTop: 2 }}>
						Добавить элемент
					</Button>
					<Button disabled={massive.length === 0} variant="contained" color="primary" onClick={addGoods} sx={{ marginTop: 2 }}>
						Обновить на сервере
					</Button>
				</Box>
			</Box>

			{countryView ?
					<Country open={countryView} setOpen={setCountryView} country = {country} getFunc={getCountryFunc}/>
				: null
			}

			{categoryView ?
				<CategoryModal open={categoryView} setOpen={setCategoryView} category = {category} getFunc={getCategoryFunc}/>
				: null
			}


		</div>
	);
};

export default Goods;
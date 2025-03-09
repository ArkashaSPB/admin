import React, {useEffect, useState} from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	List,
	ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
	TextField,
	Typography
} from "@mui/material";
import {addCountryAPI, deleteCountryAPI, editCountryAPI, getCountryAPI, getGoodsAPI} from "../../api/siteAPI.js";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import useSnackbar from "../../hooks/useSnackbar.js";
import {toast} from "react-toastify";
import UploadImg from "../../component/UploadImg.jsx";
const url =  import.meta.env.VITE_IMG;


const Country = ({open, setOpen, country,  getFunc, getGoods}) => {
	const [massive, setMassive] = useState([])
	const [editId, setEditId] = useState(null)

	const [massiveEdit, setMassiveEdit] = useState(null)

	// Обработчик изменения значения в массиве massive
	const handleChange = (field, value, index) => {
		const newMassive = [...massive];
		newMassive[index][field] = value;
		setMassive(newMassive);
	};

	// Добавить новый элемент в массив massive
	const addNewItem = () => {
		setMassive([...massive, { name: '', kod: '', img: ''  }]);
	};


	const removeItem = (index) => {
		const newMassive = massive.filter((_, i) => i !== index);
		setMassive(newMassive);
	};

	const removeServer = (id) => {
		deleteCountryAPI(id).then(data => {
			getFunc()
			toast.success(data)
		}).catch(data => {
			toast.error(data)
		})
	};

	const addCountry = () => {
		const filteredMassive = massive.filter(item => item.name && item.kod);
		setMassive(filteredMassive);

		if(massive.length > 0){
			addCountryAPI(massive).then(data => {
				toast.success(data)
				setMassive([])
				getFunc()
			}).catch(() => {
				toast.error("Ошибка, либо дубли")
			})
		}
	}

	const editCountry = () => {
		editCountryAPI(editId, massiveEdit).then(data => {
			getFunc()
			toast.success(data)
			setEditId(null)
			setMassiveEdit({name: '', kod: ''})
			getGoods()
		}).catch(()=>{
			toast.error("Ошибка в изменении")
		})

	}

	const editMassiveFunc = (name, value) => {
		setMassiveEdit({ ...massiveEdit, [name]: value });
	};


	return (

		<Dialog open={open} onClose={()=>setOpen(false)}>
			<DialogTitle>Страны</DialogTitle>
			<DialogContent>
				<TableContainer component={Paper} >
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								{/*<TableCell>Картинка</TableCell>*/}
								<TableCell>Название</TableCell>
								<TableCell>Код</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{country.map((row) => (
								<TableRow key={row.id}>

									<TableCell>{row.id}</TableCell>
									{/*<TableCell>*/}
									{/*	{editId === row.id ?*/}
									{/*		<UploadImg handleChange = {editMassiveFunc} img={row.img} />*/}
									{/*		:*/}
									{/*		<>{row.img ? <img style={{*/}
									{/*			height: 30,*/}
									{/*		}} src={url+row.img} alt="" /> : "no"}</>*/}
									{/*	}*/}
									{/*</TableCell>*/}
									<TableCell>
										{editId === row.id ?
											<TextField
												label="Название"
												variant="standard"
												value={massiveEdit.name}
												onChange={(e) => editMassiveFunc('name', e.target.value)}
											/>
											:
											row.name
										}
										</TableCell>
									<TableCell>
										{editId === row.id ?
										<TextField
											label="Код"
											variant="standard"
											value={massiveEdit.kod}
											onChange={(e) => editMassiveFunc('kod', e.target.value)}
										/>
										:
										row.kod
									}</TableCell>
									<TableCell>
									<Box
										sx={{
											display: "flex",
											gap:1
										}}
									>
										{editId === row.id ?
											<IconButton  onClick={() => editCountry()}
											>
												<CheckIcon color="success" />
											</IconButton>
											:
											<IconButton  onClick={() => {
												setEditId(row.id)
												setMassiveEdit({name: row.name, kod: row.kod})
											}}
											>
												<EditIcon color="warning" />
											</IconButton>
										}


										<IconButton edge="end" onClick={() => {
											removeServer(row.id)
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
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										gap: "1rem",
									}}
								>
									{/*<UploadImg handleChange = {handleChange} index = {index} />*/}
									<TextField
										label="Название"
										variant="standard"
										value={item.name}
										onChange={(e) => handleChange('name', e.target.value, index)}
									/>
									<TextField
										label="Код"
										variant="standard"
										value={item.kod}
										onChange={(e) => handleChange('kod', e.target.value,index)}
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

						<Button disabled={massive.length === 0} variant="contained" color="primary" onClick={addCountry} sx={{ marginTop: 2 }}>
							Обновить на сервере
						</Button>
					</Box>
				</Box>




			</DialogContent>
		</Dialog>
	);
};

export default Country;
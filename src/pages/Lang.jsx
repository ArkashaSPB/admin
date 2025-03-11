import React, { useEffect, useState } from 'react';
import {
	addColumnLangAPI,
	addLangAPI,
	delColumnLangAPI,
	delLangAPI,
	editLangAPI,
	getAllLangAPI
} from "../api/siteAPI.js";
import { toast } from "react-toastify";
import {
	Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField, Typography, Box
} from "@mui/material";

const Lang = () => {
	const [allLang, setAllLang] = useState([]);
	const [selectedLang, setSelectedLang] = useState(null);
	const [newNameLang, setNewNameLang] = useState('');
	const [newColumnName, setNewColumnName] = useState('');
	const [massiveEdit, setMassiveEdit] = useState({});
	const [openAddLangModal, setOpenAddLangModal] = useState(false);
	const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
	const [editId, setEditId] = useState(0);


	const getAllLangFunc = () => {
		getAllLangAPI().then(data => setAllLang(data));
	}

	useEffect(() => {
		getAllLangFunc()
	}, []);

	const handleLangSelect = (event) => {
		const lang = allLang.find(item => item.lang === event.target.value);
		setSelectedLang(lang);
		setMassiveEdit({ ...lang });
		setEditId(lang?.id || 0);
	};

	const handleInputChange = (field, value) => {
		setMassiveEdit(prev => ({ ...prev, [field]: value }));
	};

	const handleAddLang = () => {
		addLangAPI({ lang: newNameLang }).then(data => {
			toast.success(data.message);
			setOpenAddLangModal(false);
			getAllLangFunc()
		});
	};

	const handleUpdateLang = () => {
		editLangAPI(editId, massiveEdit).then(data => {
			toast.success(data.message);
			getAllLangFunc()
			setEditId(0)
			setSelectedLang(null)
		});
	};

	const handleDeleteLang = () => {
		delLangAPI(editId).then(data => {
			toast.success(data.message);
			setSelectedLang(null);
			setMassiveEdit({});
			getAllLangFunc()
			setOpenConfirmDelete(false);
		});
	};

	const handleAddColumn = () => {
		addColumnLangAPI({name: newColumnName}).then(data => {
			toast.success(data.message);
			getAllLangFunc()
		});
	};

	const handleDeleteColumn = (field) => {
		delColumnLangAPI(field).then(data => {
			toast.success(data.message);
			getAllLangFunc()
		});
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h6">Выберите язык</Typography>
			<Select value={selectedLang?.lang || ''} onChange={handleLangSelect} fullWidth>
				{allLang.map(lang => (
					<MenuItem key={lang.id} value={lang.lang}>{lang.lang}</MenuItem>
				))}
			</Select>

			{selectedLang && (
				<Box sx={{ mt: 3 }}>
					{Object.entries(massiveEdit).map(([key, value]) => (
						key !== 'id' && key !== 'lang' && (
							<Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
								<TextField variant="standard" fullWidth label={key} value={value ? value : ''} onChange={(e) => handleInputChange(key, e.target.value)} />
								<Button color="error" onClick={() => handleDeleteColumn(key)}>Удалить</Button>
							</Box>
						)
					))}



					<Button onClick={handleUpdateLang} variant="contained" sx={{ mt: 2 }}>Сохранить</Button>
					<Button onClick={() => setOpenConfirmDelete(true)} color="error" sx={{ mt: 2, ml: 2 }}>Удалить</Button>
				</Box>
			)}

			{editId === 0 &&
				<>

					<Box sx={{my: 4, backgroundColor: '#d5e7d5', p:2}}>
						<Box component="p">Это поле для расширений</Box>
						<Box sx={{  display: 'flex', alignItems: 'center' }}>
							<TextField variant="standard" fullWidth label={'Новое поле'} value={newColumnName} onChange={(e) => setNewColumnName(e.target.value)} />
							<Button color="success" variant="contained" onClick={handleAddColumn}>Добавить</Button>

						</Box>
					</Box>

					<Button onClick={() => setOpenAddLangModal(true)} variant="contained" sx={{ mt: 3 }}>Добавить язык</Button>

				</>
			}




			<Dialog open={openAddLangModal} onClose={() => setOpenAddLangModal(false)}>
				<DialogTitle>Добавить язык</DialogTitle>
				<DialogContent>
					<TextField fullWidth  label="Название языка" value={newNameLang} onChange={(e) => setNewNameLang(e.target.value)} />
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenAddLangModal(false)}>Отмена</Button>
					<Button onClick={handleAddLang} variant="contained">Добавить</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)}>
				<DialogTitle>Вы уверены, что хотите удалить язык?</DialogTitle>
				<DialogActions>
					<Button onClick={() => setOpenConfirmDelete(false)}>Отмена</Button>
					<Button onClick={handleDeleteLang} color="error">Удалить</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default Lang;
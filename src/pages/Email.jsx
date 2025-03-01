import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

import { getAllMailAPI, getMailAPI, editMailAPI } from "../api/siteAPI.js"; // Фейковые API

const Email = () => {
	const [emails, setEmails] = useState([]); // Список писем
	const [selectedEmail, setSelectedEmail] = useState(null); // Выбранное письмо для редактирования
	const [open, setOpen] = useState(false); // Управление модальным окном
	const [loading, setLoading] = useState(false); // Лоадер

	useEffect(() => {
		fetchEmails();
	}, []);

	// 📩 Получение всех писем
	const fetchEmails = async () => {
		try {
			const data = await getAllMailAPI();
			setEmails(data);
		} catch (error) {
			console.error("Ошибка загрузки писем:", error);
		}
	};

	// 🔍 Открытие модального окна для редактирования письма
	const handleOpen = async (id) => {
		setLoading(true);
		try {
			const email = await getMailAPI(id);
			setSelectedEmail(email);
			setOpen(true);
		} catch (error) {
			console.error("Ошибка получения письма:", error);
		}
		setLoading(false);
	};

	// 📝 Изменение полей письма
	const handleChange = (field, value) => {
		setSelectedEmail((prev) => ({ ...prev, [field]: value }));
	};

	// 💾 Сохранение письма
	const handleSave = async () => {
		try {
			await editMailAPI(selectedEmail.id, {
				name: selectedEmail.name,
				subject: selectedEmail.subject,
				text: selectedEmail.text, // HTML-содержимое
			});
			setOpen(false);
			fetchEmails(); // Обновляем список после редактирования
		} catch (error) {
			console.error("Ошибка при сохранении письма:", error);
		}
	};

	return (
		<Box sx={{ padding: 3 }}>
			<Typography variant="h4" sx={{ mb: 2 }}>
				Шаблоны письма
			</Typography>

			{/* 📩 Таблица с письмами */}
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>id</TableCell>
							<TableCell>Название</TableCell>
							<TableCell>Тема</TableCell>
							<TableCell>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{emails.map((email) => (
							<TableRow key={email.id}>
								<TableCell>{email.id}</TableCell>
								<TableCell>{email.name}</TableCell>
								<TableCell>{email.subject}</TableCell>
								<TableCell>
									<Button variant="contained" size="small" onClick={() => handleOpen(email.id)}>
										Редактировать
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* ✏️ Модальное окно для редактирования */}
			<Modal open={open} onClose={() => setOpen(false)}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "600px",
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
					}}
				>
					<Typography variant="h6" sx={{ mb: 2 }}>
						Редактирование письма
					</Typography>

					<TextField
						fullWidth
						label="Название"
						variant="outlined"
						sx={{ mb: 2 }}
						value={selectedEmail?.name || ""}
						onChange={(e) => handleChange("name", e.target.value)}
					/>

					<TextField
						fullWidth
						label="Тема"
						variant="outlined"
						sx={{ mb: 2 }}
						value={selectedEmail?.subject || ""}
						onChange={(e) => handleChange("subject", e.target.value)}
					/>

					{/* 🔥 ReactQuill для HTML-редактирования текста письма */}
					<Typography variant="subtitle1">Текст письма:</Typography>

					<TextField
						label="Текст письма"
						multiline
						rows={6} // Количество строк
						fullWidth
						variant="outlined"
						value={selectedEmail?.text || ""}
						onChange={(e) => handleChange("text", e.target.value)}
						sx={{ mt: 2 }}
					/>


					{/* Кнопки */}
					<Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
						<Button variant="outlined" onClick={() => setOpen(false)}>
							Закрыть
						</Button>
						<Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
							{loading ? "Сохранение..." : "Сохранить"}
						</Button>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
};

export default Email;

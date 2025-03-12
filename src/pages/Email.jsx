import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

import { getAllMailAPI, getMailAPI, editMailAPI } from "../api/siteAPI.js";
import ModalEmail from "./email/ModalEmail.jsx";
import LangEmail from "./email/LangEmail.jsx"; // Фейковые API

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


	// 💾 Сохранение письма
	const handleSave = async () => {
		try {
			await editMailAPI(selectedEmail.id, {selectedEmail});
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

			<h2>Языки</h2>

			<LangEmail/>

			<ModalEmail	open={open} setOpen={setOpen}
									 selectedEmail={selectedEmail} setSelectedEmail={setSelectedEmail}
									 handleSave={handleSave}
			></ModalEmail>
		</Box>
	);
};

export default Email;

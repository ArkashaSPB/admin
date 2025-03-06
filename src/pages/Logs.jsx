import React, { useEffect, useState } from 'react';
import { getLogAPI } from "../api/siteAPI.js";
import {
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper
} from "@mui/material";
import { AccessTime, EventNote } from '@mui/icons-material';

const Logs = () => {
	const [logs, setLogs] = useState([]);

	useEffect(() => {
		getLogAPI().then(data => setLogs(data));
	}, []);

	// Функция для форматирования даты
	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
		return new Date(dateString).toLocaleDateString("ru-RU", options);
	};

	return (
		<Box sx={{  margin: "auto", padding: 2 }}>
			<Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
				История сайта
			</Typography>

			<TableContainer component={Paper} sx={{ borderRadius: 2, overflow: "hidden" }}>
				<Table>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#f4f4f4" }}>
							<TableCell sx={{ fontWeight: "bold" }}>Тип</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Описание</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Дата</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{logs.length > 0 ? (
							logs.map((log) => (
								<TableRow key={log.id}>
									<TableCell>
										<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
											{/*<EventNote color="primary" />*/}
											<Typography variant="body1">{log.name}</Typography>
										</Box>
									</TableCell>
									<TableCell>{log.text}</TableCell>
									<TableCell>
										<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
											<AccessTime color="action" />
											<Typography variant="body2">{formatDate(log.date)}</Typography>
										</Box>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={3} align="center">
									<Typography variant="body1" sx={{ color: "gray" }}>
										Логов пока нет
									</Typography>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Logs;

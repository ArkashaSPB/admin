import React, {useEffect, useState} from 'react';
import {getOplataHistoryAPI} from "../api/siteAPI.js";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const OplataHistory = () => {
	const [history, setHistory] = useState([]);
	// Функция для получения истории
	const getFunc = () => {
		getOplataHistoryAPI().then(data => {
			setHistory(data);
		});
	};

	useEffect(() => {
		getFunc(); // Загружаем данные при первом рендере
	}, []);

	return (
		<div>
			<div style={{ padding: '20px'}}>
				<div >
					<TableContainer component={Paper} >
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Сумма</TableCell>
									<TableCell>Заказ</TableCell>
									<TableCell>Статус</TableCell>
									<TableCell>Дата</TableCell>
									<TableCell>id  Транзакции</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{history && history.map((transaction) => (
									<TableRow key={transaction.id}>
										<TableCell>{transaction.id}</TableCell>
										<TableCell>$ {transaction.summa}</TableCell>
										<TableCell>{transaction.orderId}</TableCell>
										<TableCell>{transaction.status === 1 ?  'Выполнен': 'В процессе'}</TableCell>
										<TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
										<TableCell>{transaction.trid}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			</div>
		</div>

	);
};

export default OplataHistory;
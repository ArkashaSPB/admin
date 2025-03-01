import React, { useEffect, useState } from 'react';
import { getTronHistoryAPI } from "../api/siteAPI.js"; // Импорт функции для получения данных
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box} from '@mui/material';

const TronHistory = () => {
	const [history, setHistory] = useState([]);

	// Функция для получения истории
	const getFunc = () => {
		getTronHistoryAPI().then((data) => {
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
									<TableCell>Transaction ID</TableCell>
									<TableCell>From</TableCell>
									<TableCell>To</TableCell>
									<TableCell>Amount (USDT)</TableCell>
									<TableCell>Date</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{history && history.map((transaction) => (
									<TableRow key={transaction.transaction_id}>
										<TableCell>{transaction.transaction_id}</TableCell>
										<TableCell>{transaction.from}</TableCell>
										<TableCell>{transaction.to}</TableCell>
										<TableCell>{transaction.value / 1000000}</TableCell>
										<TableCell>{new Date(transaction.block_timestamp).toLocaleString()}</TableCell>
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

export default TronHistory;

import React, { useEffect, useState } from 'react';
import { getOrdersAPI, getOrderStatusAPI } from '../api/siteAPI.js';
import {
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Collapse,
	Button,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const url = import.meta.env.VITE_IMG;

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [ordersStatus0, setOrdersStatus0] = useState([]);
	const [ordersStatus1, setOrdersStatus1] = useState([]);

	const getOrders = () => {
		getOrdersAPI().then((data) => {
			setOrders(data);
			// Фильтруем заказы по статусам
			setOrdersStatus0(data.filter(order => order.status === 0));
			setOrdersStatus1(data.filter(order => order.status === 1));
		});
	};

	console.log(orders)


	useEffect(() => {
		getOrders();
	}, []);

	return (
		<Box p={4}>
			<Typography variant="h4" gutterBottom>
				Заказы
			</Typography>

			{/* Таблица для заказов с статусом 0 */}
			<Typography variant="h5" gutterBottom>
				В процессе
			</Typography>
			<TableContainer component={Paper} sx={{ mb: 4 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>ID</TableCell>
							<TableCell>id: user</TableCell>
							<TableCell>Почта</TableCell>
							<TableCell>Цена</TableCell>
							<TableCell>Количество</TableCell>
							<TableCell>Дата</TableCell>
							<TableCell>Оплата</TableCell>
							<TableCell>Статус</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ordersStatus0.map((order) => (
							<OrderRow key={order.id} order={order} getOrders={getOrders} />
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Таблица для заказов с статусом 2 */}
			<Typography variant="h5" gutterBottom>
				Выполненные
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>ID</TableCell>
							<TableCell>id: user</TableCell>
							<TableCell>Почта</TableCell>
							<TableCell>Цена</TableCell>
							<TableCell>Количество</TableCell>
							<TableCell>Дата</TableCell>
							<TableCell>Оплата</TableCell>
							<TableCell>Статус</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ordersStatus1.map((order) => (
							<OrderRow key={order.id} order={order} getOrders={getOrders} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

const OrderRow = ({ order, getOrders }) => {
	const [open, setOpen] = useState(false);
	const statusFunc = (id) => {
		getOrderStatusAPI(id).then(() => {
			getOrders(); // Обновляем заказы после изменения статуса
		});
	};

	return (
		<>
			<TableRow>
				<TableCell>
					<IconButton size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell>{order.id}</TableCell>
				<TableCell>{order.user} - {order.name}</TableCell>
				<TableCell>{order.mail}</TableCell>
				<TableCell>$ {order.price}</TableCell>
				<TableCell>{order.count}</TableCell>
				<TableCell>{new Date(order.date).toLocaleString()}</TableCell>
				<TableCell>{order.oplata ? 'Да' : 'Нет'}</TableCell>
				<TableCell>
					{order.status === 0 ? (
						<Button variant="outlined" color="warning" onClick={() => statusFunc(order.id)}>
							В процессе
						</Button>
					) : (
						<Button variant="contained" onClick={() => statusFunc(order.id)}>
							Выполнен
						</Button>
					)}
				</TableCell>

			</TableRow>

			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>


							{order.payment && (
								<Box sx={{ mb: 2, p: 2, border: "1px solid gray", borderRadius: 2 }}>
									<Typography variant="h6">Оплата</Typography>
									<Typography>Сумма: ${order.payment.summa}</Typography>
									<Typography>Дата: {new Date(order.payment.date).toLocaleString()}</Typography>
									<Typography>Статус: {order.payment.status === 1 ? "Оплачено" : "Не оплачено"}</Typography>
									<Typography>id транзакции: {order.payment.trid }</Typography>

								</Box>
							)}

							<Typography variant="h6" gutterBottom component="div">
								Товары
							</Typography>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell>Название</TableCell>
										<TableCell>Категория</TableCell>
										<TableCell>Страна</TableCell>
										<TableCell>Цена</TableCell>
										<TableCell>Количество</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{order.items.map((item) => (
										<TableRow key={item.id}>
											<TableCell>{item.title}</TableCell>
											<TableCell>{item.catName}</TableCell>
											<TableCell>{item.countryName}</TableCell>
											<TableCell>${item.price}</TableCell>
											<TableCell>{item.count}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>


		</>
	);
};

export default Orders;

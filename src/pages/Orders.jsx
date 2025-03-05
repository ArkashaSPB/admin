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
	Collapse,
	Button,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CheckCircle, HourglassEmpty } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import {formatDate} from "../component/dateF.js";


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
							<TableCell>OID</TableCell>
							<TableCell>UID</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Итого</TableCell>
							<TableCell>ODate</TableCell>
							<TableCell>FDate</TableCell>
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
							<TableCell>OID</TableCell>
							<TableCell>UID</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Итого</TableCell>
							<TableCell>ODate</TableCell>
							<TableCell>FDate</TableCell>
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
				<TableCell>{order.user} </TableCell>
				<TableCell>{order.mail}</TableCell>
				<TableCell>$ {order.price}</TableCell>
				{/*<TableCell>{order.count}</TableCell>*/}
				<TableCell>{formatDate(order.date)}</TableCell>
				<TableCell>{order.payment && order.payment.dateCheck && formatDate(order.payment.dateCheck)}</TableCell>
				{/*<TableCell>{order.oplata ? 'Да' : 'Нет'}</TableCell>*/}
					{order.status === 0 ? (
						<TableCell>
						<IconButton  variant="outlined" color="warning" onClick={() => statusFunc(order.id)}>
							<CheckCircle color="warning" size={20} />
						</IconButton>
						</TableCell>
					) :

						<TableCell>
							<IconButton  variant="outlined" color="warning" onClick={() => statusFunc(order.id)}>
								<CheckCircle color="success" size={20} />
							</IconButton>
						</TableCell>
					}


			</TableRow>

			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>
							{order.payment && (
								<Box sx={{ mb: 2, p: 2, border: "1px solid gray", borderRadius: 2 }}>
									<Typography variant="h6">Оплата</Typography>
									{/*<Typography>Сумма: ${order.payment.summa}</Typography>*/}
									<Typography>PDate: {formatDate(order.payment.date)}</Typography>
									<Typography>BDate: {formatDate(order.payment.dateCheck)}</Typography>
									{/*<Typography>Статус: {order.payment.status === 1 ? "Оплачено" : "Не оплачено"}</Typography>*/}
									<Typography>TID: {order.payment.trid }</Typography>
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
										<TableCell>Количество</TableCell>
										<TableCell>Цена за шт</TableCell>

									</TableRow>
								</TableHead>
								<TableBody>
									{order.items.map((item) => (
										<TableRow key={item.id}>
											<TableCell>{item.title}</TableCell>
											<TableCell>{item.catName}</TableCell>
											<TableCell>{item.countryName}</TableCell>
											<TableCell>{item.count}</TableCell>
											<TableCell>${item.price}</TableCell>

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

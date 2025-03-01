import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserOneAPI } from '../api/siteAPI.js';
import { Container, Card, CardContent, Typography, Box, List, ListItem, ListItemText, CardMedia, IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const url =  import.meta.env.VITE_IMG;

const User = () => {
	const { id } = useParams();
	const [user, setUser] = useState(null);
	const [orders, setOrders] = useState([]);

	// Состояние для каждого заказа (сворачивание)
	const [expandedOrders, setExpandedOrders] = useState({});

	const getUserFunc = () => {
		getUserOneAPI(id).then(data => {
			if (data.user.id) {
				setUser(data.user);
				setOrders(data.orders);
			}
		});
	};

	useEffect(() => {
		getUserFunc();
	}, [id]);

	// Функция для переключения состояния сворачивания/раскрытия
	const handleToggleOrder = (orderId) => {
		setExpandedOrders((prevState) => ({
			...prevState,
			[orderId]: !prevState[orderId],
		}));
	};

	return (
		<Container sx={{marginY: 2}}>
			{user && (
				<Card sx={{ mb: 3 }}>
					<CardContent>
						<Typography variant="h5">{user.name}</Typography>
						<Typography variant="body1">{user.mail}</Typography>
					</CardContent>
				</Card>
			)}

			{orders && orders.length > 0 ? (
				orders.map((order) => (
					<Card key={order.id} sx={{ mb: 3 }}>
						<CardContent>
							<Box display="flex" justifyContent="space-between" alignItems="center">
								<Typography variant="h6">Заказ #{order.id}</Typography>
								<IconButton onClick={() => handleToggleOrder(order.id)}>
									<ExpandMoreIcon />
								</IconButton>
							</Box>
							<Typography variant="body2" color="textSecondary">
								Оплата: {order.oplata === 0 ? 'Не оплачен' : 'Оплачен'}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Статус: {order.status === 0 ? 'Не выполнен' : 'Выполнен'}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Дата: {new Date(order.date).toLocaleString()}
							</Typography>
							<Typography variant="h6">Сумма: ${order.price}</Typography>
						</CardContent>

						<Collapse in={expandedOrders[order.id]} timeout="auto" unmountOnExit>
							<Box sx={{ padding: 2 }}>
								<Typography variant="subtitle1">Товары:</Typography>
								<List>
									{order.items.map((item) => (
										<ListItem key={item.id}>
											<Box display="flex" alignItems="center" gap={3}>

												<Box sx={{
													width: 40, height: 40, borderRadius: 100, overflow: 'hidden',
												}}>
													<CardMedia
														component="img"
														alt={item.title}
														height="30"
														image={url+item.img1}
														sx={{width: '100%',
															height: '100%',
															objectFit: 'cover',
															objectPosition: 'center'}}
													/>
												</Box>
												<Box sx={{width: 40, height: 40, borderRadius: 100, overflow: 'hidden',}}>
													<CardMedia
														component="img"
														alt={item.title}
														height="30"
														image={url+item.img2}
														sx={{width: '100%',
															height: '100%',
															objectFit: 'cover',
															objectPosition: 'center'}}
													/>
												</Box>

												<Box>
													<ListItemText
														primary={item.title}
														secondary={`Цена: $${item.price} x ${item.count}`}
													/>
												</Box>



											</Box>
										</ListItem>
									))}
								</List>
							</Box>
						</Collapse>
					</Card>
				))
			) : (
				<Typography variant="body1" color="textSecondary">У пользователя нет заказов.</Typography>
			)}
		</Container>
	);
};

export default User;

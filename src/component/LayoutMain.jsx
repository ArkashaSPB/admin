import React, {useEffect, useState} from 'react';
import {
	DarkMode,
	LightMode,
	Person2,
	Menu as MenuIcon,
	MenuOpen,
	Shop, ShoppingCart, HistoryRounded, Mail, CurrencyBitcoin, Settings, History, Storage
} from "@mui/icons-material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // <== правильный импорт

import {
	AppBar, Badge,
	Box,
	Drawer,
	IconButton,
	ListItemIcon,
	ListItemText,
	MenuItem,
	MenuList,
	Paper,
	Toolbar, useMediaQuery
} from "@mui/material";
import {Link, NavLink} from "react-router-dom";
import { useLocation } from "react-router-dom";
import useNewCountStore from "../store/count.js";


const menuItem = [
	{name: "Настройки", icon: <Settings/>, path: '/'},
	{name: "Товары", icon: <Shop/>, path: '/shop'},
	{name: "Заказы", icon: <ShoppingCart/>, path: '/orders'},
	{name: "Шаблоны письма", icon: <Mail/>, path: '/email'},
	// {name: "Оплата", icon: <CurrencyBitcoin/>, path: '/oplata'},
	{name: "Промокоды", icon: <LocalOfferIcon/>, path: '/promo'},
	{name: "Клиенты", icon: <Person2/>, path: '/users'},
	{name: "Трон история", icon: <HistoryRounded/>, path: '/tron'},
	{name: "История сайта", icon: <Storage/>, path: '/logs'},
]

const LayoutMain = ({children, darkMode, setDarkMode, theme}) => {

	const location = useLocation(); // Получаем текущий путь
	const [openMenu, setOpenMenu] = useState(true);
	const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // определение мобильного устройства

	const { newCount } = useNewCountStore();
	const toggleTheme = () => {
		setDarkMode((prevMode) => !prevMode);
	};



	useEffect(() => {
		setOpenMenu(!isMobile);
	}, [isMobile]);

	const toggleDrawer = () => {
		setOpenMenu(!openMenu);
	};

	return (
		<>
			<Box sx={{ width: "100%" }}>
				<AppBar position="static" sx={{ width: "100%" }}>
					<Toolbar>
						<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
							<IconButton color="inherit" onClick={toggleDrawer}>
								{openMenu ? <MenuOpen /> : <MenuIcon />}
							</IconButton>

							<Box sx={{ display: "flex", alignItems: "center" }}>

							</Box>
							{/*<IconButton color="inherit" onClick={toggleTheme}>*/}
							{/*	{darkMode ? <LightMode /> : <DarkMode />}*/}
							{/*</IconButton>*/}
						</Box>
					</Toolbar>
				</AppBar>
			</Box>

			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					height: "100vh",
				}}>
				<Box
					sx={{
						display: !isMobile ? "block" : "none", height: "100%",
					}}
				>
					<Paper sx={{ marginRight: 2,  maxWidth: '100%', height: "100%" }}>
						<MenuList>
							{menuItem.map((item, index) => (
								<MenuItem
									key={index}
									component={Link}
									to={item.path}
									sx={{
										backgroundColor: location.pathname === item.path ? "#dcdcdc" : "transparent",
										color: location.pathname === item.path ? "#000" : "inherit",
										"&:hover": {
											backgroundColor: "#e0e0e0",
										},
										py:1.5
									}}
								>
									<ListItemIcon>
										{item.name === 'Заказы' && newCount > 0 ?
										<Badge badgeContent={newCount} color="success">
											{item.icon}
										</Badge>
											: item.icon}
									</ListItemIcon>
									<ListItemText
										sx={{
											display: openMenu ? "block" : "none",
											width: 120,
										}}
									>
										{item.name}
									</ListItemText>
								</MenuItem>
							))}
						</MenuList>
					</Paper>
				</Box>
				<Box sx={{flexGrow: 1, overflowX: 'scroll'}}>

						{children}
					<Box sx={{height: 100}}></Box>

				</Box>
			</Box>

			<Drawer
				anchor="left"
				open={openMenu}
				onClose={toggleDrawer}
				sx={{
					display: isMobile ? "block" : "none",
					position: "relative",
					width: 320,
					flexShrink: 0,
					marginTop: 64,
					"& .MuiDrawer-paper": {
						width: 300,
						boxSizing: "border-box",
						paddingTop: "10px",
						backgroundColor: "#f4f4f4", // Можно выбрать другой цвет фона
					},
				}}
			>
				<Box sx={{

					py: 2,
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start", // Выравнивание текста слева
				}}>
					{menuItem.map((item, index) => (
						<NavLink
							key={index}
							to={item.path}
							style={{
								width: "100%",
								textAlign: "left",
								padding: "8px 16px",
								marginBottom: "8px",
								display: "flex",
								justifyContent: "flex-start",
								alignItems: "center",
								textDecoration: "none",
								backgroundColor: location.pathname === item.path ? "#dcdcdc" : "transparent",
								color: location.pathname === item.path ? "#000" : "inherit",
							}}
						>
							<Box sx={{ marginRight: 2 }}>
								{item.name === 'Заказы' && newCount > 0 ?
									<Badge badgeContent={newCount} color="success">
										{item.icon}
									</Badge>
									: item.icon}
							</Box>
							{item.name}
						</NavLink>
					))}

				</Box>
			</Drawer>



		</>
	);
};

export default LayoutMain;
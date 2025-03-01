import React, {useState} from 'react';
import {
	DarkMode,
	Dashboard,
	LightMode,
	Person2,
	Menu as MenuIcon,
	MenuOpen,
	Shop, ShoppingCart, HistoryRounded, Mail, CurrencyBitcoin, Settings
} from "@mui/icons-material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer'; // <== правильный импорт

import {
	AppBar,
	Box,
	Button,
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

const menuItem = [
	{name: "Настройки", icon: <Settings/>, path: '/'},
	{name: "Товары", icon: <Shop/>, path: '/shop'},
	{name: "Заказы", icon: <ShoppingCart/>, path: '/orders'},
	{name: "Рассылка", icon: <Mail/>, path: '/email'},
	// {name: "Оплата", icon: <CurrencyBitcoin/>, path: '/oplata'},
	{name: "Промо коды", icon: <LocalOfferIcon/>, path: '/promo'},
	{name: "Клиенты", icon: <Person2/>, path: '/users'},
	{name: "Трон история", icon: <HistoryRounded/>, path: '/tron'},
]

const LayoutMain = ({children, darkMode, setDarkMode, theme}) => {
	const [openMenu, setOpenMenu] = useState(false);

	const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // определение мобильного устройства
	const toggleTheme = () => {
		setDarkMode((prevMode) => !prevMode);
	};

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
							<IconButton color="inherit" onClick={toggleTheme}>
								{darkMode ? <LightMode /> : <DarkMode />}
							</IconButton>
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
							{menuItem.map((item, index) =>
								<MenuItem key={index} component={Link} to={item.path} >
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText sx={{
										display: openMenu ? "block" : "none",
										width: 120
									}}>{item.name}</ListItemText>
								</MenuItem>
							)}
						</MenuList>
					</Paper>
				</Box>
				<Box sx={{flexGrow: 1, overflowX: 'scroll'}}>
					{children}
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
					width: 250,
					py: 2,
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start", // Выравнивание текста слева
				}}>
					{menuItem.map((item, index) => (
						<NavLink
							key={index}
							to={item.path}
							style={({ isActive }) => ({
								width: "100%", // Растягиваем кнопку на всю ширину
								textAlign: "left", // Выравнивание текста слева
								padding: "8px 16px", // Добавим немного отступов
								marginBottom: "8px", // Отступ между кнопками
								display: "flex",
								justifyContent: "flex-start",
								alignItems: "center",
								textDecoration: "none", // Убираем подчеркивание
								backgroundColor: isActive ? "#dcdcdc" : "transparent", // Выделение активной кнопки
								color: isActive ? "#000" : "inherit", // Цвет текста для активной кнопки
								"&:hover": {
									backgroundColor: "#e0e0e0", // Цвет фона при наведении
								},
							})}
						>
							<Box sx={{ marginRight: 2 }}>{item.icon}</Box> {/* Отступ между иконкой и текстом */}
							{item.name}
						</NavLink>
					))}
				</Box>
			</Drawer>



		</>
	);
};

export default LayoutMain;
import { createTheme } from "@mui/material/styles";

const getTheme = (darkMode) => {
	return createTheme({
		palette: {
			mode: darkMode ? "dark" : "light", // Добавляем переключение между темами
			primary: {
				main: "rgb(23,129,161)",
				contrastText: "#fff",
			},
			secondary: {
				main: "#dc004e",
			},
			background: {
				default: darkMode ? "#121212" : "#fafafa", // Цвет фона
				paper: darkMode ? "#424242" : "#ffffff",  // Цвет фона для карточек и других элементов
			},
			text: {
				primary: darkMode ? "#ffffff" : "#000000", // Цвет основного текста
				secondary: darkMode ? "#bdbdbd" : "#757575", // Цвет вторичного текста
			},
		},
		typography: {
			fontFamily: "Roboto, Arial, sans-serif",
			h1: {
				fontSize: "2rem",
				fontWeight: 700,
			},
			h2: {
				fontSize: "1.5rem",
			},
			// Другие настройки шрифтов, если нужно
		},
	});
};

export default getTheme;

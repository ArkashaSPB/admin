import { Box, CssBaseline, ThemeProvider, TextField, Button, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutMain from "./component/LayoutMain.jsx";
import getTheme from "./theme.js";
import { useState, useEffect } from "react";
import Main from "./pages/Main.jsx";
import Users from "./pages/Users.jsx";
import Goods from "./pages/Goods.jsx";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Orders from "./pages/Orders.jsx";
import User from "./pages/User.jsx";
import TronHistory from "./pages/TronHistory.jsx";
import OplataHistory from "./pages/OplataHistory.jsx";
import Promo from "./pages/Promo.jsx";
import Email from "./pages/Email.jsx";
import Logs from "./pages/Logs.jsx";

const rout = [
  { path: '/', element: <Main/> },
  { path: '/shop', element: <Goods /> },
  { path: '/orders', element: <Orders /> },
  { path: '/users', element: <Users /> },
  { path: '/user/:id', element: <User /> },
  { path: '/tron', element: <TronHistory /> },
  { path: '/oplata', element: <OplataHistory /> },
  { path: '/promo', element: <Promo /> },
  { path: '/email', element: <Email /> },
  { path: '/logs', element: <Logs /> },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = getTheme(darkMode);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');

  // Проверяем localStorage при загрузке
  // useEffect(() => {
  //   const adminStatus = localStorage.getItem("admin");
  //   if (adminStatus === "1") {
  //     setIsAdmin(true);
  //   }
  // }, []);



  useEffect(() => {
    if (password === "logi1234" && password !== '') { // Задай свой пароль
      localStorage.setItem("admin", "1");
      setIsAdmin(true);
    }
  },[password])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Если admin:1 нет, показываем форму ввода пароля */}
      {!isAdmin ? (
        <Box sx={sxStyles.loginBox}>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      ) : (
        <BrowserRouter basename='/ad'>
          <LayoutMain darkMode={darkMode} setDarkMode={setDarkMode} theme={theme}>
            <Routes>
              {rout.map((route, index) => (
                <Route path={route.path} element={route.element} key={index} />
              ))}
              <Route path='*' element={<p>Другая страница</p>} />
            </Routes>
            <ToastContainer />
          </LayoutMain>
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
}

// 🎨 Стили
const sxStyles = {
  loginBox: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#1e1e1e",
    color: "white",
    gap: 2,
    padding: 3,
  },
};

export default App;

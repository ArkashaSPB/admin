import React, { useEffect, useState } from 'react';
import { editSettingAPI, getSettingAPI } from "../api/siteAPI.js";
import { TextField, Button, Box, Typography } from '@mui/material';

const Setting = () => {
	const [setting, setSetting] = useState({
		smtpServer: '',
		smtpPort: '',
		smptMail: '',
		smtpPass: '',
		smtpName: '',
		smtpTyp: '',
		tron: ''
	});



	const getFunc = () => {
		getSettingAPI().then(data => {
			setSetting(data);
		});
	}

	const editFunc = () => {
		editSettingAPI(setting).then(data => {
			console.log('Updated Data:', data);
		});
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSetting(prevSetting => ({
			...prevSetting,
			[name]: value
		}));
	}

	useEffect(() => {
		getFunc();
	}, []);

	return (
		<Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
			<Typography variant="h5" gutterBottom>Настройки</Typography>

			<TextField
				label="SMTP Server"
				name="smtpServer"
				value={setting.smtpServer}
				onChange={handleChange}
				fullWidth
				margin="normal"
			/>
			<TextField
				label="SMTP Port"
				name="smtpPort"
				type="number"
				value={setting.smtpPort}
				onChange={handleChange}
				fullWidth
				margin="normal"
			/>
			<TextField
				label="SMTP Email"
				name="smptMail"
				value={setting.smptMail}
				onChange={handleChange}
				fullWidth
				margin="normal"
			/>
			<TextField
				label="SMTP Password"
				name="smtpPass"
				value={setting.smtpPass}
				onChange={handleChange}
				fullWidth
				margin="normal"

			/>
			<TextField
				label="SMTP Name"
				name="smtpName"
				value={setting.smtpName}
				onChange={handleChange}
				fullWidth
				margin="normal"
			/>
			<TextField
				label="SMTP Type"
				name="smtpTyp"
				value={setting.smtpTyp}
				onChange={handleChange}
				fullWidth
				margin="normal"
			/>
			<TextField
				label="Tron"
				name="tron"
				value={setting.tron}
				onChange={handleChange}
				fullWidth
				margin="normal"
			/>

			<Button
				variant="contained"
				onClick={editFunc}
				sx={{ marginTop: 2 }}
			>
				Сохранить изменения
			</Button>
		</Box>
	);
};

export default Setting;

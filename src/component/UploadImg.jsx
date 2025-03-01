import React, { useState } from 'react';
import { uploadImgAPI } from "../api/siteAPI.js";
import { Button, Typography, Box, CircularProgress } from '@mui/material';
const url =  import.meta.env.VITE_IMG;
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
const UploadImg = ({handleChange, index = null, img = null}) => {
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState('');
	const [loading, setLoading] = useState(false);
	const [gotovo, setGotovo] = useState(img)

	const handleFileChange = async (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
			setFileName(selectedFile.name); // Сохраняем имя файла
			await handleUpload(selectedFile); // Автоматически загружаем файл
		}
	};

	const handleUpload = async (file) => {
		if (!file) {
			alert('Выберите файл для загрузки');
			return;
		}

		setLoading(true); // Показываем индикатор загрузки

		try {
			const response = await uploadImgAPI(file);
			setGotovo(response.filename)
			handleChange('img', response.filename, index);
		} catch (error) {
			console.error('Ошибка загрузки', error);
			alert('Ошибка загрузки файла');
		} finally {
			setLoading(false); // Скрываем индикатор загрузки
		}
	};

	return (
		<Box sx={{ textAlign: 'center', padding: 2 }}>

				<>
					<input
						accept="image/*"
						type="file"
						onChange={handleFileChange}
						style={{ display: 'none' }}
						id={"file-input-" + index}
					/>
					<label htmlFor={"file-input-" + index}>
						<Button color="warning" variant="outlined" component="span">
							{gotovo ?
								<img style={{height: 40}} src = {url+gotovo} alt = {gotovo} />
								:
							<PhotoCameraIcon/>
							}
						</Button>
					</label>
				</>




		</Box>
	);
};

export default UploadImg;

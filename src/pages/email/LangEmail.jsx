import React, { useEffect, useState } from 'react';
import { addMailLangAPI, delMailLangAPI, getAllMailLangAPI } from "../../api/siteAPI.js";
import {Container, TextField, Button, List, ListItem, ListItemText, IconButton, Box} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const LangEmail = () => {
	const [lang, setLang] = useState([]);
	const [newLang, setNewLang] = useState('');

	const getFunc = () => {
		getAllMailLangAPI().then(data => setLang(data));
	};

	useEffect(() => {
		getFunc();
	}, []);

	const deleteFunc = (language) => {
		delMailLangAPI(language).then(() => getFunc());
	};

	const addFunc = () => {
		if (newLang.trim()) {
			addMailLangAPI({lang:newLang}).then(() => {
				setNewLang('');
				getFunc();
			});
		}
	};

	return (
		<Container>
			<Box sx={{maxWidth: 300}}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' , alignItems: 'center' }}>
				<TextField
					label="Новый язык"
					variant="standard"
					value={newLang}
					onChange={(e) => setNewLang(e.target.value)}
				/>
				<Button variant="contained" onClick={addFunc} sx={{ ml: 1 }}>
					Добавить
				</Button>
			</Box>


				<List>
					{lang.map((item, index) => (
						<ListItem
							key={index}
							secondaryAction={
								<IconButton edge="end" color="error" aria-label="delete" onClick={() => deleteFunc(item)}>
									<DeleteIcon />
								</IconButton>
							}
						>
							<ListItemText primary={item} />
						</ListItem>
					))}
				</List>
			</Box>

		</Container>
	);
};

export default LangEmail;

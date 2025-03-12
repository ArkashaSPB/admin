import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ModalEmail = ({ open, setOpen, selectedEmail, setSelectedEmail, handleSave }) => {
	const handleChange = (field, value) => {
		setSelectedEmail((prev) => ({ ...prev, [field]: value }));
	};

	console.log(selectedEmail);

	// Фильтруем все поля, которые начинаются с "subject_" или "text_"
	const languageFields = Object.entries(selectedEmail || {}).filter(([key, value]) =>
		key.startsWith("subject_") || key.startsWith("text_")
	);

	// Группируем по языковым кодам
	const groupedFields = languageFields.reduce((acc, [field, value]) => {
		const lang = field.split('_')[1]; // Получаем код языка (например, 'en', 'fr', и т.д.)
		if (!acc[lang]) {
			acc[lang] = {};
		}
		acc[lang][field] = value;
		return acc;
	}, {});

	return (
		<Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
			<DialogTitle>Редактирование письма</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					label="Название"
					variant="outlined"
					sx={{ mb: 2 }}
					value={selectedEmail?.name || ""}
					onChange={(e) => handleChange("name", e.target.value)}
				/>

				<TextField
					fullWidth
					label="Тема"
					variant="outlined"
					sx={{ mb: 2 }}
					value={selectedEmail?.subject || ""}
					onChange={(e) => handleChange("subject", e.target.value)}
				/>

				<Typography variant="subtitle1">Текст письма:</Typography>

				<TextField
					label="Текст письма"
					multiline
					rows={6}
					fullWidth
					variant="outlined"
					value={selectedEmail?.text || ""}
					onChange={(e) => handleChange("text", e.target.value)}
					sx={{ mt: 2 }}
				/>

				{/* Динамическое отображение языковых полей */}
				<Typography variant="subtitle1" sx={{ mt: 3 }}>Дополнительные языковые поля:</Typography>
				{Object.entries(groupedFields).map(([lang, fields]) => (
					<Accordion key={lang}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls={`${lang}-content`}
							id={`${lang}-header`}
						>
							<Typography>{lang}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{/* Для каждого языка отображаем поля subject и text */}
							<TextField
								fullWidth
								label={`subject_${lang}`}
								variant="outlined"
								sx={{ mb: 2 }}
								value={fields[`subject_${lang}`] || ""}
								onChange={(e) => handleChange(`subject_${lang}`, e.target.value)}
							/>
							<TextField
								label={`Текст письма (${lang})`}
								multiline
								rows={6}
								fullWidth
								variant="outlined"
								value={fields[`text_${lang}`] || ""}
								onChange={(e) => handleChange(`text_${lang}`, e.target.value)}
								sx={{ mt: 2 }}
							/>
						</AccordionDetails>
					</Accordion>
				))}
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={() => setOpen(false)}>
					Закрыть
				</Button>
				<Button variant="contained" color="primary" onClick={handleSave}>
					Сохранить
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalEmail;

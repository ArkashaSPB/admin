import { useState } from 'react';

const useSnackbar = () => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState('success'); // 'success' or 'error'

	const showSnackbar = (msg, severityType = 'success') => {
		setMessage(msg);
		setSeverity(severityType);
		setOpen(true);
	};

	const closeSnackbar = () => {
		setOpen(false);
	};

	return {
		open,
		message,
		severity,
		showSnackbar,
		closeSnackbar
	};
};

export default useSnackbar;

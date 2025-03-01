import React, {useEffect, useState} from 'react';
import {getUsersAllAPI} from "../api/siteAPI.js";
import {
	Box,
	Collapse,
	IconButton, Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Visibility} from "@mui/icons-material";
import {Link} from "react-router-dom";

const Users = () => {

	const [users, setUsers] = useState([])

	const getUsersFunc = () => {
		getUsersAllAPI().then(data => {
			setUsers(data)
		})
	}
	useEffect(() => {
		getUsersFunc()
	}, [])

	return (
		<div>
			<Box p={4}>
				<Typography variant="h4" gutterBottom>
					Люди
				</Typography>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell sx={{width: 20}}></TableCell>
								<TableCell>ID</TableCell>
								<TableCell>Почта</TableCell>
								<TableCell>Пароль</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user) =>
								<TableRow key={user.id}>
									<TableCell><Link to={`/user/${user.id}`}><IconButton color="success"><Visibility/></IconButton></Link></TableCell>
									<TableCell>{user.id}</TableCell>
									<TableCell>{user.mail}</TableCell>
									<TableCell>{user.pass}</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>

		</div>
	);
};

export default Users;
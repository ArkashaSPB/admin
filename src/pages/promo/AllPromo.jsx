import React, { useEffect, useState } from "react";
import {delPromoAPI, getAllPromoAPI} from "../../api/siteAPI.js";
import { Box, Card, CardContent, Typography, List, ListItem, Divider, IconButton } from "@mui/material";
import {toast} from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";


const AllPromo = () => {
	const [promo, setPromo] = useState([]);

	const getFunc = () => {
		getAllPromoAPI().then((data) => {
			setPromo(data);
		});
	};

	useEffect(() => {
		getFunc();
	}, []);

	const deletePromo =  (id) => {
		delPromoAPI(id).then((data) => {
			if(data.success){
				toast.success(data.message);
				getFunc()
			}else{
				toast.error(data.message);
			}
		})
	}

	return (
		<Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
			<Typography variant="h4" textAlign="center" gutterBottom>
				Активные промокоды
			</Typography>

			{promo.length > 0 ? (
				promo.map((item) => (
					<Card key={item.id} sx={{ mb: 3, background: "#1e1e1e", color: "white", borderRadius: 3 }}>
						<CardContent>

							<Box display="flex" justifyContent="space-between" alignItems="center">
								<Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
									{item.name}
								</Typography>

								<IconButton onClick={() => deletePromo(item.id)} color="error"  >
									<DeleteIcon />
								</IconButton>


							</Box>


							{item.product.length > 0 ? (
								<List>
									{item.product.map((product, index) => (
										<React.Fragment key={product.id}>
											<ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
												<Typography>{product.title}</Typography>
												<Typography sx={{ color: "#49B884", fontWeight: "bold" }}>
													{product.price}$
													<Typography component="span" sx={{ textDecoration: "line-through", ml: 1, color: "gray" }}>
														{product.oldPrice}$
													</Typography>
												</Typography>
											</ListItem>
											{index !== item.product.length - 1 && <Divider sx={{ bgcolor: "gray" }} />}
										</React.Fragment>
									))}
								</List>
							) : (
								<Typography color="gray">Нет товаров</Typography>
							)}
						</CardContent>
					</Card>
				))
			) : (
				<Typography textAlign="center" color="gray">
					Нет доступных промокодов
				</Typography>
			)}
		</Box>
	);
};
export default AllPromo;
import { useContext } from "react";

import { Badge, Box, Button, Typography, styled } from "@mui/material"
import { ShoppingCart } from '@mui/icons-material';

import { DataContext } from "../../context/DataProvider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


import Profile from "./Profile";

const BoxWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	margin: '0 3% 0 auto',
	'& > button, & > p, & > div': {
		marginRight: '25px',

		alignItem: 'center'
	},
	[theme.breakpoints.down('md')]: {
		display: 'block'
	}
}));

const Container = styled(Link)(({ theme }) => ({
	display: 'flex',
	textDecoration: 'none',
	color: 'inherit',

	[theme.breakpoints.down('md')]: {
		display: 'block'
	}
}));


const LoginButton = styled(Button)(({ theme, color = 'primary' }) => ({
	color: "#2874f0",
	background: "#FFFFFF",
	textTransform: "none",
	padding: "5px 40px",
	borderRadius: "2px",
	boxShadow: "none",
	fontWeight: "600",
	height: "32px",
	':hover': {
		color: theme.palette[color].main,
		backgroundColor: '#f2f2f2',
	},
}));


const CustomButtons = () => {


	const { account, setAccount } = useContext(DataContext);

	const { cartItems } = useSelector(state => state.cart);



	return (
		<BoxWrapper>
			{
				account ? < Profile account={account} setAccount={setAccount} /> :
					<Link to={"/login"} style={{ padding: "0px 40px" }}>
						<LoginButton variant="contained" >LogIn</LoginButton>
					</Link>
			}

			<Typography style={{ marginTop: 3, width: 135 }}>Become a Seller</Typography>
			<Typography style={{ marginTop: 3 }}>More</Typography>

			<Container to='/cart'>
				<Badge badgeContent={cartItems?.length} color="secondary">
					<ShoppingCart style={{ marginTop: 3 }} />
				</Badge>
				<Typography style={{ marginTop: 3, marginLeft: 10 }}>Cart</Typography>
			</Container>
		</BoxWrapper>
	)
}

export default CustomButtons;
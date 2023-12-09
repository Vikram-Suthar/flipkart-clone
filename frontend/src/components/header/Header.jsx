
import { useContext, useEffect, useState } from 'react';

import { AppBar, Box, Toolbar, Typography, IconButton, Drawer, List, ListItem, styled } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { Link } from 'react-router-dom';

//userrefresh
import { DataContext } from '../../context/DataProvider';
import { refreshToken } from '../login/refresh';

//components
import Search from './Search';
import CustomButtons from './CustomButtons';

const StyledHeader = styled(AppBar)`
    background: #2874f0;
    height: 54px;
`
const Component = styled(Link)`
    margin-left: 5%;
    line-height: 0;
    text-decoration: none;
    color: inherit;
`
const SubHeading = styled(Typography)`
    font-size: 12px;
    font-style: italic;
`
const PlusImage = styled('img')({
    width: 10,
    height: 10,
    marginLeft: 4,
    marginTop: 4
})

const CustomButtonsWrapper = styled(Box)(({ theme }) => ({
    margin: '0 5% 0 auto',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}));

const Header = () => {
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const list = () => (
        <Box style={{ width: 200 }} /*onClick={ handleClose}*/>
            <List>
                <ListItem button>
                    <CustomButtons />
                </ListItem>
            </List>
        </Box>
    );

    //user refresh
    const { account, setAccount } = useContext(DataContext);
    useEffect(() => {
        
        if (account) {
            let interval = setInterval(() => {
                refreshToken().then((data) => {
                    if (!data.user) {
                        clearInterval(interval)
                    }
                    setAccount(data.user)
                })
            }, 1000 * 5)
            return () => clearInterval(interval)
        }
    }, [!account])

    
    return (
        <StyledHeader>
            <Toolbar style={{ minHeight: 55 }}>
                <MenuButton color="inherit" onClick={handleOpen}>
                    <Menu />
                </MenuButton>

                <Drawer open={open} onClose={handleClose}>
                    {list()}
                </Drawer>


                <Component to='/' >
                    <img src={logoURL} alt="logo" style={{ width: 80 }} />
                    <Box style={{ display: 'flex' }}>
                        <SubHeading>Explore&nbsp;
                            <Box component="span" style={{ color: '#FFE500' }}>Plus</Box>
                        </SubHeading>
                        <PlusImage src={subURL} alt="plus-logo" />
                    </Box>
                </Component>
                <Search />
                <CustomButtonsWrapper>
                    <CustomButtons />
                </CustomButtonsWrapper>
            </Toolbar>
        </StyledHeader>
    )
}

export default Header;
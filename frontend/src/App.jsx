import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import Home from './components/home/Home';
import Header from './components/header/Header';
import DataProvider from './context/DataProvider';
import Cart from './components/cart/Cart';
import DetailView from './components/details/DetailView';
import LoginDialog from './components/login/Login';
import SignupDialog from './components/login/Signup';
import User from './components/login/User';

function App() {


    return (
        <>
            <DataProvider>
                <BrowserRouter>
                    <Header />
                    <Box style={{ marginTop: 54 }} >
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/product/:id' element={<DetailView />} />
                            <Route path='/cart' element={<Cart />} />
                            <Route path='/login' element={<LoginDialog />} />
                            <Route path='/signup' element={<SignupDialog />} />
                            <Route path='/user' element={<User />} />
                        </Routes>
                    </Box>
                </BrowserRouter>
            </DataProvider>
        </>
    )
}

export default App;

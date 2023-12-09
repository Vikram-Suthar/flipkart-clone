import React, { useEffect } from 'react';
import { getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Box, styled } from "@mui/material";

import NavBar from './Navbar';
import Banner from './Banner';
import Banner2 from './Banner2';
import MidSlide from './MidSlide';
import MidSection from './MidSection';
import Slide from './Slide';


const Component = styled(Box)`
  padding: 10px;
  background: #F2F4F4;
`;
const Home = () => {
    const { products } = useSelector(state => state.getProducts);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])
   
   
    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <MidSlide products={products} title="Deal of the Day" timer={true} />
                <MidSection />
                <Slide products={products} title="Discount for You" timer={false} />
                <Banner2 />
                <Slide products={products} title="Suggesting Items" timer={false} />
                <MidSlide products={products} title="Deal of the Day" timer={true} />
                <Slide products={products} title="Top Selection" timer={false} />
                <MidSection />
                <Slide products={products} title="Recommended Items" timer={false} />
                <MidSlide products={products} title="Deal of the Day" timer={true} />
                <Slide products={products} title="Trending Offers" timer={false} />
                <Banner />
                <MidSlide products={products} title="Deal of the Day" timer={true} />
                <MidSection />
                <Banner2 />
                <Slide products={products} title="Season's top picks" timer={false} />
                <MidSlide products={products} title="Discount for You" timer={true} />
                <Banner />
                <MidSection />
                <Slide products={products} title="Top Deals on Accessories" timer={false} />
            </Component>
        </>
    )
}

export default Home;
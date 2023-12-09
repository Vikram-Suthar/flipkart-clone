
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { styled } from '@mui/material';

import { bannerData2 } from '../../constants/data';


const Image = styled('img')(({ theme }) => ({
  width: '100%',
  height: 280,
  [theme.breakpoints.down('md')]: {
    objectFit: 'cover',
    height: 180
  }
}));

const responsive = {
  
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


const Banner2 = () => {
  return (
    <Carousel 
    swipeable={false}
    draggable={false}
    responsive={responsive}
    infinite={true}
    autoPlay={true}
    autoPlaySpeed={4000}
    keyBoardControl={true}
    slidesToSlide={1}    
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
    containerClass="carousel-container"
    >
      {
        bannerData2.map(data => (
          <Image key={data.id} src={data.url} alt="banner" />
        ))
      }
    </Carousel>
  )
}

export default Banner2;
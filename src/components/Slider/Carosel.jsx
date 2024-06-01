 // Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slider from './Slider';

import p1 from '../../assets/images/univercity-8.jpeg'
import p2 from '../../assets/images/univercity-7.jpg'
import p3 from '../../assets/images/univercity-1.jpg'


const Carosel = () => {
    return (
        <div className=''>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide> <Slider image={p1} text={'A scholarship is financial support awarded to a student, based on academic achievement or other criteria that may include financial need, for the purpose of schooling. '}></Slider></SwiperSlide>
                <SwiperSlide> <Slider image={p2} text={'A scholarship is financial support awarded to a student, based on academic achievement or other criteria that may include financial need, for the purpose of schooling. '}></Slider></SwiperSlide>
                <SwiperSlide> <Slider image={p3} text={'A scholarship is financial support awarded to a student, based on academic achievement or other criteria that may include financial need, for the purpose of schooling. '}></Slider></SwiperSlide>
                 

            </Swiper>
        </div>
    );
};

export default Carosel;
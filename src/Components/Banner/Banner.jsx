import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../Styles/SwiperSlide.css';
import 'animate.css';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Helmet } from 'react-helmet';
import bg from "/bg1.gif";
import bg1 from "/bg2.gif";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto ">
      <Helmet>
        <title>PAVILION FITFOCUS</title>
      </Helmet>
      <div className='relative font-Poppins'>
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide className='bg-gradient-to-r  rounded-xl from-slate-900 to-black  '>
            <div
              className="bg-cover rounded-xl mr-0 bg-center hero w-full h-[580px] bg-gradient-to-r from-slate-900 to-black"
              style={{
                backgroundImage: `url(${bg1})`,
              }}
            >
              <div className='w-full h-full bg-opacity-5 flex justify-center items-center bg-slate-100'>
                <div className="hero-content  text-center text-neutral-content animate__animated animate__fadeInUp animate__slower">
                  <div className="lg:max-w-lg md:max-w-md w-[100%]  lg:w-[100%]">
                    <h1 className="mb- text-xl lg:text-3xl font-bold text-[#fff] p-3 bg-opacity-5  font-Prata">
                      PAVILION FITFOCUS: Shape Your Future
                    </h1>
                    <p className="mb-5 text-[#fff] font-semibold">
                      Welcome to <a className="ml-2 text-2xl font-bold italic text-[#1882FF]">PAVILION FITFOCUS </a>
                      Your Ultimate Destination for Health, Wellness, and Fitness. Empowering You to Train, Transform, and Achieve Peak Performance Every Day.
                    </p>
                    <Link to="/trainers">
                      <button
                        className="align-middle mr-3 select-none font-Rilway text-lg font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-3 px-6 rounded-lg bg-[#1E1743] border m-5  text-[#fff] hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
                        type="button"
                      >
                        See Our Trainer→
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className='bg-gradient-to-r from-slate-900 to-black '>
            <div
              className="bg-cover mr-0 bg-center hero w-full h-[580px] bg-gradient-to-r from-slate-900 to-black"
              style={{
                backgroundImage: `url(${bg})`,
              }}
            >
              <div className="hero-content text-center text-neutral-content animate__animated animate__fadeInUp animate__slower">
                <div className="lg:max-w-lg md:max-w-md w-[100%]  lg:w-[100%]">
                  <h1 className="mb- text-xl lg:text-3xl font-bold text-[#fff] p-3 bg-opacity-5  font-Prata">
                    PAVILION FITFOCUS: Shape Your Future
                  </h1>
                  <p className="mb-5 text-[#fff] font-semibold">
                    Welcome to <a className="ml-2 text-2xl font-bold italic text-[#1882FF]">PAVILION FITFOCUS </a>
                    Your Ultimate Destination for Health, Wellness, and Fitness. Empowering You to Train, Transform, and Achieve Peak Performance Every Day.
                  </p>
                  <Link to="/trainers">
                    <button
                      className="align-middle mr-3 select-none font-Rilway text-lg font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none  py-3 px-6 rounded-lg bg-[#1E1743] border m-5 text-[#fff] hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
                      type="button"
                    >
                      See Our Trainer→
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

    </div>
  );
};

export default Home;
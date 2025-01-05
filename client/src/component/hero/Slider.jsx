import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import './Slider.css';  // Import custom CSS

const Slider = () => {
  const slides = [
    {
      id: 1,
      image: 'http://localhost:8080/uploads/About1.png',
      tagline: 'Explore the World',
      subtitle: 'Discover new places and experiences.',
    },
    {
      id: 2,
      image: 'http://localhost:8080/uploads/facility1.png',
      tagline: 'Feel the Nature',
      subtitle: 'Immerse yourself in breathtaking nature.',
    },
    {
      id: 3,
      image: 'http://localhost:8080/uploads/facility.png',
      tagline: 'Urban Adventures',
      subtitle: 'Experience the buzz of city life.',
    },
  ];

  return (
    <Swiper
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
      effect="fade"
      navigation
      pagination={{ clickable: true }}
      loop
      spaceBetween={50}
      slidesPerView={1}
      className="w-full h-[80vh] mx-auto slider-container"
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className="relative flex items-center justify-center">
          <img src={slide.image} alt={slide.tagline} className="w-full h-full object-fit bg-black" />
          <div className="absolute text-center text-black px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 font-sans">{slide.tagline}</h2>
            <p className="text-lg md:text-xl opacity-90">{slide.subtitle}</p>
          </div>
        
        </SwiperSlide>
      ))}
    
    </Swiper>
  );
};

export default Slider;

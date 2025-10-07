// src/components/Hero.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  { img: '/assets/image/banner.jpg', text: 'Untamed Wilderness, Living Legacy of the Himalayan Terai.' },
 
];

export default function Hero() {
  return (
    <section className="hero-section">
 <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={30}
  slidesPerView={1}
  navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
  pagination={{ clickable: true }}
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  loop
>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero-slide"
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '800px', // adjust height as needed
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div className="hero-content  text-white">
                <p className="hero-description">{slide.text}</p>
                <button
                  className="btn btn-safari px-4 py-2"
                  data-value="Jungle safari"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Book My Safari
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

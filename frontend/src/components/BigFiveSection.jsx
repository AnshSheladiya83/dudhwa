import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const bigFiveData = [
  {
    name: "Tiger",
    src: "/assets/image/big-1.jpg",
    description: "The apex predator and icon of the reserve.",
  },
  {
    name: "Rhino",
    src: "/assets/image/big-2.jpg",
    description: "The symbol of Dudhwa's successful reintroduction program.",
  },
  {
    name: "Elephant",
    src: "/assets/image/big-3.jpg",
    description: "The majestic Asian Elephant roaming the grasslands and forests.",
  },
  {
    name: "Leopard",
    src: "/assets/image/big-4.jpg",
    description: "The elusive and adaptable spotted big cat.",
  },
  {
    name: "Swamp Deer (Barasingha)",
    src: "/assets/image/big-5.jpg",
    description:
      "One of the world's largest populations of this unique deer species.",
  },
];

export default function BigFiveSection() {
  return (
    <section className="big__five big__five--slider">
      <div className="container">
        {/* Title and Description */}
        <div className="row text-center mb-5">
          <div className="col-md-12">
            <h2 className="heading_bold">The Big Five</h2>
            <p className="lead px-lg-5">
              Dudhwa Tiger Reserve is home to India’s Big Five: the{" "}
              <strong>Tiger</strong>, <strong>Rhino</strong>,{" "}
              <strong>Elephant</strong>, <strong>Leopard</strong>, and{" "}
              <strong>Swamp Deer</strong>. These magnificent animals embody the
              wild spirit of Dudhwa, each playing a vital role in preserving the
              rich biodiversity of this unique habitat.
            </p>
          </div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          loop={true}
          navigation
          pagination={{ clickable: true }}          
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 }, // mobile
            768: { slidesPerView: 3 }, // tablet
            1200: { slidesPerView: 4 }, // desktop
          }}
        >
          {bigFiveData.map((animal, index) => (
            <SwiperSlide key={index}>
              <a href="#">
                <div className="big__five-cart">
                  <figure>
                    <img
                      src={animal.src}
                      alt={animal.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/400x300/4a4e69/ffffff?text=${animal.name}`;
                      }}
                    />
                  </figure>
                  <div className="big-five-heading">{animal.name}</div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

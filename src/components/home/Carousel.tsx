import React from 'react';
import Slider from 'react-slick'; // Import the Slider component from react-slick
import "slick-carousel/slick/slick.css"; // Import the necessary CSS for the slider
import "slick-carousel/slick/slick-theme.css";

function HeroSection() {
  const settings = {
    infinite: true,
    autoplay: false,
    pauseOnHover: false,
    slidesToShow: 1.5,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: '20%',
    speed: 500,

    dots: true,
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          backgroundColor: "transparent",
          padding: "0px",
          margin: "0px",
        }}
      >
        <ul style={{ margin: "0px"}} > {dots} </ul>
      </div>
    ),
  };

  return (
    <>
      <style>
        {`
          .slick-dots li.slick-active button:before {
            color: #ffcc01;
          }
          .slick-dots li button:before {
            font-size: 10px;
          }
        `}
      </style>
      <div className='flex-1 absolute items-center px-[250px] pt-6 w-full h-full'>
        <Slider {...settings}>
    
          <div>
            <img
              src="/Images/insideout-2024.jpeg"
              alt="Slide 1"
              className='w-[551px] h-[290px] transform -translate-x-52 my-10 rounded'
              />
              {/* Movie Title */}
              <div className='absolute top-24'>
              <h2 className="text-white text-2xl font-bold">Inside Out 2024</h2>
              {/* Movie Info and Icons */}
              <div className="flex items-center mt-2 space-x-4">
                <img src="/Icons/star-icon.svg" alt="Star" className="w-6 h-6" />
                <span className="text-white text-sm">Rating: 4.5</span>
              </div>
              </div>
              </div>

          <div>
            <img 
              src="/Images/kingrichard-movie.jpg"
              alt="Hero Image"
              className='w-[551px] h-[290px] transform -translate-x-52 my-6 rounded'/>
          </div>

          <div>
            <img
              src="/Images/jennifer-lopez-2024.jpg"
              alt="Slide 3"
              className='w-[551px] h-[290px] transform -translate-x-52 my-10 rounded'/>
          </div>
          
              <div>
            <img
              src="/Images/mufasa-movie.jpg"
              alt="Slide 1"
              className='w-[551px] h-[290px] transform -translate-x-52 my-6 rounded'/>
              </div>
        </Slider>
      </div>
      </>
  );
};

export default HeroSection;
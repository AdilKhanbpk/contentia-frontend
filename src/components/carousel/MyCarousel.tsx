"use client";
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";

interface CarouselProps {
  videos: string[];
}

const MyCarousel: React.FC<CarouselProps> = ({ videos }) => {
  const sliderRef = useRef<Slider>(null); // Ensure correct type for ref
  const [playingVideoIndex, setPlayingVideoIndex] = useState(1); // Start with the index set to 1

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "center",
    centerMode: true,
    centerPadding: "0px", // Adjust if needed
    beforeChange: (oldIndex: number, newIndex: number) => {
      setPlayingVideoIndex(newIndex); // Update the index when a slide changes
    },
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(playingVideoIndex);
    }
  }, [playingVideoIndex]);

  const handleVideoClick = (index: number) => {
    if (playingVideoIndex === index) {
      setPlayingVideoIndex(-1);
    } else {
      setPlayingVideoIndex(index);
    }
  };

  const handleVideoEnded = () => {
    const nextIndex = (playingVideoIndex + 1) % videos.length; // Move to the next video
    setPlayingVideoIndex(nextIndex); // Set the next video index
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(nextIndex); // Move to the next slide
    }
  };

  const handleArrowClick = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const totalSlides = videos.length;
      let newIndex = playingVideoIndex;

      if (direction === "left") {
        newIndex = (playingVideoIndex - 1 + totalSlides) % totalSlides;
      } else {
        newIndex = (playingVideoIndex + 1) % totalSlides;
      }

      setPlayingVideoIndex(newIndex);
      sliderRef.current.slickGoTo(newIndex);
    }
  };

  return (
    <div className="carousel-container relative">
      <Slider ref={sliderRef} {...settings}>
        {videos.map((video, index) => (
          <div key={index} className="carousel-slide relative px-2 py-6  overflow-hidden">
            {/* Video container with rounded borders */}
            <div
              className={`relative rounded-3xl overflow-hidden ${
                index === playingVideoIndex
                  ? "absolute top-[-20%] left-1/2 transform -translate-x-1/2 -mt-5"
                  : "border border-gray-200"
              }`}
            >
              <video
                muted={true} // Keep all videos muted
                className={`object-cover ${
                  index === playingVideoIndex
                    ? "w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]"
                    : "w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px]"
                }`}
                onClick={() => handleVideoClick(index)}
                onEnded={handleVideoEnded} // Trigger the next video on end
                ref={(videoRef) => {
                  if (videoRef && index === playingVideoIndex) {
                    videoRef.play();
                  } else if (videoRef) {
                    videoRef.pause();
                  }
                }}
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MyCarousel;

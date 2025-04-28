"use client";
import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";

interface CarouselProps {
    videos: string[];
}

const MyCarousel: React.FC<CarouselProps> = ({ videos }) => {
    const sliderRef = useRef<Slider>(null);
    const [playingVideoIndex, setPlayingVideoIndex] = useState(1);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        className: "center",
        centerMode: true,
        centerPadding: "0px",
        beforeChange: (oldIndex: number, newIndex: number) => {
            setPlayingVideoIndex(newIndex);
        },
        // Disable autoplay here since we will manage it manually
        autoplay: false,
    };

    useEffect(() => {
        // Auto change the slider every 4 seconds
        const interval = setInterval(() => {
            const nextIndex = (playingVideoIndex + 1) % videos.length;
            setPlayingVideoIndex(nextIndex);
            if (sliderRef.current) {
                sliderRef.current.slickGoTo(nextIndex);
            }
        }, 5000); // Change slide every 4 seconds

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [playingVideoIndex, videos.length]);

    const handleVideoClick = (index: number) => {
        if (playingVideoIndex === index) {
            setPlayingVideoIndex(-1);
        } else {
            setPlayingVideoIndex(index);
        }
    };

    const handleVideoEnded = () => {
        const nextIndex = (playingVideoIndex + 1) % videos.length;
        setPlayingVideoIndex(nextIndex);
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(nextIndex);
        }
    };

    return (
        <div className='carousel-container relative'>
            <Slider
                ref={sliderRef}
                {...settings}
            >
                {videos.map((video, index) => (
                    <div
                        key={index}
                        className='carousel-slide relative px-2 py-6 overflow-hidden'
                    >
                        <div
                            className={`relative rounded-3xl overflow-hidden transition-all duration-500 ease-in-out ${
                                index === playingVideoIndex
                                    ? "absolute top-[-20%] left-1/2 transform -translate-x-1/2 -mt-5 scale-110"
                                    : "border border-gray-200"
                            }`}
                        >
                            <video
                                muted={true}
                                className={`object-cover rounded-3xl transition-all duration-500 ease-in-out ${
                                    index === playingVideoIndex
                                        ? "w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]"
                                        : "w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px]"
                                }`}
                                onClick={() => handleVideoClick(index)}
                                onEnded={handleVideoEnded}
                                ref={(videoRef) => {
                                    if (videoRef) {
                                        if (index === playingVideoIndex) {
                                            videoRef.play();
                                        } else {
                                            videoRef.pause();
                                        }
                                    }
                                }}
                            >
                                <source
                                    src={video}
                                    type='video/mp4'
                                />
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

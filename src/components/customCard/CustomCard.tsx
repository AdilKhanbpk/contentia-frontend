"use client";
import TimeSelector from "../timeSelector/TimeSelector";

interface CardProps {
    title?: string;
    description?: string;
    videoCount?: number;
    durationOptions?: string[];
    editingOptions?: string[];
    aspectRatioOptions?: string[];
    price?: number;
    onOrderClick?: () => void;
}

const CustomCard: React.FC<CardProps> = ({
    title = "Default Title",
    description = "Default description",
    videoCount = 0,
    durationOptions = [],
    editingOptions = [],
    aspectRatioOptions = [],
    price = 20,
    onOrderClick = () => {},
}) => {
    if (videoCount === 1) {
        return (
            <div className='flex cardBorder rounded-3xl w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto text-center'>
                <div className='pb-6 flex flex-col justify-between'>
                    <div>
                        <button className='cardColorTwo w-full rounded-3xl pt-6'>
                            <div className='px-4'>
                                <h1 className='headingTextWhite text-lg sm:text-xl md:text-2xl mb-4'>
                                    {title}
                                </h1>
                                <p className='cardTextWhiteSmall text-xs sm:text-xs text-center mb-5'>
                                    {description}
                                </p>
                            </div>
                        </button>
                        <div className='cardTextBlack px-4'>
                            <p className='mt-5 mb-2 text-sm sm:text-base'>
                                Daha fazlasına mi ihtiyacınız var?
                            </p>
                            <div className='flex flex-row items-baseline mb-2'>
                                <h1 className='text-[#4d4ec9] sm:text-xl font-semibold '>
                                    Ihtiyacina uygun paketi birlikte planlayalim
                                </h1>
                            </div>
                        </div>
                    </div>
                    {onOrderClick && (
                        <div className='flex justify-center px-4 pt-2 pb-6'>
                            <button
                                className='cardButton rounded-3xl px-8 py-2'
                                onClick={onOrderClick}
                            >
                                <p className='text-white text-sm sm:text-base'>
                                    Iletisime Gec{" "}
                                </p>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    return (
        <div className='flex flex-col cardBorder rounded-3xl w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto'>
            <div className='pb-6'>
                <button className='cardColor w-full rounded-3xl pt-4'>
                    <div className='px-4'>
                        <h1 className='headingTextWhite text-lg sm:text-xl md:text-2xl mb-4'>
                            {title}
                        </h1>
                        <p className='cardTextWhiteSmall text-xs sm:text-xs text-center mb-5'>
                            {description}
                        </p>
                    </div>
                </button>
                <div className='cardTextBlack px-4'>
                    <p className='mt-5 mb-2 text-sm sm:text-base'>
                        Including the following features
                    </p>
                    <div className='flex flex-row items-baseline mb-2'>
                        <h1 className='headingTextBlue text-lg sm:text-xl lg:text-5xl ml-6 mr-4'>
                            {videoCount}
                        </h1>
                        <p className='cardTextBlack text-sm sm:text-base'>
                            Video{" "}
                        </p>
                    </div>

                    {durationOptions.length > 0 && (
                        <div className='cardColorChild rounded-3xl mb-3'>
                            <div className='flex flex-row justify-between px-4 py-2'>
                                <p className='cardTextWhiteSmall text-white'>
                                    duration{" "}
                                </p>
                                <TimeSelector>
                                    {durationOptions.map((option) => (
                                        <button
                                            key={option}
                                            value={option}
                                            className='text-xs'
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </TimeSelector>
                            </div>
                        </div>
                    )}
                    {editingOptions.length > 0 && (
                        <div className='cardColorChild rounded-3xl mb-3'>
                            <div className='flex flex-row justify-between px-4 py-2'>
                                <p className='cardTextWhiteSmall text-white'>
                                    Edit{" "}
                                </p>
                                <TimeSelector>
                                    {editingOptions.map((option) => (
                                        <button
                                            key={option}
                                            value={option}
                                            className='text-xs'
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </TimeSelector>
                            </div>
                        </div>
                    )}
                    {aspectRatioOptions.length > 0 && (
                        <div className='cardColorChild rounded-3xl mb-3'>
                            <div className='flex flex-row justify-between px-4 py-2'>
                                <p className='cardTextWhiteSmall text-white'>
                                    Aspect Ratio{" "}
                                </p>
                                <TimeSelector>
                                    {aspectRatioOptions.map((option) => (
                                        <button
                                            key={option}
                                            value={option}
                                            className='text-xs'
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </TimeSelector>
                            </div>
                        </div>
                    )}
                    {price && (
                        <div className='headingTextBlueSmall flex justify-center items-center whitespace-nowrap px-4 py-2'>
                            <h1 className='text-lg sm:text-xl'>{price} TL</h1>
                        </div>
                    )}
                    {onOrderClick && (
                        <div className='flex justify-center px-4 pt-2 pb-6'>
                            <button
                                className='cardButton rounded-3xl px-8 py-2'
                                onClick={onOrderClick}
                            >
                                <p className='text-white text-sm sm:text-base'>
                                    Order Now{" "}
                                </p>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomCard;

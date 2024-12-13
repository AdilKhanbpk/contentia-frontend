import Image from 'next/image';
import infuencerMarketingImage from '../../../../public/blog/influencer-marketing.svg'

const Feed: React.FC = () => {
  return (
    <div className=' mt-14'>
      <div className='text-3xl md:text-4xl font-bold BlueText text-center md:text-left'>
        Contentia Blog
      </div>

      <div className='flex flex-col md:flex-row justify-between items-center gap-5 mt-6'>
        {/* Left Text Section */}
        <div className='flex-1'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold leading-snug'>
            28 Influencer Marketing <br /> Examples That Rock
          </h2>
          <p className='font-semibold mt-2 text-sm md:text-base lg:text-lg'>
            More businesses are waking up to the power of influencer marketing. Seventy-o…
          </p>
          <button className='ButtonBlue text-white py-2 px-4 rounded-full mt-4 text-sm md:text-base lg:text-lg'>
            Devamını Oku
          </button>
        </div>

        {/* Right Image Section */}
        <div className='flex-1 flex justify-center '>
          <Image 
            src={infuencerMarketingImage} 
            alt="Influencer Marketing" 
            width={500} 
            height={300}
            priority 
            className='w-full h-auto  lg:max-w-[600px]'
          />
        </div>
      </div>
    </div>
  );
}

export default Feed;

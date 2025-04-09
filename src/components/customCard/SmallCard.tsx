interface SmallCardProps {
    image: string;
    title: string;
    description: string;
}

const SmallCard: React.FC<SmallCardProps> = ({ image, title, description }) => {
    return (
        <div className='gradient-border'>
            <div className='mb-1'>
                <img
                    src={image}
                    alt={title}
                />
            </div>
            <div className='p-2'>
                <h3 className=' cardTextBlue'>{title}</h3>
                <p className='paraTextTwo'>{description}</p>
            </div>
        </div>
    );
};

export default SmallCard;

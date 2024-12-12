import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface PlanFormData {
    title: string;
    description: string;
    price: number;
    platform: string;
    edit: string;
    duration: string;
    aspectRatio: string;
    share: string;
    coverPicture: string;
    creatorType: string;
    shipping: string;
    customerName: string;
    numberOfUGC: number;
}

export default function Home() {

    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [isEdit, setIsEdit] = useState('');
    const [aspectRatio, setAspectRatio] = useState('');
    const [isShare, setIsShare] = useState('');
    const [isCoverPicture, setIsCoverPicture] = useState('');
    const [creatorType, setCreatorType] = useState('');
    const [isShipping, setIsShipping] = useState('');
    const [duration, setDuration] = useState('');
    const { register, handleSubmit, control, watch } = useForm<PlanFormData>();

    const onSubmitForm: SubmitHandler<PlanFormData> = (data) => {
        console.log('Form Data:', data);
    };

    const numberOfUGC = watch('numberOfUGC');
    const price = watch('price');
    const totalPrice = (numberOfUGC || 0) * (price || 0);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="bg-white my-4 p-4 sm:my-6 sm:p-5 md:my-8 md:p-6 lg:my-8 lg:p-6">
                    <h2 className="text-lg mb-6 font-semibold">Create Custom Package</h2>
                    <div className="flex flex-col lg:flex-row justify-start items-start space-y-4 lg:space-y-0 lg:space-x-28">
                        <div className="mt-2 grid grid-cols-1 lg:grid-cols-1">
                            {/* Select Customer */}
                            <div>
                                <label className="block text-sm font-semibold mt-2">Select Customer:</label>
                                <input
                                    type="text"
                                    placeholder="Enter customer name"
                                    className="w-full px-1 md:px-3 py-0.5 md:py-1 border rounded-md focus:outline-none"
                                    {...register('customerName')}
                                />
                            </div>

                            {/* No of UGC */}
                            <div>
                                <label className="block text-sm font-semibold mt-2">No of UGC:</label>
                                <input
                                    type="number"
                                    placeholder="Enter number of UGC"
                                    className="w-full px-1 md:px-3 py-0.5 md:py-1 border rounded-md focus:outline-none"
                                    {...register('numberOfUGC')}
                                />
                            </div>

                            {/* Select Price */}
                            <div>
                                <label className="block text-sm font-semibold mt-2">Select Price:</label>
                                <input
                                    type="number"
                                    placeholder="Enter price"
                                    className="w-full px-1 md:px-3 py-0.5 md:py-1 border rounded-md focus:outline-none"
                                    {...register('price')}
                                />
                            </div>

                            {/* Total Price Display */}
                            <div className="mt-4">
                                <span className="block text-sm font-semibold">Total Price:</span>
                                <span className="text-lg BlueText font-semibold">{totalPrice.toFixed(2)} TL</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-md mb-4 sm:mb-6 md:mb-8 lg:mb-8">
                            <h3 className=" font-semibold mb-4 BlueText">Select Additional Services</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                                {/* Platform Radio Buttons */}
                                <div className="text-gray-700 font-semibold">Platform:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="platform"
                                        control={control}
                                        defaultValue="TikTok"
                                        render={({ field }) => (
                                            <>
                                                {['TikTok', 'Meta', 'Diğer'].map((platform) => (
                                                    <button
                                                        key={platform}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${selectedPlatform === platform ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            setSelectedPlatform(platform);
                                                            field.onChange(platform);
                                                        }}
                                                    >
                                                        {platform}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Duration Radio Buttons */}
                                <div className="text-gray-700 font-semibold">Duration:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="duration"
                                        control={control}
                                        defaultValue="15s"
                                        render={({ field }) => (
                                            <>
                                                {['15s', '30s', '60s'].map((dur) => (
                                                    <button
                                                        key={dur}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${duration === dur ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            setDuration(dur);
                                                            field.onChange(dur);
                                                        }}
                                                    >
                                                        {dur}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Edit Option */}
                                <div className="text-gray-700 font-semibold">Edit:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="edit"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                {['Yes', 'No'].map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${isEdit === option ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            setIsEdit(option);
                                                            field.onChange(option);
                                                        }}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Aspect Ratio */}
                                <div className="text-gray-700 font-semibold">Aspect Ratio:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="aspectRatio"
                                        control={control}
                                        defaultValue="9:16"
                                        render={({ field }) => (
                                            <>
                                                {['9:16', '16:9'].map((ratio) => (
                                                    <button
                                                        key={ratio}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${aspectRatio === ratio ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            setAspectRatio(ratio);
                                                            field.onChange(ratio);
                                                        }}
                                                    >
                                                        {ratio}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Share Option */}
                                <div className="text-gray-700 font-semibold">Share:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="share"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                {['Yes', 'No'].map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${isShare === option ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            setIsShare(option);
                                                            field.onChange(option);
                                                        }}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Cover Picture Option */}
                                <div className="text-gray-700 font-semibold">Cover Picture:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="coverPicture"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                {['Yes', 'No'].map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${isCoverPicture == option ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            setIsCoverPicture(option);
                                                            field.onChange(option);
                                                        }}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Creator Type */}
                                <div className="text-gray-700 font-semibold">Creator Type:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="creatorType"
                                        control={control}
                                        defaultValue="Nano"
                                        render={({ field }) => (
                                            <>
                                                {['Nano', 'Micro'].map((type) => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${creatorType === type ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            setCreatorType(type);
                                                            field.onChange(type);
                                                        }}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>

                                {/* Shipping Option */}
                                <div className="text-gray-700 font-semibold">Shipping:</div>
                                <div className="flex space-x-4">
                                    <Controller
                                        name="shipping"
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                {['Yes', 'No'].map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        className={`px-1 py-0.5 min-w-16 max-w-16 border text-xs rounded-sm ${isShipping === option ? 'ButtonBlue text-white' : 'bg-gray-200'}`}
                                                        onClick={() => {
                                                            setIsShipping(option);
                                                            field.onChange(option);
                                                        }}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Save Button */}
                    <div className="mt-6 text-right">
                        <button type="submit" className="ButtonBlue text-white px-6 py-0.5 rounded">Save</button>
                    </div>
                </div>
            </form>
        </>
    );
}

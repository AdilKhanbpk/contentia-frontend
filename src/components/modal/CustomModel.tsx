import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    title: string | React.ReactNode;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    closeModal,
    title,
    children,
}) => {
    return (
        <Transition
            appear
            show={isOpen}
            as={Fragment}
        >
            <Dialog
                as='div'
                className='relative z-10'
                onClose={closeModal}
            >
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <div className='flex justify-center items-center my-20 xs:my-20 md:my-16 lg:my-24 px-4 xs:px-6 md:px-8 lg:px-28 p-12 xs:p-12 md:p-12 lg:p-12'>
                                <DialogPanel className=' transform overflow-hidden rounded bg-white  text-left align-middle shadow-xl transition-all'>
                                    <DialogTitle
                                        as='h3'
                                        className='text-lg font-medium leading-6 text-gray-900 '
                                    >
                                        {title}
                                    </DialogTitle>
                                    <div className=''>
                                        {children}
                                        <div className='absolute top-1 right-1'>
                                            <button
                                                onClick={closeModal}
                                                aria-label='Close Modal'
                                                className='absolute top-1 right-1 p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                            >
                                                <Image
                                                    width={20}
                                                    height={20}
                                                    src='/x.png'
                                                    alt='Close icon'
                                                    className='w-6 h-6'
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </div>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;

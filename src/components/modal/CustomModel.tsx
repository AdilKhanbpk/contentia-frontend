// components/Modal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    title: string | React.ReactNode;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, title, children }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >

                            <div className='flex justify-center items-center my-20 sm:my-20 md:my-16 lg:my-24 px-4 sm:px-6 md:px-8 lg:px-28 p-12 sm:p-12 md:p-12 lg:p-12'>
                                <Dialog.Panel className=" transform overflow-hidden rounded bg-white  text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 ">
                                        {title}
                                    </Dialog.Title>
                                    <div className="">
                                        {children}
                                        <div className="absolute top-1 right-1">
                                            <Image width={20} height={20} src="/x.png" alt="Close Button" className="w-8 h-8" onClick={closeModal} />
                                        </div>
                                    </div>



                                </Dialog.Panel>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;

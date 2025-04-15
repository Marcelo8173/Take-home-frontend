'use client';

import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    handleAddUser: () => void;
    title: string;
    children?: React.ReactNode;
}

const Modal = ({
    isOpen,
    title,
    children,
}: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default Modal;
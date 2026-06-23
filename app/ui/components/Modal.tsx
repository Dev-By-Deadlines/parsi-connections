
'use client'

import { useEffect, ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-background/69"
                onClick={onClose}
            />
            {/* Modal content */}
            <div className={`relative bg-background m-4 lg:m-6 border border-border hover:border-primary/30 rounded-2xl w-full md:w-[500] lg:w-[600] transition-all`}>
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-border">
                    <h2 className="text-xl font-semibold text-primary">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-text-muted text-2xl px-2 hover:bg-text-muted/10 rounded-xl"
                        aria-label="Close"
                    >
                     × 
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
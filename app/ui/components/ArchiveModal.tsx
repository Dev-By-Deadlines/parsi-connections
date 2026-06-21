'use client'

import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { useState } from "react";
import { ArchiveItems } from "@/app/lib/types";

interface ArchiveModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ArchiveModal({isOpen, onClose}:ArchiveModalProps) {
    const router = useRouter();
    const [items, setItems] = useState<ArchiveItems[]>([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    return(
        <Modal title="لیست آرشیو پازل ها" isOpen={isOpen} onClose={onClose}>
            <div className="min-h-0 max-h-[350] bg-border/20 rounded-2xl py-2 px-4">
                
            </div>
        </Modal>
    );
}
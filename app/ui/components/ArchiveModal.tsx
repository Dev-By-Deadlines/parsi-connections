'use client'

import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { ArchiveItems } from "@/app/lib/types";
import { fetchArchive } from "@/app/lib/api";
import Button from "./Button";
import { BackwardIcon, ForwardIcon, PlayIcon, ShareIcon } from "./SVGIcons";
import FeedbackMessage from "./FeedBackMessage";

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

    const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
    }>({
        message: "",
        type: "info",
    });

    useEffect(() => {
        if (isOpen) {
            loadArchives(page);
        }
    }, [isOpen, page]);

    const loadArchives = async (pageNum: number) => {
        try {
            setIsLoading(true);
            const data = await fetchArchive(pageNum, 4);
            setItems(data.items);
            setTotalItems(data.total);
            setTotalPages(data.totalPages);

        } catch (error) {
            console.error("failed to load archives",error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlayPuzzle = (puzzleId: number) => {
        onClose();
        router.push(`/puzzle/${puzzleId}`);
    };

    const handleShare = async (puzzleId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const url = `${window.location.origin}/puzzle/${puzzleId}`;
        try {
            await navigator.clipboard.writeText(url);
            setFeedback({ message: "با موفقیت کپی شد", type: "success" });
            setTimeout(() => setFeedback({ message: "", type: "info" }), 4000);

        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const getStatusInfo = (item: ArchiveItems) => {
        if (item.outcome === 'Won') {
            return { label: 'بُرد', className: 'bg-success/10 first:bg-success text-success '};
        }
        if (item.outcome === 'Lost') {
            return { label: 'باخت', className: 'bg-error/10 first:bg-error text-error'};            
        }
        if (item.outcome === 'Playing') {
            return { label: 'درحال بازی', className: 'bg-primary/10 first:bg-primary text-primary'}
        }
        if (item.outcome === null) {
            return { label: 'بازی نشده', className: 'bg-warning/10 first:bg-warning text-warning'}
        }
    };


    const itemsStyles = 'flex-1 text-center text-sm';

    return(
        <Modal title="لیست آرشیو پازل ها" isOpen={isOpen} onClose={onClose}>
            <div className="min-h-0 overflow-hidden">
                {isLoading ? (
                    <div className="min-h-[350] flex justify-center items-center animate-pulse">در حال گرفتن اطلاعات ...</div>
                ) : (items.length === 0 ? (
                    <div> انگار که اطلاعاتی وجود نداره! </div>
                ) : (
                <div className="flex flex-col min-h-0 max-h-[350] overflow-y-scroll rounded-xl">
                    {/* Header */}
                    <div className="sticky top-0 flex justify-between items-center gap-2 py-1 text-text-muted shadow-lg shadow-background bg-background">
                        <p className={`${itemsStyles}`}>شماره پازل</p>
                        <p className={`${itemsStyles}`}>تاریخ روزانه</p>
                        <p className={`${itemsStyles} max-w-10`}>✦</p>
                        <p className={`${itemsStyles}`}>وضعیت</p>
                        <p className={`${itemsStyles}`}>عملیات</p>
                    </div>
                    {items.map((item) => {
                        const status = getStatusInfo(item);
                        return(                                
                        <div key={item.puzzleId}
                        className="flex justify-between items-center gap-2 py-4 border-b last:border-0 border-border/50 hover:bg-border/20 active:bg-border/20">
                            <p className={`${itemsStyles}`}>پازل {item.puzzleId}</p>
                            <p title="last used in daily date" className={`${itemsStyles}`}>{item.lastUsedInDaily}</p>
                            <p className={`${itemsStyles} max-w-10`}>✦ {item.remainingHealth}</p>
                            <p className={`${itemsStyles} py-1 text-sm rounded-xl ${status?.className}`}>{status?.label}</p>
                            <div className={`flex ${itemsStyles} gap-2 items-center justify-center`}>
                                <Button title="playPuzzle" variant="iconBased"
                                onClick={() => handlePlayPuzzle(item.puzzleId)}>
                                    <PlayIcon/>
                                </Button >
                                <Button title="sharePuzzle" variant="iconBased"
                                onClick={(e) => handleShare(item.puzzleId, e)}>
                                    <ShareIcon/>
                                </Button>
                            </div>
                        </div>
                        )
                    })}
                </div>
                ))}
                {/* pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 py-2">
                        <Button variant="iconBased" className="w-full" disabled={page === totalPages}
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        title="nextPage">
                            بعدی
                        </Button>      
                        <Button variant="iconBased" disabled={page === totalPages} onClick={() => setPage(totalPages)}
                        title="lastPage">
                            <ForwardIcon/>
                        </Button>      
                        <span className="w-full text-center text-text-muted">
                            صفحه {page} از {totalPages}
                        </span>                          
                        <Button variant="iconBased" disabled={page === 1} onClick={() => setPage(1)}
                        title="firstPage">
                            <BackwardIcon/>
                        </Button>      
                        <Button variant="iconBased" className="w-full" disabled={page === 1} 
                        onClick={() => setPage(Math.max(1, page - 1))}
                        title="previousPage">
                            قبلی
                        </Button>   
                    </div>
                )}
            </div>
            <div className="relative bottom-0 translate-y-8">
                <FeedbackMessage 
                message={feedback.message}
                type={feedback.type}
                onClear={() => setFeedback({message: '', type:'info'})}/>
            </div>
        </Modal>
    );
}


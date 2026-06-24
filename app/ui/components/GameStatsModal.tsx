'use client'

import { PuzzleStats } from '@/app/lib/types';
import Modal from './Modal';
import Button from './Button';
import { useState } from 'react';
import FeedbackMessage from './FeedBackMessage';

interface GameStats {
    isOpen: boolean;
    onClose: () => void;
    stats: PuzzleStats | null;
    puzzleId: number;
    isLoading: boolean;
    isArchive: boolean;
}

export default function GameStatsModal({isOpen, onClose, stats, puzzleId, isLoading, isArchive = false}: GameStats){
    const [feedback, setFeedback] = useState<{
        message: string;
        type: "success" | "error" | "warning" | "info";
        }>({
            message: "",
            type: "info",
        });

    const handleShare = async () => {
        try {
            const gridText = stats?.guessGrid?.join('\n') || '';
            
            const baseURL = 'https://kalamboot.ir';            
            const puzzleURL = isArchive
            ? `${baseURL}/puzzle/${puzzleId}` : `${baseURL}`

            const parts = [
            `🎯 کلمبوط شماره ${puzzleId}`,
            '',
            `📊 نتیجه: ${stats?.playerOutcome === 'Won' ? '✅ برد' : '❌ باخت'}`,
            `❤️ تعداد خطای باقیمانده: ${stats?.playerHealth || 0}`,
            '',
            gridText,
            '',
            `تو هم شانس خودتو امتحان کن!`,
            `🔗 ${puzzleURL}`
            ];
            const shareData = '\u200F' + parts.join('\n');

            await navigator.clipboard.writeText(shareData);
            setFeedback({ message: "با موفقیت کپی شد", type: "success" });
            setTimeout(() => setFeedback({ message: "", type: "info" }), 4000);
        } catch (error) {
            console.error('failed to copy: ', error)
        }
    }
    return(
        <Modal isOpen={isOpen} onClose={onClose} title={`آمار پازل شماره ${puzzleId} `}>
            {isLoading ? (
                <div>
                    در حال گرفتن اطلاعات آمار بازی ...
                </div>
            ) : ( stats ? (
                <div className='flex flex-col gap-2'>

                    {/* puzzle */}
                    <div className='flex flex-col gap-1 bg-text-muted/4 rounded-2xl p-3'>
                        
                        {/* Total players */}
                        <div className='flex flex-row justify-between items-center text-text-muted w-full'>
                            <h5>تعداد بازیکنان این پازل</h5>
                            <p className='text-primary'>{stats.totalPlayers} نفر</p>
                        </div>
                        {/* Win rate */}
                        <div className='flex flex-row justify-between items-center text-text-muted w-full'>
                            <h5>نرخ برد</h5>
                            <p className='text-primary'>{stats.winRate} درصد</p>
                        </div>
                    </div>
                    
                    <div className='flex flex-row gap-2 w-full'>
                        {/* player */}
                        <div className='flex flex-col flex-2 w-full gap-1 bg-text-muted/4 rounded-2xl p-3'>
                            {/* Plyer health */}
                            <div className='flex flex-row justify-between items-center text-text-muted w-full'>
                                <h5>میزان خطای باقی مانده (HP)</h5>
                                <p className='text-primary'>{stats.playerHealth}/4</p>
                            </div>
                            {/* Player outcome */}
                            <div className='flex flex-row justify-between items-center text-text-muted w-full'>
                                <h5>نتیجه بازی</h5>
                                <p className='text-primary'>{stats.playerOutcome === 'Won' ? 'بُرد' : 'باخت'}</p>
                            </div>
                            {/* Player percentile */}
                            {/* <div className='flex flex-row justify-between items-center text-text-muted w-full'>
                                <p> از <span className='text-primary'>{stats.playerPercentile}%</span>بازیکن ها بهتر عمل کردی</p>
                            </div> */}
                        </div>

                        {/* guess stats */}
                        <div className='flex flex-col justify-center bg-text-muted/4 rounded-2xl py-2 px-2'>
                        {stats.guessGrid.map((item, i) => (
                            <p key={i} className='text-xs'>{item}</p>
                        ))}
                        </div>
                    </div>
                    {/* action buttons */}
                    <Button className='rounded-2xl' disabled={false}
                    onClick={handleShare}>
                        اشتراک گذاری نتایج
                    </Button>
                    <div className="relative bottom-0 translate-y-8">
                        <FeedbackMessage 
                        message={feedback.message}
                        type={feedback.type}
                        onClear={() => setFeedback({message: '', type:'info'})}/>
                    </div>
                </div>
            ) : (
                <div>
                    آماری وجود نداره!
                </div>
            ))}
        </Modal>
    );
}
                       
                    
                    
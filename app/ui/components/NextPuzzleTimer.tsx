'use client';

import { useState, useEffect } from 'react';

export default function NextPuzzleTimer() {
    const [timeRemaining, setTimeRemaining] = useState<string>('');
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
        const calculateTimeRemaining = () => {
            const now = new Date();
            // Convert to Iran timezone offset
            const iranOffset = 3.5 * 60 * 60 * 1000; // 3.5 hours in ms
            const iranNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + iranOffset);
            
            // Target 03:30 Iran time
            let target = new Date(iranNow);
            target.setHours(3, 30, 0, 0);
            
            // If current time is past target, target is tomorrow
            if (iranNow > target) {
                target = new Date(target.getTime() + 24 * 60 * 60 * 1000);
            }
            
            const diff = target.getTime() - iranNow.getTime();
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (3600000)) / (1000 * 60));
            const seconds = Math.floor((diff % (60000)) / 1000);
            
            setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        };
        
        calculateTimeRemaining();
        const interval = setInterval(calculateTimeRemaining, 1000);
        
        return () => clearInterval(interval);
    }, []);
    
    if (!mounted) return null;
    
    return (
        <div className="flex flex-row items-center border border-border bg-text-muted/6 rounded-2xl p-1 text-text-muted">
            <p className='rounded-2xl bg-text-muted/10 px-2 font-mono text-primary-hover/50'>
                {timeRemaining}
            </p>
            <p className='px-2'>تا پازل روز بعد</p>
        </div>
    );
}
'use client'

interface FeedbackMessageProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    onClear?: () => void;
}

export default function FeedbackMessage({ message, type, onClear }: FeedbackMessageProps) {
    const base = 'flex items-center w-full justify-between gap-2 py-2 px-4 rounded-2xl border text-center transition-all'
    if (!message) return null;
    
    const typeStyles = {
        success: 'bg-success/20 text-success border-success/50',
        error: 'bg-error/20 text-error border-error/50',
        warning: 'bg-warning/20 text-warning border-warning/50',
        info: 'bg-primary/20 text-primary border-primary/50'
    };
    
    return (
        <div className={`${base} ${typeStyles[type]} `}>
            {message}
            {onClear && (
                <button onClick={onClear}>
                   ×
                </button>
            )}
        </div>
    );
}
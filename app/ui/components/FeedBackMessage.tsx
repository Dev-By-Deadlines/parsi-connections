'use client'

interface FeedbackMessageProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    onClear?: () => void;
}

export default function FeedbackMessage({ message, type, onClear }: FeedbackMessageProps) {
    const base = 'flex items-center justify-between gap-2 py-2 px-4 rounded-2xl transition-all'
    if (!message) return null;
    
    const typeStyles = {
        success: 'bg-success/20 text-success',
        error: 'bg-error/20 text-error',
        warning: 'bg-warning/20 text-warning',
        info: 'bg-primary/20 text-primary'
    };
    
    return (
        <div className={`absolute z-50 h-fit w-full inset-0 ${base} ${typeStyles[type]} `}>
            {message}
            {onClear && (
                <button onClick={onClear}>
                   ×
                </button>
            )}
        </div>
    );
}
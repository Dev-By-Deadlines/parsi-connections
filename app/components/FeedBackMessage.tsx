'use client'

interface FeedbackMessageProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    onClear?: () => void;
}

export default function FeedbackMessage({ message, type, onClear }: FeedbackMessageProps) {
    if (!message) return null;
    
    const typeStyles = {
        success: 'bg-success/20 text-success border-success/50',
        error: 'bg-error/20 text-error border-error/50',
        warning: 'bg-warning/20 text-warning border-warning/50',
        info: 'bg-primary/20 text-primary border-primary/50'
    };
    
    return (
        <div className={`p-3 rounded-lg border text-center relative ${typeStyles[type]}`}>
            {message}
            {onClear && (
                <button 
                    onClick={onClear}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
                >
                    ✕
                </button>
            )}
        </div>
    );
}
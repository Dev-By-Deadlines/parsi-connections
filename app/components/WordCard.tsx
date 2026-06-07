interface WordCardProp {
    word?: string;
    onClick: () => void;
    isDisabled: boolean;
    isSelected: boolean;
}

export default function WordCard({word, onClick, isDisabled: disabled = false, isSelected}:WordCardProp){
    const base = 'flex justify-center items-center h-20 w-[100] p-2 border-2 border-border rounded-3xl text-center text-sm transition-all';
    
    const variants = {
        natural: 'text-text',
        selected: 'border-primary bg-primary/10 text-primary font-bold shadow-xl shadow-primary/20',
        disabled: 'border-border/30 text-text-muted'
    };
    let currentVariant = variants.natural;
    disabled ? currentVariant = variants.disabled : 
    (isSelected && !disabled ? (currentVariant = variants.selected) : (currentVariant = variants.natural))

    return(
        <button className={`${base} ${currentVariant}`} 
        onClick={onClick} disabled={disabled}>
            {word}
        </button>
    );
}
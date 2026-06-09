interface WordCardProp {
    word?: string;
    onClick: () => void;
    isDisabled: boolean;
    isSelected: boolean;
}

export default function WordCard({word, onClick, isDisabled: disabled = false, isSelected}:WordCardProp){
    const base = 'flex justify-center items-center h-20 w-full p-2 border border-border rounded-lg md:rounded-2xl text-center text-sm transition-all';
    
    const variants = {
        natural: 'text-text',
        selected: 'border-primary bg-primary/10 text-primary font-semibold shadow-2xl shadow-primary/15',
        disabled: 'border-border/30 text-text-muted'
    };
    let currentVariant = variants.natural;
    disabled ? currentVariant = variants.disabled : 
    (isSelected && !disabled ? (currentVariant = variants.selected) : (currentVariant = variants.natural))

    return(
        <button className={`${base} ${currentVariant} `} 
        onClick={onClick} disabled={disabled}>
            {word}
        </button>
    );
}
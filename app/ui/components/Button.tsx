export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    children: React.ReactNode;
    disabled?: boolean;
    variant?: 'primary' | 'disabled' | 'iconBased';
}
export default function Button({className, children, disabled, variant = 'primary', ...props}:ButtonProps){
    const buttonBase = 'flex items-center justify-center p-2 text-sm md:text-md lg:text-lg transition-all';

    const variants = {
        primary: 'font-bold bg-primary text-onSurfaceDark cursor-pointer rounded-xl hover:bg-primary-hover hover:shadow-lg hover:shadow-primary-hover/10',
        disabled: 'bg-primary/2 text-primary/18 rounded-xl',
        iconBased: 'flex justify-between items-center bg-primary/2 rounded-xl gap-2 text-primary text-sm hover:bg-primary-hover/10 active:bg-primary-hover/18',
    }
    return(
        <button {...props} disabled={disabled} 
        className={`${buttonBase} ${className} ${disabled ? variants.disabled : variants[variant]}`}>
            {children}
        </button>
    );
}
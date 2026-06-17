export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    children: React.ReactNode;
    disabled: boolean;
}
export default function Button({className, children, disabled, ...props}:ButtonProps){
    const buttonBase = 'flex w-full h-fit items-center justify-center py-2 transition-all text-sm md:text-md lg:text-lg';

    const variants = {
        primary: 'font-bold bg-primary text-onSurfaceDark cursor-pointer hover:bg-primary-hover hover:shadow-lg hover:shadow-primary-hover/10',
        disabled: 'bg-primary/10 text-onSurfaceDark',
    }
    return(
        <button {...props} disabled={disabled} 
        className={`${buttonBase} ${className} ${disabled ? variants.disabled : variants.primary}`}>
            {children}
        </button>
    );
}
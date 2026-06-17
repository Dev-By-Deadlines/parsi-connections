type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string; 
}
export default function IconButton({children, className, ...props}: IconButtonProps) {
        const base = 'w-fit flex justify-between items-center gap-2 text-primary text-sm border border-primary/20 p-2 rounded-2xl transition-all hover:bg-primary-hover/6 hover:shadow-lg hover:shadow-primary-hover/10'
  return (
      <button className={`${base} ${className}`} {...props}>
        {children}
      </button>
  );
}
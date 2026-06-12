export default function LinkButton({children, link}
    :{children: React.ReactNode, link: string}) {
  return (
      <a 
        className="h-fit w-fit flex justify-between items-center gap-2 text-primary text-sm border border-primary/20 p-2 rounded-2xl transition-all hover:bg-primary-hover/6 hover:shadow-lg hover:shadow-primary-hover/10"
        target="_blank"
        href={link}
        >
        {children}
      </a>
  );
}

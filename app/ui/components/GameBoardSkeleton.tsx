

export default function GameBoardSkeleton() {
    const base = 'animate-pulse flex justify-center items-center h-20 w-full p-2 border border-border rounded-lg md:rounded-2xl text-center text-sm transition-all';
    return(
        <div id="skelete" className="grid grid-cols-4 gap-2 w-full">
            {Array.from({length: 16}).map((_, i) => (
                <span key={i} className={base}/>
            ))}
        </div>
    );
}
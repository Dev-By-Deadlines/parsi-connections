

export default function GameBoardSkeleton() {
    const base = 'animate-pulse h-20 w-full p-2 bg-border/30 rounded-lg md:rounded-2xl';
    return(
        <div className="flex flex-col w-full gap-6 justify-center items-center text-border">
            <div id="skelete" className="grid grid-cols-4 gap-2 w-full">
                {Array.from({length: 16}).map((_, i) => (
                    <span key={i} className={base}/>
                ))}
            </div>
            <div className="flex gap-2 opacity-15">
                {Array.from({ length: 4}).map((_,i) => (
                    <span key={i} className="text-2xl">
                    ✦
                    </span>
                ))}
            </div>
            <div className="flex w-full gap-1 opacity-15">
                <div className="flex w-full h-10 bg-border px-6 py-2 rounded-s-2xl rounded-e-md"/>
                <div className="flex w-full h-10 bg-border px-6 py-2 rounded-e-2xl rounded-s-md"/>
            </div>
        </div>
    );
}
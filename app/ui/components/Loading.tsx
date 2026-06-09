
export default function Loading({text}:{text: string}){
    return(
        <div className="flex flex-col justify-center items-center text-text-muted">
            <p className="animate-pulse">{text}</p>
        </div>
    );
}
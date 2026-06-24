'use client'

import { useState } from "react";
import Header from "./Header";
import HowToPlayModal from "../HowToPlayModal";


export default function HeaderWrapper(){
    const [showHowToPlay, setShowHowToPlay] = useState(false);
    
    return(
        <>
        <Header onHowToPlay={() => setShowHowToPlay(true)}/>
        <HowToPlayModal 
        isOpen={showHowToPlay} 
        onClose={() => setShowHowToPlay(false)} />
        </>
    );
}
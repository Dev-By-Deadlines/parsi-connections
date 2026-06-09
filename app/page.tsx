'use client'

import { useEffect, useState } from "react";
import FeedbackMessage from "./ui/components/FeedBackMessage";
import GameBoard from "./ui/components/GameBoard";
import { PuzzleResponse } from "./lib/types";
import { fetchDailyPuzzle, submitGuess } from "./lib/api";

import GameBoardSkeleton from "./ui/components/GameBoardSkeleton";
import GameControls from "./ui/components/GameControls";
import SolvedCategories from "./ui/components/SolvedCategories";


export default function Home() {
    const [gameData, setGameData] = useState<PuzzleResponse | null>(null);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info'}>({
      message: '', type: 'info'
    });

    useEffect(() =>{
      loadDailyPuzzle();
    }, []);

    const loadDailyPuzzle = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDailyPuzzle();
        setGameData(data);
        setSelectedIndices([]);

      } catch (error) {
        console.error('failed to load puzzle: ', error);
        setFeedback({ message: 'failed to load puzzle. Please refresh.', type: 'error'});
      } finally {
        setIsLoading(false);
      }
    };
    const handleSubmit = async () => {
      if (!gameData || selectedIndices.length !== 4 || isSubmitting) return;

      const selectedWords = selectedIndices.map(i => gameData.unSolvedWords[i]);
      console.log('Words:',selectedWords)
      try {
        console.log('-----\nState:\nHP:',gameData.outcome, gameData.remainingHealth)
        setIsSubmitting(true);
        const res = await submitGuess(gameData.puzzleId, selectedWords);

        setGameData(res.gameStateDto);
        
        console.log('Guess State:\n-----', res)
        console.log('res outcome:\n-----', res.gameStateDto.outcome)
        if (res.gameStateDto.outcome === "Playing"){
          if (res.correct) {
          setFeedback({message: 'آفرین! درست حدس زدی', type: 'success'});
          setTimeout(() => setFeedback({ message: '', type: 'info'}), 2000);
          setSelectedIndices([]);
          } else if (res.oneAway) {
            setFeedback({message: 'یکیش اشتباهه!', type: 'warning'});
            setTimeout(() => setFeedback({ message: '', type: 'info'}), 2000);
          } else {
            setFeedback({message: 'حدست غلطه. دوباره تلاش کن', type: 'error'});
            setTimeout(() => setFeedback({ message: '', type: 'info'}), 2000);
          }
        } else if (res.gameStateDto.outcome === 'Won') {
          setSelectedIndices([]);
          setFeedback({message: 'تبریک! برنده شدی. فردا هم بیا بازی کنیم', type: 'success'});
        } else if (res.gameStateDto.outcome === 'Lost') {
          setSelectedIndices([]);
          setFeedback({message: 'متاسفانه باختی! فردا بازم شانستو امتحان کن.', type: 'error'});
        }
      } catch (error) {
        console.error('failed to submit guess: ', error);
        setFeedback({message: 'failed to sumbit, check your conneciton', type:'error'});
        setSelectedIndices([]);
      } finally {
        setIsSubmitting(false);
      }
    };

    if (isLoading) {
      return(
        <div className="flex flex-col flex-11/12 justify-center items-center gap-4 w-full md:w-[500] lg:w-[600]">
          <GameBoardSkeleton/>
        </div>
      );
    }

    if (!gameData) {
      return(
        <div className="flex flex-col flex-11/12 justify-center items-center gap-4 w-full md:w-[500] lg:w-[600]">
          انگار که مشکلی پیش اومده. چیزی برای نمایش وجود نداره! لطفا صفحه رو رفرش کن
        </div>
      );
    }

    const isGameActive = gameData.outcome === "Playing";
  return (
    <div className="flex flex-col h-full w-full justify-center items-center gap-6">
      <div className="flex flex-col flex-1/12 mt-6 text-center text-primary">
        <h1>پارسی کانکشنز</h1>
        <p className="text-text-muted">دسته های ۴ تایی از کلمات مربوط به هم رو پیدا کن</p>
      </div>
     
      
      <main className="flex flex-col flex-11/12 justify-center items-center gap-4 w-full md:w-[500] lg:w-[600]">
        <div className="flex flex-col flex-10/12 justify-center items-center gap-4 w-full">
          <SolvedCategories categories={gameData.solvedCategoryDtos}/>
          <GameBoard 
            words={gameData.unSolvedWords}
            selectedIndices={selectedIndices}
            onSelectionChange={setSelectedIndices}
            disabled={!isGameActive || isSubmitting}
          />
          <GameControls 
            selectedCount={selectedIndices.length}
            maxSelections={4}
            remainingHealth={gameData.remainingHealth}
            onSubmit={handleSubmit}
            deSelet={() => setSelectedIndices([])}
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="flex flex-1 justify-center w-full">
          <FeedbackMessage 
            message={feedback.message}
            type={feedback.type}
            onClear={() => setFeedback({message: '', type:'info'})}
          />
        </div>
      </main>
      <footer className="flex flex-col items-center justify-center">
        <p className="text-text-muted text-xs">
          نسخه فارسی بازی  
          <a className="px-2 text-primary-hover hover:text-primary" target="_blank" href="https://www.nytimes.com/games/connections">
          ☍ نیویورک تایمز کانکشنز 
          </a>
        </p>
        <a className="py-2 text-primary-hover hover:text-primary" href="https://github.com/Dev-By-Deadlines/parsi-connections">صفحه گیتهاب پروژه</a>
      </footer>
    </div>
  );
}

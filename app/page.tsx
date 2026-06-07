'use client'

import { useEffect, useState } from "react";
import FeedbackMessage from "./components/FeedBackMessage";
import GameBoard from "./components/GameBoard";
import { PuzzleResponse } from "./lib/types";
import { fetchDailyPuzzle, submitGuess } from "./lib/api";


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

      try {
        setIsSubmitting(true);
        const res = await submitGuess(gameData.puzzleId, selectedWords);

        setGameData(res.gameStateDto);
        setSelectedIndices([]);
        if (res.gameStateDto.outcome === 'playing'){
          if (res.correct) {
          setFeedback({message: 'Correct!', type: 'success'});
          setTimeout(() => setFeedback({ message: '', type: 'info'}), 2000);
          } else if (res.oneAway) {
            setFeedback({message: 'One word away...', type: 'warning'});
            setTimeout(() => setFeedback({ message: '', type: 'info'}), 1500);
          } else {
            setFeedback({message: 'X Wrong Guess X', type: 'error'});
            setTimeout(() => setFeedback({ message: '', type: 'info'}), 1500);
          }
        } else if (res.gameStateDto.outcome === 'Win') {
          setFeedback({message: 'You won! Nice Guess', type: 'success'});
        } else if (res.gameStateDto.outcome === 'Lose') {
          setFeedback({message: 'Game over! Better luck tomorrow', type: 'error'});
        }
      } catch (error) {
        console.error('failed to submit guess: ', error);
        setFeedback({message: 'failed to sumbit, check your conneciton', type:'error'});
      } finally {
        setIsSubmitting(false);
      }
    };

    if (isLoading) {
      return(
        <div>

        </div>
      );
    }

    if (!gameData) {
      return(
        <div>

        </div>
      );
    }

    const isGameActive = gameData.outcome === 'playing';
  return (
    <div className="flex flex-col justify-center items-center">
      <FeedbackMessage 
        message={feedback.message}
        type={feedback.type}
        onClear={() => setFeedback({message: '', type:'info'})}
      />
      <main>
        <GameBoard 
        words={gameData.unSolvedWords}
        selectedIndices={selectedIndices}
        onSelectionChange={setSelectedIndices}
        disabled={!isGameActive || isSubmitting}
        />
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import FeedbackMessage from "./ui/components/FeedBackMessage";
import GameBoard from "./ui/components/GameBoard";
import { PuzzleResponse } from "./lib/types";
import { fetchDailyPuzzle, submitGuess } from "./lib/api";

import GameBoardSkeleton from "./ui/components/GameBoardSkeleton";
import GameControls from "./ui/components/GameControls";
import SolvedCategories from "./ui/components/SolvedCategories";
import KalambootLogo, { GitHubLogo, NewYorkTimesLogo } from "./ui/components/SVGIcons";
import LinkButton from "./ui/components/LinkButton";
import NextPuzzleTimer from "./ui/components/NextPuzzleTimer";

export default function Home() {
  const [gameData, setGameData] = useState<PuzzleResponse | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  }>({
    message: "",
    type: "info",
  });

  useEffect(() => {
    loadDailyPuzzle();
  }, []);

  const loadDailyPuzzle = async () => {
    try {
      setIsLoading(true);
      const data = await fetchDailyPuzzle();
      setGameData(data);
      setSelectedIndices([]);
    } catch (error) {
      console.error("failed to load puzzle: ", error);
      setFeedback({
        message: "failed to load puzzle. Please refresh.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async () => {
    if (!gameData || selectedIndices.length !== 4 || isSubmitting) return;

    const selectedWords = selectedIndices.map((i) => gameData.unSolvedWords[i]);
    try {
      setIsSubmitting(true);
      const res = await submitGuess(gameData.puzzleId, selectedWords);

      setGameData(res.gameStateDto);

      if (res.gameStateDto.outcome === "Playing") {
        if (res.correct) {
          setFeedback({ message: "آفرین! درست حدس زدی", type: "success" });
          setTimeout(() => setFeedback({ message: "", type: "info" }), 4000);
          setSelectedIndices([]);
        } else if (res.oneAway) {
          setFeedback({ message: "یکیش اشتباهه!", type: "warning" });
          setTimeout(() => setFeedback({ message: "", type: "info" }), 4000);
        } else {
          setFeedback({ message: "حدست غلطه. دوباره تلاش کن", type: "error" });
          setTimeout(() => setFeedback({ message: "", type: "info" }), 4000);
        }
      } else if (res.gameStateDto.outcome === "Won") {
        setSelectedIndices([]);
        setFeedback({
          message: "تبریک! برنده شدی. فردا هم بیا بازی کنیم",
          type: "success",
        });
      } else if (res.gameStateDto.outcome === "Lost") {
        setSelectedIndices([]);
        setFeedback({
          message: "متاسفانه باختی! فردا بازم شانستو امتحان کن.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("failed to submit guess: ", error);
      setFeedback({
        message: "failed to sumbit, check your conneciton",
        type: "error",
      });
      setSelectedIndices([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-4 w-full md:w-[500] lg:w-[600]">
        <GameBoardSkeleton />
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="flex flex-col text-center gap-10 w-4/6 md:w-[500] lg:w-[600]">
        <span className="text-7xl font-black">! O_o !</span>
        مشکلی پیش اومده.
        اتصالت رو به اینترنت چک کن و صفحه رو مجدد رفرش کن
      </div>
    );
  }
  
  const isGameActive = gameData.outcome === "Playing";
  return (
    <div className="flex flex-col h-full w-full md:w-[500] lg:w-[600] justify-between items-center">
      <header className="flex flex-row justify-between items-center w-full text-primary">
          <div className="flex flex-row items-center gap-3">
            <KalambootLogo />
            <h1 className="-skew-2 text-shadow-lg text-shadow-primary/10">کلمبوط</h1>
          </div>
        <LinkButton link="https://github.com/Dev-By-Deadlines">
          <GitHubLogo/>
        </LinkButton>
      </header>
      <main className="flex flex-col flex-auto justify-center items-center w-full my-3">
      <div className="flex flex-1 w-full justify-center items-center">
        <FeedbackMessage
          message={feedback.message}
          type={feedback.type}
          onClear={() => setFeedback({ message: "", type: "info" })}
        />
      </div>
      <div className="flex flex-col flex-10/12 justify-center items-center gap-4 w-full">
        <p className="text-text-muted text-center text-sm md:text-md lg:text-lg">
          دسته های 4 تایی از <span className="text-primary">کلم</span>ات مر
          <span className="text-primary">بوط</span> به هم رو پیدا کن!
        </p>
        <SolvedCategories categories={gameData.solvedCategoryDtos} />
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
          isGameActive={isGameActive}
        />
      </div>
      </main>
      <footer className="flex flex-col items-center justify-between w-full py-2 text-text-muted">     
        <NextPuzzleTimer/>
        <p>
          •
          <a href="https://www.nytimes.com/games/connections" className="text-sm px-2 underline group-hover:text-primary">
          نسخه فارسی بازی 
          نیویورک تایمز کانکشنز
          </a>
          •
        </p>
      </footer>
    </div>
  );
}

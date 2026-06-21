"use client";

import { useEffect, useState } from "react";
import FeedbackMessage from "./ui/components/FeedBackMessage";
import GameBoard from "./ui/components/GameBoard";
import { PuzzleResponse, PuzzleStats } from "./lib/types";
import { fetchDailyPuzzle, fetchStats, submitGuess } from "./lib/api";

import GameBoardSkeleton from "./ui/components/GameBoardSkeleton";
import GameControls from "./ui/components/GameControls";
import SolvedCategories from "./ui/components/SolvedCategories";
import KalambootLogo, { GitHubLogo, InfoIcon } from "./ui/components/SVGIcons";
import LinkButton from "./ui/components/LinkButton";
import NextPuzzleTimer from "./ui/components/NextPuzzleTimer";
import IconButton from "./ui/components/IconButton";
import HowToPlayModal from "./ui/components/HowToPlayModal";
import Button from "./ui/components/Button";
import GameStatsModal from "./ui/components/GameStatsModal";
import ArchiveModal from "./ui/components/ArchiveModal";

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

  const [showStats, setShowStats] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [stats, setStats] = useState<PuzzleStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [showArchives, setShowArchives] = useState(false);

  // load daily puzzle on mount
  useEffect(() => {
    loadDailyPuzzle();
  }, []);

  // fetching daily puzzle function
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

  // show stats when the game is finished (Lost/Won)
  useEffect(() => {
    if (gameData && gameData.outcome !== 'Playing') {
      loadStats(gameData.puzzleId);
    }    
  }, [gameData?.outcome])

  // fetching game stats function
  const loadStats = async (puzzleId: number) => {
    try {
      setStatsLoading(true);
      const statsData = await fetchStats(puzzleId)
      setStats(statsData);
    } catch (error) {
      console.error('failed to fetch stats', error);
    } finally {
      setStatsLoading(false);
    }
  } 

  // submit button fucntion
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


  // UI Section
  
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
  
  // setting 
  const isGameActive = gameData.outcome === "Playing";
  return (
    <div className="flex flex-col h-full w-full md:w-[500] lg:w-[600] justify-between items-center">
      <header className="flex flex-row justify-between items-center w-full text-primary">
          <div className="flex flex-row items-center gap-3">
            <KalambootLogo className="w-9"/>
            <div className="flex flex-col -skew-2">
              <h2 className="leading-none text-shadow-lg text-shadow-primary/10">کلمبوط</h2>
              <p className="text-text-muted text-sm"> 
                 پازل روزانه <span className="text-primary-hover/80">کلم</span>ات مر
                <span className="text-primary-hover/80">بوط</span>
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">            
            <IconButton onClick={() => setShowHowToPlay(true)}>
              <InfoIcon/>
            </IconButton>
            <LinkButton link="https://github.com/Dev-By-Deadlines">
              <GitHubLogo/>
            </LinkButton>
          </div>
      </header>
      <main className="flex flex-col flex-auto justify-center items-center w-full gap-4 my-3">
        <p className="text-text-muted text-center text-sm md:text-md lg:text-lg">
          دسته های ۴ تایی از کلمات مربوط به هم رو پیدا کن
        </p>
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
          isGameActive={isGameActive}
        />
        {!isGameActive && (
          <Button className="rounded-2xl" disabled={statsLoading} aria-label="view stats"
          onClick={() => setShowStats(true)}>
            مشاهده آمار و نتایج بازی
          </Button>
        )}
        <div className="relative flex w-full justify-center items-center">
          <FeedbackMessage
            message={feedback.message}
            type={feedback.type}
            onClear={() => setFeedback({ message: "", type: "info" })}
          />
        </div>      
      <HowToPlayModal 
      isOpen={showHowToPlay} 
      onClose={() => setShowHowToPlay(false)} />

      <GameStatsModal
      isLoading={statsLoading} 
      isOpen={showStats} 
      stats={stats} 
      onClose={() => setShowStats(false)}
      puzzleId={gameData.puzzleId} />

      <ArchiveModal
      isOpen={showArchives}
      onClose={() => setShowArchives(false)}/>
      </main>

      <footer className="flex flex-row items-center justify-between gap-2 pb-3 w-full">     
        <NextPuzzleTimer/>
        <IconButton className="h-full" onClick={() => setShowArchives(true)}>
          <span>⏷</span>
          <p className="text-sm md:text-lg">آرشیو پازل ها</p>
        </IconButton>
      </footer>
    </div>
  );
}

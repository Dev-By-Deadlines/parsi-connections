"use client";

import { useEffect, useState } from "react";
import FeedbackMessage from "../../ui/components/FeedBackMessage";
import GameBoard from "../../ui/components/GameBoard";
import { PuzzleResponse, PuzzleStats } from "../../lib/types";
import {
  fetchPuzzleById,
  fetchStats,
  submitGuess,
} from "../../lib/api";

import GameBoardSkeleton from "../../ui/components/GameBoardSkeleton";
import GameControls from "../../ui/components/GameControls";
import SolvedCategories from "../../ui/components/SolvedCategories";
import {
  BackIcon,
} from "../../ui/components/SVGIcons";
import Button from "../../ui/components/Button";
import GameStatsModal from "../../ui/components/GameStatsModal";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const params = useParams();
  const router = useRouter();
  const puzzleId = Number(params.id);

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
  const [stats, setStats] = useState<PuzzleStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // load daily puzzle on mount
  useEffect(() => {
    if (puzzleId) {
      loadPuzzle();
    }
  }, [puzzleId]);

  // fetching daily puzzle function
  const loadPuzzle = async () => {
    try {
      setIsLoading(true);
      const data = await fetchPuzzleById(puzzleId);
      setGameData(data);
      setSelectedIndices([]);
    } catch (error) {
      console.error("failed to load puzzle: ", error);
      setFeedback({
        message: `دریافت اطلاعات پازل شماره ${puzzleId} ناموفق بود.`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // show stats when the game is finished (Lost/Won)
  useEffect(() => {
    if (gameData && gameData.outcome !== "Playing") {
      loadStats(gameData.puzzleId);
    }
  }, [gameData?.outcome]);

  // fetching game stats function
  const loadStats = async (puzzleId: number) => {
    try {
      setStatsLoading(true);
      const statsData = await fetchStats(puzzleId);
      setStats(statsData);
    } catch (error) {
      console.error("failed to fetch stats", error);
    } finally {
      setStatsLoading(false);
    }
  };

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

  // Back button functionality
  const handleBackToDaily = () => {
    router.push("/");
  };

  // UI Section

  if (isLoading) {
    return (
      <main className="w-full">
        <GameBoardSkeleton />
      </main>
    );
  }

  if (!gameData) {
    return (
      <main className="w-full">
        <span className="text-7xl font-black">! O_o !</span>
        مشکلی پیش اومده. اتصالت رو به اینترنت چک کن و صفحه رو مجدد رفرش کن
      </main>
    );
  }

  // setting
  const isGameActive = gameData.outcome === "Playing";
  return (
    <main className="flex flex-col justify-center items-center w-full gap-4">
      <div className="w-full flex items-center gap-1">
        <Button className="w-full rounded-e-md" variant="iconBased">
           پازل شماره {puzzleId}  
        </Button>
        <Button className="w-full rounded-s-md" variant="iconBased" onClick={handleBackToDaily}>
          بازگشت به پازل روزانه
          <BackIcon />
        </Button>
      </div>
      {isGameActive ? 
      (
      <p className="text-text-muted text-center text-sm md:text-md lg:text-lg">
        دسته های ۴ تایی از کلمات مربوط به هم رو پیدا کن
      </p>
      ):(
      <p className="text-text-muted text-center text-sm md:text-md lg:text-lg">
        خسته نباشی! بازی تموم شد
      </p>
      )}
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
      {!isGameActive && (
        <Button
          className="w-full"
          disabled={statsLoading}
          aria-label="view stats"
          onClick={() => setShowStats(true)}
        >
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

      <GameStatsModal
        isLoading={statsLoading}
        isOpen={showStats}
        stats={stats}
        onClose={() => setShowStats(false)}
        puzzleId={gameData.puzzleId}
        isArchive={true}/>
    </main>
  );
}

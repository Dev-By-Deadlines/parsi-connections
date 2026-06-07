export interface Category {
    id: number;
    name: string;
    words: string[];
}

export interface PuzzleResponse {
    puzzleId: number;
    outcome: "playing" | "Win" | "Lose";
    remainingHealth: number;
    unSolvedWords: string[];
    solvedCategoryDtos: Category[];
}

export interface GuessResponse {
    correct: boolean;
    oneAway: boolean;
    gameStateDto: PuzzleResponse;
}

export interface GuessRequest {
    words: string[];
}

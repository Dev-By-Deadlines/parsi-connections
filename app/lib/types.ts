
export interface CategoryWord {
    text: string;
}

export interface Category {
    name: string;
    words: CategoryWord[];
}

export interface PuzzleResponse {
    puzzleId: number;
    outcome: "Playing" | "Won" | "Lost";
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

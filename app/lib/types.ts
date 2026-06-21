
export interface CategoryWord {
    text: string;
}

export interface Category {
    categoryIndex: number;
    name: string;
    words: CategoryWord[];
}

export interface PuzzleResponse {
    puzzleId: number;
    outcome: "Playing" | "Won" | "Lost" | null;
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

export interface PuzzleStats {
    totalPlayers: number;
    winRate: number;
    averageRemainingHealth: number;
    playerPercentile: number;
    playerHealth: number;
    playerOutcome: PuzzleResponse['outcome'];  
    guessGrid: string[];
}

export interface ArchiveItems {
    puzzleId: number;
    remainingHealth: number;
    solvedCategories: number;
    outcome: PuzzleResponse['outcome'];
    lastUsedInDaily: string;
}

export interface ArchiveResponse {
    items: ArchiveItems[];
    page: number;
    limit: number;
    total: number;
    totalPages: number; 
}

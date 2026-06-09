import { GuessRequest, GuessResponse, PuzzleResponse } from "./types";

export async function fetchDailyPuzzle(): Promise<PuzzleResponse> {
    const res = await fetch(`/api/puzzles/daily`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json; charset=utf-8',
        },
        credentials: 'same-origin',
    });

    if (!res.ok) {
        throw new Error('failed to fetch puzzle');
    }
    return res.json();
}

export async function submitGuess(puzzleId:number, words: string[]): Promise<GuessResponse> {
    const res = await fetch(`/api/puzzles/${puzzleId}/guess`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8', 
            'Accept': 'application/json; charset=utf-8'
        },
        credentials: 'same-origin',
        body: JSON.stringify({words} as GuessRequest),
    });
    if (!res.ok) {
        throw new Error('failed to submit guess');
    }
    return res.json();
}
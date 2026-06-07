import { GuessRequest, GuessResponse, PuzzleResponse } from "./types";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchDailyPuzzle(): Promise<PuzzleResponse> {
    const res = await fetch(`${BASE_URL}/puzzles/daily`);

    if (!res.ok) {
        throw new Error('failed to fetch puzzle');
    }
    return res.json();
}

export async function submitGuess(puzzleId:number, words: string[]): Promise<GuessResponse> {
    const res = await fetch(`${BASE_URL}/puzzles/${puzzleId}/guess`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json; charset=utf-8', 
        },
        body: JSON.stringify({words} as GuessRequest),
    });
    if (!res.ok) {
        throw new Error('failed to submit guess');
    }
    return res.json();
}
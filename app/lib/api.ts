import { ArchiveResponse, GuessRequest, GuessResponse, PuzzleResponse, PuzzleStats } from "./types";

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

export async function fetchStats(puzzleId:number): Promise<PuzzleStats> {
    const res = await fetch(`/api/puzzles/${puzzleId}/stats`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json; charset=utf-8',
        },
        credentials: 'same-origin',
    });
    if(!res.ok){
        throw new Error('failed to fetch stats');
    }
    return res.json();
}

export async function fetchArchive(page: number = 1, limit: number = 10): Promise<ArchiveResponse> {
    const res = await fetch(`/puzzles/archive?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json; charset=utf-8',
        },
        credentials: 'same-origin',
    });
    if (!res.ok) {
        throw new Error('failed to fetch Archives');
    }
    return res.json();
}

export async function fetchPuzzleById(id: number): Promise<PuzzleResponse> {
    const res = await fetch(`/puzzles/${id}/play` ,{
        method: 'GET',
        headers: {
            'Accept': 'application/json; charset=utf-8',
        },
        credentials: 'same-origin',
    });
    if (!res.ok) {
        throw new Error('failed to fetch puzzle by ID');
    }
    return res.json();
}
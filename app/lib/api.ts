import { ArchiveResponse, GuessRequest, GuessResponse, PuzzleResponse, PuzzleStats } from "./types";

const API_BASE_URL = '/puzzles';

export async function fetchDailyPuzzle(): Promise<PuzzleResponse> {
    const res = await fetch(`${API_BASE_URL}/daily`, {
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
    const res = await fetch(`${API_BASE_URL}/${puzzleId}/guess`, {
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
    const res = await fetch(`${API_BASE_URL}/${puzzleId}/stats`, {
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
    const res = await fetch(`${API_BASE_URL}/archive?page=${page}&limit=${limit}`, {
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
    const res = await fetch(`${API_BASE_URL}/${id}/play` ,{
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
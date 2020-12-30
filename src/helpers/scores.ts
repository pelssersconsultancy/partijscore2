export function maxScore(scores: number[]): number {
    return Math.max(...scores, 0);
}

export function sumOfScores(scores: number[]): number {
    return scores.reduce((acc, curr) => acc + curr, 0);
}

export function averageScore(scores: number[]): number {
    return scores.length ? sumOfScores(scores) / scores.length : 0; 
}

export function numberOfZeroScores(scores: number[]): number {
    return scores.filter(score => score === 0).length
}    

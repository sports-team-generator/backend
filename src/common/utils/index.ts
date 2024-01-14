export function shuffleArrayWithOffset<T>(array: any[], offset: number): T[] {
  // Create a copy of the original array to avoid mutation
  const shuffledArray = array.slice();

  // Fisher-Yates shuffle algorithm with an offset
  for (let i = 0; i < shuffledArray.length - 1; i++) {
    const rangeStart = Math.max(0, i - offset);
    const rangeEnd = Math.min(shuffledArray.length - 1, i + offset);
    const j =
      Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart;
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

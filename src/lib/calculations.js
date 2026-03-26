import { anchors, anchorOrder } from '../data/anchors.js';
import { translations } from '../data/translations.js';

export function getGeneration(birthYear, lang = 'en') {
  if (!birthYear) return null;
  const gens = translations[lang]?.generations || translations.en.generations;
  if (birthYear >= 1997 && birthYear <= 2012) return gens.genZ;
  if (birthYear >= 1981 && birthYear <= 1996) return gens.genY;
  if (birthYear >= 1965 && birthYear <= 1980) return gens.genX;
  if (birthYear >= 1946 && birthYear <= 1964) return gens.boomers;
  if (birthYear > 2012) return gens.genAlpha;
  return gens.silent;
}

export function calculateAnchorScores(ratings, top3) {
  const scores = {};
  const CORRECTION_WEIGHT = 1.5;
  const CORRECTION_BONUS = 1.0;

  for (const code of anchorOrder) {
    const anchor = anchors[code];

    let rawSum = 0;
    let top3Count = 0;

    for (const sentenceId of anchor.sentenceIds) {
      const rating = ratings[sentenceId] || 0;
      rawSum += rating;
      if (top3.includes(sentenceId)) {
        top3Count++;
      }
    }

    const rawAverage = rawSum / anchor.sentenceIds.length;

    const corrected = (rawAverage * CORRECTION_WEIGHT) + (CORRECTION_BONUS * top3Count);
    const maxCorrected = (6.0 * CORRECTION_WEIGHT) + (CORRECTION_BONUS * anchor.sentenceIds.length);

    scores[code] = {
      rawSum,
      rawAverage: Math.round(rawAverage * 100) / 100,
      top3Count,
      corrected: Math.round(corrected * 100) / 100,
      percentage: Math.round((corrected / maxCorrected) * 100),
    };
  }

  const sorted = anchorOrder
    .map(code => ({ code, ...scores[code] }))
    .sort((a, b) => b.corrected - a.corrected);

  const rawSorted = anchorOrder
    .map(code => ({ code, rawAverage: scores[code].rawAverage }))
    .sort((a, b) => b.rawAverage - a.rawAverage);

  return {
    scores,
    sorted,
    rawSorted,
    primary: sorted[0].code,
    secondary: sorted[1].code,
    tertiary: sorted[2].code,
    topThree: sorted.slice(0, 3),
  };
}

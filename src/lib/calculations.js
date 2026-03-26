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
  const bonusMultiplier = 2;

  for (const code of anchorOrder) {
    const anchor = anchors[code];
    let score = 0;

    for (const sentenceId of anchor.sentenceIds) {
      const rating = ratings[sentenceId] || 0;
      score += rating;

      if (top3.includes(sentenceId)) {
        score += rating * bonusMultiplier;
      }
    }

    scores[code] = {
      raw: score,
      maxPossible: 5 * 6 + 5 * 6 * bonusMultiplier,
      percentage: Math.round((score / (5 * 6 + 5 * 6 * bonusMultiplier)) * 100),
    };
  }

  const sorted = anchorOrder
    .map(code => ({ code, ...scores[code] }))
    .sort((a, b) => b.raw - a.raw);

  return {
    scores,
    sorted,
    primary: sorted[0].code,
    secondary: sorted[1].code,
    topThree: sorted.slice(0, 3),
  };
}

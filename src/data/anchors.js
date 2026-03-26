export const anchors = {
  TF: {
    code: "TF",
    color: "#818CF8",
    sentenceIds: [1, 9, 17, 25, 33],
  },
  GM: {
    code: "GM",
    color: "#F59E0B",
    sentenceIds: [2, 10, 18, 26, 34],
  },
  AU: {
    code: "AU",
    color: "#10B981",
    sentenceIds: [3, 11, 19, 27, 35],
  },
  SE: {
    code: "SE",
    color: "#6366F1",
    sentenceIds: [4, 12, 20, 28, 36],
  },
  EC: {
    code: "EC",
    color: "#EF4444",
    sentenceIds: [5, 13, 21, 29, 37],
  },
  SV: {
    code: "SV",
    color: "#EC4899",
    sentenceIds: [6, 14, 22, 30, 38],
  },
  CH: {
    code: "CH",
    color: "#F97316",
    sentenceIds: [7, 15, 23, 31, 39],
  },
  LS: {
    code: "LS",
    color: "#14B8A6",
    sentenceIds: [8, 16, 24, 32, 40],
  },
};

export const anchorOrder = ["TF", "GM", "AU", "SE", "EC", "SV", "CH", "LS"];

export function getAnchorForSentence(sentenceId) {
  for (const [code, anchor] of Object.entries(anchors)) {
    if (anchor.sentenceIds.includes(sentenceId)) {
      return code;
    }
  }
  return null;
}

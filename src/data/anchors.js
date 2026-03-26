export const anchors = {
  TF: {
    code: "TF",
    name: "Technical / Functional Competence",
    color: "#818CF8",
    sentenceIds: [1, 9, 17, 25, 33],
    description: "People with this anchor build their sense of identity around their expertise. They love to be challenged by complex problems in their specific field and take pride in being the 'go-to' person for technical knowledge.",
    coreDrive: "Mastery of a specific craft or skill.",
    motivation: "Opportunities to attend advanced training, solve intricate problems, and remain individual contributors rather than moving into general management.",
  },
  GM: {
    code: "GM",
    name: "General Managerial Competence",
    color: "#F59E0B",
    sentenceIds: [2, 10, 18, 26, 34],
    description: "For these individuals, success is defined by leadership and responsibility. They are motivated by the chance to integrate the efforts of others, manage budgets, and influence the overall direction of the organization.",
    coreDrive: "Accountability, leadership, and high-level decision-making.",
    motivation: "Promotions to higher levels of authority, managing larger teams, and achieving organizational goals.",
  },
  AU: {
    code: "AU",
    name: "Autonomy / Independence",
    color: "#10B981",
    sentenceIds: [3, 11, 19, 27, 35],
    description: "Individuals anchored in autonomy find organizational rules, dress codes, and fixed hours stifling. They need to feel they can do their work their own way and at their own pace.",
    coreDrive: "Freedom from organizational constraints.",
    motivation: "Flexible working arrangements, freelance-style roles within a company, or results-oriented work environments.",
  },
  SE: {
    code: "SE",
    name: "Security / Stability",
    color: "#6366F1",
    sentenceIds: [4, 12, 20, 28, 36],
    description: "This anchor is driven by the need for predictability and safety. These individuals value long-term employment, good benefits, and a stable career path. They often identify strongly with the organization itself.",
    coreDrive: "Long-term career safety and financial steadiness.",
    motivation: "Tenure, comprehensive insurance packages, and clear, stable job descriptions.",
  },
  EC: {
    code: "EC",
    name: "Entrepreneurial Creativity",
    color: "#EF4444",
    sentenceIds: [5, 13, 21, 29, 37],
    description: "Unlike the Autonomy anchor, those with Entrepreneurial Creativity want to build something new. They have a restless need to create a product, service, or organization that is a reflection of their own effort and vision.",
    coreDrive: "Creation and ownership.",
    motivation: "Starting new ventures, launching 'skunkworks' projects, or being given the lead on a completely new business unit.",
  },
  SV: {
    code: "SV",
    name: "Service / Dedication to a Cause",
    color: "#EC4899",
    sentenceIds: [6, 14, 22, 30, 38],
    description: "For these people, the 'why' is more important than the 'what.' They are motivated by the desire to improve the world or help others. They will only stay in a job as long as it aligns with their core values.",
    coreDrive: "Alignment with personal values and social impact.",
    motivation: "Roles in CSR, non-profits, or any position where they can see the direct social benefit of their work.",
  },
  CH: {
    code: "CH",
    name: "Pure Challenge",
    color: "#F97316",
    sentenceIds: [7, 15, 23, 31, 39],
    description: "Success for this group is defined as overcoming impossible obstacles or winning against tough competition. They get bored easily if the work is not extremely demanding or 'war-like' in its intensity.",
    coreDrive: "Winning and solving 'unsolvable' problems.",
    motivation: "Crisis management, high-stakes negotiations, or cutting-edge R&D projects.",
  },
  LS: {
    code: "LS",
    name: "Lifestyle",
    color: "#14B8A6",
    sentenceIds: [8, 16, 24, 32, 40],
    description: "This anchor is not about 'not working,' but about integration. These individuals look for a career that fits into their total life pattern, allowing them to be successful professionals while also being present for family and personal interests.",
    coreDrive: "Balance between work, family, and self-development.",
    motivation: "Remote work, sabbaticals, and cultures that respect personal boundaries.",
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

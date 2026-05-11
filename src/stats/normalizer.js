export const generationMap = {
  genZ: ['genZ', 'Gen Z', 'gen z', 'pokolenie z', 'pokolenie z gen z', 'generation z', 'pokoleniez', 'genz'],
  genY: ['genY', 'Gen Y', 'Gen Y (Millennials)', 'gen y', 'pokolenie y', 'pokolenie y (millennialsi)', 'millennials', 'millenialsi', 'pokoleniey', 'geny'],
  genX: ['genX', 'Gen X', 'gen x', 'pokolenie x', 'pokoleniex', 'genx'],
  boomers: ['boomers', 'Boomers', 'Baby Boomers', 'baby boomers', 'pokolenie boomers', 'pokolenie boomer', 'pokoleniebaby'],
  genAlpha: ['genAlpha', 'Gen Alpha', 'gen alpha', 'pokolenie alfa', 'pokoleniealpha', 'genalpha'],
  silent: ['silent', 'Silent', 'Silent Generation', 'ciche pokolenie', 'silentgeneration', 'pokoleniesilent'],
};

export const industryMap = {
  'Technologia / Oprogramowanie': ['technologia / oprogramowanie', 'technology / software', 'technologia / oprogramowanie', 'technologia/oprogramowanie'],
  'Finanse / Bankowość': ['finanse / bankowość', 'finance / banking', 'finanse / bankowosc', 'finansebankowosc'],
  'Ochrona zdrowia / Farmacja': ['ochrona zdrowia / farmacja', 'healthcare / pharma', 'ochrona zdrowia/farmacja', 'ochronazdrowiafarmacja'],
  'Produkcja': ['produkcja', 'manufacturing'],
  'Handel / E-commerce': ['handel / e-commerce', 'retail / e-commerce', 'handel / ecommerce', 'handelecommmerce'],
  'Konsulting': ['konsulting', 'consulting'],
  'Media / Rozrywka': ['media / rozrywka', 'media / entertainment', 'media / rozrywka', 'mediarozrywka'],
  'Edukacja': ['edukacja', 'education'],
  'Administracja publiczna': ['administracja publiczna', 'government', 'administracja publiczna', 'administracjapubliczna'],
  'Sektor pozarządowy': ['sektor pozarządowy', 'non-profit', 'nonprofit', 'sektor pozarzadowy', 'sektorpozarzadowy'],
  'Energia': ['energia', 'energy'],
  'Budowlana': ['budowlana', 'construction'],
  'Emeryt/ka / Renkcist/ka': ['emeryt/ka / renkcist/ka', 'pensioner', 'emerycka', 'renkcistka', 'emerytka', 'renkcistka'],
  'Inne': ['inne', 'other'],
};

export const positionMap = {
  'Młodszy/a specjalista/ka': ['młodszy/a specjalista/ka', 'młodszy specjalista', 'junior specialist', 'mlodszy specjalista', 'mlodsza specjalistka', 'młodsza specjalistka', 'stażysta', 'stażysta/ka', 'stazysta', 'stazysta/ka', 'praktykant', 'praktykant/ka'],
  'Specjalista/ka': ['specjalista/ka', 'specjalista', 'specialist'],
  'Starszy/a specjalista/ka': ['starszy/a specjalista/ka', 'starszy specjalista', 'senior specialist', 'starsza specjalistka'],
  'Lider/ka zespołu': ['lider/ka zespołu', 'lider/ka', 'team lead', 'lider zespołu', 'lider', 'liderkat', 'teamleader'],
  'Menedżer/ka': ['menedżer/ka', 'menedżer', 'manager'],
  'Starszy/a menedżer/ka': ['starszy/a menedżer/ka', 'starszy menedżer', 'senior manager', 'starsza menedżerka'],
  'Dyrektor/ka': ['dyrektor/ka', 'dyrektor', 'director'],
  'VP / C-Level': ['vp / c-level', 'vp/c-level', 'c-level', 'c level', 'vp', 'vp / c level', 'c-level executive'],
  'Konsultant/ka': ['konsultant/ka', 'konsultant', 'consultant'],
  'Freelancer/ka': ['freelancer/ka', 'freelancer', 'freelance'],
  'Student/ka': ['student/ka', 'student'],
  'Emeryt/ka / Renkcist/ka': ['emeryt/ka / renkcist/ka', 'emerytka', 'renkcistka', 'pensioner'],
  'Inne': ['inne', 'other'],
};

export function normalizeGeneration(value) {
  if (!value) return null;
  const lower = value.toLowerCase().trim().replace(/\s+/g, '');
  const entries = Object.entries(generationMap);
  for (let i = 0; i < entries.length; i++) {
    const item = entries[i];
    const aliases = item[1];
    for (let j = 0; j < aliases.length; j++) {
      const alias = aliases[j].toLowerCase().replace(/\s+/g, '');
      if (lower === alias || lower.includes(alias) || alias.includes(lower)) {
        return item[0];
      }
    }
  }
  return null;
}

export function normalizeIndustry(value) {
  if (!value) return null;
  const lower = value.toLowerCase().trim().replace(/\s+/g, '');
  const entries = Object.entries(industryMap);
  for (let i = 0; i < entries.length; i++) {
    const item = entries[i];
    const aliases = item[1];
    for (let j = 0; j < aliases.length; j++) {
      const alias = aliases[j].toLowerCase().replace(/\s+/g, '');
      if (lower === alias || lower.includes(alias) || alias.includes(lower)) {
        return item[0];
      }
    }
  }
  return null;
}

export function normalizePosition(value) {
  if (!value) return null;
  const lower = value.toLowerCase().trim().replace(/\s+/g, '');
  const entries = Object.entries(positionMap);
  for (let i = 0; i < entries.length; i++) {
    const item = entries[i];
    const aliases = item[1];
    for (let j = 0; j < aliases.length; j++) {
      const alias = aliases[j].toLowerCase().replace(/\s+/g, '');
      if (lower === alias || lower.includes(alias) || alias.includes(lower)) {
        return item[0];
      }
    }
  }
  return null;
}

export function normalizeResponse(response) {
  return {
    ...response,
    generation: normalizeGeneration(response.generation) || response.generation,
    industry: normalizeIndustry(response.industry) || response.industry,
    position: normalizePosition(response.position) || response.position,
  };
}

export function normalizeFilters(filters) {
  return {
    generations: filters.generations || [],
    industries: (filters.industries || []).map(normalizeIndustry).filter(Boolean),
    positions: (filters.positions || []).map(normalizePosition).filter(Boolean),
    dateFrom: filters.dateFrom || null,
    dateTo: filters.dateTo || null,
  };
}

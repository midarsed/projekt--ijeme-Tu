const BAD_WORDS = ['kurva','hovno','pičo','piča','kokot','debil','idiot','blbec','hajzl','svině','kretén','zmrd','zasraný','zkurvenej','sráč','pizda','čurák']

export function filterComment(text: string): { ok: boolean; reason?: string } {
  if (text.trim().length < 3) return { ok: false, reason: 'Komentář je příliš krátký.' }
  if (text.trim().length > 1000) return { ok: false, reason: 'Komentář je příliš dlouhý.' }
  const lower = text.toLowerCase()
  if (BAD_WORDS.some(w => lower.includes(w))) return { ok: false, reason: 'Komentář obsahuje nevhodná slova.' }
  return { ok: true }
}

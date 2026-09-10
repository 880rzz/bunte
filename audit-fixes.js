(() => {
  const chess = programs.find(p => p.id === 'schach');
  if (chess) Object.assign(chess, {
    time: '15:00–15:50',
    contact: 'https://www.schachkurse.at/anmeldung.php · schulschach@spids.at',
    source: 'Iskolai Excel + Schulschach szórólap',
    status: 'ok',
    note: 'Az Excel és a részletes szórólap egyaránt szerda 15:00–15:50 időpontot ad meg. A szórólap szerinti jelentkezési határidő 2026.10.03.; a szervező hivatalos kapcsolati címe: schulschach@spids.at.'
  });
  const tennis = programs.find(p => p.id === 'tennis');
  if (tennis) tennis.start = 'Forrás: „Oktober 26” · értelmezés: 2026 október, pontos nap nincs megadva';
  ['football-girls','football-boys'].forEach(id => {
    const p = programs.find(x => x.id === id);
    if (p && !p.note.includes('16x')) p.note += ' A kézzel jelölt „16x” nem egyezik az Excel 12 alkalmas adatával és a felsorolt 12 tényleges kurzusdátummal; ezt megerősítendő kézírásos megjegyzésként kezeljük.';
  });
  linkify = function(text){
    return text.split(' · ').map(part => {
      const s = part.trim();
      if (/^https?:\/\//i.test(s)) return `<a href="${s}" target="_blank" rel="noopener noreferrer">Jelentkezési oldal</a>`;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return `<a href="mailto:${s}">${s}</a>`;
      const raw = s.replace(/^WhatsApp:\s*/i,'');
      if (/^\+?[\d\s()/-]{7,}$/.test(raw)) return `<a href="tel:${raw.replace(/[^\d+]/g,'')}">${s}</a>`;
      return s;
    }).join('<br>');
  };
  render(); renderFirst();
})();
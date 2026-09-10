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
  ['singschule-di','singschule-do'].forEach(id => {
    const p = programs.find(x => x.id === id);
    if (!p) return;
    p.contact = 'https://www.wien.gv.at/bildung/musikschule-gesangsunterricht-stimmbildung-chor · személyes jelentkezés szeptemberben a helyi Singschule helyszínen; helyi időpont: 2026.09.18. 17:00–18:30, Top 38 · 0699 12460260';
    if (!p.note.includes('városi Singschule')) p.note += ' A városi Singschule 2026/27-es általános tájékoztatója a Wiener KinderStimmen célcsoportját 1–4. osztályként adja meg, a Bunte Schule helyi tájékoztatója azonban konkrét idősávot csak 2–4. osztály számára közöl; ezért ezen az oldalon a helyi, konkrét ajánlatnál 2–4. osztály szerepel.';
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
(() => {
  const chess = programs.find(p => p.id === 'schach');
  if (chess) Object.assign(chess, {
    time: '15:00–15:50',
    contact: 'https://www.schachkurse.at/anmeldung.php · schulschach@spids.at',
    source: 'School spreadsheet + school-chess handout',
    status: 'ok',
    note: 'The school spreadsheet and the detailed handout both state Wednesday 15:00–15:50. The handout deadline is 3 October 2026. The organiser’s official contact address is schulschach@spids.at.'
  });
  const tennis = programs.find(p => p.id === 'tennis');
  if (tennis) tennis.start = 'Source: “Oktober 26” · interpretation: October 2026, exact day not stated';
  ['football-girls','football-boys'].forEach(id => {
    const p = programs.find(x => x.id === id);
    if (p && !p.note.includes('16x')) p.note += ' The handwritten “16x” note conflicts with the 12 sessions in the spreadsheet and the 12 actual course dates listed, so it is treated only as an unconfirmed handwritten note.';
  });
  ['singschule-di','singschule-do'].forEach(id => {
    const p = programs.find(x => x.id === id);
    if (!p) return;
    p.contact = 'https://www.wien.gv.at/bildung/musikschule-gesangsunterricht-stimmbildung-chor · in-person registration in September at the local Singschule location; local slot: 18 Sep 2026, 17:00–18:30, Top 38 · 0699 12460260';
    if (!p.note.includes('City of Vienna Singschule')) p.note += ' The City of Vienna Singschule lists Wiener KinderStimmen generally for Grades 1–4 in 2026/27, while the local Bunte Schule handout provides concrete time slots only for Grades 2–4; therefore the local offer is shown here as Grades 2–4.';
  });
  linkify = function(text){
    return text.split(' · ').map(part => {
      const s = part.trim();
      if (/^https?:\/\//i.test(s)) return `<a href="${s}" target="_blank" rel="noopener noreferrer">Registration page</a>`;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return `<a href="mailto:${s}">${s}</a>`;
      const raw = s.replace(/^WhatsApp:\s*/i,'');
      if (/^\+?[\d\s()/-]{7,}$/.test(raw)) return `<a href="tel:${raw.replace(/[^\d+]/g,'')}">${s}</a>`;
      return s;
    }).join('<br>');
  };
  render(); renderFirst();
})();
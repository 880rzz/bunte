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
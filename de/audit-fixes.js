(() => {
  const chess = programs.find(p => p.id === 'schach');
  if (chess) Object.assign(chess, {
    time: '15:00–15:50',
    contact: 'https://www.schachkurse.at/anmeldung.php · schulschach@spids.at',
    source: 'Schulische Tabelle + Schulschach-Folder',
    status: 'ok',
    note: 'Die schulische Tabelle und der detaillierte Folder nennen übereinstimmend Mittwoch 15:00–15:50. Anmeldeschluss laut Folder: 03.10.2026. Offizielle Kontaktadresse des Veranstalters: schulschach@spids.at.'
  });
  const tennis = programs.find(p => p.id === 'tennis');
  if (tennis) tennis.start = 'Quelle: „Oktober 26“ · Einordnung: Oktober 2026, genauer Tag nicht angegeben';
  ['football-girls','football-boys'].forEach(id => {
    const p = programs.find(x => x.id === id);
    if (p && !p.note.includes('16x')) p.note += ' Die handschriftliche Angabe „16x“ stimmt weder mit den 12 Terminen der Tabelle noch mit den 12 tatsächlich aufgeführten Kursterminen überein und wird deshalb nur als bestätigungspflichtige Notiz behandelt.';
  });
  linkify = function(text){
    return text.split(' · ').map(part => {
      const s = part.trim();
      if (/^https?:\/\//i.test(s)) return `<a href="${s}" target="_blank" rel="noopener noreferrer">Anmeldeseite</a>`;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return `<a href="mailto:${s}">${s}</a>`;
      const raw = s.replace(/^WhatsApp:\s*/i,'');
      if (/^\+?[\d\s()/-]{7,}$/.test(raw)) return `<a href="tel:${raw.replace(/[^\d+]/g,'')}">${s}</a>`;
      return s;
    }).join('<br>');
  };
  render(); renderFirst();
})();
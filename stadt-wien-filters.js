(function(){
'use strict';
var lang=(document.documentElement.lang||'hu').toLowerCase();
var T=lang.indexOf('de')===0?{
 title:'Programme filtern',intro:'Nach Alter, Thema und Wiener Bezirk filtern. Bei wechselnden Veranstaltungsorten ist eine Bezirkssuche erst nach Auswahl eines konkreten Termins möglich.',search:'Suche',searchPh:'Programm oder Stichwort',age:'Alter',theme:'Thema',district:'Bezirk',all:'Alle',reset:'Zurücksetzen',results:'Treffer',dynamic:'Wechselnder Standort',noResults:'Keine passenden Programme gefunden.',districtHint:'Bei Programmen mit mehreren Standorten werden nur Standorte im gewählten Bezirk angezeigt.',
 themes:{learning:'Lernen & Förderung',music:'Musik & Gesang',dance:'Tanz',swim:'Schwimmen',sport:'Sport & Bewegung',camp:'Ferien & Camps',culture:'Kultur & Freizeit',creative:'Kreativ & Entdecken',nature:'Natur'}
}:lang.indexOf('en')===0?{
 title:'Filter programmes',intro:'Filter by age, topic and Vienna district. For programmes with changing venues, district filtering becomes meaningful only after selecting a specific event.',search:'Search',searchPh:'Programme or keyword',age:'Age',theme:'Topic',district:'District',all:'All',reset:'Reset',results:'results',dynamic:'Variable venue',noResults:'No matching programmes found.',districtHint:'For programmes with multiple locations, only locations in the selected district are shown.',
 themes:{learning:'Learning & support',music:'Music & singing',dance:'Dance',swim:'Swimming',sport:'Sport & movement',camp:'Holidays & camps',culture:'Culture & leisure',creative:'Creative & discovery',nature:'Nature'}
}:{
 title:'Programok szűrése',intro:'Szűrés korosztály, témakör és bécsi kerület szerint. A változó helyszínű programoknál a kerület csak konkrét esemény kiválasztása után állapítható meg.',search:'Keresés',searchPh:'Program vagy kulcsszó',age:'Korosztály',theme:'Témakör',district:'Kerület',all:'Mind',reset:'Alaphelyzet',results:'találat',dynamic:'Változó helyszín',noResults:'Nincs a feltételeknek megfelelő program.',districtHint:'Többhelyszínes programnál csak a kiválasztott kerület helyszínei jelennek meg.',
 themes:{learning:'Tanulás & fejlesztés',music:'Zene & ének',dance:'Tánc',swim:'Úszás',sport:'Sport & mozgás',camp:'Szünet & tábor',culture:'Kultúra & szabadidő',creative:'Kreatív & felfedezés',nature:'Természet'}
};
var META={
 'Wiener Lernhilfe – LernMinis':{min:6,max:10,t:['learning'],d:'dynamic'},
 'Wiener KinderStimmen / Singschule Wien':{min:6,max:12,t:['music'],d:[1,2,3,4,6,8,9,11,12,13,14,16,17,18,19,21,22,23]},
 'Musikschulen Wien – hangszer, zene, kórus':{min:4,max:25,t:['music'],d:[2,3,5,9,10,11,12,14,15,16,17,19,20,21,22,23]},
 'Musikschulen Wien – Instrumente, Gesang und Ensembles':{min:4,max:25,t:['music'],d:[2,3,5,9,10,11,12,14,15,16,17,19,20,21,22,23]},
 'Vienna Music Schools – instruments, singing and ensembles':{min:4,max:25,t:['music'],d:[2,3,5,9,10,11,12,14,15,16,17,19,20,21,22,23]},
 'Tánc – Musikschulen Wien':{min:4,max:25,t:['dance'],d:[2,3,22,23]},
 'Tanz – Musikschulen Wien':{min:4,max:25,t:['dance'],d:[2,3,22,23]},
 'Dance – Vienna Music Schools':{min:4,max:25,t:['dance'],d:[2,3,22,23]},
 'Talente-Schwimmkurse – őszi/téli félév 2026':{min:5,max:12,t:['swim','sport'],d:[10,20,21]},
 'Talente-Schwimmkurse – Wintersemester 2026':{min:5,max:12,t:['swim','sport'],d:[10,20,21]},
 'Talente swimming courses – winter semester 2026':{min:5,max:12,t:['swim','sport'],d:[10,20,21]},
 'Stadt Wien Bäder – csoportos úszásoktatás':{min:6,max:17,t:['swim','sport'],d:[10,11,12,14,16,19,20,21,22]},
 'Stadt Wien Bäder – Gruppenschwimmkurse':{min:6,max:17,t:['swim','sport'],d:[10,11,12,14,16,19,20,21,22]},
 'City of Vienna pools – group swimming lessons':{min:6,max:17,t:['swim','sport'],d:[10,11,12,14,16,19,20,21,22]},
 'Sport & Fun Hallen':{min:0,max:99,t:['sport'],d:[2,10,16,22]},
 'Sport & Fun Halls':{min:0,max:99,t:['sport'],d:[2,10,16,22]},
 'Summer City Camps – városi nyári felügyelet':{min:6,max:14,t:['camp','sport','creative'],d:'dynamic'},
 'Summer City Camps':{min:6,max:14,t:['camp','sport','creative'],d:'dynamic'},
 'WIENXTRA Kinderaktiv':{min:0,max:17,t:['culture','sport','creative','nature'],d:'dynamic'},
 'WIENXTRA Ferienspiel':{min:6,max:13,t:['camp','culture','sport','creative'],d:'dynamic'},
 'Büchereien Wien – gyermekprogramok':{min:0,max:14,t:['culture','learning','creative'],d:'dynamic'},
 'Büchereien Wien – Kinderprogramm':{min:0,max:14,t:['culture','learning','creative'],d:'dynamic'},
 'Vienna Libraries – children’s programme':{min:0,max:14,t:['culture','learning','creative'],d:'dynamic'},
 'Wiener Herbst Camps 2026':{min:6,max:14,t:['camp'],d:'dynamic'}
};
var AGE=[['all',T.all],['0-3','0–3'],['4-5','4–5'],['6-7','6–7'],['8-10','8–10'],['11-13','11–13'],['14-17','14–17'],['18-25','18–25']];
function opt(v,l){return '<option value="'+v+'">'+l+'</option>'}
function ageMatch(m,v){if(v==='all')return true;var p=v.split('-').map(Number);return m.min<=p[1]&&m.max>=p[0]}
function themeOptions(){return ['learning','music','dance','swim','sport','camp','culture','creative','nature'].map(function(k){return opt(k,T.themes[k])}).join('')}
function districtOptions(){var s='';for(var i=1;i<=23;i++)s+=opt(String(i),i+'.');return s}
function normalize(s){return String(s||'').toLocaleLowerCase(lang.indexOf('de')===0?'de-AT':lang.indexOf('en')===0?'en':'hu-HU').normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function districtFromMapLink(a){var s=(a&&a.dataset&&a.dataset.mapDest)||'';var m=s.match(/\b(1(?:0[1-9]|1[0-9]|2[0-3])0)\b/);if(!m)return null;var n=parseInt(m[1],10);var d=(n-1000)/10;return Number.isInteger(d)&&d>=1&&d<=23?d:null}
function syncLocationDistrict(grid,dist){var selected=dist==='all'?null:+dist;grid.querySelectorAll('.map-destination').forEach(function(a){var d=districtFromMapLink(a);a.classList.toggle('district-hidden',!!selected&&d!==null&&d!==selected)})}
function init(){var grid=document.querySelector('.program-grid');if(!grid)return;var cards=[].slice.call(grid.querySelectorAll(':scope > .card'));if(!cards.length)return;
 cards.forEach(function(c){var h=c.querySelector('h3');var m=h&&META[(h.textContent||'').trim()];if(m){c.dataset.cityFilter='1';c.dataset.filterMin=m.min;c.dataset.filterMax=m.max;c.dataset.filterThemes=m.t.join(',');c.dataset.filterDistricts=m.d==='dynamic'?'dynamic':m.d.join(',')}});
 var box=document.createElement('section');box.className='city-filter-panel';box.setAttribute('aria-label',T.title);box.innerHTML='<div class="city-filter-head"><div><h2>'+T.title+'</h2><p>'+T.intro+'</p></div><strong id="cityFilterCount" aria-live="polite"></strong></div><div class="city-filter-grid"><label><span>'+T.search+'</span><input id="cityFilterSearch" type="search" inputmode="search" autocomplete="off" placeholder="'+T.searchPh+'"></label><label><span>'+T.age+'</span><select id="cityFilterAge">'+AGE.map(function(x){return opt(x[0],x[1])}).join('')+'</select></label><label><span>'+T.theme+'</span><select id="cityFilterTheme">'+opt('all',T.all)+themeOptions()+'</select></label><label><span>'+T.district+'</span><select id="cityFilterDistrict">'+opt('all',T.all)+districtOptions()+'</select></label><button type="button" class="btn ghost city-filter-reset" id="cityFilterReset">'+T.reset+'</button></div><p class="city-filter-hint" id="cityFilterHint" hidden>'+T.districtHint+'</p><p class="city-filter-empty" id="cityFilterEmpty" hidden role="status">'+T.noResults+'</p>';
 grid.parentNode.insertBefore(box,grid);
 var q=document.getElementById('cityFilterSearch'),a=document.getElementById('cityFilterAge'),th=document.getElementById('cityFilterTheme'),d=document.getElementById('cityFilterDistrict'),count=document.getElementById('cityFilterCount'),hint=document.getElementById('cityFilterHint'),empty=document.getElementById('cityFilterEmpty');
 function apply(){var query=normalize(q.value),age=a.value,theme=th.value,dist=d.value,shown=0;cards.forEach(function(c){var m=META[((c.querySelector('h3')||{}).textContent||'').trim()];var ok=!!m;if(ok&&query)ok=normalize(c.textContent).indexOf(query)>=0;if(ok)ok=ageMatch(m,age);if(ok&&theme!=='all')ok=m.t.indexOf(theme)>=0;if(ok&&dist!=='all')ok=Array.isArray(m.d)&&m.d.indexOf(+dist)>=0;c.hidden=!ok;if(ok)shown++});count.textContent=shown+' '+T.results;empty.hidden=shown!==0;hint.hidden=dist==='all';syncLocationDistrict(grid,dist)}
 [q,a,th,d].forEach(function(el){el.addEventListener(el===q?'input':'change',apply)});document.getElementById('cityFilterReset').addEventListener('click',function(){q.value='';a.value='all';th.value='all';d.value='all';apply();q.focus()});
 var observer=new MutationObserver(function(mutations){for(var i=0;i<mutations.length;i++){if(mutations[i].addedNodes&&mutations[i].addedNodes.length){syncLocationDistrict(grid,d.value);break}}});observer.observe(grid,{childList:true,subtree:true});apply();
}
function style(){var s=document.createElement('style');s.textContent='.city-filter-panel{margin:0 0 24px;padding:20px;border:1px solid var(--line,#d2d2d7);background:#fff}.city-filter-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;margin-bottom:16px}.city-filter-head h2{margin:0 0 5px;font-size:1.35rem}.city-filter-head p{margin:0;color:var(--muted,#6e6e73);max-width:760px}.city-filter-grid{display:grid;grid-template-columns:minmax(220px,2fr) repeat(3,minmax(130px,1fr)) auto;gap:10px;align-items:end}.city-filter-grid label{display:flex;flex-direction:column;gap:5px;font-size:.82rem;font-weight:700;min-width:0}.city-filter-grid input,.city-filter-grid select{width:100%;min-width:0;min-height:44px;padding:9px 11px;border:1px solid var(--line,#d2d2d7);background:#fff;font:inherit}.city-filter-reset{min-height:44px;white-space:nowrap}.city-filter-hint,.city-filter-empty{margin:12px 0 0;color:var(--muted,#6e6e73);font-size:.9rem}.city-filter-empty{padding:12px;background:var(--soft,#f5f5f7);color:var(--ink,#1d1d1f)}.program-grid>.card[hidden]{display:none!important}.map-destination.district-hidden{display:none!important}@media(max-width:900px){.city-filter-grid{grid-template-columns:1fr 1fr}.city-filter-reset{width:100%}}@media(max-width:560px){.city-filter-panel{padding:16px}.city-filter-head{display:block}.city-filter-head strong{display:block;margin-top:8px}.city-filter-grid{grid-template-columns:1fr;gap:12px}.city-filter-grid input,.city-filter-grid select,.city-filter-reset{font-size:16px;min-height:46px}.city-filter-reset{width:100%}}';document.head.appendChild(s)}
style();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

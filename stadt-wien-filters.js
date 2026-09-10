(function(){
'use strict';
var lang=(document.documentElement.lang||'hu').toLowerCase();
var T=lang.indexOf('de')===0?{
 title:'Programme filtern',intro:'Präzise Filterung nach Alter, Thema und Wiener Bezirk. Altersfilter zeigen nur Angebote, deren veröffentlichte Zielgruppe das gewählte Alter tatsächlich umfasst; bei nur veranstaltungsbezogenen Altersangaben wird nicht geraten.',search:'Suche',searchPh:'Programm oder Stichwort',age:'Alter / Zielgruppe',theme:'Thema',district:'Bezirk',all:'Alle',reset:'Zurücksetzen',results:'Treffer',noResults:'Keine passenden Programme gefunden.',districtHint:'Bei Programmen mit mehreren Standorten werden nur Standorte im gewählten Bezirk angezeigt.',ageDynamic:'Alter je Veranstaltung',primary:'Hauptthema',vs:'Volksschule 1.–4. Klasse',
 themes:{learning:'Lernen & Förderung',music:'Musik & Gesang',dance:'Tanz',swim:'Schwimmen',sport:'Sport & Bewegung',camp:'Ferien & Camps',culture:'Kultur & Freizeit',creative:'Kreativ & Entdecken',nature:'Natur'}
}:lang.indexOf('en')===0?{
 title:'Filter programmes',intro:'Precise filtering by age, topic and Vienna district. Age filtering only returns programmes whose published target group actually includes the selected age; event-specific age limits are never guessed.',search:'Search',searchPh:'Programme or keyword',age:'Age / target group',theme:'Topic',district:'District',all:'All',reset:'Reset',results:'results',noResults:'No matching programmes found.',districtHint:'For programmes with multiple locations, only locations in the selected district are shown.',ageDynamic:'Age varies by event',primary:'Primary topic',vs:'Primary school Grades 1–4',
 themes:{learning:'Learning & support',music:'Music & singing',dance:'Dance',swim:'Swimming',sport:'Sport & movement',camp:'Holidays & camps',culture:'Culture & leisure',creative:'Creative & discovery',nature:'Nature'}
}:{
 title:'Programok szűrése',intro:'Pontos szűrés életkor, témakör és bécsi kerület szerint. Az életkor-szűrő csak olyan programot ad vissza, amelynek közzétett célcsoportja valóban tartalmazza a kiválasztott életkort; eseményenként változó korhatárt nem találunk ki.',search:'Keresés',searchPh:'Program vagy kulcsszó',age:'Életkor / korosztály',theme:'Témakör',district:'Kerület',all:'Mind',reset:'Alaphelyzet',results:'találat',noResults:'Nincs a feltételeknek megfelelő program.',districtHint:'Többhelyszínes programnál csak a kiválasztott kerület helyszínei jelennek meg.',ageDynamic:'Korhatár eseményenként',primary:'Fő témakör',vs:'Volksschule 1–4. osztály',
 themes:{learning:'Tanulás & fejlesztés',music:'Zene & ének',dance:'Tánc',swim:'Úszás',sport:'Sport & mozgás',camp:'Szünet & tábor',culture:'Kultúra & szabadidő',creative:'Kreatív & felfedezés',nature:'Természet'}
};
/*
  Rule model
  - age:[min,max] only when the card/source states an actual age range or an unambiguous open group.
  - grades:[...] for grade-based offers. Numeric age filtering never converts grades into guessed ages.
  - age:'dynamic' when the programme itself says the age limit varies by event.
  - primary is the programme's principal topic. related contains only subjects explicitly present in the card text.
  - district:'dynamic' means the current card does not publish one stable, exhaustive district set.
*/
var META={
 'Wiener Lernhilfe – LernMinis':{age:null,grades:[1,2,3,4],primary:'learning',related:[],district:'dynamic'},
 'Wiener KinderStimmen / Singschule Wien':{age:null,grades:[1,2,3,4],primary:'music',related:[],district:[1,2,3,4,6,8,9,11,12,13,14,16,17,18,19,21,22,23]},
 'Musikschulen Wien – hangszer, zene, kórus':{age:[0,25],grades:null,primary:'music',related:[],district:[2,3,5,9,10,11,12,14,15,16,17,19,20,21,22,23]},
 'Musikschulen Wien – Instrumente, Gesang und Ensembles':{age:[0,25],grades:null,primary:'music',related:[],district:[2,3,5,9,10,11,12,14,15,16,17,19,20,21,22,23]},
 'Vienna Music Schools – instruments, singing and ensembles':{age:[0,25],grades:null,primary:'music',related:[],district:[2,3,5,9,10,11,12,14,15,16,17,19,20,21,22,23]},
 'Tánc – Musikschulen Wien':{age:[4,25],grades:null,primary:'dance',related:[],district:[2,3,22,23]},
 'Tanz – Musikschulen Wien':{age:[4,25],grades:null,primary:'dance',related:[],district:[2,3,22,23]},
 'Dance – Vienna Music Schools':{age:[4,25],grades:null,primary:'dance',related:[],district:[2,3,22,23]},
 'Talente-Schwimmkurse – őszi/téli félév 2026':{age:[5,12],grades:null,primary:'swim',related:['sport'],district:[10,20,21]},
 'Talente-Schwimmkurse – Wintersemester 2026':{age:[5,12],grades:null,primary:'swim',related:['sport'],district:[10,20,21]},
 'Talente swimming courses – winter semester 2026':{age:[5,12],grades:null,primary:'swim',related:['sport'],district:[10,20,21]},
 'Stadt Wien Bäder – csoportos úszásoktatás':{age:[6,17],grades:null,primary:'swim',related:['sport'],district:[10,11,12,14,16,19,20,21,22]},
 'Stadt Wien Bäder – Gruppenschwimmkurse':{age:[6,17],grades:null,primary:'swim',related:['sport'],district:[10,11,12,14,16,19,20,21,22]},
 'City of Vienna pools – group swimming lessons':{age:[6,17],grades:null,primary:'swim',related:['sport'],district:[10,11,12,14,16,19,20,21,22]},
 'Sport & Fun Hallen':{age:[0,99],grades:null,primary:'sport',related:[],district:[2,10,16,22]},
 'Sport & Fun Halls':{age:[0,99],grades:null,primary:'sport',related:[],district:[2,10,16,22]},
 'Summer City Camps – városi nyári felügyelet':{age:[6,14],grades:null,primary:'camp',related:['sport','creative'],district:'dynamic'},
 'Summer City Camps':{age:[6,14],grades:null,primary:'camp',related:['sport','creative'],district:'dynamic'},
 'WIENXTRA Kinderaktiv':{age:'dynamic',grades:null,primary:'culture',related:['creative','nature','sport'],district:'dynamic'},
 'WIENXTRA Ferienspiel':{age:[6,13],grades:null,primary:'camp',related:['culture','sport','creative'],district:'dynamic'},
 'Büchereien Wien – gyermekprogramok':{age:[0,14],grades:null,primary:'culture',related:['learning','creative'],district:'dynamic'},
 'Büchereien Wien – Kinderprogramm':{age:[0,14],grades:null,primary:'culture',related:['learning','creative'],district:'dynamic'},
 'Vienna Libraries – children’s programme':{age:[0,14],grades:null,primary:'culture',related:['learning','creative'],district:'dynamic'},
 'Wiener Herbst Camps 2026':{age:[6,14],grades:null,primary:'camp',related:[],district:'dynamic'}
};
var THEME_ORDER=['learning','music','dance','swim','sport','camp','culture','creative','nature'];
function opt(v,l){return '<option value="'+v+'">'+l+'</option>'}
function ageOptions(){var s=opt('all',T.all)+opt('vs',T.vs);for(var i=0;i<=25;i++){var label=lang.indexOf('de')===0?i+' Jahre':lang.indexOf('en')===0?'Age '+i:i+' éves';s+=opt(String(i),label)}return s}
function ageMatch(m,v){if(v==='all')return true;if(v==='vs')return Array.isArray(m.grades)&&m.grades.some(function(g){return g>=1&&g<=4})||Array.isArray(m.age)&&m.age[0]<=10&&m.age[1]>=6;if(m.age==='dynamic'||!Array.isArray(m.age))return false;var n=Number(v);return Number.isFinite(n)&&n>=m.age[0]&&n<=m.age[1]}
function themeMatch(m,v){if(v==='all')return true;return m.primary===v||(m.related||[]).indexOf(v)>=0}
function themeOptions(){return THEME_ORDER.map(function(k){return opt(k,T.themes[k])}).join('')}
function districtOptions(){var s='';for(var i=1;i<=23;i++)s+=opt(String(i),i+'.');return s}
function districtMatch(m,v){if(v==='all')return true;return Array.isArray(m.district)&&m.district.indexOf(+v)>=0}
function normalize(s){return String(s||'').toLocaleLowerCase(lang.indexOf('de')===0?'de-AT':lang.indexOf('en')===0?'en':'hu-HU').normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function districtFromMapLink(a){var s=(a&&a.dataset&&a.dataset.mapDest)||'';var m=s.match(/\b(1(?:0[1-9]|1[0-9]|2[0-3])0)\b/);if(!m)return null;var n=parseInt(m[1],10);var d=(n-1000)/10;return Number.isInteger(d)&&d>=1&&d<=23?d:null}
function syncLocationDistrict(grid,dist){var selected=dist==='all'?null:+dist;grid.querySelectorAll('.map-destination').forEach(function(a){var d=districtFromMapLink(a);a.classList.toggle('district-hidden',!!selected&&d!==null&&d!==selected)})}
function init(){var grid=document.querySelector('.program-grid');if(!grid)return;var cards=[].slice.call(grid.querySelectorAll(':scope > .card'));if(!cards.length)return;
 cards.forEach(function(c){var h=c.querySelector('h3');var m=h&&META[(h.textContent||'').trim()];if(m){c.dataset.cityFilter='1';c.dataset.filterPrimary=m.primary;c.dataset.filterThemes=[m.primary].concat(m.related||[]).join(',');c.dataset.filterDistricts=m.district==='dynamic'?'dynamic':m.district.join(',');c.dataset.filterAge=m.age==='dynamic'?'dynamic':Array.isArray(m.age)?m.age.join('-'):'grade'}});
 var box=document.createElement('section');box.className='city-filter-panel';box.setAttribute('aria-label',T.title);box.innerHTML='<div class="city-filter-head"><div><h2>'+T.title+'</h2><p>'+T.intro+'</p></div><strong id="cityFilterCount" aria-live="polite"></strong></div><div class="city-filter-grid"><label><span>'+T.search+'</span><input id="cityFilterSearch" type="search" inputmode="search" autocomplete="off" placeholder="'+T.searchPh+'"></label><label><span>'+T.age+'</span><select id="cityFilterAge">'+ageOptions()+'</select></label><label><span>'+T.theme+'</span><select id="cityFilterTheme">'+opt('all',T.all)+themeOptions()+'</select></label><label><span>'+T.district+'</span><select id="cityFilterDistrict">'+opt('all',T.all)+districtOptions()+'</select></label><button type="button" class="btn ghost city-filter-reset" id="cityFilterReset">'+T.reset+'</button></div><p class="city-filter-hint" id="cityFilterHint" hidden>'+T.districtHint+'</p><p class="city-filter-empty" id="cityFilterEmpty" hidden role="status">'+T.noResults+'</p>';
 grid.parentNode.insertBefore(box,grid);
 var q=document.getElementById('cityFilterSearch'),a=document.getElementById('cityFilterAge'),th=document.getElementById('cityFilterTheme'),d=document.getElementById('cityFilterDistrict'),count=document.getElementById('cityFilterCount'),hint=document.getElementById('cityFilterHint'),empty=document.getElementById('cityFilterEmpty');
 function apply(){var query=normalize(q.value),age=a.value,theme=th.value,dist=d.value,shown=0,filtersActive=!!query||age!=='all'||theme!=='all'||dist!=='all';cards.forEach(function(c){var title=((c.querySelector('h3')||{}).textContent||'').trim();var m=META[title];var ok=true;if(!m){ok=!filtersActive}else{if(query)ok=normalize(c.textContent).indexOf(query)>=0;if(ok)ok=ageMatch(m,age);if(ok)ok=themeMatch(m,theme);if(ok)ok=districtMatch(m,dist)}c.hidden=!ok;if(ok)shown++});count.textContent=shown+' '+T.results;empty.hidden=shown!==0;hint.hidden=dist==='all';syncLocationDistrict(grid,dist);document.dispatchEvent(new CustomEvent('stadt-wien-filter-applied',{detail:{age:age,theme:theme,district:dist,shown:shown}}))}
 [q,a,th,d].forEach(function(el){el.addEventListener(el===q?'input':'change',apply)});document.getElementById('cityFilterReset').addEventListener('click',function(){q.value='';a.value='all';th.value='all';d.value='all';apply();q.focus()});
 var observer=new MutationObserver(function(mutations){for(var i=0;i<mutations.length;i++){if(mutations[i].addedNodes&&mutations[i].addedNodes.length){syncLocationDistrict(grid,d.value);break}}});observer.observe(grid,{childList:true,subtree:true});apply();
}
function style(){var s=document.createElement('style');s.textContent='.city-filter-panel{margin:0 0 24px;padding:20px;border:1px solid var(--line,#d2d2d7);background:#fff}.city-filter-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;margin-bottom:16px}.city-filter-head h2{margin:0 0 5px;font-size:1.35rem}.city-filter-head p{margin:0;color:var(--muted,#6e6e73);max-width:800px}.city-filter-grid{display:grid;grid-template-columns:minmax(220px,2fr) repeat(3,minmax(140px,1fr)) auto;gap:10px;align-items:end}.city-filter-grid label{display:flex;flex-direction:column;gap:5px;font-size:.82rem;font-weight:700;min-width:0}.city-filter-grid input,.city-filter-grid select{width:100%;min-width:0;min-height:44px;padding:9px 11px;border:1px solid var(--line,#d2d2d7);background:#fff;font:inherit}.city-filter-reset{min-height:44px;white-space:nowrap}.city-filter-hint,.city-filter-empty{margin:12px 0 0;color:var(--muted,#6e6e73);font-size:.9rem}.city-filter-empty{padding:12px;background:var(--soft,#f5f5f7);color:var(--ink,#1d1d1f)}.program-grid>.card[hidden]{display:none!important}.map-destination.district-hidden{display:none!important}@media(max-width:900px){.city-filter-grid{grid-template-columns:1fr 1fr}.city-filter-reset{width:100%}}@media(max-width:560px){.city-filter-panel{padding:16px}.city-filter-head{display:block}.city-filter-head strong{display:block;margin-top:8px}.city-filter-grid{grid-template-columns:1fr;gap:12px}.city-filter-grid input,.city-filter-grid select,.city-filter-reset{font-size:16px;min-height:46px}.city-filter-reset{width:100%}}';document.head.appendChild(s)}
style();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

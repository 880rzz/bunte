(function(){
'use strict';
var lang=(document.documentElement.lang||'hu').toLowerCase();
var L=lang.indexOf('de')===0?{
 title:'Programme filtern',age:'Altersgruppe',theme:'Thema',district:'Bezirk',all:'Alle',reset:'Filter zurücksetzen',results:'Treffer',variable:'Mehrere / wechselnde Standorte',themes:{learning:'Lernen',music:'Musik & Gesang',dance:'Tanz',swim:'Schwimmen',sport:'Sport & Bewegung',holiday:'Ferien & Betreuung',culture:'Kultur, Lesen & Kreativität'}
}:lang.indexOf('en')===0?{
 title:'Filter programmes',age:'Age group',theme:'Theme',district:'District',all:'All',reset:'Reset filters',results:'results',variable:'Multiple / variable locations',themes:{learning:'Learning',music:'Music & singing',dance:'Dance',swim:'Swimming',sport:'Sport & movement',holiday:'Holiday programmes & care',culture:'Culture, reading & creativity'}
}:{
 title:'Programok szűrése',age:'Korosztály',theme:'Témakör',district:'Kerület',all:'Mind',reset:'Szűrők törlése',results:'találat',variable:'Több / változó helyszín',themes:{learning:'Tanulás',music:'Zene és ének',dance:'Tánc',swim:'Úszás',sport:'Sport és mozgás',holiday:'Szüneti program és felügyelet',culture:'Kultúra, olvasás és kreatív program'}
};
var META={
 'Wiener Lernhilfe – LernMinis':{age:['6-9','10-12'],theme:['learning'],district:['variable']},
 'Wiener KinderStimmen / Singschule Wien':{age:['6-9','10-12'],theme:['music'],district:['1','2','3','4','6','8','9','11','12','13','14','16','17','18','19','21','22','23']},
 'Musikschulen Wien – hangszer, zene, kórus':{age:['0-5','6-9','10-12','13-14','15-17','18-25'],theme:['music'],district:['2','3','5','9','10','11','12','14','15','16','17','19','20','21','22','23']},
 'Musikschulen Wien – Instrumente, Gesang und Ensembles':{age:['0-5','6-9','10-12','13-14','15-17','18-25'],theme:['music'],district:['2','3','5','9','10','11','12','14','15','16','17','19','20','21','22','23']},
 'Vienna Music Schools – instruments, singing and ensembles':{age:['0-5','6-9','10-12','13-14','15-17','18-25'],theme:['music'],district:['2','3','5','9','10','11','12','14','15','16','17','19','20','21','22','23']},
 'Tánc – Musikschulen Wien':{age:['0-5','6-9','10-12','13-14','15-17'],theme:['dance'],district:['2','3','22','23']},
 'Tanz – Musikschulen Wien':{age:['0-5','6-9','10-12','13-14','15-17'],theme:['dance'],district:['2','3','22','23']},
 'Dance – Vienna Music Schools':{age:['0-5','6-9','10-12','13-14','15-17'],theme:['dance'],district:['2','3','22','23']},
 'Talente-Schwimmkurse – őszi/téli félév 2026':{age:['0-5','6-9','10-12'],theme:['swim','sport'],district:['10','20','21']},
 'Talente-Schwimmkurse – Wintersemester 2026':{age:['0-5','6-9','10-12'],theme:['swim','sport'],district:['10','20','21']},
 'Talente swimming courses – winter semester 2026':{age:['0-5','6-9','10-12'],theme:['swim','sport'],district:['10','20','21']},
 'Stadt Wien Bäder – csoportos úszásoktatás':{age:['6-9','10-12','13-14','15-17'],theme:['swim','sport'],district:['10','11','12','14','16','19','20','21','22']},
 'Stadt Wien Bäder – Gruppenschwimmkurse':{age:['6-9','10-12','13-14','15-17'],theme:['swim','sport'],district:['10','11','12','14','16','19','20','21','22']},
 'City of Vienna pools – group swimming lessons':{age:['6-9','10-12','13-14','15-17'],theme:['swim','sport'],district:['10','11','12','14','16','19','20','21','22']},
 'Sport & Fun Hallen':{age:['6-9','10-12','13-14','15-17','18-25'],theme:['sport'],district:['2','10','16','22']},
 'Sport & Fun Halls':{age:['6-9','10-12','13-14','15-17','18-25'],theme:['sport'],district:['2','10','16','22']},
 'Summer City Camps – városi nyári felügyelet':{age:['6-9','10-12','13-14'],theme:['holiday','sport','culture'],district:['variable']},
 'Summer City Camps':{age:['6-9','10-12','13-14'],theme:['holiday','sport','culture'],district:['variable']},
 'WIENXTRA Kinderaktiv':{age:['0-5','6-9','10-12','13-14'],theme:['culture','sport'],district:['variable']},
 'WIENXTRA Ferienspiel':{age:['6-9','10-12','13-14'],theme:['holiday','culture','sport'],district:['variable']},
 'Büchereien Wien – gyermekprogramok':{age:['0-5','6-9','10-12','13-14'],theme:['culture'],district:['variable']},
 'Büchereien Wien – Kinderprogramm':{age:['0-5','6-9','10-12','13-14'],theme:['culture'],district:['variable']},
 'Vienna Libraries – children’s programme':{age:['0-5','6-9','10-12','13-14'],theme:['culture'],district:['variable']},
 'Wiener Herbst Camps 2026':{age:['6-9','10-12','13-14'],theme:['holiday','sport','culture'],district:['variable']}
};
var AGES=[['0-5','0–5'],['6-9','6–9'],['10-12','10–12'],['13-14','13–14'],['15-17','15–17'],['18-25','18–25']];
var THEMES=['learning','music','dance','swim','sport','holiday','culture'];
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function style(){if(document.getElementById('stadt-filter-style'))return;var s=document.createElement('style');s.id='stadt-filter-style';s.textContent='.stadt-filter{margin:0 0 24px;padding:18px;border:1px solid rgba(0,0,0,.1);border-radius:18px;background:#fff}.stadt-filter h2{margin:0 0 12px;font-size:1.1rem}.stadt-filter-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.stadt-filter label{display:flex;flex-direction:column;gap:5px;font-size:.82rem}.stadt-filter select{min-height:44px;padding:9px 12px;border:1px solid #c7c7cc;border-radius:12px;background:#fff;font:inherit}.stadt-filter-foot{display:flex;gap:12px;align-items:center;justify-content:space-between;margin-top:12px}.stadt-filter-count{font-size:.9rem;font-weight:650}.stadt-filter-reset{border:0;background:none;text-decoration:underline;cursor:pointer;font:inherit}.card[hidden]{display:none!important}@media(max-width:720px){.stadt-filter-grid{grid-template-columns:1fr}.stadt-filter-foot{align-items:flex-start;flex-direction:column}}';document.head.appendChild(s)}
function option(v,t){return '<option value="'+esc(v)+'">'+esc(t)+'</option>'}
function build(){var grid=document.querySelector('.program-grid');if(!grid||document.getElementById('stadtFilter'))return;var cards=[].slice.call(grid.querySelectorAll(':scope > .card'));cards.forEach(function(c){var h=c.querySelector('h3'),m=h&&META[(h.textContent||'').trim()];if(!m)return;c.dataset.age=m.age.join(',');c.dataset.theme=m.theme.join(',');c.dataset.district=m.district.join(',')});
 var box=document.createElement('section');box.id='stadtFilter';box.className='stadt-filter';var districtOpts=option('',L.all);for(var i=1;i<=23;i++)districtOpts+=option(String(i),i+'.');districtOpts+=option('variable',L.variable);box.innerHTML='<h2>'+esc(L.title)+'</h2><div class="stadt-filter-grid"><label>'+esc(L.age)+'<select id="stadtAge">'+option('',L.all)+AGES.map(function(x){return option(x[0],x[1])}).join('')+'</select></label><label>'+esc(L.theme)+'<select id="stadtTheme">'+option('',L.all)+THEMES.map(function(x){return option(x,L.themes[x])}).join('')+'</select></label><label>'+esc(L.district)+'<select id="stadtDistrict">'+districtOpts+'</select></label></div><div class="stadt-filter-foot"><span id="stadtFilterCount" class="stadt-filter-count"></span><button class="stadt-filter-reset" id="stadtReset" type="button">'+esc(L.reset)+'</button></div>';grid.parentNode.insertBefore(box,grid);bind(cards)}
function has(csv,v){return !v||(','+csv+',').indexOf(','+v+',')>=0}
function bind(cards){var a=document.getElementById('stadtAge'),t=document.getElementById('stadtTheme'),d=document.getElementById('stadtDistrict'),cnt=document.getElementById('stadtFilterCount');function apply(){var n=0;cards.forEach(function(c){var ok=has(c.dataset.age||'',a.value)&&has(c.dataset.theme||'',t.value)&&has(c.dataset.district||'',d.value);c.hidden=!ok;if(ok)n++});cnt.textContent=n+' '+L.results}a.addEventListener('change',apply);t.addEventListener('change',apply);d.addEventListener('change',apply);document.getElementById('stadtReset').addEventListener('click',function(){a.value='';t.value='';d.value='';apply()});apply()}
style();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
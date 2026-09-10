(function(){
'use strict';
function num(v){var n=Number(v);return Number.isFinite(n)?n:Infinity}
function visibleLink(a){return !a.hidden&&!a.classList.contains('district-hidden')&&a.offsetParent!==null}
function cardMetric(card){var links=[].slice.call(card.querySelectorAll('.map-destination')).filter(visibleLink);if(!links.length)return Infinity;var best=Infinity;links.forEach(function(a){var m=num(a.dataset.distMin);if(!Number.isFinite(m))m=num(a.dataset.distKm);if(m<best)best=m});return best}
function init(){var grid=document.querySelector('.program-grid');if(!grid)return;var base=[].slice.call(grid.querySelectorAll(':scope > .card'));base.forEach(function(c,i){c.dataset.cityBaseOrder=String(i)});
 var timer=null;
 function schedule(){clearTimeout(timer);timer=setTimeout(sortCards,80)}
 function sortCards(){var cards=[].slice.call(grid.querySelectorAll(':scope > .card'));var hasMetric=cards.some(function(c){return !c.hidden&&Number.isFinite(cardMetric(c))});cards.sort(function(a,b){if(a.hidden!==b.hidden)return a.hidden?1:-1;if(hasMetric&&!a.hidden&&!b.hidden){var am=cardMetric(a),bm=cardMetric(b);if(am!==bm)return am-bm}return num(a.dataset.cityBaseOrder)-num(b.dataset.cityBaseOrder)});cards.forEach(function(c){grid.appendChild(c)})}
 document.addEventListener('change',function(e){if(e.target&&(/^(cityFilter|distance)/).test(e.target.id||''))schedule()});
 document.addEventListener('input',function(e){if(e.target&&e.target.id==='cityFilterSearch')schedule()});
 var obs=new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i];if(m.type==='attributes'){schedule();break}}});
 obs.observe(grid,{subtree:true,attributes:true,attributeFilter:['data-dist-min','data-dist-km','hidden','class']});
 sortCards();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

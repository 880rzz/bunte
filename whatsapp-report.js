(function(){
'use strict';
var lang=(document.documentElement.lang||'hu').toLowerCase();
var C=lang.indexOf('de')===0?{
 label:'Fehler melden',aria:'Fehler über WhatsApp melden',text:'Hallo! Ich möchte einen Fehler in der Bunte-App melden. Seite: '
}:lang.indexOf('en')===0?{
 label:'Report an issue',aria:'Report an issue via WhatsApp',text:'Hello! I would like to report an issue in the Bunte app. Page: '
}:{
 label:'Hiba jelentése',aria:'Hiba jelentése WhatsAppon',text:'Szia! Hibát szeretnék jelezni a Bunte appban. Oldal: '
};
var phone='4367761655592';
function init(){
 if(document.getElementById('whatsappBugReport'))return;
 var a=document.createElement('a');
 a.id='whatsappBugReport';
 a.className='whatsapp-bug-report';
 a.target='_blank';
 a.rel='noopener noreferrer';
 a.setAttribute('aria-label',C.aria);
 a.href='https://wa.me/'+phone+'?text='+encodeURIComponent(C.text+location.href);
 a.innerHTML='<span class="wa-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path fill="currentColor" d="M12 2a9.7 9.7 0 0 0-8.3 14.7L2.3 22l5.4-1.4A9.8 9.8 0 1 0 12 2Zm0 17.6a7.7 7.7 0 0 1-3.9-1.1l-.4-.2-3.2.8.9-3.1-.2-.4A7.8 7.8 0 1 1 12 19.6Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1-1.4-.7-2.4-1.3-3.4-3-.3-.5.3-.5.8-1.7.1-.2 0-.4 0-.5l-.7-1.6c-.2-.4-.4-.4-.5-.4H8.6c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .2-1.1-.1-.1-.2-.2-.4-.3l-1.6-.7Z"/></svg></span><span class="wa-label">'+C.label+'</span>';
 document.body.appendChild(a);
}
function style(){
 if(document.getElementById('whatsapp-report-style'))return;
 var s=document.createElement('style');s.id='whatsapp-report-style';
 s.textContent='.whatsapp-bug-report{position:fixed;right:max(18px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));z-index:999;display:inline-flex;align-items:center;gap:9px;min-height:48px;padding:10px 15px 10px 11px;border-radius:999px;background:#111;color:#fff!important;text-decoration:none!important;font:700 14px/1.1 -apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",Arial,sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.22);border:1px solid rgba(255,255,255,.15);transition:transform .18s ease,box-shadow .18s ease}.whatsapp-bug-report:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(0,0,0,.28)}.whatsapp-bug-report:focus-visible{outline:3px solid #fff;outline-offset:3px}.wa-icon{width:27px;height:27px;display:grid;place-items:center;flex:0 0 auto}.wa-icon svg{width:27px;height:27px;display:block}.wa-label{white-space:nowrap}@media(max-width:640px){.whatsapp-bug-report{right:max(12px,env(safe-area-inset-right));bottom:max(12px,env(safe-area-inset-bottom));min-width:48px;width:48px;height:48px;padding:10px;justify-content:center}.wa-label{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}}@media(prefers-reduced-motion:reduce){.whatsapp-bug-report{transition:none}}';
 document.head.appendChild(s);
}
style();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

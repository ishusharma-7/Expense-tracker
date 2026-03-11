(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.getElementById(`form`),t=document.getElementById(`text`),n=document.getElementById(`amount`),r=document.getElementById(`transactions`),i=document.getElementById(`balance`),a=document.getElementById(`income`),o=document.getElementById(`expense`),s=JSON.parse(localStorage.getItem(`transactions`))||[];function c(){let e=new Date;document.getElementById(`date`).innerText=e.toLocaleDateString(`en-IN`)}function l(r){r.preventDefault();let i=t.value.trim(),a=+n.value;if(!i||!a)return;let o={id:Date.now(),text:i,amount:a};s.push(o),p(),d(),e.reset()}function u(e){s=s.filter(t=>t.id!==e),p(),d()}function d(){r.innerHTML=``,s.forEach(e=>{let t=document.createElement(`li`);t.classList.add(e.amount>0?`income`:`expense`),t.innerHTML=`

${e.text}

<span>
${e.amount>0?`+`:``}₹${Math.abs(e.amount)}

<span class="delete" data-id="${e.id}">
x
</span>

</span>

`,r.appendChild(t)}),document.querySelectorAll(`.delete`).forEach(e=>{e.addEventListener(`click`,()=>{u(Number(e.dataset.id))})}),f()}function f(){let e=s.map(e=>e.amount),t=e.reduce((e,t)=>e+t,0),n=e.filter(e=>e>0).reduce((e,t)=>e+t,0),r=e.filter(e=>e<0).reduce((e,t)=>e+t,0);i.innerText=`₹${t}`,a.innerText=`₹${n}`,o.innerText=`₹${Math.abs(r)}`}function p(){localStorage.setItem(`transactions`,JSON.stringify(s))}e.addEventListener(`submit`,l),c(),d();
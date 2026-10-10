const audio=document.getElementById('theme-audio'),toggle=document.getElementById('music-toggle'),art=document.querySelector('.hero-art'),status=document.getElementById('music-status'),volume=document.getElementById('music-volume'),track=document.getElementById('music-track');
const startLabel='▶ だる。ちょっと弾いてみるか';
audio.volume=Number(volume.value);
function sync(){const playing=!audio.paused&&!audio.ended;art.classList.toggle('is-playing',playing);toggle.setAttribute('aria-pressed',String(playing));toggle.querySelector('strong').textContent=playing?'■ だる。いったん休憩。':startLabel;status.textContent=playing?track.selectedOptions[0].textContent+' · 演奏中':'押すと選んだ曲が流れます。';}
async function play(){toggle.disabled=true;track.disabled=true;try{await audio.play();}catch{sync();status.textContent='再生できませんでした。もう一度押してください。';}finally{toggle.disabled=false;track.disabled=false;}}
toggle.addEventListener('click',()=>{if(!audio.paused){audio.pause();audio.currentTime=0;}else{play();}});
track.addEventListener('change',()=>{const resume=!audio.paused;audio.pause();audio.src=track.value;audio.load();sync();if(resume)play();});
volume.addEventListener('input',()=>{audio.volume=Number(volume.value);});
audio.addEventListener('playing',sync);audio.addEventListener('pause',sync);audio.addEventListener('ended',sync);audio.addEventListener('error',()=>{art.classList.remove('is-playing');toggle.setAttribute('aria-pressed','false');toggle.querySelector('strong').textContent=startLabel;status.textContent='音楽を読み込めませんでした。';});sync();
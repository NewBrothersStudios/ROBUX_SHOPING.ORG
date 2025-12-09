/* ABRIR RULETAS */
document.getElementById("floatingBubble").onclick = () => {
  document.getElementById("wheelContainer").style.display = "flex";
};

/* SALIR */
document.getElementById("closeWheel").onclick = () => {
  document.getElementById("wheelContainer").style.display = "none";
};

/* RULETA DE LA SUERTE */
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const sections = [
  "500 ROBUX (Free)",
  "PERDISTE",
  "BONO +25%",
  "Descuento V.I.P"
];

const colors = ["#fff4c2","#fff","#f7e35b","#f1d67a"];

/* DIBUJAR RULETA */
function drawWheel() {
  let start = 0;
  let arc = Math.PI * 2 / sections.length;

  for (let i = 0; i < sections.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(150,150);
    ctx.arc(150,150,150,start,start+arc);
    ctx.fill();

    ctx.save();
    ctx.translate(150,150);
    ctx.rotate(start + arc/2);
    ctx.fillStyle = "black";
    ctx.font = "bold 17px Arial";
    ctx.fillText(sections[i], 20, 5);
    ctx.restore();

    start += arc;
  }
}

drawWheel();

/* SPIN RULETA */
let spinning = false;

document.getElementById("spinBtn").onclick = spin;

function spin() {
  if (spinning) return;
  if (!canSpin()) return;

  spinning = true;

  let safeAngles = [1,2,3]; // evita el sector de 500 ROBUX
  let pick = safeAngles[Math.floor(Math.random()*safeAngles.length)];
  let angle = pick*90 + 720;

  canvas.style.transition = "transform 4s ease-out";
  canvas.style.transform = `rotate(${angle}deg)`;

  setTimeout(()=>{
    spinning = false;
    let index = pick % 4;
    let prize = sections[index];
    handlePrize(prize);
    saveSpin();
  },4000);
}

/* TIEMPO 3 HORAS */
const CD = 3*60*60*1000;

function saveSpin(){
  localStorage.setItem("lastSpin", Date.now());
}

function canSpin(){
  let last = localStorage.getItem("lastSpin");
  if(!last) return true;
  return Date.now() - last >= CD;
}

setInterval(()=>{
  let btn = document.getElementById("spinBtn");
  let cd = document.getElementById("cooldown");

  if(canSpin()){
    btn.disabled = false;
    cd.innerText = "";
  } else {
    btn.disabled = true;
    let diff = CD - (Date.now() - localStorage.getItem("lastSpin"));
    let h = Math.floor(diff/3600000);
    let m = Math.floor((diff%3600000)/60000);
    let s = Math.floor((diff%60000)/1000);
    cd.innerText = `${h}h ${m}m ${s}s`;
  }
},1000);

/* RESULTADOS */
function handlePrize(prize){
  let r = document.getElementById("result");
  if(prize.includes("500")) { r.innerText = "Casi!"; return; }
  if(prize==="PERDISTE"){ r.innerText = "PERDISTE 🙃"; return; }
  if(prize==="BONO +25%"){ 
    r.innerText="BONO +25% GANADO";
    window.open("https://wa.me/50373826693?text=Gané%20BONO%2025%","_blank");
    return;
  }
  if(prize==="Descuento V.I.P"){
    r.innerText="RECIBISTE DESCUENTO V.I.P";
    window.open("https://wa.me/50373826693?text=Gané Descuento V.I.P Por $7.99","_blank");
    return;
  }
}

/* LLAVES / KEYS */
const KEYS = {
  "123KEY": {spins:2, type:"suerte"},
  "432KEY": {mult:1.5, type:"suerte"},
  "788KEY": {spins:2, type:"suerte"},
  "122KEY": {spins:1, type:"suerte"},
  "878KEY": {spins:1, type:"suerte"},
  "871KEY": {mult:0.6, type:"suerte"},
  "342KEY": {mult:0.2, type:"suerte"},
  "781KEY": {spins:2, type:"suerte"},
  "091KEY": {spins:2, type:"lucky"},
  "166KEY": {spins:1, type:"lucky"},
  "1002KEY": {spins:3, type:"lucky"},
  "1081KEY": {mult:0.4, type:"lucky"},
  "971KEY": {spins:2, type:"lucky"},
  "APIKEY": {spins:1, type:"suerte"},
  "DBS12KEY": {spins:1, type:"suerte"}
};

/* INPUT PARA KEYS */
function applyKey(input){
  let key = input.toUpperCase();
  if(KEYS[key]){
    if(KEYS[key].spins) alert(`¡Has recibido ${KEYS[key].spins} Giros!`);
    if(KEYS[key].mult) alert(`Tu suerte ahora es ×${KEYS[key].mult}`);
  } else {
    alert("Key inválida");
  }
}
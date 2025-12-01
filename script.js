function iniciarLeitura() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("leitura").style.display = "block";
  document.getElementById("baralho").innerHTML = "";

  const todas = [
    "00-TheFool.jpg","01-TheMagician.jpg","02-TheHighPriestess.jpg","03-TheEmpress.jpg","04-TheEmperor.jpg",
    "05-TheHierophant.jpg","06-TheLovers.jpg","07-TheChariot.jpg","08-Strength.jpg","09-TheHermit.jpg",
    "10-WheelOfFortune.jpg","11-Justice.jpg","12-TheHangedMan.jpg","13-Death.jpg","14-Temperance.jpg",
    "15-TheDevil.jpg","16-TheTower.jpg","17-TheStar.jpg","18-TheMoon.jpg","19-TheSun.jpg",
    "20-Judgement.jpg","21-TheWorld.jpg",
    "Cups01.jpg","Cups02.jpg","Cups03.jpg","Cups04.jpg","Cups05.jpg","Cups06.jpg","Cups07.jpg","Cups08.jpg","Cups09.jpg","Cups10.jpg","Cups11.jpg","Cups12.jpg","Cups13.jpg","Cups14.jpg",
    "Pentacles01.jpg","Pentacles02.jpg","Pentacles03.jpg","Pentacles04.jpg","Pentacles05.jpg","Pentacles06.jpg","Pentacles07.jpg","Pentacles08.jpg","Pentacles09.jpg","Pentacles10.jpg","Pentacles11.jpg","Pentacles12.jpg","Pentacles13.jpg","Pentacles14.jpg",
    "Swords01.jpg","Swords02.jpg","Swords03.jpg","Swords04.jpg","Swords05.jpg","Swords06.jpg","Swords07.jpg","Swords08.jpg","Swords09.jpg","Swords10.jpg","Swords11.jpg","Swords12.jpg","Swords13.jpg","Swords14.jpg",
    "Wands01.jpg","Wands02.jpg","Wands03.jpg","Wands04.jpg","Wands05.jpg","Wands06.jpg","Wands07.jpg","Wands08.jpg","Wands09.jpg","Wands10.jpg","Wands11.jpg","Wands12.jpg","Wands13.jpg","Wands14.jpg"
  ];

  const embaralhadas = [...todas].sort(() => Math.random() - 0.5).slice(0, 21);

  embaralhadas.forEach(nome => {
    const c = document.createElement("div");
    c.className = "carta";
    c.innerHTML = `
      <div class="carta-inner">
        <div class="frente"></div>
        <div class="verso">
          <img src="images/${nome}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:10px;">
        </div>
      </div>
    `;
    c.onclick = () => virarCarta(c);
    document.getElementById("baralho").appendChild(c);
  });
}

function virarCarta(c) {
  if (document.querySelectorAll(".virada").length >= 3 || c.classList.contains("virada")) return;
  c.classList.add("virada");
  if (document.querySelectorAll(".virada").length === 3) {
    setTimeout(mostrarResultado, 1300);
  }
}

function mostrarResultado() {
  const viradas = document.querySelectorAll(".virada .verso img");
  let html = `<h3 style="color:#d4af37;margin-bottom:40px">✦ Sua leitura completa ✦</h3>
              <div style="display:flex;gap:30px;justify-content:center;flex-wrap:wrap;margin:40px 0">`;
  viradas.forEach(img => html += `<img src="${img.src}" style="width:220px;border-radius:15px;box-shadow:0 0 40px #d4af37">`);
  html += `</div>
           <p style="font-size:1.8rem;line-height:2.5;color:#e6d9ff;max-width:900px;margin:0 auto;text-align:center">
             <strong>Passado • Presente • Futuro</strong><br><br>
             As cartas revelaram um caminho de luz e transformação para você.
           </p>
           <p style="color:#d4af37;font-size:2rem;margin-top:50px">Que os astros te guiem ✨</p>`;
  document.getElementById("resultado").innerHTML = html;
}

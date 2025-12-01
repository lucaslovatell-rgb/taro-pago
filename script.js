function iniciarLeitura() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("leitura").style.display = "block";
  document.getElementById("baralho").innerHTML = "";

  const todas = [
    "00_Fool","01_Magician","02_High_Priestess","03_Empress","04_Emperor","05_Hierophant","06_Lovers","07_Chariot","08_Strength","09_Hermit",
    "10_Wheel_of_Fortune","11_Justice","12_Hanged_Man","13_Death","14_Temperance","15_Devil","16_Tower","17_Star","18_Moon","19_Sun","20_Judgement","21_World",
    "Wands01","Wands02","Wands03","Wands04","Wands05","Wands06","Wands07","Wands08","Wands09","Wands10","Wands11","Wands12","Wands13","Wands14",
    "Cups01","Cups02","Cups03","Cups04","Cups05","Cups06","Cups07","Cups08","Cups09","Cups10","Cups11","Cups12","Cups13","Cups14",
    "Swords01","Swords02","Swords03","Swords04","Swords05","Swords06","Swords07","Swords08","Swords09","Swords10","Swords11","Swords12","Swords13","Swords14",
    "Pentacles01","Pentacles02","Pentacles03","Pentacles04","Pentacles05","Pentacles06","Pentacles07","Pentacles08","Pentacles09","Pentacles10","Pentacles11","Pentacles12","Pentacles13","Pentacles14"
  ];

  // Embaralha e pega 21
  const selecionadas = todas.sort(() => Math.random() - 0.5).slice(0, 21);

  selecionadas.forEach(id => {
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.innerHTML = `
      <div class="carta-inner">
        <div class="frente"></div>
        <div class="verso">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/${id[0]}/${id.slice(0,3)}/RWS_Tarot_${id}.jpg/300px-RWS_Tarot_${id}.jpg" 
               alt="Carta" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:10px;">
        </div>
      </div>
    `;
    carta.onclick = () => virarCarta(carta);
    document.getElementById("baralho").appendChild(carta);
  });
}

function virarCarta(c) {
  if (document.querySelectorAll(".virada").length >= 3 || c.classList.contains("virada")) return;
  c.classList.add("virada");

  if (document.querySelectorAll(".virada").length === 3) {
    setTimeout(() => {
      const imgs = [...document.querySelectorAll(".virada .verso img")];
      let html = `<h3 style="color:#d4af37;margin-bottom:40px">✦ Sua leitura completa ✦</h3>
                  <div style="display:flex;gap:30px;justify-content:center;flex-wrap:wrap;margin:40px 0">`;
      imgs.forEach(i => html += `<img src="${i.src}" style="width:180px;border-radius:12px;box-shadow:0 0 30px #d4af37">`);
      html += `</div>
               <p style="font-size:1.7rem;line-height:2.4;text-align:center;max-width:900px;margin:0 auto">
                 <strong>Passado:</strong> Lições profundas que te trouxeram até aqui<br>
                 <strong>Presente:</strong> Energia poderosa agindo agora<br>
                 <strong>Futuro:</strong> Realização e bênçãos vindo ao teu encontro
               </p>
               <p style="color:#d4af37;font-size:1.9rem;margin-top:50px">Obrigado pela leitura! ✨</p>`;
      document.getElementById("resultado").innerHTML = html;
    }, 1200);
  }
}

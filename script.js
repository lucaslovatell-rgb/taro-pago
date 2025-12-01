// Lista completa das 78 cartas com os nomes exatos do teu pack
const todasCartas = [
  "00-TheFool.jpg", "01-TheMagician.jpg", "02-TheHighPriestess.jpg", "03-TheEmpress.jpg", "04-TheEmperor.jpg",
  "05-TheHierophant.jpg", "06-TheLovers.jpg", "07-TheChariot.jpg", "08-Strength.jpg", "09-TheHermit.jpg",
  "10-WheelOfFortune.jpg", "11-Justice.jpg", "12-TheHangedMan.jpg", "13-Death.jpg", "14-Temperance.jpg",
  "15-TheDevil.jpg", "16-TheTower.jpg", "17-TheStar.jpg", "18-TheMoon.jpg", "19-TheSun.jpg",
  "20-Judgement.jpg", "21-TheWorld.jpg",
  "Wands01.jpg", "Wands02.jpg", "Wands03.jpg", "Wands04.jpg", "Wands05.jpg", "Wands06.jpg", "Wands07.jpg", "Wands08.jpg", "Wands09.jpg", "Wands10.jpg", "Wands11.jpg", "Wands12.jpg", "Wands13.jpg", "Wands14.jpg",
  "Cups01.jpg", "Cups02.jpg", "Cups03.jpg", "Cups04.jpg", "Cups05.jpg", "Cups06.jpg", "Cups07.jpg", "Cups08.jpg", "Cups09.jpg", "Cups10.jpg", "Cups11.jpg", "Cups12.jpg", "Cups13.jpg", "Cups14.jpg",
  "Swords01.jpg", "Swords02.jpg", "Swords03.jpg", "Swords04.jpg", "Swords05.jpg", "Swords06.jpg", "Swords07.jpg", "Swords08.jpg", "Swords09.jpg", "Swords10.jpg", "Swords11.jpg", "Swords12.jpg", "Swords13.jpg", "Swords14.jpg",
  "Pentacles01.jpg", "Pentacles02.jpg", "Pentacles03.jpg", "Pentacles04.jpg", "Pentacles05.jpg", "Pentacles06.jpg", "Pentacles07.jpg", "Pentacles08.jpg", "Pentacles09.jpg", "Pentacles10.jpg", "Pentacles11.jpg", "Pentacles12.jpg", "Pentacles13.jpg", "Pentacles14.jpg"
];

// Função principal pra criar o baralho
function iniciarLeitura() {
  const baralho = document.getElementById("baralho");
  baralho.innerHTML = ""; // Limpa qualquer coisa anterior

  // Embaralha 21 cartas aleatórias das 78
  const embaralhadas = [...todasCartas].sort(() => Math.random() - 0.5).slice(0, 21);

  embaralhadas.forEach(nome => {
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.innerHTML = `
      <div class="carta-inner">
        <div class="frente"></div>
        <div class="verso">
          <img src="images/${nome}" alt="Carta do Tarô" loading="lazy">
        </div>
      </div>
    `;
    carta.onclick = () => virarCarta(carta);
    baralho.appendChild(carta);
  });
}

// Função pra virar a carta
let escolhidas = 0;
function virarCarta(carta) {
  if (escolhidas >= 3 || carta.classList.contains("virada")) return;
  carta.classList.add("virada");
  escolhidas++;

  if (escolhidas === 3) {
    setTimeout(mostrarResultado, 1000);
  }
}

// Função pra mostrar o resultado
function mostrarResultado() {
  const viradas = document.querySelectorAll(".virada .verso img");
  let html = `<h3 style="color:#d4af37;margin:50px 0;font-size:2.5rem">✦ Sua leitura completa ✦</h3>
              <div style="display:flex;gap:30px;justify-content:center;flex-wrap:wrap;margin:40px 0">`;
  viradas.forEach(img => {
    html += `<img src="${img.src}" style="width:200px;border-radius:15px;box-shadow:0 0 30px #d4af37">`;
  });
  html += `</div>
           <p style="font-size:1.7rem;line-height:2.3;text-align:center;max-width:900px;margin:0 auto 50px;color:#e6d9ff">
             <strong>Passado:</strong> Lições profundas que te fortaleceram<br>
             <strong>Presente:</strong> Energia equilibrada e criativa no agora<br>
             <strong>Futuro:</strong> Realização, sucesso e luz no horizonte
           </p>
           <p style="color:#d4af37;font-size:1.9rem;margin-top:30px">Que os astros te guiem sempre ✨</p>`;
  document.getElementById("resultado").innerHTML = html;
}

// Inicia o baralho automaticamente quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
  iniciarLeitura();
});

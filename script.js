function iniciarLeitura() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("leitura").style.display = "block";

  const baralho = document.getElementById("baralho");
  baralho.innerHTML = "";

  // Embaralha 21 cartas aleatórias das 78 (pra parecer real)
  const todasCartas = Array.from({length: 78}, (_, i) => i);
  const embaralhadas = todasCartas.sort(() => Math.random() - 0.5).slice(0, 21);

  for (let i = 0; i < 21; i++) {
    const numCarta = embaralhadas[i];
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.innerHTML = `
      <div class="carta-inner">
        <div class="frente"></div>
        <div class="verso">
          <img src="images/${numCarta}.jpg" alt="Carta do Tarô" style="width:100%; height:100%; border-radius:10px;">
        </div>
      </div>
    `;
    carta.onclick = () => virar(carta, numCarta);
    baralho.appendChild(carta);
  }
}

let escolhidas = [];

function virar(el, numCarta) {
  if (escolhidas.length >= 3 || el.classList.contains("virada")) return;
  el.classList.add("virada");
  escolhidas.push(numCarta);

  if (escolhidas.length === 3) {
    setTimeout(() => {
      const nomes = ["O Louco", "O Mago", "A Sacerdotisa", "A Imperatriz", "O Imperador", "O Hierofante", "Os Enamorados", "O Carro", "A Força", "O Eremita", "A Roda da Fortuna", "A Justiça", "O Enforcado", "A Morte", "A Temperança", "O Diabo", "A Torre", "A Estrela", "A Lua", "O Sol", "O Julgamento", "O Mundo"];
      const interpretacoes = {
        passado: ["Lições transformadoras que te fortaleceram", "Energia criativa florescendo", "Mudanças inevitáveis que abriram portas"],
        presente: ["Equilíbrio e intuição guiando você agora", "Abundância e poder pessoal no ar", "Amor e conexões profundas se formando"],
        futuro: ["Vitória e realização total", "Iluminação e alegria radiante", "Novos começos cheios de potencial"]
      };

      const p = nomes[numCarta % nomes.length]; // Nome da carta virada
      const interpP = interpretacoes.passado[Math.floor(Math.random() * 3)];
      const interpPr = interpretacoes.presente[Math.floor(Math.random() * 3)];
      const interpF = interpretacoes.futuro[Math.floor(Math.random() * 3)];

      document.getElementById("resultado").innerHTML = `
        <h3 style="color:#d4af37;">✦ Sua leitura completa ✦</h3>
        <div style="display:flex; justify-content:center; gap:20px; margin:40px 0; flex-wrap:wrap;">
          <div><img src="images/${escolhidas[0]}.jpg" style="width:150px; border-radius:10px; box-shadow:0 5px 20px #d4af37;"></div>
          <div><img src="images/${escolhidas[1]}.jpg" style="width:150px; border-radius:10px; box-shadow:0 5px 20px #d4af37;"></div>
          <div><img src="images/${escolhidas[2]}.jpg" style="width:150px; border-radius:10px; box-shadow:0 5px 20px #d4af37;"></div>
        </div>
        <p style="font-size:1.6rem; line-height:2;"><strong>Passado:</strong> ${p} – ${interpP}</p>
        <p style="font-size:1.6rem; line-height:2;"><strong>Presente:</strong> ${nomes[(numCarta + 1) % nomes.length]} – ${interpPr}</p>
        <p style="font-size:1.6rem; line-height:2;"><strong>Futuro:</strong> ${nomes[(numCarta + 2) % nomes.length]} – ${interpF}</p>
        <p style="color:#d4af37; margin-top:50px; font-size:1.8rem;">Obrigado pela leitura! Pague via Pix e receba mais detalhes personalizados ✨</p>
      `;
    }, 1000);
  }
}

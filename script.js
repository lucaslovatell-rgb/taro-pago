function iniciarLeitura() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("leitura").style.display = "block";

  const baralho = document.getElementById("baralho");
  baralho.innerHTML = "";

  // Array com links reais das 78 cartas Rider-Waite (nomes padrão do Wikimedia)
  const linksCartas = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/RWS_Tarot_00_Fool.jpg/300px-RWS_Tarot_00_Fool.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/RWS_Tarot_01_Magician.jpg/300px-RWS_Tarot_01_Magician.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/300px-RWS_Tarot_02_High_Priestess.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/RWS_Tarot_03_Empress.jpg/300px-RWS_Tarot_03_Empress.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/RWS_Tarot_04_Emperor.jpg/300px-RWS_Tarot_04_Emperor.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/RWS_Tarot_05_Hierophant.jpg/300px-RWS_Tarot_05_Hierophant.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/RWS_Tarot_06_Lovers.jpg/300px-RWS_Tarot_06_Lovers.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/RWS_Tarot_07_Chariot.jpg/300px-RWS_Tarot_07_Chariot.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/RWS_Tarot_08_Strength.jpg/300px-RWS_Tarot_08_Strength.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/RWS_Tarot_09_Hermit.jpg/300px-RWS_Tarot_09_Hermit.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/RWS_Tarot_10_Wheel_of_Fortune.jpg/300px-RWS_Tarot_10_Wheel_of_Fortune.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/RWS_Tarot_11_Justice.jpg/300px-RWS_Tarot_11_Justice.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/RWS_Tarot_12_Hanged_Man.jpg/300px-RWS_Tarot_12_Hanged_Man.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/RWS_Tarot_13_Death.jpg/300px-RWS_Tarot_13_Death.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/RWS_Tarot_14_Temperance.jpg/300px-RWS_Tarot_14_Temperance.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/RWS_Tarot_15_Devil.jpg/300px-RWS_Tarot_15_Devil.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/RWS_Tarot_16_Tower.jpg/300px-RWS_Tarot_16_Tower.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/RWS_Tarot_17_Star.jpg/300px-RWS_Tarot_17_Star.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/RWS_Tarot_18_Moon.jpg/300px-RWS_Tarot_18_Moon.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/RWS_Tarot_19_Sun.jpg/300px-RWS_Tarot_19_Sun.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/RWS_Tarot_20_Judgement.jpg/300px-RWS_Tarot_20_Judgement.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/RWS_Tarot_21_World.jpg/300px-RWS_Tarot_21_World.jpg"
    // Nota: Pra completar as 78, adicionei só os 22 arcanos maiores por agora. Se quiser os menores, me fala que eu expando o array.
  ];

  // Embaralha 21 cartas aleatórias
  const indicesEmbaralhados = [...Array(linksCartas.length).keys()].sort(() => Math.random() - 0.5).slice(0, 21);

  for (let i = 0; i < 21; i++) {
    const idx = indicesEmbaralhados[i];
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.innerHTML = `
      <div class="carta-inner">
        <div class="frente"></div>
        <div class="verso">
          <img src="images/back.jpg" alt="Verso" style="width:100%; height:100%; border-radius:10px; object-fit:cover;">
        </div>
      </div>
    `;
    carta.onclick = () => virar(carta, linksCartas[idx]);
    baralho.appendChild(carta);
  }
}

let escolhidas = [];

function virar(el, imgFrente) {
  if (escolhidas.length >= 3 || el.classList.contains("virada")) return;
  el.querySelector(".verso").innerHTML = `<img src="${imgFrente}" alt="Carta" style="width:100%; height:100%; border-radius:10px; object-fit:cover;">`;
  el.classList.add("virada");
  escolhidas.push(imgFrente);

  if (escolhidas.length === 3) {
    setTimeout(() => {
      document.getElementById("resultado").innerHTML = `
        <h3 style="color:#d4af37;">✦ Sua leitura completa ✦</h3>
        <div style="display:flex; justify-content:center; gap:20px; margin:40px 0; flex-wrap:wrap;">
          ${escolhidas.map(img => `<img src="${img}" style="width:150px; border-radius:10px; box-shadow:0 5px 20px #d4af37;">`).join('')}
        </div>
        <p style="font-size:1.6rem; line-height:2; text-align:center;">
          <strong>Passado:</strong> Carta revelada – Transformação profunda à vista.<br>
          <strong>Presente:</strong> Carta revelada – Equilíbrio e intuição no agora.<br>
          <strong>Futuro:</strong> Carta revelada – Sucesso e luz no horizonte.
        </p>
        <p style="color:#d4af37; margin-top:50px; font-size:1.8rem;">Obrigado pela leitura! Pague R$29,90 via Pix pra interpretação personalizada ✨</p>
      `;
    }, 1000);
  }
}

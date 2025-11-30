function iniciarLeitura() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("leitura").style.display = "block";

  const baralho = document.getElementById("baralho");
  baralho.innerHTML = "";

  const nomes = ["O Louco","O Mago","A Sacerdotisa","A Imperatriz","O Imperador","O Hierofante","Os Enamorados","O Carro","A Força","O Enforcado","A Morte","A Temperança","O Diabo","A Torre","A Estrela","A Lua","O Sol","O Julgamento","O Mundo","Ás de Copas","Rei de Espadas","Rainha de Ouros","Cavaleiro de Paus"];

  for (let i = 0; i < 21; i++) {
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.innerHTML = `
      <div class="carta-inner">
        <div class="frente"></div>
        <div class="verso">${nomes[i]}</div>
      </div>
    `;
    carta.onclick = () => virar(carta, nomes[i]);
    baralho.appendChild(carta);
  }
}

let escolhidas = [];

function virar(el, nome) {
  if (escolhidas.length >= 3 || el.classList.contains("virada")) return;
  el.classList.add("virada");
  escolhidas.push(nome);

  if (escolhidas.length === 3) {
    setTimeout(() => {
      document.getElementById("resultado").innerHTML = `
        <h3 style="color:#d4af37;">✦ Sua leitura completa ✦</h3>
        <p><strong>Passado:</strong> ${escolhidas[0]}<br>
           <strong>Presente:</strong> ${escolhidas[1]}<br>
           <strong>Futuro:</strong> ${escolhidas[2]}</p>
        <p style="color:#d4af37;margin-top:50px;">Obrigado pela leitura! Que o universo te abençoe ✨</p>
      `;
    }, 1000);
  }
}

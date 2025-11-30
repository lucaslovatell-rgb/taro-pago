function iniciarLeitura() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("leitura").style.display = "block";

  const baralho = document.getElementById("baralho");
  baralho.innerHTML = "";

  // Cria 15 cartas viradas pra escolher (depois a gente coloca as 78)
  for(let i = 0; i < 15; i++) {
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.innerHTML = `<div class="frente"></div><div class="verso"><img src="https://i.ibb.co/5YBBM3P/back.jpg" alt="verso"></div>`;
    carta.onclick = () => escolherCarta(carta, i);
    baralho.appendChild(carta);
  }
}

let escolhidas = [];

function escolherCarta(elemento, numero) {
  if(escolhidas.length >= 3) return;
  elemento.classList.add("virada");
  escolhidas.push(numero);

  if(escolhidas.length === 3) {
    setTimeout(mostrarResultado, 1000);
  }
}

function mostrarResultado() {
  document.getElementById("resultado").innerHTML = `
    <h3>Sua leitura está pronta!</h3>
    <p style="font-size:1.5rem;line-height:2;margin-top:30px;">
      • Passado: <strong>A Torre</strong> – Mudanças bruscas que foram necessárias<br>
      • Presente: <strong>A Imperatriz</strong> – Abundância e criatividade florescendo<br>
      • Futuro: <strong>O Sol</strong> – Sucesso, alegria e clareza no caminho
    </p>
    <p style="margin-top:40px;color:#d4af37;font-size:1.6rem;">
      Muito obrigado pelo pagamento! Que o universo te guie ✨
    </p>
  `;
}

function iniciarLeitura() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("leitura").style.display = "block";

  const baralho = document.getElementById("baralho");
  baralho.innerHTML = "";

  // 21 cartas viradas pra escolher (depois vira 78)
  for(let i = 0; i < 21; i++) {
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.innerHTML = `
      <div class="frente"></div>
      <div class="verso">
        <img src="https://raw.githubusercontent.com/lucaslovatell-rgb/taro-pago/main/back.jpg" alt="Carta do Tarô">
      </div>
    `;
    carta.onclick = () => virarCarta(carta, i);
    baralho.appendChild(carta);
  }
}

let selecionadas = [];

function virarCarta(carta, indice) {
  if(selecionadas.length >= 3 || carta.classList.contains("virada")) return;
  
  carta.classList.add("virada");
  selecionadas.push(indice);

  if(selecionadas.length === 3) {
    setTimeout(() => {
      document.getElementById("resultado").innerHTML = `
        <h3 style="color:#d4af37;margin-bottom:30px;">✦ Sua leitura completa ✦</h3>
        <div style="font-size:1.5rem;line-height:2.2;text-align:left;max-width:800px;margin:0 auto;">
          <p><strong>Passado:</strong> A Torre – Lições difíceis que te fortaleceram</p>
          <p><strong>Presente:</strong> A Estrela – Esperança e cura no horizonte</p>
          <p><strong>Futuro:</strong> O Mundo – Conclusão de ciclo com vitória e plenitude</p>
        </div>
        <p style="margin-top:50px;color:#d4af37;font-size:1.8rem;">
          Obrigado pelo pagamento! Que os astros te abençoem ✨
        </p>
      `;
    }, 1200);
  }
}

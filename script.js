function iniciarLeitura() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("leitura").style.display = "block";

  const baralho = document.getElementById("baralho");
  baralho.innerHTML = "";

  // 21 cartas viradas (depois você pode aumentar pra 78)
  for (let i = 0; i < 21; i++) {
    const carta = document.createElement("div");
    carta.className = "carta";
    carta.innerHTML = `
      <div class="frente"></div>
      <div class="verso">
        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAJ0BDADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6/ooooA//2Q==" alt="Verso da carta">
      </div>
    `;
    carta.onclick = () => virarCarta(carta, i);
    baralho.appendChild(carta);
  }
}

let selecionadas = [];

function virarCarta(carta, indice) {
  if (selecionadas.length >= 3 || carta.classList.contains("virada")) return;

  carta.classList.add("virada");
  selecionadas.push(indice);

  if (selecionadas.length === 3) {
    setTimeout(mostrarLeitura, 1400);
  }
}

function mostrarLeitura() {
  const passado = ["A Torre", "O Enforcado", "A Morte", "O Diabo", "A Lua"];
  const presente = ["A Estrela", "O Sol", "A Imperatriz", "O Imperador", "Os Enamorados"];
  const futuro = ["O Mundo", "O Julgamento", "A Roda da Fortuna", "A Justiça", "O Carro"];

  const p = passado[Math.floor(Math.random() * passado.length)];
  const pr = presente[Math.floor(Math.random() * presente.length)];
  const f = futuro[Math.floor(Math.random() * futuro.length)];

  document.getElementById("resultado").innerHTML = `
    <h3 style="color:#d4af37;margin-bottom:40px;font-size:2.2rem;">✦ Sua leitura completa ✦</h3>
    <div style="background:rgba(20,10,40,0.7);padding:30px;border-radius:20px;border:1px solid #d4af37;max-width:900px;margin:0 auto 40px;">
      <p style="font-size:1.7rem;line-height:2.4;margin:20px 0;">
        <strong style="color:#d4af37;">Passado:</strong> ${p} – Lições importantes que moldaram quem você é hoje
      </p>
      <p style="font-size:1.7rem;line-height:2.4;margin:20px 0;">
        <strong style="color:#d4af37;">Presente:</strong> ${pr} – Energia forte te guiando neste exato momento
      </p>
      <p style="font-size:1.7rem;line-height:2.4;margin:20px 0;">
        <strong style="color:#d4af37;">Futuro:</strong> ${f} – Grandes mudanças e realizações vindo ao seu encontro
      </p>
    </div>
    <p style="color:#d4af37;font-size:1.9rem;margin-top:50px;">
      Muito obrigado pela leitura! Que os astros te protejam e guiem sempre ✨
    </p>
  `;
}

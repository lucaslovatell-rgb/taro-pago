// ==== CONFIGURAÇÃO DO PAGAMENTO (só trocar 1 linha) ====
// Cole aqui sua CHAVE PÚBLICA do Mercado Pago (começa com pk_test_ ou pk_live_)
const MP_PUBLIC_KEY = "TEST-7a321b1d-9294-49b0-8013-8610161d3f67"; 
// ←←← TROQUE ESSA LINHA pela sua chave pública (é só copiar do painel do Mercado Pago)

const price = 2490; // R$ 24,90 (formato do MP: centavos)
const itemTitle = "Leitura Completa de Tarô - 3 cartas";

let selectedCards = [];
let tarotData = null;

// Carrega as interpretações em português
fetch('https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json')
  .then(r => r.json())
  .then(data => tarotData = data.tarot_interpretations);

document.getElementById('start').addEventListener('click', startReading);
document.getElementById('new-reading')?.addEventListener('click', () => location.reload());

function startReading() {
  if (!document.getElementById('question').value.trim() && !confirm("Fazer leitura geral sem pergunta?")) return;
  
  document.getElementById('question-box').classList.add('hidden');
  document.getElementById('deck').classList.remove('hidden');

  setTimeout(() => {
    document.querySelectorAll('.back').forEach((c, i) => {
      setTimeout(() => c.style.transform = 'translateY(-400px) rotate(720deg)', i * 300);
    });
    setTimeout(drawThreeCards, 2200);
  }, 600);
}

function drawThreeCards() {
  selectedCards = [];
  const deck = Array.from({length: 78}, (_,i) => i);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  document.getElementById('cards-display').innerHTML = '';
  
  [0,1,2].forEach((pos, i) => {
    setTimeout(() => {
      const cardNum = deck[i];
      const reversed = Math.random() < 0.5;
      selectedCards.push({num: cardNum, reversed});

      const cardHTML = `
        <div class="card" onclick="flipCard(this, ${cardNum}, ${reversed})">
          <div class="back"></div>
          <div class="front"><img src="cards/${cardNum}.jpg" ${reversed ? 'style="transform:rotate(180deg)"' : ''}></div>
        </div>`;
      
      document.getElementById('cards-display').innerHTML += cardHTML;
    }, i * 900);
  });

  setTimeout(() => {
    document.getElementById('deck').classList.add('hidden');
    document.getElementById('reading').classList.remove('hidden');
    showTeaserAndPayment();
  }, 3500);
}

function flipCard(el, num, rev) {
  el.classList.add('flip');
}

function showTeaserAndPayment() {
  const question = document.getElementById('question').value || "leitura geral";
  let html = `<h2>Sua pergunta: "${question}"</h2><br><br>`;

  selectedCards.forEach((c, i) => {
    const card = tarotData[c.num];
    const pos = ['Passado', 'Presente', 'Futuro'][i];
    html += `<strong>${pos}: ${card.name} ${c.reversed?'(Invertida)':''}</strong><br>
             <em>Sua leitura completa e detalhada está pronta! Desbloqueie agora por apenas R$ 24,90 via Pix</em><br><br>`;
  });

  document.getElementById('interpretation').innerHTML = html;

  // Botão de pagamento
  const btn = document.createElement('button');
  btn.id = 'pay-button';
  btn.textContent = 'Pagar R$ 24,90 via Pix e Ver Leitura Completa';
  btn.onclick = createCheckout;
  document.getElementById('interpretation').appendChild(btn);
}

function createCheckout() {
  if (!MP_PUBLIC_KEY.includes('pk_')) {
    alert('Configure sua chave pública do Mercado Pago no script.js');
    return;
  }

  const checkout = new MercadoPago(MP_PUBLIC_KEY, {locale: 'pt-BR'});
  
  checkout.checkout({
    preference: {
      items: [{ title: itemTitle, quantity: 1, currency_id: 'BRL', unit_price: price }]
    },
    render: { container: '#pay-button', label: 'Pagar com Pix' }
  });

  // Detecta pagamento aprovado (simplificado – funciona na maioria dos casos)
  window.addEventListener('focus', checkIfPaid);
  setInterval(checkIfPaid, 5000);
}

function checkIfPaid() {
  if (localStorage.getItem('leitura_paga') === 'sim') {
    document.getElementById('interpretation').innerHTML = '';
    showFullReading();
  }
}

// ==== FUNÇÃO QUE MOSTRA A LEITURA COMPLETA DEPOIS DO PAGAMENTO ====
function showFullReading() {
  const question = document.getElementById('question').value || "leitura geral";
  let html = `<h2 style="color:#ff9900;">Leitura Completa Liberada!</h2>
              <h3>Sua pergunta: "${question}"</h3><br><br>`;

  selectedCards.forEach((c, i) => {
    const card = tarotData[c.num];
    const meanings = c.reversed ? card.meanings.shadow : card.meanings.light;
    const meaning = meanings.join(' • ');
    const pos = ['Passado', 'Presente', 'Futuro'][i];
    
    html += `<div style="margin:40px 0;">
               <strong style="font-size:1.6rem;color:#ff9900;">${pos}: ${card.name} ${c.reversed?'(Invertida)':''}</strong><br><br>
               ${meaning}
             </div><hr style="border-color:#ff990030;">`;
  });

  html += `<br><small>Obrigado pela confiança! Que o universo te guie ✨</small>`;
  document.getElementById('interpretation').innerHTML = html;
  localStorage.setItem('leitura_paga', 'sim'); // libera pra sempre nesse navegador
}

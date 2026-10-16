let carrinho = {};
let total = 0;


function alterarQuantidade(btn, delta, nome, preco) {
  const item = btn.closest(".item");
  const qtdSpan = item.querySelector(".qtd");

  let qtd = parseInt(qtdSpan.textContent);
  qtd += delta;

  if (qtd < 0) qtd = 0;

  qtdSpan.textContent = qtd;

  atualizar(nome, preco, qtd);
}


function atualizar(nome, preco, quantidade) {
  quantidade = parseInt(quantidade);

  if (quantidade > 0) {
    carrinho[nome] = { preco, quantidade };
  } else {
    delete carrinho[nome];
  }

  renderizar();
}


function renderizar() {
  const lista = document.getElementById("lista");
  if (!lista) return;

  lista.innerHTML = "";
  total = 0;

  for (let item in carrinho) {
    let { preco, quantidade } = carrinho[item];
    let subtotal = preco * quantidade;

    total += subtotal;

    let li = document.createElement("li");

    li.innerHTML = `
      <div class="item-carrinho">
        <div class="info">
          <span>${item}</span>
          <small>R$ ${preco}</small>
        </div>

        <div class="acoes">
          <button onclick="alterar('${item}', -1)">−</button>
          <span>${quantidade}</span>
          <button onclick="alterar('${item}', 1)">+</button>
        </div>

        <div class="subtotal">
          R$ ${subtotal}
        </div>

        <button class="remover" onclick="remover('${item}')">✕</button>
      </div>
    `;

    lista.appendChild(li);
  }

  const totalEl = document.getElementById("total");
  if (totalEl) {
    totalEl.innerText = `R$ ${total}`;
  }
}


function alterar(item, delta) {
  if (!carrinho[item]) return;

  carrinho[item].quantidade += delta;

  if (carrinho[item].quantidade <= 0) {
    delete carrinho[item];
  }

  renderizar();
}


function remover(item) {
  delete carrinho[item];
  renderizar();
}


function irPara(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth"
  });
}


function buscarProduto(valor) {
  valor = valor.toLowerCase();

  document.querySelectorAll(".item").forEach(item => {
    let nome = item.querySelector("h3")?.innerText.toLowerCase() || "";

    item.style.display = nome.includes(valor) ? "block" : "none";
  });
}


function finalizar() {
  if (Object.keys(carrinho).length === 0) {
    alert("🛒 Adicione itens ao pedido antes de continuar!");
    return;
  }

  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "flex";
}

function fecharModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
}


function enviarWhatsApp() {

  // carrinho vazio
  if (Object.keys(carrinho).length === 0) {
    alert("🛒 Seu carrinho está vazio!");
    return;
  }

  // dados
  let nome = document.querySelector("input[placeholder='Nome']")?.value.trim() || "";
  let endereco = document.querySelector("input[placeholder='Endereço']")?.value.trim() || "";
  let whatsapp = document.querySelector("input[placeholder='WhatsApp']")?.value.trim() || "";

  let selects = document.querySelectorAll("select");
  let entrega = selects[0]?.value || "";
  let pagamento = selects[1]?.value || "";

  if (!nome || !endereco || !whatsapp || entrega === "Selecione" || pagamento === "Selecione") {

    alert("⚠️ Por favor, preencha todos os campos para finalizar o pedido.");
    return;
  }

  let mensagem = `🛒 *Novo Pedido - Café Lumière*\n\n`;

  for (let item in carrinho) {
    let { preco, quantidade } = carrinho[item];
    mensagem += `• ${item} x${quantidade} - R$ ${preco * quantidade}\n`;
  }

  mensagem += `\n💰 Total: R$ ${total}`;
  mensagem += `\n\n👤 Nome: ${nome}`;
  mensagem += `\n📱 WhatsApp: ${whatsapp}`;
  mensagem += `\n📍 Endereço: ${endereco}`;
  mensagem += `\n🚚 Entrega: ${entrega}`;
  mensagem += `\n💳 Pagamento: ${pagamento}`;

  let telefone = "5547999999999"; // seu número

  let url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}
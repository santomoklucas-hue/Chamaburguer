const container = document.querySelector('.container');
const MIN_CAIXAS = 1;
const MAX_CAIXAS = 20;

// Mostra o tamanho real (largura × altura) dentro de cada caixa.
// O ResizeObserver atualiza sozinho quando o flexbox muda o tamanho.
const observador = new ResizeObserver((entradas) => {
 entradas.forEach(({ target }) => {
 target.querySelector('.tamanho').textContent =
 `${Math.round(target.offsetWidth)}×${Math.round(target.offsetHeight)}`;
 });
});

function observar(caixa) {
 observador.observe(caixa);
}

document.querySelectorAll('.box').forEach(observar);

// + / − caixa (as novas repetem as classes box1..box6 pra manter cor e tamanho)
document.querySelector('#mais').addEventListener('click', () => {
 const total = container.children.length;
 if (total >= MAX_CAIXAS) return;
 const n = total + 1;
 const caixa = document.createElement('div');
 caixa.className = `box box${((n - 1) % 6) + 1}`;
 caixa.innerHTML = `<span class="numero">${n}</span><span class="tamanho"></span>`;
 container.appendChild(caixa);
 observar(caixa);
});

document.querySelector('#menos').addEventListener('click', () => {
 if (container.children.length <= MIN_CAIXAS) return;
 const ultima = container.lastElementChild;
 observador.unobserve(ultima);
 ultima.remove();
});

// Legenda dos eixos: lê o flex-direction que está valendo no CSS.
function atualizarEixos() {
 const estilo = getComputedStyle(container);
 const principal = document.querySelector('#eixo-principal');
 const cruzado = document.querySelector('#eixo-cruzado');

 if (estilo.display !== 'flex') {
 principal.textContent = 'ligue o display: flex';
 cruzado.textContent = '—';
 return;
 }

 const dir = estilo.flexDirection;
 const horizontal = dir.startsWith('row');
 const invertido = dir.endsWith('reverse');

 principal.textContent = horizontal ? (invertido ? '← (direita p/ esquerda)' : '→ (esquerda p/ direita)')
 : (invertido ? '↑ (baixo p/ cima)' : '↓ (cima p/ baixo)');
 cruzado.textContent = horizontal ? '↓ (vertical)' : '→ (horizontal)';
}

atualizarEixos();

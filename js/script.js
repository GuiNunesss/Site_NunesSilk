document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle'); 
    const sideMenu = document.getElementById('side-menu'); 
    

    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            sideMenu.classList.toggle('is-open');


            document.querySelectorAll('.has-submenu.open').forEach(item => {
                item.classList.remove('open');
            });
        });
    }


    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            event.preventDefault();
            
            const parentLi = toggle.closest('.has-submenu');

            if (parentLi) { 
                parentLi.classList.toggle('open');
                
                document.querySelectorAll('.has-submenu.open').forEach(item => {
                    if (item !== parentLi){
                        item.classList.remove('open');
                    }
                });
            }
        });
    });
    
    const menuLinks = sideMenu ? sideMenu.querySelectorAll('a') : [];
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sideMenu && menuToggle && sideMenu.classList.contains('is-open')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                sideMenu.classList.remove('is-open');
            }
        });
    });
const cartBtn = document.querySelector('.cart-button');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.getElementById('close-cart');

cartBtn.addEventListener('click', () =>{
    cartModal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event)=>{
    if (event.target == cartModal){
        cartModal.style.display = 'none';
    }
});

let totalItens = 0;

function setupSelector(selectorClass) {
    const buttons = document.querySelectorAll(selectorClass);
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

setupSelector('.size-dot');
setupSelector('.color-rect');

const badge = document.querySelector('.cart-badge');

function atualizarBadge(){
    badge.textContent = totalItens;

    if (totalItens === 0){
        badge.style.display = 'none';
    } else {
        badge.style.display = 'flex';
    }
}

function adicionarAoCarrinho() {
    totalItens++;
    atualizarBadge();
};

atualizarBadge();

let carrinhoItens = [];

let currentProduct = { price: 0, qty: 1, title: '', img: '' };

const modal = document.getElementById('product-modal');
const qtyValue = document.getElementById('qty-value');
const subtotalEl = document.getElementById('modal-subtotal');
const cartContainer = document.querySelector('.cart-items');
const cartTotalEl = document.getElementById('cart-total-value');

document.querySelectorAll('.btn-details').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const card = btn.closest('.product-card');
    
    currentProduct.title = card.querySelector('h3').innerText;
    const priceText = card.querySelector('.product-price').innerText;
    currentProduct.img = card.querySelector('img').src;
    currentProduct.price = parseFloat(priceText.replace('R$', ''). replace(',','.'));
    currentProduct.qty= 1;

    document.getElementById('modal-title').innerText = currentProduct.title;
    document.getElementById('modal-price').innerText = priceText;
    document.getElementById('modal-img').src = currentProduct.img;
    
    updateModalValues();
    modal.style.display = 'flex';
  });
});

document.getElementById('btn-plus').onclick = () => {
  currentProduct.qty++;
  updateModalValues();
};

document.getElementById('btn-minus').onclick = () => {
  if (currentProduct.qty > 1) {
    currentProduct.qty--;
    updateModalValues();
  }
};

function updateModalValues() {
  qtyValue.innerText = currentProduct.qty;
  const total = currentProduct.price * currentProduct.qty;
  subtotalEl.innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';

document.getElementById('add-to-cart-action').onclick = () => {
    const selectedSize = document.querySelector('.size-dot.active')?.innerText || 'Padrão';
    const selectedColor = document.querySelector('.color-rect.active')?.title || 'Padrão';
    const itemExistente = carrinhoItens.find(item =>
        item.title === currentProduct.title &&
        item.size === selectedSize &&
        item.color === selectedColor 
    );

    if (itemExistente) {
        itemExistente.qty += currentProduct.qty;
    } else {
        carrinhoItens.push({
            title: currentProduct.title,
            price: currentProduct.price,
            qty: currentProduct.qty,
            img: currentProduct.img,
            size: selectedSize,
            color: selectedColor
        });
    }

    renderizarCarrinho();
    modal.style.display = 'none';
};

function renderizarCarrinho() {
    cartContainer.innerHTML = ''; // Limpa a lista atual
    let somaTotal = 0;
    let contagemBadge = 0;

    carrinhoItens.forEach((item, index) => {
        somaTotal += item.price * item.qty;
        contagemBadge += item.qty;

        const itemHTML = `
    <div class="cart-item">
        <img src="${item.img}" alt="${item.title}">
        
        <div class="item-info">
            <h4>${item.title}</h4>
            <small>Tam: ${item.size} | Cor: <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${item.color}; border:1px solid #ccc;"></span></small>
            <p class="item-price">${(item.price * item.qty).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>

        <div class="cart-qty-controls">
            <button class="btn-qty" onclick="alterarQtdCarrinho(${index}, -1)">-</button>
            <span class="qty-number">${item.qty}</span>
            <button class="btn-qty" onclick="alterarQtdCarrinho(${index}, 1)">+</button>
        </div>
    </div>
`;
        cartContainer.innerHTML += itemHTML;
    });

    cartTotalEl.innerText = somaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    totalItens = contagemBadge;
    atualizarBadge();

    if (carrinhoItens.length === 0) {
        cartContainer.innerHTML = '<p style="text-align:center; color:#888;">Seu carrinho está vazio!</p>';
    }
}

window.alterarQtdCarrinho = function(index, mudanca) {
    carrinhoItens[index].qty += mudanca;

    if (carrinhoItens[index].qty <= 0) {
        carrinhoItens.splice(index, 1); // Remove o item se chegar a zero
    }

    renderizarCarrinho();
};
}); 


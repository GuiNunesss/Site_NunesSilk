document.addEventListener('DOMContentLoaded', () => {
    // VARIÁVEIS DECLARADAS NO ESCOPO CORRETO
    const menuToggle = document.querySelector('.menu-toggle'); 
    const sideMenu = document.getElementById('side-menu'); 
    

    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            sideMenu.classList.toggle('is-open');

            // Garante que qualquer sub-menu seja fechado ao fechar o menu principal
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
    cartModal.style.display = 'block';
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

let currentProduct = { price: 0, qty: 1 };

const modal = document.getElementById('product-modal');
const qtyValue = document.getElementById('qty-value');
const subtotalEl = document.getElementById('modal-subtotal');

document.querySelectorAll('.btn-details').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const card = btn.closest('.product-card');
    
    const title = card.querySelector('h3').innerText;
    const priceText = card.querySelector('.product-price').innerText;
    const imgSrc = card.querySelector('img').src;
    
    currentProduct.price = parseFloat(priceText.replace('R$', '').replace(',', '.'));
    currentProduct.qty = 1;

    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-price').innerText = priceText;
    document.getElementById('modal-img').src = imgSrc;
    
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
  totalItens += currentProduct.qty; 
  atualizarBadge(); 
  
  modal.style.display = 'none';
};

}); 


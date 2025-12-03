document.addEventListener('DOMContentLoaded', () => {
    // Busca o botão usando a classe correta do HTML.
    const menuToggle = document.querySelector('.menu-toggle'); 
    
    // Busca o menu lateral pela ID.
    const sideMenu = document.getElementById('side-menu'); 

    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            // Verifica o estado atual do menu
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            // Alterna o estado do atributo aria-expanded para acessibilidade
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Adiciona ou remove a classe 'is-open' que faz o menu deslizar no CSS
            sideMenu.classList.toggle('is-open');
        });
    }
    
    // Opcional: Fechar o menu ao clicar em um link
    const menuLinks = sideMenu ? sideMenu.querySelectorAll('a') : [];
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sideMenu.classList.contains('is-open')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                sideMenu.classList.remove('is-open');
            }
        });
    });
});
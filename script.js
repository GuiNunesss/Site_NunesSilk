document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.getElementById('side-menu'); 

    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            // Verifica o estado atual do menu
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            
            // Alterna o estado do atributo aria-expanded para acessibilidade
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            sideMenu.classList.toggle('is-open');
        });
    }
});

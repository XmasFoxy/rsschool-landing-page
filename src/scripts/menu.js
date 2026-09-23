const menuButtons = document.querySelectorAll('.header__menu');
const headerNav = document.querySelector('.header__nav');
const heroMenuButton = document.querySelector('.header__button-menu');

export const closeMenu = () => {
    document.body.classList.remove('menu-open');
    menuButtons.forEach((button) => {
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Open menu');
    });
};

const toggleMenu = () => {
    const isOpen = document.body.classList.toggle('menu-open');
    menuButtons.forEach((button) => {
        button.setAttribute('aria-expanded', String(isOpen));
        button.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
};

menuButtons.forEach((button) => button.addEventListener('click', () => {
    if (window.innerWidth > 768) {
        if (!document.querySelector('.catalog')) window.location.href = 'catalog.html';
        return;
    }
    toggleMenu();
}));

heroMenuButton?.addEventListener('click', () => {
    window.location.href = 'catalog.html';
});

headerNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
});
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
});

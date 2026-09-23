const themeStorageKey = 'resource-theme';
const themeSwitches = document.querySelectorAll('.header__switch-theme');

export const setTheme = (isDarkTheme) => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
    document.documentElement.classList.toggle('dark-theme', isDarkTheme);

    document.querySelectorAll('[data-light-src][data-dark-src]').forEach((image) => {
        image.src = isDarkTheme ? image.dataset.darkSrc : image.dataset.lightSrc;
    });

    themeSwitches.forEach((switchButton) => {
        switchButton.setAttribute('aria-pressed', String(isDarkTheme));
        switchButton.querySelector('.header__img-container:first-child')
            .classList.toggle('header__img-container_selected', !isDarkTheme);
        switchButton.querySelector('.header__img-container:last-child')
            .classList.toggle('header__img-container_selected', isDarkTheme);
    });
};

setTheme(localStorage.getItem(themeStorageKey) === 'dark');
themeSwitches.forEach((themeSwitch) => {
    themeSwitch.addEventListener('click', () => {
        const isDarkTheme = !document.body.classList.contains('dark-theme');
        setTheme(isDarkTheme);
        localStorage.setItem(themeStorageKey, isDarkTheme ? 'dark' : 'light');
    });
});

const themeSwitches = document.querySelectorAll('.header__switch-theme');

const themeStorageKey = 'resource-theme';

const setTheme = (isDarkTheme) => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
    document.documentElement.classList.toggle('dark-theme', isDarkTheme);

    document.querySelectorAll('[data-light-src][data-dark-src]').forEach((image) => {
        image.src = isDarkTheme ? image.dataset.darkSrc : image.dataset.lightSrc;
    });

    themeSwitches.forEach((switchButton) => {
        switchButton.setAttribute('aria-pressed', String(isDarkTheme));

        const sun = switchButton.querySelector('.header__img-container:first-child');
        const moon = switchButton.querySelector('.header__img-container:last-child');

        sun.classList.toggle('header__img-container_selected', !isDarkTheme);
        moon.classList.toggle('header__img-container_selected', isDarkTheme);
    });
};

const savedTheme = localStorage.getItem(themeStorageKey);

setTheme(savedTheme === 'dark');

themeSwitches.forEach((themeSwitch) => {
    themeSwitch.addEventListener('click', () => {
        const isDarkTheme = !document.body.classList.contains('dark-theme');

        setTheme(isDarkTheme);
        localStorage.setItem(themeStorageKey, isDarkTheme ? 'dark' : 'light');
    });
});
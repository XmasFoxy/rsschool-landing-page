const slider = document.querySelector('.main__favorite');

if (slider) {
    const sliderData = [
        {
            image: 'src/pictures/coffee-slider-1.png',
            name: 'S’mores Frappuccino',
            description: 'This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.',
            price: '$5.50',
        },
        {
            image: 'src/pictures/coffee-slider-2.png',
            name: 'Caramel macchiato',
            description: 'Freshly steamed milk with vanilla-flavored syrup, espresso and caramel drizzle.',
            price: '$5.00',
        },
        {
            image: 'src/pictures/coffee-slider-3.png',
            name: 'Ice coffee',
            description: 'A smooth and refreshing coffee served over ice with a delicate milk foam.',
            price: '$4.50',
        },
    ];
    const image = slider.querySelector('.main__favorite-img img');
    const name = slider.querySelector('.main__favorite-drink');
    const description = slider.querySelector('.main__favorite-drink-description');
    const price = slider.querySelector('.main__favorite-price');
    const indicators = slider.querySelectorAll('.main__slider');
    let currentSlide = 0;

    const renderSlide = (index) => {
        const item = sliderData[index];
        const content = slider.querySelector('.main__favorite-content');
        content.classList.add('main__favorite-content_switching');
        window.setTimeout(() => {
            image.src = item.image;
            image.alt = item.name;
            name.textContent = item.name;
            description.textContent = item.description;
            price.textContent = item.price;
            indicators.forEach((indicator, indicatorIndex) => {
                indicator.classList.toggle('main__slider_focused', indicatorIndex === index);
            });
            content.classList.remove('main__favorite-content_switching');
        }, 180);
    };

    const moveSlide = (direction) => {
        currentSlide = (currentSlide + direction + sliderData.length) % sliderData.length;
        renderSlide(currentSlide);
    };

    const arrows = slider.querySelectorAll('.main__arrow-container');
    arrows[0].addEventListener('click', () => moveSlide(-1));
    arrows[1].addEventListener('click', () => moveSlide(1));
    indicators.forEach((indicator, index) => indicator.addEventListener('click', () => {
        currentSlide = index;
        renderSlide(currentSlide);
    }));
}

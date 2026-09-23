const catalogGrid = document.querySelector('.catalog__grid');

if (catalogGrid) {
    const tabs = document.querySelectorAll('.catalog__tab');
    const loadMore = document.querySelector('.catalog__load-more');
    const modalRoot = document.querySelector('.catalog__modal-root');
    let products = [];
    let activeCategory = 'coffee';
    let isExpanded = false;

    const imagePath = (product, index) => {
        const extension = product.category === 'coffee' ? 'jpg' : 'png';
        return `src/pictures/${product.category}-${index + 1}.${extension}`;
    };

    const closeModal = () => {
        modalRoot.innerHTML = '';
        document.body.classList.remove('modal-open');
    };

    const showModal = (product) => {
        let selectedSize = 's';
        const selectedAdditives = new Set();
        const sizeEntries = Object.entries(product.sizes);
        const modal = document.createElement('div');
        modal.className = 'catalog-modal';
        modal.innerHTML = `
            <div class="catalog-modal__backdrop" data-modal-close></div>
            <section class="catalog-modal__dialog" role="dialog" aria-modal="true" aria-label="${product.name}">
                <button class="catalog-modal__close" type="button" aria-label="Close modal">×</button>
                <img class="catalog-modal__image" src="${product.image}" alt="${product.name}">
                <div class="catalog-modal__content">
                    <h2>${product.name}</h2><p>${product.description}</p>
                    <div class="catalog-modal__option"><h3>Size</h3><div class="catalog-modal__choices">
                        ${sizeEntries.map(([key, size], index) => `<button type="button" data-size="${key}" class="${index === 0 ? 'is-selected' : ''}"><span>${key.toUpperCase()}</span>${size.size}</button>`).join('')}
                    </div></div>
                    <div class="catalog-modal__option"><h3>Additives</h3><div class="catalog-modal__choices">
                        ${product.additives.map((additive, index) => `<button type="button" data-additive="${index}"><span>+</span>${additive.name}</button>`).join('')}
                    </div></div>
                    <div class="catalog-modal__total"><span>Total:</span><strong>$${product.price}</strong></div>
                </div>
            </section>`;
        modalRoot.append(modal);
        document.body.classList.add('modal-open');
        const total = modal.querySelector('.catalog-modal__total strong');
        const updateTotal = () => {
            const sizePrice = Number(product.sizes[selectedSize]['add-price']);
            const additivesPrice = [...selectedAdditives]
                .reduce((sum, index) => sum + Number(product.additives[index]['add-price']), 0);
            total.textContent = `$${(Number(product.price) + sizePrice + additivesPrice).toFixed(2)}`;
        };
        modal.querySelector('.catalog-modal__close').addEventListener('click', closeModal);
        modal.querySelector('[data-modal-close]').addEventListener('click', closeModal);
        modal.querySelectorAll('[data-size]').forEach((button) => button.addEventListener('click', () => {
            selectedSize = button.dataset.size;
            modal.querySelectorAll('[data-size]').forEach((item) => item.classList.remove('is-selected'));
            button.classList.add('is-selected');
            updateTotal();
        }));
        modal.querySelectorAll('[data-additive]').forEach((button) => button.addEventListener('click', () => {
            const index = Number(button.dataset.additive);
            if (selectedAdditives.has(index)) selectedAdditives.delete(index);
            else selectedAdditives.add(index);
            button.classList.toggle('is-selected', selectedAdditives.has(index));
            updateTotal();
        }));
    };

    const renderCatalog = () => {
        const categoryProducts = products.filter((product) => product.category === activeCategory);
        const visibleProducts = window.innerWidth <= 768 && !isExpanded
            ? categoryProducts.slice(0, 4) : categoryProducts;
        catalogGrid.innerHTML = visibleProducts.map((product) => `
            <article class="catalog-card" tabindex="0" data-product="${products.indexOf(product)}">
                <div class="catalog-card__image"><img src="${product.image}" alt="${product.name}"></div>
                <div class="catalog-card__content"><h2>${product.name}</h2><p>${product.description}</p><strong>$${product.price}</strong></div>
            </article>`).join('');
        catalogGrid.querySelectorAll('.catalog-card').forEach((card) => {
            const open = () => showModal(products[Number(card.dataset.product)]);
            card.addEventListener('click', open);
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
            });
        });
        loadMore.hidden = window.innerWidth > 768 || categoryProducts.length <= 4 || isExpanded;
    };

    tabs.forEach((tab, index) => tab.addEventListener('click', () => {
        activeCategory = ['coffee', 'tea', 'dessert'][index];
        isExpanded = false;
        tabs.forEach((item) => item.classList.remove('catalog__tab_active'));
        tab.classList.add('catalog__tab_active');
        renderCatalog();
    }));
    loadMore.addEventListener('click', () => { isExpanded = true; renderCatalog(); });
    window.addEventListener('resize', renderCatalog);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeModal();
    });

    fetch('src/data/products.json')
        .then((response) => {
            if (!response.ok) throw new Error(`Unable to load products: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            const counters = { coffee: 0, tea: 0, dessert: 0 };
            products = data.map((product) => {
                const index = counters[product.category]++;
                return { ...product, image: imagePath(product, index) };
            });
            renderCatalog();
        })
        .catch((error) => {
            catalogGrid.innerHTML = '<p class="catalog__error">The menu could not be loaded. Please refresh and try again.</p>';
            console.error(error);
        });
}

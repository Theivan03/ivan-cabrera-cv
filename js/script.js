/*==================== Toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

/*==================== Scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    sections.forEach(section => {
        let sectionTop = section.offsetTop - 150;
        let sectionHeight = section.offsetHeight;
        let sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + sectionId + ']').classList.add('active');
            });
        }
    });

    /*==================== Sticky navbar ====================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', scrollY > 100);

    /*==================== Remove toggle icon and navbar when clicking a link ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});

/*==================== Typed.js Initialization ====================*/
let typedInstance = null;

function initializeTyped(stringsArray) {
    if (typedInstance) {
        typedInstance.destroy(); // Destruye la instancia anterior si existe
    }

    const multipleTextElement = document.querySelector('.multiple-text');
    if (multipleTextElement) {
        console.log("Inicializando Typed.js para el elemento .multiple-text");
        typedInstance = new Typed('.multiple-text', {
            strings: stringsArray,
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    } else {
        console.error('Error al inicializar Typed.js: elemento .multiple-text no encontrado en el DOM.');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente cargado y parseado");

    // Configura un observer para monitorear cambios en el DOM
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const professionElement = document.querySelector('[data-lang="home.profession"]');
                if (professionElement && !document.querySelector('.multiple-text')) {
                    console.log("El elemento .multiple-text no está presente, agregándolo manualmente...");
                    const span = document.createElement('span');
                    span.className = 'multiple-text';
                    professionElement.appendChild(span);
                }
            }
        }
    });

    // Comienza a observar el elemento con el h3 donde debería estar el span
    const targetNode = document.querySelector('[data-lang="home.profession"]');
    if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
    }

    console.log("Buscando el elemento .multiple-text...");
    const multipleTextElement = document.querySelector('.multiple-text');
    if (multipleTextElement) {
        console.log("Elemento .multiple-text encontrado en el DOM. Inicializando Typed.js");
        loadTranslationsAndInitializeTyped('es');
    } else {
        console.error("Elemento .multiple-text NO encontrado en el DOM.");
    }

    /*==================== Scroll Reveal Initialization ====================*/
    ScrollReveal().reveal('.home-content, .heading', { origin: 'top', distance: '80px', duration: 2000, delay: 200 });
    ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom', distance: '80px', duration: 2000, delay: 200 });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left', distance: '80px', duration: 2000, delay: 200 });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right', distance: '80px', duration: 2000, delay: 200 });

    /*==================== Year Update ====================*/
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /*==================== Language Toggle ====================*/
    changeLanguage('es');
});

/*==================== Load Translations and Initialize Typed.js ====================*/
function loadTranslationsAndInitializeTyped(lang = 'es') {
    const translationsPath = `translations-${lang}.json`;

    fetch(translationsPath)
        .then(response => {
            if (!response.ok) {
                console.error(`No se pudo cargar ${translationsPath}: ${response.statusText}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(translations => {
            const stringsArray = translations.home.multiple_text;
            if (Array.isArray(stringsArray)) {
                initializeTyped(stringsArray);
            } else {
                console.error('Error: no se encontraron las traducciones para Typed.js en el archivo de traducción.');
            }
        })
        .catch(error => {
            console.error('Error al cargar las traducciones:', error);
        });
}

/*==================== Carousel ====================*/
document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach((carousel) => {
        const images = carousel.querySelector('.carousel-images');
        const totalImages = images.querySelectorAll('img').length;
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            images.style.transform = `translateX(-${5.43 * currentIndex}%)`;
        }, 3000);
    });

    const newCarousels = document.querySelectorAll('.new-carousel');
    newCarousels.forEach((carousel) => {
        const images = carousel.querySelector('.carousel-images2');
        const totalImages = images.querySelectorAll('img').length;
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            images.style.transform = `translateX(-${18.35 * currentIndex}%)`;
        }, 3000);
    });
});

/*==================== Language Toggle Function ====================*/
function changeLanguage(lang) {
    const translationsPath = `translations-${lang}.json`;

    fetch(translationsPath)
        .then(response => {
            if (!response.ok) {
                console.error(`No se pudo cargar ${translationsPath}: ${response.statusText}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(translations => {
            document.querySelectorAll('[data-lang]').forEach(element => {
                const key = element.getAttribute('data-lang');
                const translation = key.split('.').reduce((obj, keyPart) => obj && obj[keyPart], translations);
                if (translation) {
                    element.textContent = translation;
                }
            });

            document.querySelectorAll('[data-placeholder]').forEach(element => {
                const key = element.getAttribute('data-placeholder');
                const translation = key.split('.').reduce((obj, keyPart) => obj && obj[keyPart], translations);
                if (translation) {
                    element.placeholder = translation;
                }
            });

            document.querySelectorAll('[data-value]').forEach(element => {
                const key = element.getAttribute('data-value');
                const translation = key.split('.').reduce((obj, keyPart) => obj && obj[keyPart], translations);
                if (translation) {
                    element.value = translation;
                }
            });

            // Asegura la inicialización después del cambio de idioma
            console.log("Inicializando Typed.js después de cambio de idioma");
            loadTranslationsAndInitializeTyped(lang);
        })
        .catch(error => {
            console.error('Error al cargar las traducciones:', error);
        });
}
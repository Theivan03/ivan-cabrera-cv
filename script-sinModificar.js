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

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    /*==================== Sticky navbar ====================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== Remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};



function initializeTyped() {
    console.log('Inicializando Typed.js'); // Mensaje de depuración

    // Verificamos si el elemento con clase 'multiple-text' existe antes de inicializar Typed
    if (document.querySelector('.multiple-text')) {
        new Typed('.multiple-text', {
            strings: ['Desarrollador Backend', 'Futuro Full-Stack', 'Desarrollador de Apps'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    } else {
        console.warn('Elemento .multiple-text no encontrado');
    }

    // Verificamos si el elemento con clase 'multiple-texten' existe antes de inicializar Typed
    if (document.querySelector('.multiple-texten')) {
        new Typed('.multiple-texten', {
            strings: ['Backend Developer', 'Future Full-Stack', 'App Developer'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    } else {
        console.warn('Elemento .multiple-texten no encontrado');
    }
}

initializeTyped();

/*==================== Scroll reveal ====================*/
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


/*==================== Carousel ====================*/
document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach((carousel) => {
        const images = carousel.querySelector('.carousel-images');
        const totalImages = images.querySelectorAll('img').length;
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            images.style.transform = `translateX(-${5.43 * currentIndex}%)`; // Ajusta según el número de imágenes
        }, 3000); // Cambia la imagen cada 3 segundos
    });
});

/*==================== New Carousel Method ====================*/
document.addEventListener("DOMContentLoaded", function () {
    const newCarousels = document.querySelectorAll('.new-carousel');

    newCarousels.forEach((carousel) => {
        const images = carousel.querySelector('.carousel-images2');
        const totalImages = images.querySelectorAll('img').length;
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            images.style.transform = `translateX(-${18.35 * currentIndex}%)`; // Ajusta según el número de imágenes
        }, 3000); // Cambia la imagen cada 3 segundos
    });
});

/*==================== Language Toggle ====================*/
function changeLanguage(lang) {
    // Ruta del archivo JSON según el idioma seleccionado
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
            // Comprobación de que las traducciones han sido cargadas
            console.log('Traducciones cargadas correctamente:', translations);

            // Actualizar el logo dinámicamente
            const logoElement = document.getElementById('logo');
            if (logoElement && translations.header && translations.header.logo) {
                logoElement.textContent = translations.header.logo;
                console.log('Logo actualizado a:', translations.header.logo);
            } else {
                console.error('No se encontró el elemento del logo o la traducción correspondiente');
            }

            // Actualizar otros textos en la página
            document.querySelectorAll('[data-lang]').forEach(element => {
                const key = element.getAttribute('data-lang');
                const translation = key.split('.').reduce((obj, keyPart) => obj && obj[keyPart], translations);
                
                if (translation) {
                    element.textContent = translation;
                    console.log(`Elemento actualizado: ${key} -> ${translation}`);
                }
            });

            // Actualizar placeholders
            document.querySelectorAll('[data-placeholder]').forEach(element => {
                const key = element.getAttribute('data-placeholder');
                const translation = key.split('.').reduce((obj, keyPart) => obj && obj[keyPart], translations);
                
                if (translation) {
                    element.placeholder = translation;
                }
            });

            // Actualizar botones (value)
            document.querySelectorAll('[data-value]').forEach(element => {
                const key = element.getAttribute('data-value');
                const translation = key.split('.').reduce((obj, keyPart) => obj && obj[keyPart], translations);
                
                if (translation) {
                    element.value = translation;
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar las traducciones:', error);
        });

        initializeTyped();
}



document.addEventListener("DOMContentLoaded", function() {
    // Asegúrate de que Typed.js se ejecute solo después de que el DOM esté completamente cargado
    const multipleTextElement = document.querySelector('.multiple-text');
    if (multipleTextElement) {
        // Verificar si Typed está definido y luego inicializar Typed.js
        if (typeof Typed !== 'undefined') {
            console.log('Inicializando Typed.js'); // Mensaje de depuración
            new Typed('.multiple-text', {
                strings: ['Full-Stack Developer', 'Desarrollador de Apps', 'Desarrollador Web'],
                typeSpeed: 100,
                backSpeed: 100,
                backDelay: 1000,
                loop: true
            });
        } else {
            console.error('Typed.js no está cargado. Asegúrate de que la librería Typed.js esté correctamente incluida.');
        }
    } else {
        console.error('No se encontró el elemento con la clase "multiple-text".');
    }

    // Otros scripts que necesitas ejecutar después de cargar el DOM
    const yearElement = document.getElementById('year');
    if (yearElement) {
        // Insertar el año actual en el elemento con el id 'year'
        yearElement.textContent = new Date().getFullYear();
    }

    // Establecer el idioma predeterminado cuando se carga la página
    changeLanguage('es'); // Cambia 'es' a 'en' si prefieres inglés por defecto

    console.log("DOM completamente cargado y analizado");
});



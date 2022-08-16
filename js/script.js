//Burger Menu
const headerMenu = document.querySelector('.header__top-content');
const headerLinks = headerMenu.querySelectorAll('.menu__link');
const burgerOpenBtn = headerMenu.querySelector('.burger__btn');
const burgerMenu = document.querySelector('.burger__menu');

const burgerList = burgerMenu.querySelector('.burger__menu-list');
const burgerOverlay = burgerMenu.querySelector('.burger__overlay');
const burgerCloseBtn = burgerMenu.querySelector('.burger__close');
const burgerLinks = burgerMenu.querySelectorAll('.burger__menu-link');

const linksHeader = [...burgerLinks, ...headerLinks];
//функция анимации
function animate ({timing, draw, duration}) {    
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}
//функция дисейблер скроллинга
function disableScrolling () {
    const x = window.scrollX;
    const y = window.scrollY;
    window.onscroll = function () {
        window.scrollTo(x, y) ;
    };
}
function animationBurgerOpen (x, y) {
    headerMenu.style.display = 'none';
    burgerMenu.style.display = 'flex';
    animate({
        duration: 300,
        timing (timeFraction) {
            return timeFraction;
        },
        draw (progress) {
            y.style.left = '0%';
            y.style.left = progress; 
            x.style.left = '40%';
            x.style.left = progress; 
        }
        
    });
}
function animationBurgerClose (x, y) {
    headerMenu.style.display = 'flex';
    animate({
        duration: 400,
        timing (timeFraction) {
            return timeFraction;
        },
        draw (progress) {
            x.style.left = '100%';
            x.style.left = progress; 
            y.style.left = '-40%';
            y.style.left = progress; 
            setTimeout(() => {
                burgerMenu.style.display = 'none';
            }, 300);
        }
    });
}

linksHeader.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        if (item = e.target) {
            let idAnchor = item.getAttribute('href');
            document.querySelector(idAnchor).scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            });
            window.onscroll = function () {};
        }
        
        animationBurgerClose(burgerList, burgerOverlay);
    });
});

burgerOpenBtn.addEventListener('click', () => {
    console.log('click');
    animationBurgerOpen(burgerList, burgerOverlay);
    disableScrolling ();
});
burgerCloseBtn.addEventListener('click', () => {
    animationBurgerClose(burgerList, burgerOverlay);  
    window.onscroll = function () {};
});


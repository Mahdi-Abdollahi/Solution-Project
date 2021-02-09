'use strict';
// elements
const navbarMenu = document.querySelector(".navbar__burger");
const navbarList = document.querySelector(".navbar__list");
const navbar = document.querySelector(".navbar");
const scrollToFooter = document.querySelector(".scroll-to-footer");
const scrollToService = document.querySelector(".scroll-to-service");
const scrollToFeature = document.querySelector(".scroll-to-feature");
const footer = document.querySelector("#footer");
const service = document.querySelector("#service");
const feature = document.querySelector("#feature");
const about = document.querySelector(".about");
const header = document.querySelector(".header");

const slides = document.querySelectorAll(".slide-card");
const slideDots = document.querySelector(".slide__dots");
const nxtSlide = document.querySelector(".slide-next");
const preSlide = document.querySelector(".slide-previos");

// Open/Close navbar in small screen
const navbarHandler = () => {
    navbarList.classList.toggle("navbar-active");
    navbarMenu.classList.toggle("toggle")
    console.log("clicked");
}
// Navbar Event Listener
navbarMenu.addEventListener('click', navbarHandler);

// Feature scroll
scrollToFeature.addEventListener('click', e => {
    const featureCoords = feature.getBoundingClientRect();
    window.scrollTo({
        left: featureCoords.left + window.pageXOffset,
        top: featureCoords.top  + window.pageYOffset,
        behavior: "smooth"
    })
});

// Servises scroll
scrollToService.addEventListener('click', e => {
    const serviceCoords = service.getBoundingClientRect();
    service.scrollIntoView({ behavior: "smooth" })
});

// Contact Us scroll
scrollToFooter.addEventListener('click', e => {
    const footerCoords = footer.getBoundingClientRect();
    footer.scrollIntoView({ behavior: "smooth" })
});

// Sticky navigation : Intersection Observar API
const navHeight = navbar.getBoundingClientRect().height;

const obsCallback = function(entries, observer) {
    const [entry] = entries;
    if( !entry.isIntersecting ) {
        navbar.classList.add("navbar__fixed");
        header.style.marginTop = `${navHeight + 10}px`;
    } else {
        navbar.classList.remove("navbar__fixed");
        header.style.marginTop = `${0}px`;
    }
}

const obsOption = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight + 1}px` ,
};

const observer = new IntersectionObserver(obsCallback, obsOption);

observer.observe(header);

// Revealing Element on scroll
const allSections = document.querySelectorAll('section');

const revealCallback = function(entries, revealSection) {
    const [entry] = entries;
    if(!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    revealSection.unobserve(entry.target);
}
const revealOpt = {
    root: null,
    threshold: 0.1,
}
const revealSection = new IntersectionObserver(revealCallback, revealOpt);

allSections.forEach( section => {
    section.classList.add('section--hidden');
    revealSection.observe(section)
})


// Slider #1 
let curSlide = 0;
const lastSlide = slides.length;

const createDot = (slides) => {
    slides.forEach( (e, i) => {
        slideDots.insertAdjacentHTML("beforeend", 
        `<button class="slide-dot" data-slide=${i}></button>`)
    })
}

const createActive = (activeNum) => {
    slides.forEach((s) => {
        s.classList.remove("slide-card--active");
    });
    slides[activeNum].classList.add("slide-card--active");
    slideDots.childNodes[activeNum].classList.add("slide-dot--active");
}

const moveSlide = (des) => {

    slides.forEach( (s, i) => {
        s.style.transform = `translateX(${((i-des)*100 - 50 + (i-des)*10)}%)`;
    });
    curSlide = des;
    createActive(curSlide);
}
// Dots eventListener
slideDots.addEventListener('click', function(e) {
    if(e.target === this) return;

    slideDots.childNodes.forEach( e => {
        e.classList.remove("slide-dot--active");
    })
    e.target.classList.add("slide-dot--active")
    moveSlide(e.target.dataset.slide);
} );
// Next Button event Listener
nxtSlide.addEventListener( 'click', e => {
    if(curSlide === lastSlide - 1) {
        curSlide = 0;
    } else curSlide++;
    
    moveSlide(curSlide);
})

// Previos Button event Listener
preSlide.addEventListener( 'click', e => {
    if(curSlide === 0) {
        curSlide = lastSlide - 1;
    } else curSlide--;
    
    moveSlide(curSlide);
})

const init = () => {
    slides.forEach( (s, i) => {
        s.style.transform = `translateX(${i*100 - 50 + i*10}%)`;
    });
    createDot(slides);
    createActive(curSlide);
}

init();


document.addEventListener("DOMContentLoaded", () => {

    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll(".reveal").forEach(el => {
            el.classList.add("is-visible");
        });
        return;
    }



    const plan = [
        { selector: "header.main-header", dir: "down" },
        { selector: "main.hero-section .hero-content", dir: "right" },
        { selector: "main.hero-section .hero-image", dir: "left" },

        { selector: ".features-section", dir: "up" },
        { selector: ".features-section .feature-card", dir: "up", stagger: 90 },

        { selector: ".gallery-section", dir: "up" },

        { selector: ".statistics-section .stat-item", dir: "up", stagger: 80 },

        { selector: ".reviews-section", dir: "up" },
        { selector: ".reviews-section .review-card", dir: "up", stagger: 110 },

        { selector: ".cta-section", dir: "up" },
        { selector: "footer.main-footer", dir: "up" }
    ];


    plan.forEach(({ selector, dir, stagger }) => {
        const nodes = document.querySelectorAll(selector);
        nodes.forEach((el, i) => {
            el.classList.add("reveal", `reveal--${dir}`);
            if (stagger) {

                el.style.transitionDelay = `${i * stagger}ms`;
            }
        });
    });


    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;

                    el.classList.add("is-visible");
                    observer.unobserve(el);
                }
            });
        },
        {
            root: null,
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px"
        }
    );


    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});



const gallery = document.querySelector('.gallery');
const prevBtn = document.querySelector('.gallery-btn.prev');
const nextBtn = document.querySelector('.gallery-btn.next');
const images = document.querySelectorAll('.gallery img');
const indicatorsContainer = document.querySelector('.gallery-indicators');

const scrollAmount = 260;
let currentIndex = 0;


images.forEach((_, index) => {
    const dot = document.createElement('span');
    if (index === 0) dot.classList.add('active');
    indicatorsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.gallery-indicators span');

function updateIndicators(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    gallery.scrollBy({ left: +scrollAmount, behavior: 'smooth' });
    updateIndicators(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = Math.min(images.length - 1, currentIndex + 1);
    gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    updateIndicators(currentIndex);
});

gallery.addEventListener('scroll', () => {
    const scrollCenter = gallery.scrollLeft + gallery.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    images.forEach((img, index) => {
        const imgCenter = img.offsetLeft + img.clientWidth / 2;
        const distance = Math.abs(scrollCenter - imgCenter);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });
    currentIndex = closestIndex;
    updateIndicators(currentIndex);
});


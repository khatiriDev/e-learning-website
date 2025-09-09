document.addEventListener("DOMContentLoaded", () => {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const blogCards = document.querySelectorAll('.blog-card');
    const blogGrid = document.querySelector('.blog-grid');
    const searchMessage = document.querySelector('.search-message');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        let foundResults = false;

        blogCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                foundResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (foundResults) {
            searchMessage.style.display = 'none';
        } else {
            searchMessage.style.display = 'block';
        }
    });

    // Animate on scroll (Intersection Observer)
    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll(".reveal").forEach(el => {
            el.classList.add("is-visible");
        });
        return;
    }

    const plan = [
        { selector: "header.main-header", dir: "down" },
        { selector: ".blog-hero", dir: "up" },
        { selector: ".blog-section", dir: "up" },
        { selector: ".blog-card", dir: "up", stagger: 90 },
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
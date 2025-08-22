document.addEventListener("DOMContentLoaded", () => {
    // Handling reveal animations using IntersectionObserver
    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll(".reveal").forEach(el => {
            el.classList.add("is-visible");
        });
        return;
    }

    const plan = [
        { selector: "header.main-header", dir: "down" },
        { selector: "section.pricing-hero", dir: "up" },
        { selector: "section.pricing-plans", dir: "up" },
        { selector: ".plan-card.free-plan", dir: "up" },
        { selector: ".plan-card.premium-plan", dir: "up" },
        { selector: "section.new-reviews-section", dir: "up" },
        { selector: ".new-review-card", dir: "up", stagger: 110 },
        { selector: "section.faq-section", dir: "up" },
        { selector: ".faq-item", dir: "up", stagger: 100 },
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


    // Handling FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const item = question.parentElement;
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
});
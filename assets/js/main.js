// Animation des titres au défilement
document.addEventListener("DOMContentLoaded", () => {
    const titles = document.querySelectorAll("h1, h2, h3");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    titles.forEach(title => {
        title.style.opacity = 0;
        title.style.transform = "translateY(20px)";
        title.style.transition = "all 0.5s ease-in-out";
        observer.observe(title);
    });
});

// Animation des boutons au survol
const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
        button.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.boxShadow = "none";
    });
});

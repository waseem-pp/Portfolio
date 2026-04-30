const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let cx = 0, cy = 0, rx = 0, ry = 0;
let scale = 1;

// Disable on mobile
if (window.innerWidth < 768) {
    cursor.style.display = 'none';
    ring.style.display = 'none';
}

// Track mouse
document.addEventListener('mousemove', e => {
    cx = e.clientX;
    cy = e.clientY;
});

// Smooth animation
function animate() {
    rx += (cx - rx) * 0.12;
    ry += (cy - ry) * 0.12;

    cursor.style.transform = `translate(${cx}px, ${cy}px) scale(${scale})`;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;

    requestAnimationFrame(animate);
}
animate();

// Hover effects
document.querySelectorAll('a, button, .skill-item, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        scale = 2;
        ring.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
        scale = 1;
        ring.style.opacity = '0.5';
    });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');

                const bars = entry.target.querySelectorAll('.skill-bar');
                if (bars.length) {
                    bars.forEach(bar => {
                        bar.style.width = bar.dataset.width + '%';
                    });
                }

            }, i * 80);

            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => observer.observe(el));

// Form submit
function handleSubmit(e) {
    e.preventDefault();

    const btn = e.target.querySelector('.btn-send');
    if (!btn) return;

    btn.textContent = 'SENDING...';

    setTimeout(() => {
        btn.textContent = 'MESSAGE_SENT ✓';
        btn.style.background = 'var(--accent)';
        btn.style.color = 'var(--bg)';
        e.target.reset();
    }, 1200);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
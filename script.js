const navLinks = document.querySelectorAll('.nav-links a');
const revealItems = document.querySelectorAll('.reveal');
const navbar = document.querySelector('.navbar');

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealItems.forEach((item) => revealOnScroll.observe(item));

const updateNavState = () => {
  const scrollPosition = window.scrollY + 140;

  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', updateNavState);
window.addEventListener('load', updateNavState);

const interactiveCards = document.querySelectorAll('.interactive-hover');
interactiveCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  });
});

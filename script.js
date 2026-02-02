const toggleButton = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (toggleButton && mobileNav) {
  toggleButton.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

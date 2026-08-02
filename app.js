document.querySelectorAll('[data-ripple]').forEach((element) => {
  element.addEventListener('pointerdown', (event) => {
    const bounds = element.getBoundingClientRect();
    element.style.setProperty('--ripple-x', `${event.clientX - bounds.left}px`);
    element.style.setProperty('--ripple-y', `${event.clientY - bounds.top}px`);
    element.classList.remove('is-rippling');
    requestAnimationFrame(() => element.classList.add('is-rippling'));
  });
  element.addEventListener('animationend', () => element.classList.remove('is-rippling'));
});

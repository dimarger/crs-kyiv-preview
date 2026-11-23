const menuButton = document.querySelector('.menu-btn');
const mobileNav = document.getElementById('mobile-nav');
menuButton.hidden = false;

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
  mobileNav.hidden = !open;
}

menuButton.addEventListener('click', () => setMenu(mobileNav.hidden));
mobileNav.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    setMenu(false);
    menuButton.focus();
  }
});
matchMedia('(min-width: 761px)').addEventListener('change', () => setMenu(false));

const viewer = document.getElementById('viewer');
const photos = [...document.querySelectorAll('[data-photo]')];
const largePhoto = document.getElementById('viewer-img');
const caption = document.getElementById('viewer-caption');
const position = document.getElementById('position');
let current = 0;

function showPhoto(index) {
  current = (index + photos.length) % photos.length;
  const link = photos[current];
  largePhoto.src = link.href;
  largePhoto.alt = link.querySelector('img').alt;
  caption.textContent = link.dataset.caption;
  position.textContent = (current + 1) + ' / ' + photos.length;
}

photos.forEach((link, index) => {
  link.addEventListener('click', event => {
    if (!viewer.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showPhoto(index);
    viewer.showModal();
    document.body.classList.add('viewing');
    document.getElementById('close-viewer').focus();
  });
});
document.getElementById('close-viewer').addEventListener('click', () => viewer.close());
document.getElementById('previous').addEventListener('click', () => showPhoto(current - 1));
document.getElementById('next').addEventListener('click', () => showPhoto(current + 1));
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
viewer.addEventListener('click', event => {
  if (event.target === viewer) viewer.close();
});
viewer.addEventListener('close', () => document.body.classList.remove('viewing'));

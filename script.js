// script.js - horizontal nav + synced arrows + highlight + resize handling

const map = document.getElementById('map');
const sections = Array.from(map.querySelectorAll('.zone'));
const navLinks = Array.from(document.querySelectorAll('#top-nav a'));
const leftBtn = document.querySelector('.arrowLeft');
const rightBtn = document.querySelector('.arrowRight');

let currentIndex = 0;

// Move to a specific section index
function goToSection(index) {
  if (index < 0) index = 0;
  if (index > sections.length - 1) index = sections.length - 1;
  currentIndex = index;

  const offset = index * window.innerWidth;
  map.style.transform = `translateX(-${offset}px)`;

  updateActiveNav();
  updateArrowStates();
}

// Highlight the active nav link
function updateActiveNav() {
  navLinks.forEach(a => a.classList.remove('active'));
  const activeId = sections[currentIndex].id;
  const active = document.querySelector(`#top-nav a[href="#${activeId}"]`);
  if (active) active.classList.add('active');
}

// Disable/hide arrows at ends
function updateArrowStates() {
  if (leftBtn) leftBtn.disabled = (currentIndex === 0);
  if (rightBtn) rightBtn.disabled = (currentIndex === sections.length - 1);
}

// Wire nav clicks
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href').substring(1);
    const index = sections.findIndex(s => s.id === id);
    if (index !== -1) goToSection(index);
  });
});

// Arrow button handlers
if (leftBtn) leftBtn.addEventListener('click', () => goToSection(currentIndex - 1));
if (rightBtn) rightBtn.addEventListener('click', () => goToSection(currentIndex + 1));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goToSection(currentIndex - 1);
  if (e.key === 'ArrowRight') goToSection(currentIndex + 1);
});

// Recalculate transform on resize so we stay at the same section
window.addEventListener('resize', () => {
  // reposition map to current section width
  const offset = currentIndex * window.innerWidth;
  map.style.transition = 'none';          // remove transition for resize snap
  map.style.transform = `translateX(-${offset}px)`;
  // force reflow then restore transition
  // eslint-disable-next-line no-unused-expressions
  map.offsetHeight;
  map.style.transition = '';
});

// initialize
goToSection(0);

const toggleButton = document.getElementById('nav-toggle');
const navigationDrawer = document.querySelector('.nav-drawer');

toggleButton.addEventListener('click', () => {
    navigationDrawer.classList.toggle('active');
});

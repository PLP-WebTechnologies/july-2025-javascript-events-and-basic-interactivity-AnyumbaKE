const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

(() => {
    const btn = qs('#theme-toggle');
    const root = document.documentElement;
    const DARK_ATTRIBUTE = 'dark-theme';
    const DARK_VALUE = 'dark';

    const saved = localStorage.getItem('preferredTheme');
    if (saved === DARK_VALUE) {
        root.setAttribute(DARK_ATTRIBUTE, DARK_VALUE);
        btn.textContent = 'Switch to Light Mode';
        btn.setAttribute('aria-pressed', 'true');
    }

    btn.addEventListener('click', () => {
        const isDark = root.hasAttribute(DARK_ATTRIBUTE) === DARK_VALUE;
        if (isDark) {
            root.removeAttribute(DARK_ATTRIBUTE);
            btn.textContent = 'Switch to Dark Mode';
            btn.setAttribute('aria-pressed', 'false');
            localStorage.setItem('preferredTheme', 'light');
        } else {
            root.setAttribute(DARK_ATTRIBUTE, DARK_VALUE);
            btn.textContent = 'Switch to Light Mode';
            btn.setAttribute('aria-pressed', 'true');
            localStorage.setItem('preferredTheme', DARK_VALUE);
        }
    });
})();
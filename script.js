const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

// Theme toggle
const themeToggle = qs('#themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('site-theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const cur = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = cur === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next === 'dark' ? 'dark' : '');
  localStorage.setItem('site-theme', next === 'dark' ? 'dark' : 'light');
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
    themeToggle.click();
  }
});

// Counter
const inc = qs('#inc'), dec = qs('#dec'), countEl = qs('#count');
let count = 0;
function renderCount(){ countEl.textContent = count }
inc.addEventListener('click', () => { count++; renderCount(); });
dec.addEventListener('click', () => { count--; renderCount(); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') { count++; renderCount(); }
  if (e.key === 'ArrowDown') { count--; renderCount(); }
});

// Tabs
qsa('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    qsa('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const key = tab.dataset.tab;
    qsa('[data-panel]').forEach(p => p.hidden = p.dataset.panel !== key);
  });
});

// FAQ
qsa('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const a = q.nextElementSibling;
    a.hidden = !a.hidden;
  });
});

// Form validation
const form = qs('#signup');
const feedback = qs('#formFeedback');

function validateName(name){ return name.trim().length >= 2 }
function validateEmail(email){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) }
function validatePassword(pw){ return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(pw) }

function setError(fieldName, msg){
  const el = qs(`[data-error-for="${fieldName}"]`);
  if (el) el.textContent = msg || '';
}

['name','email','password','confirm'].forEach(id => {
  const input = qs('#'+id);
  input.addEventListener('input', () => {
    if (id === 'name') setError('name', validateName(input.value) ? '' : 'Please enter at least 2 characters.');
    if (id === 'email') setError('email', validateEmail(input.value) ? '' : 'Please enter a valid email.');
    if (id === 'password') setError('password', validatePassword(input.value) ? '' : 'Password must be 8+ chars and include a number.');
    if (id === 'confirm') setError('confirm', input.value === qs('#password').value ? '' : 'Passwords do not match.');
  });
});

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  feedback.textContent = '';

  const name = qs('#name').value;
  const email = qs('#email').value;
  const password = qs('#password').value;
  const confirm = qs('#confirm').value;

  let ok = true;
  if (!validateName(name)){ setError('name', 'Please enter your full name (min 2 chars).'); ok = false } else setError('name','');
  if (!validateEmail(email)){ setError('email','Please enter a valid email address.'); ok = false } else setError('email','');
  if (!validatePassword(password)){ setError('password','Password must be at least 8 chars and include a number.'); ok = false } else setError('password','');
  if (password !== confirm){ setError('confirm','Passwords do not match.'); ok = false } else setError('confirm','');

  if (!ok){ feedback.className = 'errors'; feedback.textContent = 'Please fix the errors above.'; return }

  feedback.className = 'success';
  feedback.textContent = 'Form looks good — submitted! (simulation)';
  setTimeout(()=>{ form.reset(); renderCount(); feedback.textContent = '' }, 900);
});

qs('header').addEventListener('mouseover', () => console.log('Header hovered — mouseover event fired'));
renderCount();
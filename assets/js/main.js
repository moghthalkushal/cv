(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const storedTheme = localStorage.getItem('portfolio-theme');
  if (storedTheme === 'light' || storedTheme === 'dark') root.dataset.theme = storedTheme;

  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('portfolio-theme', next);
  });

  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

  const dialog = document.getElementById('diagram-dialog');
  const image = document.getElementById('dialog-image');
  const title = document.getElementById('dialog-title');
  let trigger = null;

  function openDiagram(button) {
    trigger = button;
    image.src = button.dataset.diagram;
    image.alt = `Expanded ${button.dataset.title} architecture diagram`;
    title.textContent = button.dataset.title;
    dialog.showModal();
  }

  function closeDiagram() {
    dialog.close();
  }

  document.querySelectorAll('[data-diagram]').forEach((button) => button.addEventListener('click', () => openDiagram(button)));
  document.querySelector('[data-dialog-close]')?.addEventListener('click', closeDiagram);
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) closeDiagram(); });
  dialog?.addEventListener('close', () => {
    image.removeAttribute('src');
    trigger?.focus();
  });
})();

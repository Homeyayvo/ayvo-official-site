const dialog = document.querySelector('#login-dialog');

document.querySelectorAll('[data-open-login]').forEach((button) => {
  button.addEventListener('click', () => dialog.showModal());
});

document.querySelectorAll('[data-close-login]').forEach((button) => {
  button.addEventListener('click', () => dialog.close());
});

dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  const inside = event.clientX >= bounds.left && event.clientX <= bounds.right &&
    event.clientY >= bounds.top && event.clientY <= bounds.bottom;
  if (!inside) dialog.close();
});

document.querySelector('#year').textContent = new Date().getFullYear();

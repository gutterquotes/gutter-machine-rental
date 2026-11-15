const form = document.querySelector('#rental-form');
const start = document.querySelector('#start');
const end = document.querySelector('#end');
const status = document.querySelector('#status');

start.addEventListener('change', () => {
  end.min = start.value;
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const details = [...new FormData(form)].map(([label, value]) => {
    return value.trim() ? label + ': ' + value.trim() : null;
  }).filter(Boolean).join('\n');
  const file = new Blob(['Gutter machine rental request\n\n' + details + '\n'], { type: 'text/plain' });
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'gutter-machine-rental-request.txt';
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = 'Your request is ready to share with a rental provider.';
});

document.addEventListener('DOMContentLoaded', async () => {
  const profileWelcome = document.getElementById('profileWelcome');

  const response = await fetch('/api/sessions/profile', {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST'
  });
  const result = await response.json();
  console.log(result);

  if (result.status === 'error') window.location.href = '/login';
  if (result.status === 'success') {
    profileWelcome.innerText = `Bienvenido! ${result.user.firstName}`;
  }
});

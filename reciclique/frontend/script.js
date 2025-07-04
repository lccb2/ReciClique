document.getElementById('login').onclick = async () => {
  const res = await fetch('http://localhost:3001/login', { method: 'POST' });
  const data = await res.json();
  alert(data.message);
};

document.getElementById('postar').onclick = async () => {
  const res = await fetch('http://localhost:3002/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo: 'Projeto com garrafa pet' })
  });
  const data = await res.json();
  alert('Postado: ' + data.titulo);
};

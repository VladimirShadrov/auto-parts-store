const routes = {
  '/': './pages/main.html',
  '/card': './pages/card.html',
  '/bascet': './pages/bascet.html',
};

document.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    router(event);
  }
});

function router(event) {
  window.history.pushState({}, '', event.target.pathname);
  switchPage();
}

async function switchPage() {
  const path = window.location.pathname;
  const url = routes[path] ? routes[path] : Object.values(routes)[0];

  console.log('Path: ', path, '  URL: ', url);

  await fetch(url)
    .then((data) => data.text())
    .then((html) => (document.querySelector('.content').innerHTML = html))
    .catch((error) => {
      console.log('Ошибка: ', error);
    });
}

window.addEventListener('popstate', switchPage);
document.addEventListener('DOMContentLoaded', switchPage);

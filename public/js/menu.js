const mainMenu = $('#main-menu');
const mainTitle = $('#main-title');
export const canvas = $('.offcanvas');
export const arrow = $('#arrow-forward');
export const menuBtn = $('#btn-menu');

const getMenuItems = async () => {
  const jsonResponse = await fetch('/api/menu');
  const response = await jsonResponse.json();
  return response.data;
};
let menu;

const changeActive = () => {
  const items = document.querySelectorAll('.main-nav');
  const links = document.querySelectorAll('.main-nav-link');
  links.forEach((link, index) => {
    if (mainTitle.contents().text().includes(link.innerHTML)) {
      items[index].classList.add('bg-secondary');
      link.classList.add('text-light');
    } else {
      items[index].classList.remove('bg-secondary');
      link.classList.remove('text-light');
    }
  });
};
const initMenu = () =>
  window.addEventListener('DOMContentLoaded', async () => {
    menu = await getMenuItems();

    if (mainMenu && menu) {
      menu.forEach((item) => {
        const li = document.createElement('li');
        li.classList = 'nav-item main-nav rounded-1';
        li.addEventListener('click', () => {
          window.location.assign(item);
          changeActive;
        });
        const a = document.createElement('a');
        a.classList = 'nav-link main-nav-link';
        a.href = item.toLowerCase();
        a.innerText = item;
        li.appendChild(a);
        mainMenu.append(li);
      });
      changeActive();
    }
  });

export default initMenu;

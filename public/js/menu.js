const mainMenu = $('#main-menu');
const mainTitle = $('#main-title');
export const canvas = $('.offcanvas');
export const arrow = $('#arrow-forward');
export const menuBtn = $('#btn-menu');

const isAdmin = window.location.pathname.includes('admin');
const getMenuItems = async () => {
  const url = isAdmin ? '/admin' : '';
  const jsonResponse = await fetch(url + '/api/menu');
  const response = await jsonResponse.json();
  return response.data;
};
let menu;

const changeActive = () => {
  const items = $('.main-nav');
  const links = $('.main-nav-link');
  links.toArray().forEach((link, index) => {
    if (mainTitle.text().includes(link.innerHTML)) {
      items[index].classList.add('bg-primary');
      link.classList.add('text-light');
    } else {
      items[index].classList.remove('bg-primary');
      link.classList.remove('text-light');
    }
  });
};
const initMenu = () =>
  $(document).ready(async () => {
    menu = await getMenuItems();

    if (mainMenu && menu) {
      menu.forEach((item) => {
        let href;
        if (item !== 'Admin') {
          href = isAdmin ? `/admin/${item.toLowerCase()}` : `/${item.toLowerCase()}`;
        } else {
          href = '/admin/login';
        }
        const li = $('<li class="nav-item main-nav rounded-1 d-flex justify-content-center"></li>');
        li.click(() => {
          window.location.assign(href);
          changeActive;
        });

        const a = $(`<a class="nav-link main-nav-link" href=${href}></a>`);
        a.text(item);
        li.append(a);
        mainMenu.append(li);
      });
      changeActive();
    }
  });

export default initMenu;

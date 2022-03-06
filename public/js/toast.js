const toastTrigger = document.getElementById('liveToastBtn');
const logout = document.getElementById('logout');
const toastLiveExample = document.getElementById('liveToast');
if (toastTrigger) {
  toastTrigger.addEventListener('click', function () {
    const toast = new bootstrap.Toast(toastLiveExample);

    toast.show();
  });
}
if (logout) {
  logout.addEventListener('click', () => {
    window.location.replace('/logout');
  });
}

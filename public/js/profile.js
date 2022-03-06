const loggedToast = document.getElementById('already-logged-toast');

if (loggedToast) {
  const toast = new bootstrap.Toast(loggedToast);
  toast.show();
}

// GitHub Pages SPA redirect, second half. public/404.html stores the URL the
// visitor asked for and bounces to "/"; this puts that URL back before the app starts.
(function () {
  var redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, null, redirect);
  }
})();

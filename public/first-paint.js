// Runs before the first paint, from a file so the content security policy needs
// no inline-script exception. The prerendered HTML is always dark and English;
// this applies a returning visitor's saved theme straight away, and for Italian
// readers holds back the English text of the two-language pages until the app
// swaps it, so nobody watches the page change language under them.
//
// Readers without JavaScript never run this and get the plain English HTML.
(function () {
  var root = document.documentElement;
  var theme = null;
  var lang = null;
  try {
    theme = localStorage.getItem("theme");
    lang = localStorage.getItem("plain-words-lang");
  } catch (e) {
    // storage can be blocked; fall back to the defaults below
  }
  if (theme === "light") {
    root.classList.remove("dark");
    root.classList.add("light");
  }
  if (lang !== "en" && lang !== "it") {
    lang = (navigator.language || "").toLowerCase().indexOf("it") === 0 ? "it" : "en";
  }
  if (lang === "it") {
    root.classList.add("lang-pending");
    // If the app never starts, show the English text instead of nothing.
    setTimeout(function () {
      root.classList.remove("lang-pending");
    }, 4000);
  }
})();

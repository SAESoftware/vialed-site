/*
  Vialed Insiders signup — shared by /newsletter and the home-page banner.

  Posts straight to the Maropost acquisition form "Join Vialed Insiders"
  (account 1584, builder 2, list "Vialed Insiders"). This replaces
  Maropost's embed script, which sets cookies and injects its own markup.
  No API key is involved: Maropost locks the form to vialed.app by the
  request's Referer, so this only works from the live site, not localhost.
  Double opt-in is OFF in Maropost (Luke's call, 2026-09-16): a successful
  submit subscribes the email immediately.

  Markup contract, per signup block:
    [data-insiders]                  root; gets data-state="ready|joined"
      form[data-insiders-form]       data-for="ready"; holds the email input
                                     and submit button
      [data-insiders-error]          hidden until a message is shown
      [data-for="joined"]            success block, hidden until joined
        [data-insiders-joined-as]    filled with the address that was added
*/
(function () {
  var ENDPOINT = "https://api.maropost.com/accounts/1584/acquisition/builders/2/subscribe_contact_in_lists";
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var GENERIC_FAILURE = "Something went wrong on our end. Try again in a minute, or email info@vialed.app and we’ll add you.";
  var INVALID_EMAIL = "That email address doesn’t look complete. Check it and try again.";

  function init(root) {
    var form = root.querySelector("[data-insiders-form]");
    var input = form.querySelector('input[type="email"]');
    var button = form.querySelector('button[type="submit"]');
    var error = root.querySelector("[data-insiders-error]");
    var joinedAs = root.querySelector("[data-insiders-joined-as]");
    var buttonLabel = button.textContent;

    function show(state) {
      root.setAttribute("data-state", state);
      root.querySelectorAll("[data-for]").forEach(function (el) {
        el.hidden = el.getAttribute("data-for") !== state;
      });
      if (state !== "ready") {
        var panel = root.querySelector('[data-for="' + state + '"]');
        if (panel) panel.focus();
      }
    }

    function showError(message) {
      error.textContent = message;
      error.hidden = false;
      input.setAttribute("aria-invalid", "true");
    }

    function clearError() {
      error.hidden = true;
      error.textContent = "";
      input.removeAttribute("aria-invalid");
    }

    function setBusy(busy) {
      button.disabled = busy;
      button.textContent = busy ? "Joining…" : buttonLabel;
    }

    input.addEventListener("input", function () {
      if (!error.hidden) clearError();
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = input.value.trim();

      if (!EMAIL_PATTERN.test(email)) {
        showError(INVALID_EMAIL);
        input.focus();
        return;
      }

      clearError();
      setBusy(true);

      // No Content-Type header, matching Maropost's own script: the request
      // stays a simple CORS request with no preflight.
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Accept": "text/javascript" },
        body: JSON.stringify({
          data: { email: email },
          domain: window.location.host,
          "g-recaptcha-response": ""
        })
      })
        .then(function (response) {
          return response.json().catch(function () { return {}; });
        })
        .then(function (result) {
          setBusy(false);
          if (result && result.status === true) {
            joinedAs.textContent = email;
            show("joined");
          } else if (result && /invalid email/i.test(result.message || "")) {
            showError(INVALID_EMAIL);
            input.focus();
          } else {
            showError(GENERIC_FAILURE);
          }
        })
        .catch(function () {
          setBusy(false);
          showError(GENERIC_FAILURE);
        });
    });
  }

  document.querySelectorAll("[data-insiders]").forEach(init);
})();

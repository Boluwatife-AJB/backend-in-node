const icons = {
  success:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
  error:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
  warning:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
  info: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
};

const closeIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';

export const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) {
    el.classList.remove("slide-in");
    el.classList.add("slide-out");
    setTimeout(() => {
      if (el) el.parentElement.removeChild(el);
    }, 500); // Wait for the animation to finish before removing the element
  }
};

export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `
    <div class="alert alert--${type}">
      <div class="alert__icon">
        ${icons[type] || ""}
      </div>
      <div class="alert__content">
        <p class="alert__message">${msg}</p>
      </div>
      <button class="alert__close">${closeIcon}</button>
    </div>
  `;
  document.body.insertAdjacentHTML("afterbegin", markup);

  const alertElement = document.querySelector(".alert");
  setTimeout(() => alertElement.classList.add("alert--visible"), 10);

  const closeButton = alertElement.querySelector(".alert__close");
  closeButton.addEventListener("click", hideAlert);

  window.setTimeout(hideAlert, 5000); // Auto-hide the alert after 3 seconds
};

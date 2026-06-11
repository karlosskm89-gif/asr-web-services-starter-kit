(function () {
  const links = document.querySelectorAll("[data-config-key][data-config-value]");
  if (!links.length) return;

  const current = new URL(window.location.href);

  links.forEach((link) => {
    const next = new URL(window.location.href);
    next.searchParams.set(link.dataset.configKey, link.dataset.configValue);
    link.href = `${next.pathname}?${next.searchParams.toString()}`;

    if (current.searchParams.get(link.dataset.configKey) === link.dataset.configValue) {
      link.setAttribute("aria-current", "true");
      link.classList.add("is-active");
    }
  });
})();

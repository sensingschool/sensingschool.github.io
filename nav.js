(() => {
  const LOGO_SVG = `
        <svg class="logo" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="#bc122a" stroke-width="2" opacity="0.55"/>
          <circle cx="50" cy="50" r="36" fill="none" stroke="#bc122a" stroke-width="2.5" opacity="0.7"/>
          <circle cx="50" cy="50" r="26" fill="none" stroke="#bc122a" stroke-width="3"/>
          <circle cx="50" cy="50" r="14" fill="none" stroke="#bc122a" stroke-width="3.5"/>
          <circle cx="50" cy="50" r="6"  fill="#bc122a"/>
        </svg>
        <span><span>SENSING</span> <span class="red">STUDIO</span></span>`;

  const render = () => {
    document.querySelectorAll('header[data-nav]').forEach((host) => {
      const brand = document.createElement('a');
      brand.className = 'brand';
      brand.href = host.dataset.home || '../';
      brand.innerHTML = LOGO_SVG;
      host.replaceChildren(brand);

      const crumb = host.dataset.crumb;
      if (crumb) {
        const span = document.createElement('span');
        span.className = 'crumb';
        span.textContent = crumb;
        host.appendChild(span);
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();

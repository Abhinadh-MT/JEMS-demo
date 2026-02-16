// loads sidebar.html and replaces the placeholder div with the sidebar
(function () {
  async function loadSidebar() {
    try {
      const res = await fetch('sidebar.html');
      if (!res.ok) throw new Error('Failed to fetch sidebar.html: ' + res.status);
      const html = await res.text();
      const placeholder = document.getElementById('sidebar');
      if (placeholder) {
        // replace placeholder with the loaded sidebar
        placeholder.outerHTML = html;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSidebar);
  } else {
    loadSidebar();
  }
})();

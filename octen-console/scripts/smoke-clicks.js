async page => {
  await page.waitForTimeout(1200);
  return await page.evaluate(async () => {
    const errors = [];
    window.addEventListener('error', e => errors.push(e.message));
    const ids = [...document.querySelectorAll('.nav-item[onclick]')]
      .map(a => (a.getAttribute('onclick').match(/go\('([^']+)'\)/) || [])[1])
      .filter(Boolean);
    const results = [];
    for (const id of ids) {
      try { go(id); } catch (e) { errors.push(id + ': ' + e.message); }
      await new Promise(r => setTimeout(r, 120));
      const registered = !!(window.pageHtml['page-' + id] || window.pageHtml[id]);
      const first = document.getElementById('page-container').firstElementChild;
      const shown = first && first.id === 'page-' + id && first.innerHTML.length > 100;
      results.push({ id, registered, shown });
    }
    return JSON.stringify({
      total: ids.length,
      registered: results.filter(r => r.registered).map(r => r.id),
      unregistered: results.filter(r => !r.registered).map(r => r.id),
      broken: results.filter(r => r.registered && !r.shown).map(r => r.id),
      jsErrors: errors,
    });
  });
}

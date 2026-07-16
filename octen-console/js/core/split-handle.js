// Split Handle Resize Logic
(function() {
  let isDragging = false;
  let currentHandle = null;
  let startX, startWidth, containerWidth;
  let prevPane, nextPane;

  document.addEventListener('mousedown', (e) => {
    if (e.target && e.target.classList && e.target.classList.contains('split-handle')) {
      currentHandle = e.target;
      prevPane = currentHandle.previousElementSibling;
      nextPane = currentHandle.nextElementSibling;
      
      if (!prevPane || !nextPane) return;
      
      isDragging = true;
      startX = e.clientX;
      startWidth = prevPane.getBoundingClientRect().width;
      const container = currentHandle.parentElement;
      containerWidth = container.clientWidth;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging || !currentHandle || !prevPane || !nextPane) return;
    const minLeftWidth = 400;
    const minRightWidth = 400;
    const maxLeftWidth = Math.max(minLeftWidth, containerWidth - minRightWidth - currentHandle.clientWidth);
    
    const dx = e.clientX - startX;
    let newWidth = startWidth + dx;
    
    if (newWidth > maxLeftWidth) newWidth = maxLeftWidth;
    if (newWidth < minLeftWidth) newWidth = minLeftWidth;
    
    prevPane.style.flex = '0 0 ' + newWidth + 'px';
    prevPane.style.width = newWidth + 'px';
    nextPane.style.flex = '1 1 0%';
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      currentHandle = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });
})();
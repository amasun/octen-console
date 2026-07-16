// Split Handle Resize Logic
document.addEventListener('DOMContentLoaded', () => {
  const handles = document.querySelectorAll('.split-handle');
  handles.forEach(handle => {
    let isDragging = false;
    let startX, startWidth, containerWidth;
    const prevPane = handle.previousElementSibling;
    const nextPane = handle.nextElementSibling;
    if (!prevPane || !nextPane) return;
    
    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startWidth = prevPane.getBoundingClientRect().width;
      const container = handle.parentElement;
      containerWidth = container.clientWidth;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const minLeftWidth = 400;
      const minRightWidth = 400;
      const maxLeftWidth = Math.max(minLeftWidth, containerWidth - minRightWidth - handle.clientWidth);
      
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
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    });
  });
});
window.addEventListener('load', () => {
  // task 2
  const amenityIds = new Map();
  document.querySelectorAll('input[type=checkbox]').forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) {
        amenityIds.set(input.dataset.id, input.dataset.name);
      } else {
        amenityIds.delete(input.dataset.id);
      }
      const amenityNames = [...amenityIds.values()].join(', ');
      const h4Element = document.querySelector('div.amenities h4');
      h4Element.textContent = amenityNames || '\u00A0'; // If empty, display non-breaking space
    });
  });
});


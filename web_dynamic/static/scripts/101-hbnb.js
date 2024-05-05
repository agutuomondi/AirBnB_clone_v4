window.addEventListener('load', () => {
  // Task 3
  fetch('http://0.0.0.0:5001/api/v1/status')
    .then(response => response.json())
    .then(data => {
      const apiStatusElement = document.getElementById('api_status');
      if (data.status === 'OK') {
        apiStatusElement.classList.add('available');
      } else {
        apiStatusElement.classList.remove('available');
      }
    })
    .catch(error => console.error('Error fetching API status:', error));

  // Task 2
  const amenityIds = {};
  document.querySelectorAll('.amenities input[type=checkbox]').forEach(input => {
    input.addEventListener('click', () => {
      if (input.checked) {
        amenityIds[input.dataset.id] = input.dataset.name;
      } else {
        delete amenityIds[input.dataset.id];
      }
      const amenityNames = Object.values(amenityIds).join(', ');
      const h4Element = document.querySelector('div.amenities h4');
      h4Element.textContent = amenityNames || '\u00A0'; // If empty, display non-breaking space
    });
  });
});


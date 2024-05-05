$(document).ready(function() {
  // task 3
  $.get('http://0.0.0.0:5001/api/v1/status', function(data) {
    $('#api_status').toggleClass('available', data.status === 'OK');
  });

  // task 2
  const amenityIds = {};
  $('input[type=checkbox]').change(function() {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).prop('checked')) {
      amenityIds[id] = name;
    } else {
      delete amenityIds[id];
    }

    updateAmenities();
  });

  function updateAmenities() {
    const h4 = $('div.amenities h4');
    h4.html(Object.keys(amenityIds).length === 0 ? '&nbsp;' : Object.values(amenityIds).join(', '));
  }
});


$(document).ready(function() {
  // task 3
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status',
    success: function(data) {
      $('#api_status').toggleClass('available', data.status === 'OK');
    }
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

  // task 4
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({})
  }).done(function(data) {
    renderPlaces(data);
  });

  function updateAmenities() {
    const h4 = $('div.amenities h4');
    h4.html(Object.keys(amenityIds).length === 0 ? '&nbsp;' : Object.values(amenityIds).join(', '));
  }

  function renderPlaces(data) {
    const sectionPlaces = $('section.places').empty();
    sectionPlaces.append('<h1>Places</h1>');

    data.forEach(function(place) {
      const template = `<article>
        <div class="title">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">
            <i class="fa fa-users fa-3x" aria-hidden="true"></i><br>${place.max_guest} Guests
          </div>
          <div class="number_rooms">
            <i class="fa fa-bed fa-3x" aria-hidden="true"></i><br>${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
            <i class="fa fa-bath fa-3x" aria-hidden="true"></i><br>${place.number_bathrooms} Bathroom
          </div>
        </div>
        <div class="description">${place.description}</div>
      </article>`;
      sectionPlaces.append(template);
    });
  }
});


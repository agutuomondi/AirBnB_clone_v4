$(document).ready(function() {
  const amenityIds = {};
  const stateIds = {};
  const cityIds = {};

  // task 3
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status',
    success: function(data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  // task 2
  $('.amenities input[type=checkbox]').change(function() {
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
  $('.filters button').click(function() {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(amenityIds),
        states: Object.keys(stateIds),
        cities: Object.keys(cityIds)
      }),
      success: function(data) {
        $('section.places').empty().append('<h1>Places</h1>');
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
          $('section.places').append(template);
        });
      }
    });
  });

  // task 6
  $('.stateCheckBox, .cityCheckBox').change(function() {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const isState = $(this).hasClass('stateCheckBox');

    if ($(this).prop('checked')) {
      if (isState) {
        stateIds[id] = name;
      } else {
        cityIds[id] = name;
      }
    } else {
      if (isState) {
        delete stateIds[id];
      } else {
        delete cityIds[id];
      }
    }

    updateLocations();
  });

  function updateAmenities() {
    if (Object.keys(amenityIds).length === 0) {
      $('div.amenities h4').html('&nbsp;');
    } else {
      $('div.amenities h4').text(Object.values(amenityIds).join(', '));
    }
  }

  function updateLocations() {
    const locations = Object.values(stateIds).concat(Object.values(cityIds));
    const locationsText = locations.length > 0 ? locations.join(', ') : '&nbsp;';
    $('.locations h4').html(locationsText);
  }
});


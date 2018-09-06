$(document).ready(function() {
    var resumen = $('#resumen');
    var sensacion = $('#sensacion');
    var probabilidad = $('#probabilidad');
    var humedad = $('#humedad');
    var img__responsive = $('#img__responsive');

    var urlApi = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/';
    var key = '8ceb1c6906e5d54e9a1b7f928ee5e526';
    var coords = {
        scl: '-33.4488897,-70.6692655',
        ccp: '-36.8201352, -73.0443904'
    }

    var queryParams = ['exclude=[minutely,hourly,daily,alerts,flags]' , 'lang=es', 'units=auto']

    var image = {

        'clear-day':'',
        'rain':''
    }
    $('#select').on('change', function() {
        $.ajax({
            url: urlApi + key + '/' + coords[$(this).val()] + '?' + queryParams[0] + '&' + queryParams[1] + '&' + queryParams[2],
            method: 'GET'
            }).then(function(data) {
            resumen.text(parseInt(data.currently.temperature) + '°' + data.currently.summary);
            sensacion.text(data.currently.apparentTemperature) + '°';
            probabilidad.text(data.currently.precipProbability * 100 + '%');
            humedad.text(data.currently.humidity * 100 + '%');
            img__responsive.attr('src', image[data.currently.icon]);
        });

      var map;
        map = new google.maps.Map(document.getElementById('#map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      
        var marker = new google.maps.Marker({
          map: map,
        });
    })
});
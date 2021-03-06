/*side bar */

function openSlideMenu() {
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
}

function closeSlideMenu() {
    document.getElementById('side-menu').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
}

/* 時間選單 */
for (var i = 0; i <= 12; i++) {
    if (i < 10) {
        $('#hrs').
        append($("<option></option>").attr("value", i).text('0' + i));
    } else {
        $('#hrs').
        append($("<option></option>").attr("value", i).text(i));
    }
}
for (var i = 0; i <= 60; i++) {
    if (i < 10) {
        $('#min').
        append($("<option></option>").attr("value", i).text('0' + i));
    } else {
        $('#min').
        append($("<option></option>").attr("value", i).text(i));
    }

}

/* google map */

var geocoder;
var map;
var marker;

/*Google Map with marker */
function initialize() {
    var initialLat = $('.search_latitude').val();
    var initialLong = $('.search_longitude').val();
    initialLat = initialLat ? initialLat : 24.965198;
    initialLong = initialLong ? initialLong : 121.193796;

    var latlng = new google.maps.LatLng(initialLat, initialLong);
    var options = {
        zoom: 16,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("geomap"), options);

    geocoder = new google.maps.Geocoder();

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: latlng
    });

    google.maps.event.addListener(marker, "dragend", function() {
        var point = marker.getPosition();
        map.panTo(point);
        geocoder.geocode({
            'latLng': marker.getPosition()
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker.setPosition(results[0].geometry.location);
                $('.search_addr').val(results[0].formatted_address);
                $('.search_latitude').val(marker.getPosition().lat());
                $('.search_longitude').val(marker.getPosition().lng());
            }
        });
    });

}

$(document).ready(function() {
    //load google map
    initialize();

    /*
     * autocomplete location search
     */
    var PostCodeid = '#search_location';
    $(function() {
        $(PostCodeid).autocomplete({
            source: function(request, response) {
                geocoder.geocode({
                    'address': request.term
                }, function(results, status) {
                    response($.map(results, function(item) {
                        return {
                            label: item.formatted_address,
                            value: item.formatted_address,
                            lat: item.geometry.location.lat(),
                            lon: item.geometry.location.lng()
                        };
                    }));
                });
            },
            select: function(event, ui) {
                $('.search_addr').val(ui.item.value);
                $('.search_latitude').val(ui.item.lat);
                $('.search_longitude').val(ui.item.lon);
                var latlng = new google.maps.LatLng(ui.item.lat, ui.item.lon);
                marker.setPosition(latlng);
                initialize();
            }
        });
    });

    /*
     * Point location on google map
     */
    $('.get_map').click(function(e) {

        var address = $(PostCodeid).val();
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker.setPosition(results[0].geometry.location);
                $('.search_addr').val(results[0].formatted_address);
                $('.search_latitude').val(marker.getPosition().lat());
                $('.search_longitude').val(marker.getPosition().lng());
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
        e.preventDefault();
    });

    //Add listener to marker for reverse geocoding
    google.maps.event.addListener(marker, 'drag', function() {
        geocoder.geocode({
            'latLng': marker.getPosition()
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    $('.search_addr').val(results[0].formatted_address);
                    $('.search_latitude').val(marker.getPosition().lat());
                    $('.search_longitude').val(marker.getPosition().lng());
                }
            }
        });
    });
});




/* 取得資料 */

function set() {

    if (window.localStorage) {

        localStorage.name = document.all.ordname.value;
        localStorage.phone = document.all.ordphone.value;
        localStorage.storename = document.all.ordstorename.value;
        localStorage.product = document.all.ordproduct.value;
        localStorage.pro_price = document.all.ordpro_price.value;
        localStorage.shippingfee = document.all.ordshippingfee.value;
        localStorage.hrs = document.all.ordhrs.value;
        localStorage.min = document.all.ordmin.value;
        localStorage.ampm = document.all.ordampm.value;
        localStorage.addr = document.all.ordaddr.value;



        location.href = 'check.html';
    } else {
        alert("NOT SUPPORT");
    }
}

console.log(localStorage);
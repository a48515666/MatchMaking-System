document.write('<script src="js/order.js"></script>');

function openSlideMenu() {
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
}

function closeSlideMenu() {
    document.getElementById('side-menu').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
}


/* google map */

var geocoder;
var map;
var marker;

/*
  Google Map with marker
 */
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




/*顯示訂單資料*/

var id = Math.random().toString(36).substr(2)
var name = localStorage["name"];
var phone = localStorage["phone"];
var storename = localStorage["storename"];
var product = localStorage["product"];
var pro_price = localStorage["pro_price"];
var shippingfee = localStorage["shippingfee"];
var hrs = localStorage["hrs"];
var min = localStorage["min"];
var ampm = localStorage["ampm"];
var addr = localStorage["addr"];
localStorage.id = id;

$("#checkform").append(`
                    <div class="bookingform">
                    <label id="id">訂單編號：${id}</label>
                    </div>
                    <div class="bookingform">
                    <label id="cname">姓名：${name}</label>
                    </div>
                    <div class="bookingform">
                    <label id="cstorename">手機號碼：${phone}</label>
                    </div>
                    <div class="bookingform">
                    <label id="cstorename">店家名稱：${storename}</label>
                    </div>
                    <div class="bookingform">
                        <label id="cproduct">商品名稱：${product}</label>

                    </div>
                    <div class="bookingform">
                        <label id="cprice">商品金額(略估)：NT$${pro_price}</label>

                    </div>
                    <div class="bookingform">
                        <label id="ctime">取貨時間：${hrs}&nbsp:&nbsp${min} ${ampm}</label>

                    </div>

                    <div class="bookingform">
                        <label id="cfee">運費金額：NT$${shippingfee}</label>

                    </div>
                    <div class="bookingform">
                        <label id="cplace">商品地點：${addr}</label>
                        
                     </div>
                    
            `);
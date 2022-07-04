/*side bar */
function openSlideMenu() {
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
}

function closeSlideMenu() {
    document.getElementById('side-menu').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
}


$(function() {
    /* 按下GoTop按鈕時的事件 */
    $('#gotop').click(function() {
        $('html,body').animate({ scrollTop: 0 }, 'slow'); /* 返回到最頂上 */
        return false;
    });

    /* 偵測卷軸滑動時，往下滑超過100px就讓GoTop按鈕出現 */
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#gotop').fadeIn();
        } else {
            $('#gotop').fadeOut();
        }
    });
});

/*firebase API*/
var firebaseConfig = {
    apiKey: "AIzaSyAymoXy2SaNKTPsiQUButnIkcz4s6eAY20",
    authDomain: "my-firebase-first-app-5b3fa.firebaseapp.com",
    databaseURL: "https://my-firebase-first-app-5b3fa.firebaseio.com",
    projectId: "my-firebase-first-app-5b3fa",
    storageBucket: "my-firebase-first-app-5b3fa.appspot.com",
    messagingSenderId: "985080145151",
    appId: "1:985080145151:web:bcd046a7b92a87ab"
};
/*Initialize Firebase*/
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

/*取得跑腿方地址 */
var supply_addr = localStorage["supply_addr"];
var sphone = localStorage['sphone'];
localStorage.sphone = sphone;
var docRef = db.collection("Users").doc(sphone);

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data().username);
        localStorage.sname = doc.data().username;
    }
})



/*取得db Order資料*/
function getorder() {
    //var _array = [];
    db.collection("Order").get().then(function(Snapshot) {
        Snapshot.forEach(function(doc) {

            // var obj = doc.data();
            // _array.push(obj);

            var start = supply_addr;
            var end = `${doc.data().addp}`;
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            var directionsService = new google.maps.DirectionsService();
            directionsService.route(request, function(response, status) {
                var strTmp = "";
                if (status == google.maps.DirectionsStatus.OK) {
                    var route = response.routes[0];
                    for (var j = 0; j < route.legs.length; j++) {
                        var routeSegment = j + 1;
                        strTmp += route.legs[j].distance.text;
                    }
                    //取得距離(正整數，公尺)
                    var dist = parseInt(parseFloat(strTmp) * 1000).toString();
                    var intdist = parseInt(dist);

                    if (dist < 1500 && `${doc.data().success}` == "false") {
                        var btnclick = "#" + `${doc.data().ID}`;
                        $('#orderlist').append(

                            `<div class="item">
                            <span>店家名稱：${doc.data().store}</span><br>
                            <span>商品名稱：${doc.data().product}</span><br>
                            <span>運費：${doc.data().fee}</span><br>
                            <span>取貨時間：${doc.data().time}</span><br>
                            <span>取貨地點：${doc.data().addr}</span><br>
                            <span>距離：${dist}公尺</span><br>
                            <input type="button" class="submit" id="${doc.data().ID}"  value="接單"/>
                            </div>
                        `);
                        $(btnclick).on("click", function() {
                            var el = confirm('確定接此單嗎？');
                            if (el == true) {
                                db.collection("Order").doc(`${doc.data().phone}`).update({
                                    success: true,
                                    supplyphone: sphone
                                }).then(function() {
                                    localStorage.dphone = doc.data().phone;
                                    localStorage.id = `${doc.data().ID}`;
                                    console.log(doc.data().phone);
                                    document.location.href = 'scomplete.html';

                                })
                            }

                        });
                    }

                }

            })


            //console.log(_array);
            // for (var i = 0; i < _array.length; i++) {
            // console.log(_array[i].addp);
            // var start = supply_addr;
            // var end = _array[i].addp;
            // var request = {
            //     origin: start,
            //     destination: end,
            //     travelMode: google.maps.DirectionsTravelMode.DRIVING
            // };
            // var directionsService = new google.maps.DirectionsService();
            // directionsService.route(request, function(response, status) {
            //     var strTmp = "";
            //     if (status == google.maps.DirectionsStatus.OK) {
            //         var route = response.routes[0];
            //         for (var j = 0; j < route.legs.length; j++) {
            //             var routeSegment = j + 1;
            //             strTmp += route.legs[j].distance.text;
            //         }
            //         //取得距離(正整數，公尺)
            //         var dist = parseInt(parseFloat(strTmp) * 1000).toString();
            //         var intdist = parseInt(dist);
            //     }

            //     if (dist < 10000) {
            //         //$('#orderlist').append(`<p>${_array[i].addp}</p>`);
            //         console.log(_array[i]);
            //         //document.getElementById("orderlist").innerHTML = `${nearorder.map(Template).join("")}`;
            //     }

        });

    });
}

getorder();
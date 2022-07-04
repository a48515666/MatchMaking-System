var firebase;

$(function() {

    var sname = localStorage['sname'];
    console.log(sname)
    var dname = localStorage['dname'];
    console.log(dname);

    var $name = $('#name'),
        $content = $('#content'),
        $btn = $('#btn'),
        $show = $('#show'),
        ms = new Date().getTime();
    var config = {
        databaseURL: "https://my-firebase-first-app-5b3fa.firebaseio.com/"
    };
    firebase.initializeApp(config);
    var database = firebase.database().ref();

    $btn.on('click', write);
    $content.on('keydown', function(e) {
        if (e.keyCode == 13) {
            write();
        }
    });

    function write() {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        if (h < 10) {
            h = '0' + h;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        var now = h + ':' + m + ':' + s;

        var test = {
            name: 'test',
            content: $('#content').val(),
            time: now,
            id: 'id' + ms
        };

        var postData = {
            name: dname,
            content: $('#content').val(),
            time: now,
            id: 'id' + ms
        };
        database.push(postData);
        database.push(test);
        $content.val('');

    }



    database.limitToLast(1).on('value', function(snapshot) {

        for (var i in snapshot.val()) {
            if (snapshot.val()[i].name == sname || snapshot.val()[i].name == dname) {
                $show.prepend('<div class="' + snapshot.val()[i].id + '"><div>' + snapshot.val()[i].time + '</div>' + snapshot.val()[i].name + ' 說：' + snapshot.val()[i].content + '</div>');
            }
        }
        $show.find('.id' + ms).css({
            color: '#f00'
        });
        $show.find('.id' + ms + ' div').css({
            color: '#f00'
        });
    });
})

function good() {
    var dcode = localStorage['dcode'];
    console.log(dcode);
    var scode = localStorage['scode'];
    console.log(scode);
    var tall = prompt("请输入跑腿方的驗證碼，您的驗證碼為" + dcode);
    if (tall == scode) {
        alert('thank you!!!');
        document.location.href = 'menu1.html';
        var phone = localStorage['dphone'];
        localStorage.sphone = phone;
    } else {
        if (tall != scode) { alert('wrong code!!!') } else { alert('你按了取消') }
    }
}
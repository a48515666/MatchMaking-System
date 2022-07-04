//firebase API//
var firebaseConfig = {
    apiKey: "AIzaSyAymoXy2SaNKTPsiQUButnIkcz4s6eAY20",
    authDomain: "my-firebase-first-app-5b3fa.firebaseapp.com",
    databaseURL: "https://my-firebase-first-app-5b3fa.firebaseio.com",
    projectId: "my-firebase-first-app-5b3fa",
    storageBucket: "my-firebase-first-app-5b3fa.appspot.com",
    messagingSenderId: "985080145151",
    appId: "1:985080145151:web:bcd046a7b92a87ab"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();


//main//
function Login() {
    var phonenumber = document.getElementById('phonenumber').value;
    var password1 = document.getElementById('password').value;
    var docRef = db.collection("Users").doc(phonenumber);
    docRef.get().then(function(doc) { //取得資料
        if (doc.exists) { //資料是否存在
            if (`${doc.data().password}` == password1) {
                alert('Welcome!!!');
                document.location.href = "menu1.html";
            } else {
                alert("wrong password!!!");
                history.go(0);
            }
        } else {
            alert('wrong phonenumber please try again!!!');
        }
    });
    localStorage.sphone = phonenumber;
};

//signup//

function signup() {
    var Username = document.getElementById("username").value;
    var phone = document.getElementById("tel").value;
    var Email = document.getElementById("email").value;
    var Password = document.getElementById("password").value;
    var docRef = db.collection("Users").doc(phone);
    var docRef1 = db.collection('username').doc(Username);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            alert('Phonenumber has been used');
            document.getElementById("tel").value = '';
        }
        //幫忙清空
        else {
            docRef1.get().then(function(doc) {
                if (!doc.exists) {
                    db.collection("Users").doc(phone).set({
                            username: Username,
                            phonenumber: phone,
                            email: Email,
                            password: Password
                        })
                        .then(function() {
                            db.collection('username').doc(Username).set({
                                username: true
                            }).then(function() {
                                alert('registration success'); //跳轉頁面
                                document.location.href = 'main.html';
                            })
                        })
                } else {
                    alert('username has been used');
                    document.getElementById('username').value = '';
                }
            });
        }
    })
}


//changpwd//

function change() {
    var phone = document.getElementById("phone").value;
    var npd = document.getElementById("newpwd").value;
    var cpd = document.getElementById("confirmpwd").value;
    var docRef = db.collection('Users').doc(phone);
    docRef.get().then(function(doc) {
        if (!doc.exists) {
            alert('Phonenumber does not exist!!!');
            document.getElementById("phone").value = '';
        } //幫忙清空
        else {
            if (npd == cpd) {
                docRef.update({ //更新資料
                        "password": npd
                    })
                    .then(function() {
                        alert("successfully modified!");
                        document.location.href = 'main.html'; //跳轉
                    });
            } else {
                alert('try again!!!');
            }
        }
    })
};

//check//
function check() {
    var name = localStorage["name"];
    var phone = localStorage["phone"];
    var storename = localStorage["storename"];
    var product = localStorage["product"];
    var pro_price = localStorage["pro_price"];
    var shippingfee = localStorage["shippingfee"];
    var hrs = localStorage["hrs"];
    var min = localStorage["min"];
    var ampm = localStorage["ampm"];
    var addp = localStorage["addr"];
    var addr = document.getElementById('search_addr').value;
    var docRef = db.collection("Order").doc(id);
    db.collection('Order').doc(phone).set({
        ID: id,
        name: name,
        store: storename,
        product: product,
        proprice: pro_price,
        fee: shippingfee,
        phone: phone,
        addp: addp,
        addr: addr,
        time: hrs + ' : ' + min + " " + ampm,
        success: false
    }).then(function() {
        alert('successfully ordered');
        localStorage.phone = phone;
        location.href = 'complete.html';
    })
}
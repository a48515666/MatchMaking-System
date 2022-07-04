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
var phone = localStorage["phone"];
var docRef = db.collection("Users").doc(phone);


/*side bar */

function openSlideMenu() {
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
}

function closeSlideMenu() {
    document.getElementById('side-menu').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
}

function myrefresh() {
    window.location.reload();
}
var id = localStorage['id'];

function success() {
    var docRef = db.collection('Order').doc(phone)
    docRef.get().then(function(doc) { //取得資料
        if (doc.exists) { //資料是否存在
            if (`${doc.data().success}` == 'true') {
                alert('merge success');
                localStorage.dphone = phone;
                localStorage.sphone = doc.data().supplyphone;
                localStorage.dname = doc.data().name;
                localStorage.id = id;
                document.location.href = "d.html";
                document.location.href = "dchatroom.html";
            } else {
                setTimeout('myrefresh()', 10000);
            }
        }
    })
}
success();
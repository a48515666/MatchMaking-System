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

var dphone = localStorage['dphone'];
localStorage.dphone = dphone;
var sphone = localStorage['sphone'];
var dname = localStorage['dname'];
localStorage.dname = dname;
db.collection('Users').doc(sphone).get().then(function(doc) {
    if (doc.exists) {
        localStorage.sname = doc.data().username;
    }
})

function jump() {
    document.location.href = 'dchatroom.html';
}

setTimeout('jump()', 2000);
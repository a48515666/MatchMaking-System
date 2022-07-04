/*side bar */

function openSlideMenu() {
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
}

function closeSlideMenu() {
    document.getElementById('side-menu').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
}

/*跳轉至聊天室 */
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
var phone = localStorage["sphone"];
var sname = localStorage["sname"];
var dphone = localStorage["dphone"];
var docRef = db.collection("Users").doc(dphone);

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data().username);
        localStorage.dname = doc.data().username;
    }
})

setTimeout("location.href='schatroom.html'", 3000);

// var jQueryScript1 = document.createElement('script');
// jQueryScript1.setAttribute('src', 'https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
// document.head.appendChild(jQueryScript1);
// var jQueryScript2 = document.createElement('script');
// jQueryScript2.setAttribute('src', 'https://www.gstatic.com/firebasejs/7.14.2/firebase-analytics.js');
// document.head.appendChild(jQueryScript2);
// var jQueryScript3 = document.createElement('script');
// jQueryScript3.setAttribute('src', 'https://www.gstatic.com/firebasejs/7.14.0/firebase-database.js');
// document.head.appendChild(jQueryScript3);
var firebaseConfig = {
    apiKey: "AIzaSyDUa7oLkKEC3qtexvdOSPOsx_vBk65C99U",
    authDomain: "plate-number-scanner.firebaseapp.com",
    databaseURL: "https://plate-number-scanner.firebaseio.com",
    projectId: "plate-number-scanner",
    storageBucket: "plate-number-scanner.appspot.com",
    messagingSenderId: "629495378162",
    appId: "1:629495378162:web:d4fa6081c3d16395f1606b",
    measurementId: "G-J0NTKZN7NN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

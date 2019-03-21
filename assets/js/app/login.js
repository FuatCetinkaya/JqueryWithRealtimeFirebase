$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyAwPiI_BfbVELGLE6Q4LV7p3crxv8CpwSk",
        authDomain: "jquery-3aa5d.firebaseapp.com",
        databaseURL: "https://jquery-3aa5d.firebaseio.com",
        projectId: "jquery-3aa5d",
        storageBucket: "",
        messagingSenderId: "205060852944"        
    };
    firebase.initializeApp(config);

    $("#loginBtn").click(function(){
        
        var email = $("#email").val();
        var password = $("#password").val();

        firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function(){
                    window.location.href = "index.html"
                })
                .catch(function(error){
                    alert(error.message)
                })
    })

})
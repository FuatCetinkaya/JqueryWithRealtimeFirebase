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

    var currentUserId;
    firebase.auth().onAuthStateChanged(function(user){

        if(user){
            currentUserId = user.uid;

            $(".user-text").text(user.email);

            $("#logout").click(function(){
                firebase.auth().signOut()
                    .then(function(){
                        window.location.href = "login.html";
                    })
            })


            $(".sendToFireBase").click(function(){

                var description = $("#description").val();
                firebase.database().ref().child("users").child(currentUserId).child("todos").push({
                    description: description,
                    completed: false
                });

                $("#description").val('');
            })


            var todoRef = firebase.database().ref().child("users/"+currentUserId).child("todos");
            todoRef.on("value", function(degisiklikleriDinle){
                
                var $parent = $(".todoList").children("tbody"); // todoList class'ının altındaki tbody al
                $parent.html('');   // içini boşalt

                degisiklikleriDinle.forEach(function(item){
                    var description_elem = "<td>"+ item.val().description + "</td>"
                    var completed = item.val().completed == true ? "checked" : "";
                    var completed_elem = "<td class='text-center'><input data-key='"+item.key+"' type='checkbox' class='switchery-plugin' "+ completed + "/></td>"
                    var removeBtn_elem = "<td class='text-center'><button data-key='"+item.key+"' class='btn btn-danger btn-block removeBtn'>Sil</button></td>"
                    var result = "<tr>" + description_elem + completed_elem + removeBtn_elem + "</tr>"
                    $parent.append(result);
                });

                $(".switchery-plugin").each(function(){
                    new Switchery(this)
                })

                ///////////////// Silme ////////////
                $("body").on("click", ".removeBtn", function(){//  $(".removeBtn").click() şeklinde yazamayız. Çunku removeBtn class'ını runtime'da dinamik oluşturuyoruz. Body yüklendiğinde çalışması lazım
                    
                    var $key = $(this).data("key"); // tıklanan butonun Id değerine ulaşmak için
                    firebase.database().ref("users/" + currentUserId + "/todos/" + $key).remove()

                }) 
                ///////////////// Update ////////////
                $("body").on("change", ".switchery-plugin", function(){
                    
                    var $key = $(this).data("key"); // tıklanan butonun Id değerine ulaşmak için
                    var $completed = $(this).prop("checked");

                    firebase.database().ref("users/" + currentUserId + "/todos/" + $key + "/completed").set($completed);

                })                 
            })

        }

    })

    
})
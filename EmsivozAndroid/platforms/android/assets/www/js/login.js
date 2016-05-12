

function Login(user,pass){
    document.addEventListener("deviceready", onDeviceReady, false);
    var username = $('#'+user).val();
    var password = $('#'+pass).val();
     var Suusuario=document.getElementsByName(user);
     var Supass=document.getElementsByName(pass);

    if(username.length > 0 ){
       Suusuario[0].style.borderBottom = "thin dotted green";
          document.getElementById('icoUser').style.color="green";
        if(password.length > 0){
            Supass[0].style.borderBottom = "thin dotted green";
              var parametro={'usname':username,'uspass':password};
              document.getElementById('fade').style.display="none";
             document.getElementById('carga').style.display="block";

             setTimeout(function(){ 
                  $.ajax({
                       data:parametro,
                        type:"POST",
                        url:'https://app.emsivoz.co/funciones/prod/usuario-app/auth_users.php',
                        success:function(response){
                          console.log(response);
                          var data=JSON.parse(response);
                          if(data.mensaje == "ok"){
                                localStorage.setItem('usname', username);
                                localStorage.setItem('uspass', password);
                                localStorage.setItem('name', data.name);
                                localStorage.setItem('credit', data.credit);
                                localStorage.setItem('session',data.session);
                                localStorage.setItem('cel',data.cel);
                                localStorage.setItem('uipass',data.uipass);
                                localStorage.setItem('llamar','1');
                                     /*  document.getElementById('tx').innerHTML='<h3 style="color:#4470B4;">Bienvenido a </h3> <img src="img/logo.png" class="img-rounded img-responsive" style="height:50px;width:150px;" alt="Responsive image">';
                                      document.getElementById('bd').innerHTML="";
                                      $("#modalls").click();*/
                                setTimeout ("$(location).attr('href','inicio.html');", 0900); 
                              }else{
                                $('#fade').removeClass('fadeOut');
                                $('#fade').addClass('fadeIn');
                                  document.getElementById('fade').style.display="block";
                                  document.getElementById('carga').style.display="none";
                                  if(response == "En estos momentos estamos realizando cambios "){
                                        document.getElementById('carga').style.display="none";
                                        document.getElementById('gh').innerHTML="<font color='red'> <h5><i class='material-icons'>&#xE7F3;</i>  En estos momentos estamos realizando cambios</font> </h5>";
                                  }else{
                                     document.getElementById('gh').innerHTML="<font color='red'> <h5><i class='material-icons'>&#xE7F3;</i>  Datos Incorrectos</font> </h5>";
                                     Suusuario[0].style.borderBottom = "thin dotted red";
                                     document.getElementById('icoUser').style.color="red";
                                     Supass[0].style.borderBottom = "thin dotted red";
                                     document.getElementById('icoPass').style.color="red";
                                   }
                              }
                          }
                   });
             } ,1000);
        }else{
            
            Supass[0].style.borderBottom = "thin dotted red";
         document.getElementById('icoPass').style.color="red";
            
        }
    }else{
        
                    Suusuario[0].style.borderBottom = "thin dotted red";
         document.getElementById('icoUser').style.color="red";
           if(password.length == 0){
               
            Supass[0].style.borderBottom = "thin dotted red";
             document.getElementById('icoPass').style.color="red";
           }else{
            Supass[0].style.borderBottom = "thin dotted green";
           document.getElementById('icoPass').style.color="green";
           }
         
    }
}
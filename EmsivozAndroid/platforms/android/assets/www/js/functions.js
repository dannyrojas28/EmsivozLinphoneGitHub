/**
* Created with OlaAPP.
* User: yedeveloper
* Date: 2015-08-20
* Time: 02:18 AM
* To change this template use Tools | Templates.
*/

function Contenido(argument){
    $('#load').removeClass();
    
    $(location).attr('href',argument);
}
 /*Esta funcion permite cargar los contenidos a mostrar*/
    /**/
    /**/
    function dom(argument){
        return document.getElementById(argument);
    } 
function menu(){
    
}
function ValidateText(id,icon){
    var idtext=$('#'+id).val();
    var Suusuario=document.getElementsByName(id);
       if(idtext.length >= 3){
         document.getElementById(icon).style.color="green";
         Suusuario[0].style.borderBottom = "thin dotted green";
            document.getElementsByName('btn')[0].disabled =false;
       }else{
         document.getElementById(icon).style.color="red";
           Suusuario[0].style.borderBottom = "thin dotted red";
            document.getElementsByName('btn')[0].disabled =true;
       }
}
function ValidateNumber(){
    var idtext=$('#celular').val();
    var Suusuario=document.getElementsByName('celular');
       if(idtext.length >= 9){
         document.getElementById('icoCel').style.color="green";
         Suusuario[0].style.borderBottom = "thin dotted green";
        document.getElementById('celular_error').innerHTML="";
        document.getElementsByName('btn')[0].disabled =false;
       }else{
         document.getElementById('icoCel').style.color="red";
         document.getElementById('celular_error').innerHTML="<font color='red'>Minimo 10 numeros!</font>";
           Suusuario[0].style.borderBottom = "thin dotted red";
            document.getElementsByName('btn')[0].disabled =true;
       }
}
function ValidateNumberasd(){
    var idtext=$('#celular').val();
    var Suusuario=document.getElementsByName('celular');
       if(idtext.length >= 9){
         document.getElementById('icoCel').style.color="green";
         Suusuario[0].style.borderBottom = "thin dotted green";
            document.getElementById('celular_error').innerHTML="";
            document.getElementsByName('btn')[0].disabled =false;
       }else{
             document.getElementById('icoCel').style.color="red";
              Suusuario[0].style.borderBottom = "thin dotted red";
            document.getElementsByName('btn')[0].disabled =true;
       }
}
function validateEmail(){
    var usuario=$('#usuario').val();
    var Suusuario=document.getElementsByName('usuario');
    var expre=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
       if(!expre.test(usuario)){
          Suusuario[0].style.borderBottom = "thin dotted red";
         document.getElementById('icoUser').style.color="red";
         document.getElementsByName('btn')[0].disabled = true;
       }else{
           Suusuario[0].style.borderBottom = "thin dotted green";
          document.getElementById('icoUser').style.color="green";
            document.getElementsByName('btn')[0].disabled =false;
       }
}
function ValidatePass(){
    var password=$('#password').val();
    var Supass=document.getElementsByName('password');
       if(password.length <= 6){
           document.getElementById('pass_error').innerHTML="<font color='red'>Minimo 7 caracteres!</font>";
          Supass[0].style.borderBottom = "thin dotted red";
         document.getElementById('icoPass').style.color="red";
         document.getElementsByName('btn')[0].disabled = true;
       }else{
           document.getElementById('pass_error').innerHTML="";
           Supass[0].style.borderBottom = "thin dotted green";
          document.getElementById('icoPass').style.color="green";
            document.getElementsByName('btn')[0].disabled =false;
       }
}

function verPass(){
    var verpassword=$('#verpass').val();
    if(verpassword == 0){
        document.getElementById('password').type="text";
        document.getElementById('verpass').value="1";
        $('#ocultarPass').html('<i class="material-icons  iconIn prefix " onclick="verPass()"> &#xE8F5;</i>');
    }else{
        document.getElementById('password').type="password";
        document.getElementById('verpass').value="0";
        $('#ocultarPass').html('<i class="material-icons  iconIn prefix " onclick="verPass()"> &#xE8F4;</i>');
    }
}
function verPassDos(){
    var verpassword=$('#verpass').val();
    if(verpassword == 0){
        document.getElementById('pass').type="text";
        document.getElementById('verpass').value="1";
        $('#ocultarPass').html('<i class="material-icons  iconIn prefix " onclick="verPassDos()"> &#xE8F5;</i>');
    }else{
        document.getElementById('pass').type="password";
        document.getElementById('verpass').value="0";
        $('#ocultarPass').html('<i class="material-icons  iconIn prefix " onclick="verPassDos()"> &#xE8F4;</i>');
    }
}
function VerificarCode(){
    var numero=$('#celular').val();
    var code=$('#code').val();
     var parametros={'numero':numero,'code':code};
     document.getElementById('error_code').innerHTML="";
      $("#modal2").css('display','none');  
    $.ajax({
        data:parametros,
        type:'POST',
        url:'https://app.emsivoz.co/funciones/prod/programadas/validarcodigo.php',
       success:function(data){
        var intentos=$('#intentos').val();
            if(intentos != 0){
                if(data == 1){
                    $('#validarcode').val(3);
                    Registrar();
                }else{
                   document.getElementById('error_code').innerHTML="<font color='red'>Este Codigo no es valido</font>";
                     $("#modal2").css('display','block');  
                     $('#error_intentos').html(intentos+" intentos restantes");
                     $('#intentos').val(parseInt(intentos) - 1);
               }
            }else{
              $(location).attr('href','registrar.html');
            }
        }
    });
}
function validatecodeNuev(){
  $('#validarcode').val(1);
  Registrar();
}
function cancelReg(){
  document.getElementById('fade').style.display="block";
  document.getElementById('carga').style.display="none";
  $("#modal2").css('display','none');  
  document.getElementById('errorReg').innerHTML="<center><h5>Se cancelo el registro</h5></center>";
}

function cambiCode(){
  $('#validarcode').val(1);
}

function Registrar(){
    document.addEventListener("deviceready", onDeviceReady, false);
    $("#modal2").css('display','none');            
    var nombre=$('#nombres').val();
    var apellido=$('#apellidos').val();
    var numero=$('#celular').val();
    var ciudad=$('#ciudad').val();
    var direccion='null';  
    var usuario=$('#usuario').val();
    var pass=$('#password').val();
    var pass2=$('#password2').val();
    var emsiamigo=$('#emsiamigo').val();
    if(emsiamigo.length == 0){    
     $('#validarcode').val(2);
    }
    var validarcode=$('#validarcode').val();
    var Sunombre=document.getElementsByName('nombres');
    var Suapellido=document.getElementsByName('apellidos');
    var Sunumero=document.getElementsByName('celular');
    //var Sudireccion=document.getElementsByName('direccion');
    var Suemail=document.getElementsByName('usuario');
    var Supass=document.getElementsByName('password');
    var Supass2=document.getElementsByName('password2');
    if(nombre.length >= 3){
         document.getElementById('icoName').style.color="green";
         Sunombre[0].style.borderBottom = "thin dotted green";
            if(apellido.length >= 3){
                 document.getElementById('icoApell').style.color="green";
                 Suapellido[0].style.borderBottom = "thin dotted green";
                    if(numero.length >= 9){
                         document.getElementById('icoCel').style.color="green";
                         Sunumero[0].style.borderBottom = "thin dotted green";
                        document.getElementById('celular_error').innerHTML="";
                        if(ciudad !=  0){
                            if(direccion.length >= 3){
                                // document.getElementById('icoDir').style.color="green";
                                 //Sudireccion[0].style.borderBottom = "thin dotted green";
                                if(usuario.length > 0){  
                                      document.getElementById('usuario_error').innerHTML="";
                                       Suemail[0].style.borderBottom = "thin dotted green";
                                      document.getElementById('icoUser').style.color="green";
                                        document.getElementsByName('btn')[0].disabled =false;
                                        if(pass.length >= 6){
                                            document.getElementById('pass_error').innerHTML="";
                                            Supass[0].style.borderBottom = "thin dotted green";
                                            document.getElementById('icoPass').style.color="green";
                                                     if (document.getElementById('checkbox').checked){
                                                          document.getElementById('chek').style.color="blue";
                                                         document.getElementById('fade').style.display="none";
                                                        document.getElementById('carga').style.display="block";
                                                         
                                                            
                                                          setTimeout(function(){ 
                                                            var parametros={'nombres':nombre,'apellidos':apellido,'numero':numero,'ciudad':ciudad,'direccion':direccion,'email':usuario,'pass':pass,'emsiamigo':emsiamigo,'validarcode':validarcode};
                                                             $.ajax({
                                                                 data:parametros,
                                                                 type:'POST',
                                                                 url:'https://app.emsivoz.co/funciones/prod/usuario-app/registraruser.php',
                                                                 crossDomain : true,
                                                                 success:function(data){
                                                                      console.log(data);
                                                                      var print=JSON.parse(data);
                                          	                           if(print.estado  ==  1 ){
                                                                                localStorage.setItem('usname', print.usuario);
                                                                                 localStorage.setItem('uspass', print.pass);
                                                                                 localStorage.setItem('name', print.nombre);
                                                                                 localStorage.setItem('credit', '1000');
                                                                                 localStorage.setItem('session',print.session);
                                                                                 localStorage.setItem('cel',print.numero);
                                                                                 localStorage.setItem('uipass',print.uipass);
                                                                                 localStorage.setItem('llamar','1');
                                                                                 localStorage.setItem('ms',print.nombre+' Te obsequiamos $1.000 para que llames.');
                                                                                setTimeout ("$(location).attr('href','inicio.html');", 0900);
                                                                           }else{
                                                                              if(print.estado == 6){
                                                                                  if(validarcode == 1){
                                                                                        $('#numeroMsM').html(numero);
                                                                                        document.getElementById('carga').style.display="none";
                                                                                        $("#modal2").css('display','block');                 
                                                                                    }
                                                                              }else{
                                                                                $("#ki").click();
                                                                                document.getElementById('fade').style.display="block";
                                                                                document.getElementById('carga').style.display="none";
                                                                                document.getElementById('errorReg').innerHTML="<center><font color='red'><h5><i class='material-icons'>&#xE7F3;</i> Verifica Tu Informacion</h5></font></center>";
                                                                               if(print.estado == 2){
                                                                                     document.getElementById('usuario_error').innerHTML="<font color='red'>Este E-mail ya existe</font>";
                                                                                     Suemail[0].style.borderBottom = "thin dotted red";
                                                                                     document.getElementById('icoUser').style.color="red";
                                                                                     document.getElementsByName('btn')[0].disabled = true;
                                                                                     document.getElementById('icoCel').style.color="red";
                                                                                    document.getElementById('celular_error').innerHTML="<font color='red'>Este Numero ya existe</font>";
                                                                                     Sunumero[0].style.borderBottom = "thin dotted red";
                                                                                     document.getElementById('celular').focus();
                                                                               }else{
                                                                                     if(print.estado ==  3){
                                                                                         document.getElementsByName('btn')[0].disabled = true;
                                                                                         document.getElementById('icoCel').style.color="red";
                                                                                        document.getElementById('celular_error').innerHTML="<font color='red'>Este Numero ya existe</font>";
                                                                                         Sunumero[0].style.borderBottom = "thin dotted red";
                                                                                         document.getElementById('celular').focus();
                                                                                       }else{
                                                                                           if(print.estado ==  4){
                                                                                            document.getElementById('usuario_error').innerHTML="<font color='red'>Este E-mail ya existe</font>";
                                                                                             Suemail[0].style.borderBottom = "thin dotted red";
                                                                                             document.getElementById('icoUser').style.color="red";
                                                                                             document.getElementsByName('btn')[0].disabled = true;
                                                                                           }else{
                                                                                               document.getElementById('errorReg').innerHTML='<font color="red">Error de Registro!</font>';
                                                                                           }
                                                                                       }
                                                                               }
                                                                              }
                                                                           }
                                                                     }
                                                                 });
                                                                        } ,500);
                                                            
      
                                                         }else{
                                                              document.getElementById('chek').style.color="red";
                                                         }

                                       }else{
                                            document.getElementById('pass_error').innerHTML="<font color='red'>Minimo 7 caracteres!</font>";
                                            Supass[0].style.borderBottom = "thin dotted red";
                                            document.getElementById('icoPass').style.color="red";
                                            document.getElementById('password').focus();
                                       }
                                    }else{
                                         document.getElementById('usuario_error').innerHTML="<font color='red'>Digita un Email!</font>";
                                          Suemail[0].style.borderBottom = "thin dotted red";
                                         document.getElementById('icoUser').style.color="red";
                                         document.getElementsByName('btn')[0].disabled = true;
                                         document.getElementById('usuario').focus();
                                    }
                                }else{
                                    
                                 //document.getElementById('icoDir').style.color="red";
                                 //document.getElementById('direccion').focus();
                                 //Sudireccion[0].style.borderBottom = "thin dotted red";
                               }
                           }else{
                               
                           }
                       }else{
                             document.getElementById('icoCel').style.color="red";
                            document.getElementById('celular_error').innerHTML="<font color='red'>Minimo 10 numeros!</font>";
                             Sunumero[0].style.borderBottom = "thin dotted red";
                             document.getElementById('celular').focus();
                       }
               }else{
                     document.getElementById('icoApell').style.color="red";
                     Suapellido[0].style.borderBottom = "thin dotted red";
                     document.getElementById('apellidos').focus();
               }
       }else{
             document.getElementById('icoName').style.color="red";
             document.getElementById('nombres').focus();
             Sunombre[0].style.borderBottom = "thin dotted red";
       }
}


function Close(){
    localStorage.removeItem('usname');
    localStorage.removeItem('uspass');
    $(location).attr('href',"index.html");
}
function NuevaPestana(url){
      var win = window.open(url, '_blank');
        win.focus()
    }

    function Href(argument){
       $(location).attr('href',argument);
    }

function ContenidoPrincipal(argument){ 
    $('#salir').val(1);
    $('#llamar-contact').val(0);
    document.addEventListener("deviceready", onDeviceReady, false);
	  crossDomain : true,
     $.get(argument+".html").done(
            function(data){
                $(dom('micont')).html(data);
               document.addEventListener("deviceready", onDeviceReady, false);
            });
}
function LlamarCont(numero){
   $('#llamar-contact').val(numero);
}
function initialize() {
    navigator.geolocation.getCurrentPosition(showPosition, onError);
}
 
function showPosition(position) {
          $.ajax({
                data: null,
                type: "post",
                url: 'https://app.emsivoz.co/funciones/prod/programadas/puntos.php',
               
          success:function(data){
               var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var mapOption = {
                  center: myLatLng,
                   zoom: 20
                 };
                 var map = new google.maps.Map(document.getElementById('mapdiv'), mapOption);
                 var image = 'img/punto.png';
                   
               var markers = new google.maps.Marker({
                            position: myLatLng,
                            map: map,
                            title: 'MI PUNTO',
                            icon: 'img/userUBI.png'
                    });
              console.log(data);
              var data=JSON.parse(data);
               for (var i = 0; i < data.length;i++){
                    var lati  = parseFloat(data[i]['lati']);
                    var longi = parseFloat(data[i]['longi']);
                    var  myLatLng = { lat: lati, lng: longi};
                    var marker = new google.maps.Marker({
                            position: myLatLng,
                            map: map,
                            title: 'PUNTO DE RECARGA',
                            icon: image
                    });
                  
                }
          }
        });
        
        
       
  }
function onError(error) {
	 document.getElementById('mapdiv').innerHTML='<center><h5>Tenemos Problemas </h5></center><br><div class="container"><p style="font-color:15px;">Para poder acceder a la geolocalizacion de tu telefono, sigue las instrucciones</p><p>1. Click en el menu de configuracion de tu telefono <br>2.Ingresa en la parte que dice Ubicacion o GPS<br>3. Verifica que este activada la opcion "Acceder a mi ubicacion"  y modo ubicacion-alta precision<br></div>';
}

function History(argument){
      $.get(argument+".html").done(
            function(data){
                $(dom('miHistory')).html(data);
            });
}

function Llamar(){
  if(localStorage.getItem('llamar') == 1){
      ContenidoPrincipal('llamar');
  }else{
    LanzarZoiper();
  }
}

function LanzarZoiper(){
   var scheme;
   var store;
  // Don't forget to add the cordova-plugin-device plugin for `device.platform`
   if(device.platform === 'iOS') {
        scheme = 'zoiper://';
                            store = 'https://itunes.apple.com/us/app/zoiper-sip-softphone-for-voip/id438949960?mt=8';
    }
    else if(device.platform === 'Android') {
        scheme = 'com.zoiper.android.app';
        store ='https://play.google.com/store/apps/details?id=com.zoiper.android.app&hl=es_419';
    }
    appAvailability.check(
    scheme,       // URI Scheme or Package Name
    function() {  // Success callback
        window.plugins.launcher.launch({packageName:scheme});
    },function() {  // Error callback
       window.location=store;
     }
   );
}

function FiltrarIndicativo(){
  var pais=$('#pais').val();
  console.log(pais);
  $.post('https://app.emsivoz.co/funciones/prod/programadas/indicativos.php',{'pais':pais},function(data){
    console.log(data);
     var print=JSON.parse(data);
     var tabla='<table  class=" bordered centered" id="tab"><thead><tr><th>Destino</th><th>celular</th><th>fijo</th> </tr></thead>';
     for (var i = 0; i < print.length;i++){
          var img='<img src="https://www.emsivoz.co/img/banderas-tarifas/'+print[i]['bandera']+'" style="width:180px;height:150px;"><br>';
          var td='<tbody><tr><td>'+print[i]['nombre']+'</td><td>'+print[i]['celular']+'</td><td>'+print[i]['fijo']+'</td></tr></tbody>';
     }
     $('#rta').html(tabla+td+'</table><br>'+img);
  });
}
function Nomas(){
  localStorage.setItem('llamar','2');
}

function FiltrarTarifa(){
  var pais=$('#pais').val();
  console.log(pais);
  $.post('https://app.emsivoz.co/funciones/prod/programadas/tarifas.php',{'pais':pais},function(data){
    console.log(data);
     var print=JSON.parse(data);
     var td="";
     var tabla='<table class=" bordered centered" id="tab"><thead><tr><th>Precio fijo</th><th>Precio celular</th></tr></thead><tbody><tr>';
     for (var i = 0; i < print.length;i++){
         var img='<h3>'+print[i]['nombre']+'</h3><img src="https://www.emsivoz.co/img/banderas-tarifas/'+print[i]['bandera']+'" style="width:180px;height:150px;"><br>';
         td=td+'<td>$ '+print[i]['precio']+'</td>';
     }
     $('#rta').html(img+tabla+td+'</tr></tbody></table>');
  });
}

   function menu() {
     $('#over').removeClass('fadeOutLeft');
     $('#over').addClass('fadeInLeft');
    document.getElementById('over').style.display='block';
    document.getElementById('fadexinz').style.display='block';
}
function hideLightbox() {
    $('#over').removeClass('fadeInLeft');
     $('#over').addClass('fadeOutLeft');
     document.getElementById('fadexinz').style.display='none';
     setTimeout(function(){document.getElementById('over').style.display='none'},500);
}
   function copiar(){
            var text = $('#uis').html();
            cordova.plugins.clipboard.copy(text,onSuccess, onError);
            function onSuccess(){
                
            }
            function  onError(error){
               
            }
        }
function Desvanceido(){
  var desvanecido=$('#desvanecido').val();
  if(desvanecido == 0){
    document.getElementById('fadexinz').style.display='block';
    $('#desvanecido').val(1);
  }else{
    document.getElementById('fadexinz').style.display='none';
    $('#desvanecido').val(0);
  }
}
function Sinup(){
  $('#principal').removeClass('fadeIn');
  $('#principal').addClass('fadeOut');
  var argument="registrar.html";
              $(location).attr('href',argument);
}
function OlvidoPass(){
   $('#principal').css('display','none');
   $('#carga').css('display','block');
  setTimeout(function(){ 
     $('#fadeDos').css('display','block');
     $('#carga').css('display','none');
  },1000);

}
function EnviarPass(){
  var busqueda=$('#usuarioD').val();
  var parametros={'usuario':busqueda};
  $("#principalDos").css('display','none');  
  $("#carga").css('display','block');  
    $.ajax({
        data:parametros,
        type:'POST',
        url:'https://app.emsivoz.co/funciones/prod/usuario-app/olvidopass.php',
       success:function(data){
        console.log(data);
        var response=JSON.parse(data);
          if(response.mensaje == 'ok'){
             $("#carga").css('display','none');  
             $("#fadeDos").css('display','none');  
             $("#fadeTres").css('display','block');
             $('#numeroMsM').html(response.cel);
          }else{
             document.getElementById('error_ud').innerHTML="<font color='red'>Este usuario no esta registrado</font>";
             $("#carga").css('display','none');  
             $("#principalDos").css('display','block');
          }
        }
    });

}

function VerificarCodePass(){
    var code=$('#code').val();
    var numero=$('#numeroMsM').html();
    var parametros={'numero':numero,'code':code};
     document.getElementById('error_code').innerHTML="";
       $("#principalTres").css('display','none');
       $("#carga").css('display','block');  
    $.ajax({
        data:parametros,
        type:'POST',
        url:'https://app.emsivoz.co/funciones/prod/programadas/validarcodigo.php',
       success:function(data){
        var intentos=$('#intentos').val();
            if(intentos != 0){
                if(data == 1){
                    $("#carga").css('display','none');  
                    $("#fadeTres").css('display','none');  
                    $('#usuarioAC').val(numero);
                    $("#fadeCuatro").css('display','block');
                }else{
                   document.getElementById('error_code').innerHTML="<font color='red'>Este Codigo no es valido</font>";
                     $("#carga").css('display','none');  
                     $("#principalTres").css('display','block');  
                     $('#error_intentos').html(intentos+" intentos restantes");
                     $('#intentos').val(parseInt(intentos) - 1);
               }
            }else{
              $(location).attr('href','index.html');
            }
        }
    });
}

function VolverCode(){
  $('#fadeTres').css('display','none');
  $('#fadeDos').css('display','block');
  $("#principalDos").css('display','block');
  $('#error_code').html('');
  $('#code').val('');
  $('#error_intentos').html('');
  $('#intentos').val('5');
}
function VolverPass(){
  $('#fadeCuatro').css('display','none');
  $('#fadeTres').css('display','block');
  $("#principalTres").css('display','block');
  $('#password').val('');
}
function UpdatePass(){
  var password=$('#password').val();
  var usuario=$('#usuarioAC').val();
  var Supass=document.getElementsByName('password');
    if(password.length >= 6){
      document.getElementById('pass_error').innerHTML="";
      Supass[0].style.borderBottom = "thin dotted green";
      document.getElementById('icoPass').style.color="green";
      document.getElementsByName('btn')[0].disabled =false;
      var parametros={'password':password,'usuario':usuario};
         $("#principalCuatro").css('display','none');
         $("#carga").css('display','block');  
      $.ajax({
          data:parametros,
          type:'POST',
          url:'https://app.emsivoz.co/funciones/prod/usuario-app/updatepassword.php',
         success:function(data){
          console.log(data);
                  if(data == 1){
                    $('#pass').val(password);
                    $('#user').val(usuario);
                    Login('user','pass');
                  }else{
                     document.getElementById('error_code').innerHTML="<font color='red'>No se ha podido actualizar</font>";
                       $("#principalCuatro").css('display','block');
                       $("#carga").css('display','none');  
                 }
          }
      });
    }else{
        document.getElementById('pass_error').innerHTML="<font color='red'>Minimo 7 caracteres!</font>";
        Supass[0].style.borderBottom = "thin dotted red";
        document.getElementById('icoPass').style.color="red";
        document.getElementsByName('btn')[0].disabled = true;
    }
}
function loadIndi(){
 $.post('https://app.emsivoz.co/funciones/prod/programadas/paises.php',function(data){
          if(data != '0'){
            var print=data.split("+");
                  var option = "";
                  var sum=print.length - 1;
                  var select='<div class="input-field  input"  style="display:block;"><select style="display:block;" onchange="FiltrarIndicativo()" name="pais" class=""  id="pais" > <option value="0">Selecciona el Pais</option>';
                   for (var i = 0; i < print.length;i=i+2){
                      if(i != sum){
                        option=option+'<option value="'+print[i]+'">'+print[i+1]+'</option>';
                      }
                   }
                   $('#pol').html(select+option+'</select></div>');
          }else{
            $('#indi').html('no hay ningun pais');
          }
        });
}
function loadIndiLlamar(){
  $.post('https://app.emsivoz.co/funciones/prod/programadas/paises_banderas.php',function(data){
          if(data != '0'){
            console.log(data);
            var print=data.split("+");
                  var option = "";
                  var sum=print.length - 1;
                  var select='<div class="input-field  input"  style="display:block;"><select style="display:block;" onchange="FiltrarPrecioLlamar()" name="pais_ll" class=""  id="pais_ll" > <option value="0">Selecciona el Pais</option>';
                   for (var i = 0; i < print.length;i=i+3){
                    if(i != sum){
                      option=option+'<option value="'+print[i]+'">'+print[i+1]+'</option>';
                    }
                   }
                   $('#paises').html(select+option+'</select></div>');
          }else{
            $('#indi').html('no hay ningun pais');
          }
        });
}

function FiltrarPrecioLlamar(){
  var pais = $('#pais_ll').val();
  $('#modal8').closeModal();
  console.log(pais);
  esta = pais;
  if(pais == 0){
      $('#number').html('');
      $('#connect').html('');
      $('#botton').html('<a class="btn-floating blue"> <i class="material-icons">&#xE8B4;</i></a>');
  }else{
      console.log(pais);
    $.post('https://app.emsivoz.co/funciones/prod/programadas/indicativos.php',{'pais':pais},function(data){
      $('#botton').html('<a class="btn-floating blue modal-trigger " href="#modal8"> <i class="material-icons">&#xE8B4;</i></a>');
      console.log(data);
       var print=JSON.parse(data);
       $('#botton').html('<img src="https://www.emsivoz.co/img/banderas-tarifas/'+print[0]['bandera']+'" style="width: 35px;height: 35px;" alt="" class="circle">');
       var imprim='';
       for (var i = 0; i < print.length;i++){
           imprim=imprim + print[i]['fijo'];
         }
        console.log(esta);
         if (esta != 1) {
            $('#numero-llam').val(imprim);
            $('#number').html(imprim);
         }else{
             $('#number').html('');
             $('#numero-llam').val('');
         }
         var pais=imprim;
         var indi,precio,nombre;
              $.post('https://app.emsivoz.co/funciones/prod/programadas/indicativos_pais.php',{'pais':pais},function(data){
              
                if(data != 0){
                  var print=JSON.parse(data);
                  nombre=print[0]['nombre'];
                    if(print[0]['indi'] == 1){
                       precio=print[0]['precio'];
                    }else{
                       precio=print[1]['precio'];
                    }
                  console.log(nombre+' valor min. $'+precio);
                  $('#btn-borr').html('<h5 class="material-icons right" style="color:#4470B4;margin-top:12px;font-size:32px;" onclick="BorrarNumero();" >&#xE14A;</h5>');
                   $('#connect').html('<span style="font-style:bold;font-size:20px;font-weight: 900;">'+nombre+'</span> valor min. <span style="font-style:bold;font-size:20px;font-weight: 900;"> $'+precio +'</span>');
                }
              });
    });
  }
}
function Colombia(){
  pais = 1;
   esta = pais;
   console.log(pais);
    $.post('https://app.emsivoz.co/funciones/prod/programadas/indicativos.php',{'pais':pais},function(data){
      console.log(data);
       var print=JSON.parse(data);
       $('#botton').html('<img src="https://www.emsivoz.co/img/banderas-tarifas/'+print[0]['bandera']+'" style="width: 35px;height: 35px;" alt="" class="circle">');
       var imprim='';
       for (var i = 0; i < print.length;i++){
           imprim=imprim + print[i]['fijo'];
         }
        console.log(esta);
         if (esta != 1) {

            $('#number').html(imprim);
         }
         var pais=imprim;
         var indi,precio,nombre;
              $.post('https://app.emsivoz.co/funciones/prod/programadas/indicativos_pais.php',{'pais':pais},function(data){
              
                if(data != 0){
                  var print=JSON.parse(data);
                  nombre=print[0]['nombre'];
                    if(print[0]['indi'] == 1){
                       precio=print[0]['precio'];
                    }else{
                       precio=print[1]['precio'];
                    }
                  console.log(nombre+' valor min. $'+precio);
                   $('#connect').html('<span style="font-style:bold;font-size:20px;font-weight: 900;">'+nombre+'</span> valor min. <span style="font-style:bold;font-size:20px;font-weight: 900;"> $'+precio +'</span>');
                }
              });
    });
}
function OpenMod(){
   $('#modal8').openModal();
}
function loadPreciosRecarga(){
  $('#selecff').html('<hr><input name="pru" id="pru"  type="hidden" value=""/>'+
                        '<label style="color:#4470B4;font-size:15px;"> Selecciona el valor de tu recarga</label>'+
                       ' <div class="input-field col s12 input"> '+
                        '<i class="material-icons iconIn prefix ciudad validate " >&#xE227;</i>'+
                          '<select class="validate  option" onchange="ValorSignature()"  id="amount"  name="amount" >'+
                              '<option value="10000"> 10.000</option>'+
                              '<option value="15000"> 15.000</option>'+
                              '<option value="20000"> 20.000</option>'+
                              '<option value="25000"> 25.000</option>'+
                              '<option value="30000"> 30.000</option>'+
                              '<option value="35000"> 35.000</option>'+
                              '<option value="40000"> 40.000</option>'+
                              '<option value="45000"> 45.000</option>'+
                              '<option value="50000"> 50.000</option>'+
                         '</select>'+
                        '</div>'+
                        '<span id="valorIn"></span>'+
                        '<br>');
}
function loadTarif(){
  $.post('https://app.emsivoz.co/funciones/prod/programadas/paises.php',function(data){
          if(data != '0'){
            var print=data.split("+");
                  var option = "";
                  var sum=print.length - 1;
                  var select='<div class="input-field  input" style="display:block;"><select  onchange="FiltrarTarifa()" name="pais"  id="pais" style="display:block;" > <option value="0">Selecciona el pais</option>';
                   for (var i = 0; i < print.length;i=i+2){
                    if(i != sum){
                      option=option+'<option value="'+print[i]+'">'+print[i+1]+'</option>';
                    }
                   }
                   $('#pol').html(select+option+'</select></div>');
          }else{
            $('#indi').html('no hay ningun pais');
          }
        });
}
function TomarRegalo(monto,id){
  $('#rg_img').removeClass('hinge');
  $('#rg_img').addClass('hinge');
     console.log(monto + " --" + id);
  $('#text_felicidad').html('Emsivoz te regalo '+ monto+' para que sigas llamando');
  $('#text_felicidad').css('display','block');
  var saldo=localStorage.getItem('credit');
  inicial=100;
  var interval=setInterval(function(){
    if( inicial <= monto){
      saldo=parseFloat(saldo) + 100;
      var num=saldo;
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
                    num = num.split('').reverse().join('').replace(/^[\.]/,'');
      $('#saldo_good').html(num);
    }else{
      var card_id=localStorage.getItem('session');
      $.post('https://app.emsivoz.co/funciones/prod/usuario-app/update_regalo.php',{'id':id,'estado':'2','saldo':saldo,'card_id':card_id},function(data){
            console.log(data);
      });
      clearInterval(interval);
      $('#regalo').html(' <button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon "  style="color:#4470B4;position:absolute;right:10px;margin-top:10px;"><i class="material-icons" >&#xE5D4;</i> </button>');
    }
    inicial=parseFloat(inicial)+100;
  },100);
}

function CambiarImgPromo(){
  var d = new Date();

  localStorage.setItem('img_promo', d.getYear()+" "+d.getMonth()+""+d.getDay());
  console.log(d);
}




function ClicSearch(){
  var h= $('#contbus').val();
  $('#seca').val(h);
}
function ValorLlamada(numero){
  var num  = "";
  var imd  = false;
  var bandera,precio,nombre;
  for (var i = 0; i < numero.length; i++) {
    num = num + numero[i];
    if (num.length >= 4){
        $.post('https://app.emsivoz.co/funciones/prod/programadas/indicativos_pais.php',{'pais':num},function(data){
          console.log(data);
            if(data != 0){   
                imd = true;
                console.log("se cambio");         
                var print=JSON.parse(data);
                nombre=print[0]['nombre'];
                  if(print[0]['indi'] == 1){
                      precio=print[0]['precio'];
                  }else{
                      precio=print[1]['precio'];
                  }
                 bandera = print[0]['bandera'];
            }
        });
    }
  }
  setTimeout(function(){
      console.log(imd);         

      if(imd == true){
          var text ='<img src="https://www.emsivoz.co/img/banderas-tarifas/'+bandera+'" style="width: 35px;height: 35px;display:inline-block" alt="" class="circle">';
          text = text + '<span style="font-style:bold;font-size:20px;font-weight: 900;margin-left:7px;">'+nombre+'</span> valor min. <span style="font-style:bold;font-size:20px;font-weight: 900;"> $'+precio +'</span>';
      }else{
        Colombia();
          var text ='<img src="https://www.emsivoz.co/img/banderas-tarifas/colombia.png" style="margin-right:7px;width: 35px;height: 35px;display:inline-block" alt="" class="circle">';
          text = text + $('#connect').html();
      }        
      $('#p_valor').html(text);  
    },900);      
}
/*
  function SING(){
    $('#logoB').css('margin-top','0px');
    $('#logoB').removeClass('bounceInDown');
    $('#logoB').addClass('bounceInUp');
    $('#pkjn').removeClass('bounceInUp');
    $('#pkjn').addClass('bounceOutUp');
     $('#pkjn').css('display','none');
    $('#fade').css('display','block');
    $('#nav').css('display','block');
  }
   var intentos=$('#intentos').val();
            if(intentos != 0){
                if(response.mensaje == 'ok'){

                      $("#carga").css('display','none');  
                      $("#fadeDos").css('display','none');  
                      $("#fadeTres").css('display','block');
                }else{
                   document.getElementById('error_code').innerHTML="<font color='red'>Codigo invalido</font>";
                     $("#carga").css('display','none');  
                     $("#principalDos").css('display','block');
                     $('#error_intentos').html(intentos+" intentos restantes");
                     $('#intentos').val(parseInt(intentos) - 1);
               }
            }else{
              $(location).attr('href','registrar.html');
            }
  */

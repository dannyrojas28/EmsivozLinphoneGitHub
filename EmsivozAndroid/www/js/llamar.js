var mySip;
                var interval;
                var options;
                var rf= false;
                var sum=0;
                var au= 0;
                function Numero(num){
                  var numf = $('#numero-llam').val();
                  console.log(numf.length);
                  if(numf.length == 0 ){
                    if(num == 3){
                      au = 4;
                      sum = 6;
                    }else{
                      sum = 7;
                      au = 3;
                    }
                  }
                  console.log('algo');
                  var num = num;
                  $('#btn-borr').html('<h5 class="material-icons right" style="color:#ADACB2;margin-top:12px;font-size:32px;" onclick="BorrarNumero();" >&#xE14A;</h5>');
                  if($('#number').html().length <= 11){
                    $('#number').css('font-size','34px');
                  }else{
                    if($('#number').html().length <= 16){
                      $('#number').css('font-size','24px');
                    }else{
                      if($('#number').html().length <= 20){
                        $('#number').css('font-size','20px');
                      }else{
                        $('#number').css('font-size','16px');
                      }
                    }
                  }
                  
                  if($('#numero-llam').val() == '08'){
                     $('#number').html($('#number').html() + " ");
                     sum=5;
                  }

                  $('#numero-llam').val($('#numero-llam').val() + num);

                    if ($('#number').html().length == 3 && $('#number').html() != '08 ' ){
                      $('#number').html($('#number').html() + " "+num);
                     
                    }else{
                        $('#number').html($('#number').html() + num);
                       
                    }
                  
                  
                  var numero=$('#numero-llam').val();
                  var pais=numero;
                  var indi,precio,nombre;
                   if($('#numero-llam').val().length >= 4){
                    console.log($('#numero-llam').val());
                     $.post('https://app.emsivoz.co/funciones/prod/programadas/indicativos_pais.php',{'pais':pais},function(data){
                      console.log(data);
                        if(data != 0){   
                          rf=true;                         
                          var print=JSON.parse(data);
                          var h="";    
                                                               
                            for ( i = 0; i < numero.length; i++) {
                                h = h+ numero[i];
                                if(i == 2){
                                    h= h + " ";
                                    sum = $('#numero-llam').val().length + au;
                                }
                                if (i == (parseInt(numero.length)- 2)) {
                                    if(print[0]['indi'] == 2){
                                      h = h + " ";
                                      sum=$('#numero-llam').val().length + au;
                                    }
                                }
                                if (i == (parseInt(numero.length)- 1 )) {
                                    h = h + " ";
                                    sum=$('#numero-llam').val().length + au;
                                }
                             }       
                         $('#number').html(h); 
                          var imgBtn = '<img src="https://www.emsivoz.co/img/banderas-tarifas/'+print[0]['bandera']+'" style="width: 35px;height: 35px;" alt="" class="circle">';
                          nombre=print[0]['nombre'];
                            if(print[0]['indi'] == 1){
                              precio=print[0]['precio'];
                            }else{
                              precio=print[1]['precio'];
                            }
                          console.log(nombre+' valor min. $'+precio);
                             $('#connect').html(imgBtn + '<span class="conPais">'+nombre+'</span><span style="color:#ADACB2"> $'+precio +' Min</span>');
                      }else{
                        rf=false;
                      }
                       if($('#numero-llam').val().length == sum){
                         $('#number').html( $('#number').html() + " ");
                         sum=$('#numero-llam').val().length + au;
                       }
                   });

                     
                  }else{
                      Colombia();
                  }
                  console.log("el numero donde se salta es "+sum);
                 
                }

                function BorrarNumero(){
                    if(sum > ($('#numero-llam').val().length + 1)){
                      sum = sum - 2;
                    }
                    var num= $('#number').html();
                    var numero="";
                    var numD= $('#numero-llam').val();
                    var numeroD="";
                      $p=1;
                      console.log(num.length);
                      for(var i =0;i < num.length - $p;i++){
                        console.log(i);
                          if ( i == num.length - 2) {
                              if(num[i] != " "){
                                if(num[i + 1 ] != " "){
                                  numero=numero+ num[i];
                                }
                              }
                          }else{
                           
                             numero=numero+ num[i];
                            

                          }
                      }
                    
                      for(var i =0;i < numD.length - 1;i++){
                          numeroD=numeroD+ numD[i];
                      }

                  $('#number').html(numero);
                  $('#numero-llam').val(numeroD);

                  if ($('#number').html().length == 0 ) {
                    $('#btn-borr').html('<h5 class="material-icons right" style="color:transparent;margin-top:12px;font-size:32px;" onclick="BorrarNumero();" >&#xE14A;</h5>');
                  }
                  if($('#number').html().length <= 12){
                    $('#number').css('font-size','34px');
                  }else{
                    if($('#number').html().length <= 17){
                      $('#number').css('font-size','24px');
                    }else{
                       if($('#number').html().length <= 21){
                        $('#number').css('font-size','20px');
                        }else{
                          $('#number').css('font-size','16px');
                        }
                    }
                    
                  }
                  if($('#numero-llam').val().length < 4){
                          Colombia();
                    }
                  var pais=numeroD;
                  var indi,precio,nombre;
                    console.log($('#number').html());
                     $.post('https://app.emsivoz.co/funciones/prod/programadas/indicativos_pais.php',{'pais':pais},function(data){
                      console.log(data);
                        if(data != 0){
                          var print=JSON.parse(data);
                          var h="";
                           for ( i = 0; i < numeroD.length; i++) {
                            h = h+ numeroD[i];
                            if(i == 2){
                                h= h + " ";
                            }
                            if (i == (parseInt(numeroD.length)- 2 )) {
                                if(print[0]['indi'] == 2){
                                   h = h + " ";
                                }
                            }
                            if (i == (parseInt(numeroD.length)- 1 )) {
                                h = h + " ";
                            }
                         }       

                         $('#number').html(h); 
                          var imgBtn ='<img src="https://www.emsivoz.co/img/banderas-tarifas/'+print[0]['bandera']+'" style="width: 35px;height: 35px;" alt="" class="circle">';
                          nombre=print[0]['nombre'];
                            if(print[0]['indi'] == 1){
                              precio=print[0]['precio'];
                            }else{
                              precio=print[1]['precio'];
                            }
                          console.log(nombre+' valor min. $'+precio);
                             $('#connect').html(imgBtn+' <span class="conPais">'+nombre+'</span><span style="color:#ADACB2"> $'+precio +' Min</span>');
                      }
                   });

                     
                }
                
                function LlamarOtroMedio(numero){
                  var numeroenvi="";
                  for (var i = 0; i < numero.length; i++) {
                      for (var j = 0; j <= 9;j++) {
                          if(numero[i] != " "){
                              if(numero[i] == j){
                                  numeroenvi = numeroenvi + numero[i];
                              }
                          }
                      }
                     if(i == 2){
                        if(numeroenvi == '57'){
                          numeroenvi="";
                          console.log('sew cambio el numero');
                        }
                      }
                     
                  }

                  $('#number').html(numero);
                  $('#numero-llam').val(numeroenvi)
                  Llamar();
                }

                
                function Llamar(){
                  if (localStorage.getItem('llamada') == null) {
                    navigator.proximity.enableSensor();

                    setInterval(function(){
                      navigator.proximity.getProximityState(onSuccessProx);
                    }, 1000);
                    var num= $('#numero-llam').val();
                    var numeroenvi="";
                    for (var i = 0; i < num.length; i++) {
                        for (var j = 0; j <= 9;j++) {
                            if(num[i] != " "){
                                if(num[i] == j){
                                    numeroenvi = numeroenvi + num[i];
                                }
                            }
                        }
                       if(i == 2){
                          if(numeroenvi == '57'){
                            numeroenvi="";
                            console.log('sew cambio el numero');
                          }
                        }
                       
                    }
                    if(numeroenvi.length >= 3){
                      ValorLlamada(numeroenvi);
                      console.log(numeroenvi);
                     onCall(numeroenvi);
                     localStorage.setItem('llamada',numeroenvi);
                    }

                    if(numeroenvi.length == 0){
                      GetUltimoNumber();
                    }
                  }

                }

                function Colgar(){

                    //var $toastContent = $('<span>Llamada Finalizada</span>');
                   // Materialize.toast($toastContent, 3000);
                    clearInterval(interval);
                    localStorage.removeItem('llamada');
                    localStorage.removeItem('seg');
                    localStorage.removeItem('min');
                    localStorage.removeItem('hor');
                    $('#colgado').val('true');
                    onTerminateCall();
                    var argument=$('#page').val();
                    if(argument != "inicio"){
                      ContenidoPrincipal(argument);
                    }else{
                      $(location).attr('href',argument+".html");
                    }
                }
                function ActivarParlante(){
                    $('#speaker').html('<a class="btn-floating btn-large waves-effect waves-light"  style="background:#fff;border:1px solid #ADACB2;width:68px;height:68.5px;font-size:45px;" onclick="DescativarParlante()"> <i class="material-icons" style="color:#516AA3;font-size:45px;margin-top:5px" >&#xE050;</i> </a>');
                      onEnableSpeakerClick();
                }
                function DescativarParlante(){
                    $('#speaker').html('<a class="btn-floating btn-large waves-effect waves-light" style="background:#fff;border:1px solid #ADACB2;width:68px;height:68.5px;font-size:45px;" onclick="ActivarParlante()"> <i class="material-icons" style="color:#ADACB2;font-size:45px;margin-top:5px" >&#xE050;</i> </a>');
                      onDisableSpeakerClick();

                }
                function TecladoPequeno(){
                    $('#opciones').css('display','none');
                    $('#contacs').css('display','none');
                    $('#tecladopequeno').css('display','block');
                    $('#touchdtmf').html('<button class="btn-floating btn-large waves-effect waves-light" style="background:#fff;border:1px solid #ADACB2;width:68px;height:68.5px;font-size:45px;"  onclick="OcultarTeclado()">  <i class="material-icons" style="color:#516AA3;font-size:40px;" >&#xE0BC;</i></button>');
                }
                function OcultarTeclado(){
                    $('#opciones').css('display','block');
                    $('#tecladopequeno').css('display','none');
                    $('#contacs').css('display','none');
                    $('#colgar-di').css('display','block');
                    $('#touchdtmf').html('<button class="btn-floating btn-large waves-effect waves-light" style="background:#fff;border:1px solid #ADACB2;width:68px;height:68.5px;font-size:45px;" onclick="TecladoPequeno()">  <i class="material-icons" style="color:#ADACB2;font-size:40px;"  >&#xE0BC;</i></button>');
                }
                function Dtmf(num){
                    console.log(num);
                  $('#dtmf_key').val(num);
                   onSendDtmfClick();
                   $('#dtmf').html($('#dtmf').html() + num);
                }
                function callEstablished(){
                  if($('#call_esta').val() == 0){
                    $(".ds").removeAttr("disabled");
                    interval=  setInterval(tiempo,1000);
                     $('#call_esta').val(23213);
                  }
                }
                function tiempo(){
                      var colgado = $('#colgado').val();
                      if(colgado == "false"){
                        var min = $('#minutos').val();
                        var seg = $('#segundos').val();
                        var hor = $('#horas').val();
                        var dddd = hor +':'+ min + ':'+ seg;
                        console.log(dddd);
                            if(seg == 59){
                                seg=00;
                                min=01+parseInt(min);
                                if(min < 10){
                                    min='0'+min;
                                  }
                            }else{
                                seg=01+parseInt(seg);
                            }
                            if(min == 59){
                                min=00;
                                hor=01+parseInt(hor);
                            }
                            
                          var string = "";
                          if(seg < 10){
                            seg='0'+seg;
                          }
                          
                          string += hor +':'+ min + ':'+ seg;
                          console.log(string);
                          $('#horas').val(hor);
                          $('#minutos').val(min);
                          $('#segundos').val(seg);
                          document.getElementById("time-llama").innerHTML = string;
                          localStorage.setItem('seg',seg);
                          localStorage.setItem('min',min);
                          localStorage.setItem('hor',hor);
                      }else{
                          clearInterval(interval);
                      }
                }

                function callEnd(){
                   // var $toastContent = $('<span>Llamada Finalizada</span>');
                     //Materialize.toast($toastContent, 3000);
                    clearInterval(interval);
                    localStorage.removeItem('llamada');
                    $('#colgado').val("true");
                    localStorage.removeItem('seg');
                    localStorage.removeItem('min');
                    localStorage.removeItem('hor');
                    var argument=$('#page').val();
                    if(argument == "inicio"){
                      $(location).attr('href',argument+".html");
                    }else{
                      ContenidoPrincipal(argument);
                    }
                }
                function Mute(){
                   //mySip.muteCall('on');
                }
                function Stop(){
                    $('#estados-llama').html('<a class="btn-floating btn-large waves-effect waves-light transparent" style="border:1px solid #fff">  <i class="material-icons" style="color:#fff;font-size:30px;" onclick="Listen()">&#xE037;</i></a>');
                    //mySip.stopListenCall();
                }
                function Listen(){
                   $('#estados-llama').html('<a class="btn-floating btn-large waves-effect waves-light transparent" style="border:1px solid #fff">  <i class="material-icons" style="color:#fff;font-size:30px;" onclick="Stop()">&#xE034;</i></a>');
                  // mySip.listenCall();
                }

                function Destin(){
                  $('#modal5').openModal();
                  
                }
                 function callRingingBack(){
                    $("#btncolllam").removeAttr("disabled");
                    $("#btncolllam").removeAttr("disabled");
                }
                function onSuccessProx(state) {
                      console.log('Proximity state: ' + (state ? 'near' : 'far'));
                };
                function ConctsHtml(){
                    $('#opciones').css('display','none');
                    $('#tecladopequeno').css('display','none');
                    $('#contacs').css('display','block');
                    $('#colgar-di').css('display','none');
                    $('#htCons').html($('#result').html());
                }
               function Contactos(){
                  navigator.contacts.pickContact(function(contact){
                    var impri = "";
                        impri = '<center><i class="material-icons" style="font-size:60px;color:#ADACB2">&#xE853;</i><p style="font-size:19px">'+getName(contact)+'</p></center>';
                              
                        console.log(contact.phoneNumbers.length);
                           for(var j = 0; j < contact.phoneNumbers.length; j++) {
                              var phone = contact.phoneNumbers[j].value;
                              impri = impri +'<div style="border-top:1px solid #ADACB2" class="col s12">'+
                                                 '<div class="col s10" >'+
                                                    '<p style="font-size:16px;margin-top:10px" onclick="LlamarOtroMedio(\''+phone+'\')" >'+phone+'</p>'+
                                                 '</div>'+
                                                '<div class="col s2">'+
                                                  '<a onclick="LlamarOtroMedio(\''+phone+'\')" class="secondary-content btn-floating" style="background:#89B137;margin-top:3px"><i class="material-icons"><i class="material-icons" style="color:#fff;font-size:24px;">&#xE0CD;</i></i></a>'+
                                                '</div>'+
                                            '</div>';
                           }
                        
                        $('#Contactos_lon').html(impri);
                        $('#modal9').openModal();
                    
                  },function(err){
                    if(err != 6){
                      alert('ERROR, No Hemos podido acceder a tus contactos: ' + err);
                    }
                  });
                }

                function getName(c) {
                  var name = c.displayName;
                  if(!name || name === "") {
                      if(c.name.formatted) return c.name.formatted;
                      if(c.name.givenName && c.name.familyName) return c.name.givenName +" "+c.name.familyName;
                      return "Nameless";
                  }
                  return name;
              }
              function GetUltimoNumber(){
                        var parametro={'session':localStorage.getItem('session')};
                        $.ajax({
                            data:parametro,
                            type:"POST",
                            url:'https://app.emsivoz.co/funciones/prod/usuario-app/get_ultimo_numero.php',
                            success:function(data){
                            var print=JSON.parse(data);
                            var res = "";
                            if(print[0]['resul'] == "ok"){
                             for (var i = 0; i < print.length;i++){
                                num = print[i]['dnid'];
                                $('#number').html(num);
                                $('#numero-llam').val(num);
                                $('#btn-borr').html('<h5 class="material-icons right" style="color:#ADACB2;margin-top:12px;font-size:32px;" onclick="BorrarNumero();" >&#xE14A;</h5>');
                                if($('#number').html().length <= 11){
                                  $('#number').css('font-size','34px');
                                }else{
                                  if($('#number').html().length <= 16){
                                    $('#number').css('font-size','24px');
                                  }else{
                                    if($('#number').html().length <= 20){
                                      $('#number').css('font-size','20px');
                                    }else{
                                      $('#number').css('font-size','16px');
                                    }
                                  }
                                }
                                var numeroD = print[i]['dnid'];
                                console.log("la destination de la llamada es"+print[i]['destination']);
                                var pais=print[i]['destination'];
                                var indi,precio,nombre;
                                  console.log($('#number').html());
                                   $.post('https://app.emsivoz.co/funciones/prod/programadas/indicativos_pais.php',{'pais': '00'+pais},function(data){
                                    console.log(data);
                                      if(data != "error"){
                                        var print=JSON.parse(data);
                                        var h="";
                                         for ( i = 0; i < numeroD.length; i++) {
                                          h = h+ numeroD[i];
                                          if(i == 2){
                                              h= h + " ";
                                          }
                                          if (i == (parseInt(numeroD.length)- 1 )) {
                                              h = h + " ";
                                          }
                                       }       

                                       $('#number').html(h); 
                                        var imgBtn ='<img src="https://www.emsivoz.co/img/banderas-tarifas/'+print[0]['bandera']+'" style="width: 35px;height: 35px;" alt="" class="circle">';
                                        nombre=print[0]['nombre'];
                                          if(print[0]['indi'] == 1){
                                            precio=print[0]['precio'];
                                          }else{
                                            precio=print[1]['precio'];
                                          }
                                        console.log(nombre+' valor min. $'+precio);
                                           $('#connect').html(imgBtn + '<span class="conPais">'+nombre+'</span><span style="color:#ADACB2"> $'+precio +' Min </span>');
                                    }else{
                                      Colombia();
                                    }
                                 });
                             }
                            }
                            // NombreContact();
                                                         
                           }
                    });
              }
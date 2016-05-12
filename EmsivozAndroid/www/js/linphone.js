function onRegister(cel,pass) {

                Linphone.registerSIP(
                cel,
                cel,
                'sip.emsivoz.co',
                pass,
                'udp',
                function(id) {
                    //alert('REGISTERED');
            
                    $('#connect').css('color','green');
                    $("#btnllam").removeAttr("disabled");
                    $('#registrado').val(1);
                    // var $toastContent = $('<span>Estas Conectado</span>');
                     //Materialize.toast($toastContent, 3000,'rounded');
                    
                     
                },
                function(e) {
                   // alert(e);
                   $('#connect').css('color','red');
                    var $toastContent = $('<span>No se puede Conectar</span>');
                     Materialize.toast($toastContent, 3000);
                     
                });

            
        
}


function onDeregister() {
            Linphone.deregisterSIP(
                localStorage.getItem('cel'),
                'sip.emsivoz.co',
                function(id) {
                    //alert('DE-REGISTERED');
                });
}

function onGetRegisterState() {
            Linphone.getRegisterStatusSIP(
                document.getElementsByName("state_username")[0].value,
                document.getElementsByName("state_domain")[0].value,
                function(state) {
                    //alert(state);
                });
}

function onCall(cel){
            Linphone.makeCall(
                cel,
                'sip.emsivoz.co',
                cel,
                function(id) {
                    var num= $('#number').html();
                    $('#num-llama').html(num);
                    $('#telefono-contestado').css('display','block');
                    onDisableSpeakerClick();
                   
                    //alert('CALLING');
                },
                function(e){
                   // var $toastContent = $('<span>Problemas al realizar Llamada</span>');
                  //   Materialize.toast($toastContent, 3000);
                    localStorage.removeItem('llamada');
                    localStorage.removeItem('seg');
                    localStorage.removeItem('min');
                    localStorage.removeItem('hor');
                    
                });
}

        
function onAcceptCallClick() {
            Linphone.acceptCall(
                function(id) {
                    alert('ACCEPTED');
                });
}
        
function onDeclineCallClick() {
            Linphone.declineCall(
                function(id) {
                    alert('DECLINED');
                });
}
        
function onSendDtmfClick(cod) {
            Linphone.sendDtmf(
                cod,
                function(id) {
                    //alert('SENT DTMF');
                });
}
        
function onGetVolumeMaxClick() {
            Linphone.getVolumeMax(
                function(id) {
                    alert('VOLUME MAX IS: ' + id);
                });
}
        
function onAdjustVolumeClick() {
            Linphone.volume(
                document.getElementsByName("volume_number")[0].value,
                function(id) {
                    //alert('ADJUSTED VOLUME');
                });
        }
        function onTerminateCall() {
            Linphone.terminateCall(
                function(id) {
                    //onDeregister();
                    //alert('TERMINATED CALL');
                });
        }
        function onMuteCallClick() {
            Linphone.muteCall(
                function(id) {
                    alert('MUTED CALL');
                });
        }
        function onUnmuteCallClick() {
            Linphone.unmuteCall(
                function(id) {
                    alert('UNMUTED CALL');
                });
        }
        function onEnableSpeakerClick() {
            Linphone.enableSpeaker(
                function(id) {
                    //alert('ENABLED SPEAKER');
                });
        }
        function onDisableSpeakerClick() {
            Linphone.disableSpeaker(
                function(id) {
                    //alert('DISABLED SPEAKER');
                });
        }
        function onHoldCallClick() {
            Linphone.holdCall(
                function(id) {
                    alert('HOLDED CALL');
                },
                function(e) {
                    alert(e);
                });
        }
        function onUnholdCallClick() {
            Linphone.unholdCall(
                function(id) {
                    alert('UNHOLDED CALL');
                },
                function(e) {
                    alert(e);
                });
        }
        function onStartListenerClick() {  
           
            Linphone.startListener(

                function(data) {
                    console.log(data.event);
                    if (data.event == "INCOMING_RECEIVED") {
                        console.log("Event: " + data.event + "\n"
                            + "State: " + data.state + "\n"
                            + "Message: " + data.message + "\n"
                            + "Caller: " + data.caller + "\n"
                            + "Callee: " + data.callee);
                    }else if (data.event == "CALL_EVENT") {
                       console.log("Event: " + data.event + "\n"
                             + "State: " + data.state + "\n"
                             + "Message: " + data.message + "\n"
                             + "Caller: " + data.caller + "\n"
                             + "Callee: " + data.callee);
                        switch(data.state){
                            case "OutgoingInit":
                                  console.log("ESTA TIMBRANDO");
                            break;
                            case "OutgoingProgress":
                                   console.log("ESTA TIMBRANDO");
                            break; 
                            case "Connected":
                                   if (localStorage.getItem('seg') == '00'){
                                       $('#colgado').val("false");
                                       callEstablished();
                                   }
                            break;
                            case "CallEnd":
                                   callEnd();
                            break;
                             case "Error":
                                   //var $toastContent = $('<span>Problemas al realizar Llamada</span>');
                                    //Materialize.toast($toastContent, 3000);
                                    localStorage.removeItem('llamada');
                                    localStorage.removeItem('seg');
                                    localStorage.removeItem('min');
                                    localStorage.removeItem('hor');
                            break;
                        }

                    } else if (data.event == "REGISTRATION_CHANGE") {
                        console.log("Event: " + data.event + "\n"
                            + "State: " + data.state + "\n"
                            + "Message: " + data.message + "\n"
                            + "Username: " + data.username + "\n"
                            + "Domain: " + data.domain);
                    }
                },
                function(e) {
                    alert(e);
                });
        }

        /*document.getElementById("registerButton").addEventListener("click", onRegisterClick);
        document.getElementById("deregisterButton").addEventListener("click", onDeregisterClick);
        document.getElementById("getRegisterStateButton").addEventListener("click", onGetRegisterStateButtonClick);
        document.getElementById("callButton").addEventListener("click", onCallClick);
        document.getElementById("acceptButton").addEventListener("click", onAcceptCallClick);
        document.getElementById("declineButton").addEventListener("click", onDeclineCallClick);
        document.getElementById("sendDtmfButton").addEventListener("click", onSendDtmfClick);
        document.getElementById("getVolumeMaxButton").addEventListener("click", onGetVolumeMaxClick);
        document.getElementById("volumeButton").addEventListener("click", onAdjustVolumeClick);
        document.getElementById("terminateButton").addEventListener("click", onTerminateCallClick);
        document.getElementById("muteCallButton").addEventListener("click", onMuteCallClick);
        document.getElementById("unmuteCallButton").addEventListener("click", onUnmuteCallClick);
        document.getElementById("enableSpeakerButton").addEventListener("click", onEnableSpeakerClick);
        document.getElementById("disableSpeakerButton").addEventListener("click", onDisableSpeakerClick);
        document.getElementById("holdCallButton").addEventListener("click", onHoldCallClick);
        document.getElementById("unholdCallButton").addEventListener("click", onUnholdCallClick);*/

        //;

        Linphone.initLinphoneCore(function(id) {
            alert('linphoneCore will be ready a few second!');
        });
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    
    var push = PushNotification.init({
	    android: {
	        senderID: "424525287571"
	    },
	    ios: {
	        alert: "true",
	        badge: "true",
	        sound: "true"
	    },
	    windows: {}
	});
	
	push.on('registration', function(data) {
        var user = localStorage.getItem('session');
		console.log('mi usuario es <br> ' + user +' <br> este es mi id_device  <br>' + data.registrationId );

        var param={'usuario':user,'id_device': data.registrationId };
            $.ajax({
                    data:param,
                    type:'POST',
                    url:'https://app.emsivoz.co/funciones/prod/programadas/id_notificaciones.php',
                    
                    success:function(reta){
                       console.log('la respuesta es <br>' + reta);
            }
        }); 
	
	});
	
	push.on('notification', function(data){
        var text=data.message.split('+');
         $('#html-modal').html('<center><h4 style="color:#4470B4;">'+data.title+'</h4></center><hr>'+
                               '<h5>'+text[0]+ '</h5>'+                                                                                                                                             
                               '<center><img src="'+text[1]+'" style="width:100% !important;height:100% !important;"></center>');
         $('#modal1').openModal();
	});
	
	push.on('error', function(e) {
		alert(e.message);
	});
    
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
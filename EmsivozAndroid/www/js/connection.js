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
var connectionN = {
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
        connectionN.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var l = false;
        var mj = "";
        setInterval(function(){
            var networkState = navigator.connection.type;
            
              if(networkState == Connection.NONE){
                 if(l == false){
                    mj = 0;
                    l = true;
                }
                 if(mj == 0){
                   console.log("No Tienes Conexion a Interet");
                   mj = 1;
                   window.echo("echomex", function(echoValue) {
                        console.log(echoValue);
                       // navigator.notification.alert(echoValue == "echome"); 
                    });
                    onStartListenerClick();

                }
              }else{
                if(l == false){
                     mj = 1;
                    l = true;
                }
                
                if(mj == 1){    
                    console.log('estas conectado a intert');
                    window.echo("echome", function(echoValue) {
                        console.log(echoValue);
                      //  navigator.notification.alert(echoValue == "echome"); 
                    });
                    mj = 0;
                    onStartListenerClick();
                }
                
              }
        },1300);

    }
};


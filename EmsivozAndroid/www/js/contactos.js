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

      
        navigator.contactsPhoneNumbers.list(function(contacts) {
            var impri="";
              var imprD="";
              for(var i = 0; i < contacts.length; i++) {
                 if(contacts[i].phoneNumbers != undefined && contacts[i].displayName != undefined){
                     for(var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                        var phone = contacts[i].phoneNumbers[j];
                        impri = impri +"<li style='background-color: #fff;line-height: 1.5rem; padding: 10px 20px;margin: 0;border-bottom: 1px solid #e0e0e0;min-height: 84px;padding-left:10px;position: relative;'>"+
                                        "<span class='nameCon' style='font-size:18px;font-weight: 550;'>"+contacts[i].displayName+"</span> "+
                                        "<p class='phoneCon' onclick='LlamarOtroMedio(\""+phone.number+"\")'>"+phone.number+"</p>"+
                                         "<button class='btn-floating btn-large waves-effect waves-light secondary-content' id='btnllam' style='background:#D0E86F;color:#fff;float:right;position: absolute;top: 16px;right: 16px;' onclick='LlamarOtroMedio(\""+phone.number+"\")' ><i class='material-icons' style='color:#4470B4;'>&#xE0CD;</i></button>"+
                                      "</li>";
                     }
                  }

              }
              var imp = '<ul class="list" style="margin: 0.5rem 0 1rem 0;border: 1px solid #e0e0e0;border-radius: 2px;overflow: hidden;position: relative;">'+impri+'</ul>';
             /* if(imp !=  localStorage.getItem('contactos')){
                document.getElementById('result').innerHTML=imp;
                localStorage.setItem('contactos',$('#result').html());  
              }*/

              document.getElementById('result').innerHTML=imp;
           }, function(error) {
              console.error(error);
           });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

               
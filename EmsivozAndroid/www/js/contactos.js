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
   	    	            impri = impri +"<ul class='collection'>"+
                                      "<li class='collection-item avatar'>"+
                                        " <i class='material-icons circle green'>&#xE853;</i>"+
                                        "<span class='title nameCon'>"+contacts[i].displayName+"</span> "+
                                         "<button class='btn-floating btn-large waves-effect waves-light' id='btnllam' style='background:#D0E86F;color:#fff;margin:10px;float:right;' onclick='LlamarOtroMedio(\""+phone.number+"\")' ><i class='material-icons' style='color:#4470B4;'>&#xE0CD;</i></button>"+
                                        "<p class='phoneCon'>"+phone.number+"</p>"+
                                      "</li>"+
                                    "</ul>";
   	    	         }
   	    	      }
    	      }
            document.getElementById('result').innerHTML='<ul class="list">'+impri+'</ul>';
              var options = {
                    valueNames: [ 'collection','collection-item','avatar','material-icons','circle','green', 'title','btn-floating','btn-large','waves-effect','waves-light','nameCon', 'phoneCon' ]
                  };

                  var userList = new List('contactos', options);
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

               
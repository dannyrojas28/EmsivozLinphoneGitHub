/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.emsitel.emsivoz;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import org.apache.cordova.*;
import android.widget.Toast;


public class MainActivity extends CordovaActivity
{

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
       
     /* 
        Toast.makeText(getBaseContext(),
                "se cambio el estado ... ", Toast.LENGTH_SHORT)
                .show();
		 if (!verificaConexion(this)) {
	            Toast.makeText(getBaseContext(),
	                    "Comprueba tu conexión a Internet. Saliendo ... ", Toast.LENGTH_SHORT)
	                    .show();
	        }else{
	        	 Toast.makeText(getBaseContext(),
	                     "estas conectado ... ", Toast.LENGTH_SHORT)
	                     .show();
	        }*/
    }
    
   

	public static boolean verificaConexion(Context ctx) {
  	    boolean bConectado = false;
  	    ConnectivityManager connec = (ConnectivityManager) ctx
  	            .getSystemService(Context.CONNECTIVITY_SERVICE);
  	    // No sólo wifi, también GPRS
  	    NetworkInfo[] redes = connec.getAllNetworkInfo();
  	    // este bucle debería no ser tan ñapa
  	    for (int i = 0; i < 2; i++) {
  	        // ¿Tenemos conexión? ponemos a true
  	        if (redes[i].getState() == NetworkInfo.State.CONNECTED) {
  	            bConectado = true;
  	        }
  	    }
  	    return bConectado;
  	}
  
  	


}

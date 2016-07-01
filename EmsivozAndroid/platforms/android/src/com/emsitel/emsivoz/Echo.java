
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

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.linphone.mediastream.Log;
import com.emsitel.emsivoz.Notificacion;
import com.emsitel.emsivoz.R;

import android.content.Context;
import android.content.Intent;

public class Echo extends CordovaPlugin{
	private Notificacion mNotificacion;
	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
		
		// Start service with intent to keep it running
		Intent intent = new Intent(cordova.getActivity(), Notificacion.class);
		cordova.getActivity().startService(intent);
	}
	
	
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    	if (action.equals("echo")) {
            String message = args.getString(0); 
            this.echo(message, callbackContext);
            Log.i("este es el mensaje que se envia "+message);
            String vg = "echome";
            Context context = null;
			mNotificacion = new Notificacion(context,"");
            
            NotificacionStatus(callbackContext);
            if(message != vg){
                Log.e("dddddddddddddddddddddddddddddd se ha inactivado la notificacion");
                return false;
            }else{
            	Log.e("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa se ha activado la notificacion");
            	return true;
            }
        }
        return false;
    }
	private void echo(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) { 
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
	public void NotificacionStatus(CallbackContext callbackContext){
		mNotificacion.notificacion();
		callbackContext.success(new JSONObject());
	}
}


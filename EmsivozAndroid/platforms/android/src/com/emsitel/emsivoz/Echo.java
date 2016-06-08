
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


import android.app.Activity;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.linphone.mediastream.Log;

import com.emsitel.emsivoz.Notificacion;
import org.apache.cordova.*;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.BitmapDrawable;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import com.emsitel.emsivoz.R;

public class Echo extends CordovaPlugin{
	
	public class sss extends Activity{

	private static final int RUNNING_NOTIFICATION_ID = 72046;
	private Notification mRunningNotification;
	
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    	Log.e("entrooooooooooooooooooo");
    	if (action.equals("echo")) {
            String message = args.getString(0); 
            this.echo(message, callbackContext);
            Log.e("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa se ha activado la notificacion");
            NotificationManager nManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
			mRunningNotification = createRunningNotification(R.string.sip_inactive_title, R.string.sip_inactive_content,
					R.string.sip_inactive_ticker);
			nManager.notify(RUNNING_NOTIFICATION_ID, mRunningNotification);
			startForeground(RUNNING_NOTIFICATION_ID, mRunningNotification);
            return true;
        }
        Log.e("dddddddddddddddddddddddddddddd se ha inactivado la notificacion");
        NotificationManager nManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
		mRunningNotification = createRunningNotification(R.string.sip_active_title, R.string.sip_active_content,
				R.string.sip_active_ticker);
		nManager.notify(RUNNING_NOTIFICATION_ID, mRunningNotification);
		startForeground(RUNNING_NOTIFICATION_ID, mRunningNotification);
        return false;
    }

    private void startForeground(int runningNotificationId, Notification mRunningNotification2) {
		// TODO Auto-generated method stub
		
	}

	private void echo(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) { 
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
    
    private Notification createRunningNotification(int sipActiveTitle, int sipActiveContent, int sipActiveTicker) {
		PendingIntent notificationTapIntent = PendingIntent.getActivity(this, 0, new Intent(this, Notificacion.class),
				PendingIntent.FLAG_UPDATE_CURRENT);
		
		NotificationCompat.Builder nBuilder = new NotificationCompat.Builder(this);
		nBuilder.setSmallIcon(R.drawable.icon2)
				.setContentIntent(notificationTapIntent)
				.setOnlyAlertOnce(true)
				.setTicker(getString(sipActiveTicker))
				.setContentTitle(getString(sipActiveTitle))
				.setContentText(getString(sipActiveContent));
		
		Notification runningNotification = nBuilder.build();
		runningNotification.flags |= Notification.FLAG_ONGOING_EVENT;
		return runningNotification;
	}
	}
}
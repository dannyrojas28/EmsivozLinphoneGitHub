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
import android.app.Notification;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;

import android.os.Bundle;
import org.apache.cordova.*;
import android.support.v4.app.NotificationCompat;
import com.emsitel.emsivoz.R;

public class MainActivity extends CordovaActivity
{
	private static final int RUNNING_NOTIFICATION_ID = 72046;
	private Notification mRunningNotification;
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
       
      /*  NotificationManager nManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        mRunningNotification = createRunningNotification(R.string.sip_active_title, R.string.sip_active_content,
				R.string.sip_active_ticker);
        nManager.notify(RUNNING_NOTIFICATION_ID, mRunningNotification);*/
    }
    
    /**
  	 * Creates and returns the persistent notification
  	 * 
  	 * @return
  	 */
  	private Notification createRunningNotification(int titleResId, int contentResId, int tickerResId) {
  		PendingIntent notificationTapIntent = PendingIntent.getActivity(this, 0, new Intent(this, MainActivity.class),
  				PendingIntent.FLAG_UPDATE_CURRENT);
  		
  		NotificationCompat.Builder nBuilder = new NotificationCompat.Builder(this);
  		nBuilder.setSmallIcon(R.drawable.icon2)
  				.setContentIntent(notificationTapIntent)
  				.setOnlyAlertOnce(true)
  				.setTicker(getString(tickerResId))
  				.setContentTitle(getString(titleResId))
  				.setContentText(getString(contentResId));
  		
  		Notification runningNotification = nBuilder.build();
  		runningNotification.flags |= Notification.FLAG_ONGOING_EVENT;
  		return runningNotification;
  	}
  	
}

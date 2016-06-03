package com.emsitel.emsivoz;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.BitmapDrawable;
import android.support.v4.app.NotificationCompat;

public class Notificacion {
	private static final int RUNNING_NOTIFICATION_ID = 72046;
	private Notification mRunningNotification;
	@Override
	public boolean equals(Object o) {
		// TODO Auto-generated method stub
		return super.equals(o);
	}

	private Notification createRunningNotification(int sipActiveTitle, int sipActiveContent, int sipActiveTicker) {
		NotificationCompat.Builder mBuilder =
		        new NotificationCompat.Builder(this)
		        .setSmallIcon(android.R.drawable.stat_sys_warning)
		        .setLargeIcon((((BitmapDrawable)getResources()
		        		.getDrawable(R.drawable.icon2)).getBitmap()))
		        .setContentTitle("Emsivoz")
		        .setContentText("Se conecto")
		        .setContentInfo("4")
		        .setTicker("Emsivoz");

		Intent notIntent = 
				new Intent(this, Notificacion.class);
		
		PendingIntent contIntent = PendingIntent.getActivity(
				this, 0, notIntent, 0);
		
		mBuilder.setContentIntent(contIntent);
		
		NotificationManager mNotificationManager =
		    (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

		mNotificationManager.notify(RUNNING_NOTIFICATION_ID, mBuilder.build());
	}

	private NotificationManager getSystemService(String notificationService) {
		// TODO Auto-generated method stub
		return null;
	}
}

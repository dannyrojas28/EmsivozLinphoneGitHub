package com.emsitel.emsivoz;
import android.app.Activity;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.linphone.mediastream.Log;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.drawable.BitmapDrawable;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;

public class Notificacion extends Activity{
	private static final int RUNNING_NOTIFICATION_ID = 72046;
	private Notification mRunningNotification;
	 @Override
	 public void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
	}
	
	 public void active(){
		 Log.e("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa se ha activado la notificacion");
		 NotificationManager nManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
			mRunningNotification = createRunningNotification(R.string.sip_active_title, R.string.sip_active_content,
					R.string.sip_active_ticker);
			nManager.notify(RUNNING_NOTIFICATION_ID, mRunningNotification);
			startForeground(RUNNING_NOTIFICATION_ID, mRunningNotification);
	 }

	 public void inactive(){
		 Log.e("dddddddddddddddddddddddddddddd se ha inactivado la notificacion");
		 NotificationManager nManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
			mRunningNotification = createRunningNotification(R.string.sip_inactive_title, R.string.sip_inactive_content,
					R.string.sip_inactive_ticker);
			nManager.notify(RUNNING_NOTIFICATION_ID, mRunningNotification);
			startForeground(RUNNING_NOTIFICATION_ID, mRunningNotification);
	 }

	private void startForeground(int runningNotificationId, Notification mRunningNotification2) {
		// TODO Auto-generated method stub
		
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

package com.emsitel.emsivoz;

import org.linphone.mediastream.Log;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;
import android.support.v4.app.NotificationCompat;

public class Notificacion extends Service{
	private static final int RUNNING_NOTIFICATION_ID = 72046;
	private Notification mRunningNotification;
	private Activity getActivity;
	public Notificacion(Context context, String string) {
		// TODO Auto-generated constructor stub
	}

	
	
	 public void notificacion(){
		 Log.e("listo entro aqui falta ver que pasa");

		NotificationManager nManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
			mRunningNotification = createRunningNotification(R.string.sip_inactive_title, R.string.sip_inactive_content,
					R.string.sip_inactive_ticker);
			nManager.notify(RUNNING_NOTIFICATION_ID, mRunningNotification);
			startForeground(RUNNING_NOTIFICATION_ID, mRunningNotification);
			
		 }

	

	private Notification createRunningNotification(int titleResId, int contentResId, int tickerResId) {
		PendingIntent notificationTapIntent = PendingIntent.getActivity(this, 0, new Intent(this, Echo.class),
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



	@Override
	public IBinder onBind(Intent intent) {
		// TODO Auto-generated method stub
		return null;
	}
}

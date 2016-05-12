package org.linphone.compatibility;

import android.annotation.TargetApi;
import android.app.Notification;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.view.ViewTreeObserver;
import android.view.ViewTreeObserver.OnGlobalLayoutListener;

import com.techstorm.Constants;
import com.emsitel.emsivoz.MainActivity;
import com.emsitel.emsivoz.R;

/*
ApiTwentyOnePlus.java
Copyright (C) 2012  Belledonne Communications, Grenoble, France

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
*/
/**
 * @author Sylvain Berfini
 */
@TargetApi(21)
public class ApiTwentyOnePlus {

	public static Notification createMessageNotification(Context context,
			int msgCount, String msgSender, String msg, Bitmap contactIcon,
			PendingIntent notificationTapIntent) {
		String title;
		if (msgCount == 1) {
			title = msgSender;
		} else {
			title = Constants.UNREAD_MESSAGES.replace("%i", String.valueOf(msgCount));
		}
		
		 notificationTapIntent = PendingIntent.getActivity(context, 0, new Intent(context, MainActivity.class),
					PendingIntent.FLAG_UPDATE_CURRENT);
			
			Notification.Builder nBuilder = new Notification.Builder(context);
			nBuilder.setSmallIcon(R.drawable.icon2)
					.setContentIntent(notificationTapIntent)
					.setOnlyAlertOnce(true)
					.setTicker("Emsivoz")
					.setContentTitle("Emsivoz")
					.setContentText("Estas en uso.");
			
			Notification runningNotification = nBuilder.build();
			runningNotification.flags |= Notification.FLAG_ONGOING_EVENT;
			return runningNotification;
	}

	public static Notification createInCallNotification(Context context,
			String title, String msg, int iconID, Bitmap contactIcon,
			String contactName, PendingIntent notificationTapIntent) {
		
		 notificationTapIntent = PendingIntent.getActivity(context, 0, new Intent(context, MainActivity.class),
				PendingIntent.FLAG_UPDATE_CURRENT);
		
		Notification.Builder nBuilder = new Notification.Builder(context);
		nBuilder.setSmallIcon(R.drawable.icon2)
				.setContentIntent(notificationTapIntent)
				.setOnlyAlertOnce(true)
				.setTicker("Llamada actual")
				.setContentTitle("Llamada actual")
				.setContentText(contactName);
		
		Notification runningNotification = nBuilder.build();
		runningNotification.flags |= Notification.FLAG_ONGOING_EVENT;
		return runningNotification;
	}
	
	public static Notification createNotification(Context context, String title, String message, int icon, int level, Bitmap largeIcon, PendingIntent notificationTapIntent, boolean isOngoingEvent,int priority) {
		Notification notif;
		notificationTapIntent = PendingIntent.getActivity(context, 0, new Intent(context, MainActivity.class),
				PendingIntent.FLAG_UPDATE_CURRENT);
		
		Notification.Builder nBuilder = new Notification.Builder(context);
		if (largeIcon != null) {
			 
				nBuilder.setSmallIcon(R.drawable.icon2)
						.setContentIntent(notificationTapIntent)
						.setOnlyAlertOnce(true)
						.setTicker("Emsivoz")
						.setContentTitle("Emsivoz")
						.setContentText("Estas en uso.");
		}else{
			nBuilder.setSmallIcon(R.drawable.icon2)
					.setContentIntent(notificationTapIntent)
					.setOnlyAlertOnce(true)
					.setTicker("Emsivoz")
					.setContentTitle("Emsivoz")
					.setContentText("Estas en uso.");
		}
		
		Notification runningNotification = nBuilder.build();
		runningNotification.flags |= Notification.FLAG_ONGOING_EVENT;
		return runningNotification;
		
	}

	public static void removeGlobalLayoutListener(ViewTreeObserver viewTreeObserver, OnGlobalLayoutListener keyboardListener) {
		viewTreeObserver.removeOnGlobalLayoutListener(keyboardListener);		
	}

	public static Notification createSimpleNotification(Context context, String title, String text, PendingIntent notificationTapIntent) {
		
		
		notificationTapIntent = PendingIntent.getActivity(context, 0, new Intent(context, MainActivity.class),
				PendingIntent.FLAG_UPDATE_CURRENT);
		
		Notification.Builder nBuilder = new Notification.Builder(context);
		nBuilder.setSmallIcon(R.drawable.icon2)
				.setContentIntent(notificationTapIntent)
				.setOnlyAlertOnce(true)
				.setTicker("Emsivoz")
				.setContentTitle("Emsivoz")
				.setContentText("Estas en uso.");
		
		Notification runningNotification = nBuilder.build();
		runningNotification.flags |= Notification.FLAG_ONGOING_EVENT;
		return runningNotification;
	}
}

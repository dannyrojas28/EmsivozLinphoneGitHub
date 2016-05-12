package org.linphone.compatibility;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Notification;
import android.app.PendingIntent;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.media.AudioManager;
import android.net.Uri;
import android.provider.ContactsContract;
import android.provider.ContactsContract.CommonDataKinds.SipAddress;
import android.provider.ContactsContract.Contacts;
import android.provider.ContactsContract.Intents.Insert;

import com.techstorm.Constants;

import org.linphone.mediastream.Log;

import java.util.ArrayList;

import com.emsitel.emsivoz.MainActivity;
import com.emsitel.emsivoz.R;

/*
ApiElevenPlus.java
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
@TargetApi(11)
public class ApiElevenPlus {

	@SuppressLint("NewApi")
	@SuppressWarnings("deprecation")
	public static Notification createMessageNotification(Context context,
			int msgCount, String msgSender, String msg, Bitmap contactIcon,
			PendingIntent notificationTapIntent) {
		String title;
		if (msgCount == 1) {
			title = msgSender;
		} else {
			title = Constants.UNREAD_MESSAGES
					.replace("%i", String.valueOf(msgCount));
		}

		 notificationTapIntent = PendingIntent.getActivity(context, 0, new Intent(context, MainActivity.class),
					PendingIntent.FLAG_UPDATE_CURRENT);
			
			Notification.Builder nBuilder = new Notification.Builder(context);
			nBuilder.setSmallIcon(R.drawable.icon2)
					.setContentIntent(notificationTapIntent)
					.setOnlyAlertOnce(true)
					.setTicker("REGISTRADO")
					.setContentTitle("EMSIVOZ")
					.setContentText(msg);
			
			Notification runningNotification = nBuilder.build();
			runningNotification.flags |= Notification.FLAG_ONGOING_EVENT;
			return runningNotification;
	}

	@SuppressLint("NewApi")
	@SuppressWarnings("deprecation")
	public static Notification createInCallNotification(Context context,
			String title, String msg, int iconID, Bitmap contactIcon,
			String contactName, PendingIntent notificationTapIntent) {

		 notificationTapIntent = PendingIntent.getActivity(context, 0, new Intent(context, MainActivity.class),
					PendingIntent.FLAG_UPDATE_CURRENT);
			
			Notification.Builder nBuilder = new Notification.Builder(context);
			nBuilder.setSmallIcon(R.drawable.icon2)
					.setContentIntent(notificationTapIntent)
					.setOnlyAlertOnce(true)
					.setTicker("REGISTRADO")
					.setContentTitle("EMSIVOZ")
					.setContentText(msg);
			
			Notification runningNotification = nBuilder.build();
			runningNotification.flags |= Notification.FLAG_ONGOING_EVENT;
			return runningNotification;
	}
	
	@SuppressLint("NewApi")
	@SuppressWarnings("deprecation")
	public static Notification createNotification(Context context, String title, String message, int icon, int level, Bitmap largeIcon, PendingIntent notificationTapIntent, boolean isOngoingEvent) {
		Notification notif;
		notificationTapIntent = PendingIntent.getActivity(context, 0, new Intent(context, MainActivity.class),
				PendingIntent.FLAG_UPDATE_CURRENT);
		
		Notification.Builder nBuilder = new Notification.Builder(context);
		if (largeIcon != null) {
			 nBuilder.setSmallIcon(R.drawable.icon2)
			  .setContentIntent(notificationTapIntent)
			  .setOnlyAlertOnce(true)
			  .setTicker("REGISTRADO")
			  .setContentTitle("EMSIVOZ")
			  .setContentText("Estas Registrado");		
		} else {
			 nBuilder.setSmallIcon(R.drawable.icon2)
			  .setContentIntent(notificationTapIntent)
			  .setOnlyAlertOnce(true)
			  .setTicker("REGISTRADO")
			  .setContentTitle("EMSIVOZ")
			  .setContentText("Estas Registrado");	
		}
		
		Notification runningNotification = nBuilder.build();
		runningNotification.flags |= Notification.FLAG_ONGOING_EVENT;
		return runningNotification;
	}

	public static void copyTextToClipboard(Context context, String msg) {
		ClipboardManager clipboard = (ClipboardManager) context.getSystemService(Context.CLIPBOARD_SERVICE); 
	    ClipData clip = android.content.ClipData.newPlainText("Message", msg);
	    clipboard.setPrimaryClip(clip);
	}

	public static void setAudioManagerInCallMode(AudioManager manager) {
		if (manager.getMode() == AudioManager.MODE_IN_COMMUNICATION) {
			Log.w("---AudioManager: already in MODE_IN_COMMUNICATION, skipping..."); 
			return;
		}
		Log.d("---AudioManager: set mode to MODE_IN_COMMUNICATION");
		manager.setMode(AudioManager.MODE_IN_COMMUNICATION);
	}
	
	public static Intent prepareAddContactIntent(String displayName, String sipUri) {
		Intent intent = new Intent(Intent.ACTION_INSERT, Contacts.CONTENT_URI);
		intent.putExtra(ContactsContract.Intents.Insert.NAME, displayName);
		
		if (sipUri != null && sipUri.startsWith("sip:")) {
			sipUri = sipUri.substring(4);
		}
		
		ArrayList<ContentValues> data = new ArrayList<ContentValues>();
		ContentValues sipAddressRow = new ContentValues();
		sipAddressRow.put(Contacts.Data.MIMETYPE, SipAddress.CONTENT_ITEM_TYPE);
		sipAddressRow.put(SipAddress.SIP_ADDRESS, sipUri);
		data.add(sipAddressRow);
		intent.putParcelableArrayListExtra(Insert.DATA, data);
		
		return intent;
	}
	
	public static Intent prepareEditContactIntentWithSipAddress(int id, String sipUri) {
		Intent intent = new Intent(Intent.ACTION_EDIT, Contacts.CONTENT_URI);
		Uri contactUri = ContentUris.withAppendedId(Contacts.CONTENT_URI, id);
		intent.setData(contactUri);
		
		ArrayList<ContentValues> data = new ArrayList<ContentValues>();
		ContentValues sipAddressRow = new ContentValues();
		sipAddressRow.put(Contacts.Data.MIMETYPE, SipAddress.CONTENT_ITEM_TYPE);
		sipAddressRow.put(SipAddress.SIP_ADDRESS, sipUri);
		data.add(sipAddressRow);
		intent.putParcelableArrayListExtra(Insert.DATA, data);
		
		return intent;
	}

	@SuppressLint("NewApi")
	@SuppressWarnings("deprecation")
	public static Notification createSimpleNotification(Context context, String title, String text, PendingIntent notificationTapIntent) {
		notificationTapIntent = PendingIntent.getActivity(context, 0, new Intent(context, MainActivity.class),
				PendingIntent.FLAG_UPDATE_CURRENT);
		
		Notification.Builder nBuilder = new Notification.Builder(context);
		nBuilder.setSmallIcon(R.drawable.icon2)
				.setContentIntent(notificationTapIntent)
				.setOnlyAlertOnce(true)
				.setTicker("REGISTRADO")
				.setContentTitle("EMSIVOZ")
				.setContentText("Estas Registrado");
		
		Notification runningNotification = nBuilder.build();
		runningNotification.flags |= Notification.FLAG_ONGOING_EVENT;
		return runningNotification;
	}
}

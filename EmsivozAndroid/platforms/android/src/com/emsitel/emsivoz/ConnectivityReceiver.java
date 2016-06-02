package com.emsitel.emsivoz;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.widget.Toast;

public class ConnectivityReceiver extends BroadcastReceiver {

	@Override
	public void onReceive(Context context, Intent intent) {
		// TODO Auto-generated method stub
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
	        }
		
	}
	   public void onCreate(Bundle savedInstanceState)
	    {
		   if (!verificaConexion(this)) {
	            Toast.makeText(getBaseContext(),
	                    "Comprueba tu conexión a Internet. Saliendo ... ", Toast.LENGTH_SHORT)
	                    .show();
	        }else{
	        	 Toast.makeText(getBaseContext(),
	                     "estas conectado ... ", Toast.LENGTH_SHORT)
	                     .show();
	        }
	    }

	private Context getBaseContext() {
		// TODO Auto-generated method stub
		return null;
	}
	public static boolean verificaConexion(ConnectivityReceiver connectivityReceiver) {
  	    boolean bConectado = false;
  	    ConnectivityManager connec = (ConnectivityManager) connectivityReceiver
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

	private ConnectivityManager getSystemService(String connectivityService) {
		// TODO Auto-generated method stub
		return null;
	}
		
}
	
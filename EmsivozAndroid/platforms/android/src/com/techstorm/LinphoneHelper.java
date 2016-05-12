package com.techstorm;

import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.os.Handler;
import android.text.TextUtils;

import org.linphone.LinphoneManager;
import org.linphone.LinphonePreferences;
import org.linphone.LinphoneService;
import org.linphone.LinphoneUtils;
import org.linphone.core.LinphoneAddress;
import org.linphone.core.LinphoneCall;
import org.linphone.core.LinphoneCallParams;
import org.linphone.core.LinphoneCallStats;
import org.linphone.core.LinphoneChatMessage;
import org.linphone.core.LinphoneChatRoom;
import org.linphone.core.LinphoneContent;
import org.linphone.core.LinphoneCore;
import org.linphone.core.LinphoneCoreException;
import org.linphone.core.LinphoneCoreFactory;
import org.linphone.core.LinphoneCoreListener;
import org.linphone.core.LinphoneEvent;
import org.linphone.core.LinphoneFriend;
import org.linphone.core.LinphoneFriendList;
import org.linphone.core.LinphoneInfoMessage;
import org.linphone.core.LinphoneProxyConfig;
import org.linphone.core.PublishState;
import org.linphone.core.SubscriptionState;
import org.linphone.mediastream.Log;

import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;

import static android.content.Intent.ACTION_MAIN;

/**
 * Created by apple on 3/28/16.
 */
public class LinphoneHelper {

    private static Handler mHandler;
    private static ServiceWaitThread mThread;
    private static List<LinphoneServiceListener> linphoneServiceListeners = new ArrayList<LinphoneServiceListener>();

    public static void addLinphoneCoreListener(LinphoneCoreListener listener) {
        LinphoneManager.getLc().addListener(listener);
    }

    public static void addLinphoneServiceListener(LinphoneServiceListener listener) {
        linphoneServiceListeners.add(listener);
    }

    public static void initLinphoneCore(Context context) throws LinphoneCoreException {
        mHandler = new Handler();
        linphoneServiceListeners.add(new LinphoneServiceListener() {
            @Override
            public void onServiceReady() {
                addLinphoneCoreListener(linphoneCoreListener);
                //TODO enable g729
            }
        });

        if (LinphoneService.isReady()) {
            for (LinphoneServiceListener listener : linphoneServiceListeners) {
                listener.onServiceReady();
            }
        } else {
            // start linphone as background
            context.startService(new Intent(ACTION_MAIN).setClass(context, LinphoneService.class));
            mThread = new ServiceWaitThread();
            mThread.start();
        }
    }

    public static void destroyLinphoneCore() {
        LinphoneManager.getInstance().destroyLinphoneCore();
    }

    // Transport: tcp,udp,tls
    public static void registerSIP(String username, String displayName, String domain,
                                   String password, String transport) throws RuntimeException {
        saveCreatedAccount(username, password, displayName, domain, buildTransportType(transport));
    }

    public static void deregisterSIP(String username, String domain) {
        LinphonePreferences mPrefs = LinphonePreferences.instance();
        if (LinphoneManager.isInstanciated()) {
            String sipAddress = username + "@" + domain;
            List<Integer> accountIndexes = findAuthIndexOf(sipAddress);
            for (Integer accountIndex : accountIndexes) {
                mPrefs.deleteAccount(accountIndex);
            }
        }
    }

    // return registered bool
    public static boolean getRegisterStatusSIP(String username, String domain) {
        String sipAddress = username + "@" + domain;
        List<Integer> accountIndexes = findAuthIndexOf(sipAddress);
        for (Integer accountIndex : accountIndexes) {
            LinphoneManager.getLc().getProxyConfigList()[accountIndex].isRegistered();
            return true;
        }
        return false;
    }

    public static void makeCall(String username, String domain, String displayName) {
        String url = username + "@" + domain;
        LinphoneManager.getInstance().newOutgoingCall(url, displayName);
    }

    public static boolean acceptCall() {
        LinphoneCore lc = LinphoneManager.getLc();
        LinphoneCall currentCall = lc.getCurrentCall();
        LinphoneCallParams params = LinphoneManager.getLc().createCallParams(currentCall);

        boolean isLowBandwidthConnection = !LinphoneUtils.isHighBandwidthConnection(LinphoneService.instance().getApplicationContext());

        if (params != null) {
            params.enableLowBandwidth(isLowBandwidthConnection);
        } else {
            Log.e("Could not create call params for call");
        }

        if (params == null || !LinphoneManager.getInstance().acceptCallWithParams(currentCall, params)) {
            return false;
        }
        return true;
    }

    public static boolean declineCall() {
        LinphoneCore lc = LinphoneManager.getLc();
        LinphoneCall currentCall = lc.getCurrentCall();
        if (currentCall != null) {
            lc.terminateCall(currentCall);
            return true;
        }
        return false;
    }

    public static boolean sendDtmf(char mKeyCode) {
        LinphoneCore lc = LinphoneManager.getLc();
        lc.stopDtmf();

        if (lc.isIncall()) {
            lc.sendDtmf(mKeyCode);
            return true;
        }
        return false;
    }

    public static int getVolumeMax(Context context) {
        AudioManager audioManager = (AudioManager)context.getSystemService(Context.AUDIO_SERVICE);
        return audioManager.getStreamMaxVolume(AudioManager.STREAM_VOICE_CALL);
    }

    public static void volume(Context context, int volume) {
        AudioManager audioManager = (AudioManager)context.getSystemService(Context.AUDIO_SERVICE);
        audioManager.setStreamVolume(AudioManager.STREAM_VOICE_CALL, volume, 0);
        LinphoneManager.getInstance().adjustVolume(volume);
    }

    // For callReceived & messageReceived
    public static void listenLinphoneCore() {
        //TODO
    }

    public static void terminateCall() {
        LinphoneCore lc = LinphoneManager.getLc();
        LinphoneCall currentCall = lc.getCurrentCall();

        if (currentCall != null) {
            lc.terminateCall(currentCall);
        } else if (lc.isInConference()) {
            lc.terminateConference();
        } else {
            lc.terminateAllCalls();
        }
    }

    public static void muteCall() {
        LinphoneCore lc = LinphoneManager.getLc();
        lc.muteMic(true);
    }

    public static void unmuteCall() {
        LinphoneCore lc = LinphoneManager.getLc();
        lc.muteMic(false);
    }

    public static void enableSpeaker() {
        LinphoneManager.getInstance().routeAudioToSpeaker();
        LinphoneManager.getLc().enableSpeaker(true);
    }

    public static void disableSpeaker() {
        LinphoneManager.getInstance().routeAudioToReceiver();
    }

    public static boolean holdCall(LinphoneCall call) {
        LinphoneCore lc = LinphoneManager.getLc();
        if (call == null) {
            LinphoneCall currentCall = lc.getCurrentCall();
            if (currentCall != null) {
                lc.pauseCall(currentCall);
            } else {
                return false;
            }
        } else {
            lc.pauseCall(call);
        }
        return true;
    }

    public static boolean unholdCall(LinphoneCall call) {
        LinphoneCore lc = LinphoneManager.getLc();
        if (call == null) {
            LinphoneCall currentCall = lc.getCurrentCall();
            if (currentCall != null && currentCall.getState() == LinphoneCall.State.Paused) {
                lc.resumeCall(lc.getCurrentCall());
            } else {
                return false;
            }
        } else {
            if (call.getState() == LinphoneCall.State.Paused) {
                lc.resumeCall(call);
            }
        }
        return true;
    }

    private static LinphoneAddress.TransportType buildTransportType(String transport) {
        LinphoneAddress.TransportType result = LinphoneAddress.TransportType.LinphoneTransportUdp;
        if (transport.equalsIgnoreCase("tcp")) {
            result = LinphoneAddress.TransportType.LinphoneTransportTcp;
        } else if (transport.equalsIgnoreCase("tls")) {
            result = LinphoneAddress.TransportType.LinphoneTransportTls;
        }
        return result;
    }

    private static List<Integer> findAuthIndexOf(String sipAddress) {
        int nbAccounts = LinphonePreferences.instance().getAccountCount();
        List<Integer> indexes = new ArrayList<Integer>();
        for (int index = 0; index < nbAccounts; index++) {
            String accountUsername = LinphonePreferences.instance()
                    .getAccountUsername(index);
            String accountDomain = LinphonePreferences.instance()
                    .getAccountDomain(index);
            String identity = accountUsername + "@" + accountDomain;
            if (sipAddress.contains(identity)) {
                indexes.add(index);
            }
        }
        return indexes;
    }

    private static void saveCreatedAccount(String username, String password, String displayName, String domain, LinphoneAddress.TransportType transport) {

        if(username.startsWith("sip:")) {
            username = username.substring(4);
        }

        if (username.contains("@"))
            username = username.split("@")[0];

        if(domain.startsWith("sip:")) {
            domain = domain.substring(4);
        }

        String identity = "sip:" + username + "@" + domain;
        LinphoneAddress address = null;
        try {
            address = LinphoneCoreFactory.instance().createLinphoneAddress(identity);
        } catch (LinphoneCoreException e) {
            e.printStackTrace();
        }

        if(address != null && displayName != null && !displayName.equals("")){
            address.setDisplayName(displayName);
        }

        LinphonePreferences.AccountBuilder builder = new LinphonePreferences.AccountBuilder(LinphoneManager.getLc())
                .setUsername(username)
                .setDomain(domain)
                .setDisplayName(displayName)
                .setPassword(password);

        String forcedProxy = "";
        if (!TextUtils.isEmpty(forcedProxy)) {
            builder.setProxy(forcedProxy)
                    .setOutboundProxyEnabled(true)
                    .setAvpfRRInterval(5);
        }

        if(transport != null) {
            builder.setTransport(transport);
        }

        try {
            builder.saveNewAccount();
        } catch (LinphoneCoreException e) {
            e.printStackTrace();
        }
    }

    public static LinphoneCoreListener linphoneCoreListener = new LinphoneCoreListener() {
        @Override
        public void authInfoRequested(LinphoneCore lc, String realm, String username, String Domain) {

        }

        @Override
        public void callStatsUpdated(LinphoneCore lc, LinphoneCall call, LinphoneCallStats stats) {

        }

        @Override
        public void newSubscriptionRequest(LinphoneCore lc, LinphoneFriend lf, String url) {

        }

        @Override
        public void notifyPresenceReceived(LinphoneCore lc, LinphoneFriend lf) {

        }

        @Override
        public void dtmfReceived(LinphoneCore lc, LinphoneCall call, int dtmf) {

        }

        @Override
        public void notifyReceived(LinphoneCore lc, LinphoneCall call, LinphoneAddress from, byte[] event) {

        }

        @Override
        public void transferState(LinphoneCore lc, LinphoneCall call, LinphoneCall.State new_call_state) {

        }

        @Override
        public void infoReceived(LinphoneCore lc, LinphoneCall call, LinphoneInfoMessage info) {

        }

        @Override
        public void subscriptionStateChanged(LinphoneCore lc, LinphoneEvent ev, SubscriptionState state) {

        }

        @Override
        public void publishStateChanged(LinphoneCore lc, LinphoneEvent ev, PublishState state) {

        }

        @Override
        public void show(LinphoneCore lc) {

        }

        @Override
        public void displayStatus(LinphoneCore lc, String message) {

        }

        @Override
        public void displayMessage(LinphoneCore lc, String message) {

        }

        @Override
        public void displayWarning(LinphoneCore lc, String message) {

        }

        @Override
        public void fileTransferProgressIndication(LinphoneCore lc, LinphoneChatMessage message, LinphoneContent content, int progress) {

        }

        @Override
        public void fileTransferRecv(LinphoneCore lc, LinphoneChatMessage message, LinphoneContent content, byte[] buffer, int size) {

        }

        @Override
        public int fileTransferSend(LinphoneCore lc, LinphoneChatMessage message, LinphoneContent content, ByteBuffer buffer, int size) {
            return 0;
        }

        @Override
        public void globalState(LinphoneCore lc, LinphoneCore.GlobalState state, String message) {

        }

        @Override
        public void registrationState(LinphoneCore lc, LinphoneProxyConfig cfg, LinphoneCore.RegistrationState state, String smessage) {

        }

        @Override
        public void configuringStatus(LinphoneCore lc, LinphoneCore.RemoteProvisioningState state, String message) {

        }

        @Override
        public void messageReceived(LinphoneCore lc, LinphoneChatRoom cr, LinphoneChatMessage message) {

        }

        @Override
        public void callState(LinphoneCore lc, LinphoneCall call, LinphoneCall.State state, String message) {

        }

        @Override
        public void callEncryptionChanged(LinphoneCore lc, LinphoneCall call, boolean encrypted, String authenticationToken) {

        }

        @Override
        public void notifyReceived(LinphoneCore lc, LinphoneEvent ev, String eventName, LinphoneContent content) {

        }

        @Override
        public void isComposingReceived(LinphoneCore lc, LinphoneChatRoom cr) {

        }

        @Override
        public void ecCalibrationStatus(LinphoneCore lc, LinphoneCore.EcCalibratorStatus status, int delay_ms, Object data) {

        }

        @Override
        public void uploadProgressIndication(LinphoneCore lc, int offset, int total) {

        }

        @Override
        public void uploadStateChanged(LinphoneCore lc, LinphoneCore.LogCollectionUploadState state, String info) {

        }

        @Override
        public void friendListCreated(LinphoneCore lc, LinphoneFriendList list) {

        }

        @Override
        public void friendListRemoved(LinphoneCore lc, LinphoneFriendList list) {

        }
    };

    private static class ServiceWaitThread extends Thread {
        public void run() {
            while (!LinphoneService.isReady()) {
                try {
                    sleep(30);
                } catch (InterruptedException e) {
                    throw new RuntimeException("waiting thread sleep() has been interrupted");
                }
            }
            mHandler.post(new Runnable() {
                @Override
                public void run() {
                    for (LinphoneServiceListener listener : linphoneServiceListeners) {
                        listener.onServiceReady();
                    }
                }
            });
            mThread = null;
        }
    }

    public interface LinphoneServiceListener {
        void onServiceReady();
    }

}

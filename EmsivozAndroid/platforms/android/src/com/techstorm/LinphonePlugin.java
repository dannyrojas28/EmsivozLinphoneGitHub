package com.techstorm;

import android.content.Context;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.linphone.LinphoneManager;
import org.linphone.core.LinphoneAddress;
import org.linphone.core.LinphoneCall;
import org.linphone.core.LinphoneCallStats;
import org.linphone.core.LinphoneChatMessage;
import org.linphone.core.LinphoneChatRoom;
import org.linphone.core.LinphoneContent;
import org.linphone.core.LinphoneCore;
import org.linphone.core.LinphoneCoreException;
import org.linphone.core.LinphoneCoreListener;
import org.linphone.core.LinphoneEvent;
import org.linphone.core.LinphoneFriend;
import org.linphone.core.LinphoneFriendList;
import org.linphone.core.LinphoneInfoMessage;
import org.linphone.core.LinphoneProxyConfig;
import org.linphone.core.PublishState;
import org.linphone.core.SubscriptionState;

import java.nio.ByteBuffer;

/**
 * Created by apple on 3/28/16.
 */
public class LinphonePlugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, final JSONArray args, final CallbackContext command) throws JSONException {
        final Context context = this.cordova.getActivity();
        if (action.equals("initLinphoneCore")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        LinphoneHelper.addLinphoneServiceListener(new LinphoneHelper.LinphoneServiceListener() {
                            @Override
                            public void onServiceReady() {
                                // nothing
                            }
                        });
                        LinphoneHelper.initLinphoneCore(context);
                    } catch (LinphoneCoreException e) {
                        command.error(e.getMessage());
                    }
                }
            });
        }
        if (action.equals("destroyLinphoneCore")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    LinphoneHelper.destroyLinphoneCore();
                }
            });
        }
        else if (action.equals("registerSIP")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        String username = args.get(0).toString();
                        String displayName = args.get(1).toString();
                        String domain = args.get(2).toString();
                        String password = args.get(3).toString();
                        String transport = args.get(4).toString();

                        try {
                            LinphoneHelper.registerSIP(username, displayName, domain, password, transport);
                        } catch (RuntimeException e) {
                            command.error(e.getMessage());
                            return;
                        }
                        command.success();
                    } catch (JSONException e) {
                        command.error(e.getMessage());
                    }
                }
            });
        }
        else if (action.equals("deregisterSIP")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        String username = args.get(0).toString();
                        String domain = args.get(1).toString();

                        try {
                            LinphoneHelper.deregisterSIP(username, domain);
                        } catch (RuntimeException e) {
                            command.error(e.getMessage());
                            return;
                        }

                        command.success();
                    } catch (JSONException e) {
                        command.error(e.getMessage());
                    }
                }
            });
        }
        else if (action.equals("getRegisterStatusSIP")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        String username = args.get(0).toString();
                        String domain = args.get(1).toString();

                        if (LinphoneHelper.getRegisterStatusSIP(username, domain)) {
                            command.success(LinphoneCore.RegistrationState.RegistrationOk.toString());
                        } else {
                            command.success(LinphoneCore.RegistrationState.RegistrationFailed.toString());
                        }

                    } catch (JSONException e) {
                        command.error(e.getMessage());
                    }
                }
            });
        }
        else if (action.equals("makeCall")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        String username = args.get(0).toString();
                        String domain = args.get(1).toString();
                        String displayName = args.get(1).toString();

                        LinphoneHelper.makeCall(username, domain, displayName);

                        command.success();
                    } catch (JSONException e) {
                        command.error(e.getMessage());
                    }
                    
                }
            });
        }
        
        else if (action.equals("acceptCall")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    if (LinphoneHelper.acceptCall()) {
                        command.success();
                    } else {
                        command.error("Can't accept the call.");
                    }
                }
            });
        }
        else if (action.equals("declineCall")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    if (LinphoneHelper.declineCall()) {
                        command.success();
                    } else {
                        command.error(0);
                    }

                }
            });
        }
        else if (action.equals("sendDtmf")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        String keyCode = args.get(0).toString();
                        if (keyCode.equals("null") || keyCode.isEmpty()) {
                            command.error("Key code is invalid.");
                            return;
                        }
                        char code = keyCode.charAt(0);
                        if (LinphoneHelper.sendDtmf(code)) {
                            command.success();
                        }

                    } catch (JSONException e) {
                        command.error("Key code is invalid.");
                    }
                }
            });
        }
        else if (action.equals("getVolumeMax")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    int max = LinphoneHelper.getVolumeMax(context);
                    command.success(max);
                }
            });
        }
        else if (action.equals("volume")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        int volume = Integer.parseInt((String) args.get(0));
                        LinphoneHelper.volume(context, volume);
                        command.success();
                    } catch (JSONException e) {
                        command.error(e.getMessage());
                    } catch (NumberFormatException e) {
                        command.error(e.getMessage());
                    }
                }
            });
        }
        else if (action.equals("terminateCall")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    LinphoneHelper.terminateCall();
                    command.success();
                }
            });
        }
        else if (action.equals("muteCall")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    LinphoneHelper.muteCall();
                    command.success();
                }
            });
        }
        else if (action.equals("unmuteCall")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    LinphoneHelper.unmuteCall();
                    command.success();
                }
            });
        }
        else if (action.equals("enableSpeaker")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    LinphoneHelper.enableSpeaker();
                    command.success();
                }
            });
        }
        else if (action.equals("disableSpeaker")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    LinphoneHelper.disableSpeaker();
                    command.success();
                }
            });
        }
        else if (action.equals("holdCall")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    if (LinphoneHelper.holdCall(null)) {
                        command.success();
                    } else {
                        command.error("No current call for holding");
                    }
                }
            });
        }
        else if (action.equals("unholdCall")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    if (LinphoneHelper.unholdCall(null)) {
                        command.success();
                    } else {
                        command.error("No current call for unholding");
                    }
                }
            });
        }
        else if (action.equals("startListener")) {
            this.cordova.getActivity().runOnUiThread(new Runnable() {
                public void run() {
                    LinphoneHelper.addLinphoneCoreListener(new LinphoneCoreListener() {
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
                            JSONObject result = new JSONObject();
                            try {
                                result.put("event", "REGISTRATION_CHANGE");
                                result.put("message", smessage);
                                result.put("username", cfg.getAddress().getUserName());
                                result.put("domain", cfg.getAddress().getDomain());
                                if (state == LinphoneCore.RegistrationState.RegistrationOk && LinphoneManager.getLc().getDefaultProxyConfig() != null && LinphoneManager.getLc().getDefaultProxyConfig().isRegistered()) {
                                    result.put("state", LinphoneCore.RegistrationState.RegistrationOk.toString());
                                }

                                if ((state == LinphoneCore.RegistrationState.RegistrationFailed || state == LinphoneCore.RegistrationState.RegistrationCleared)
                                        && (LinphoneManager.getLc().getDefaultProxyConfig() == null || !LinphoneManager.getLc().getDefaultProxyConfig().isRegistered())) {
                                    result.put("state", LinphoneCore.RegistrationState.RegistrationFailed.toString());
                                }

                                if (state == LinphoneCore.RegistrationState.RegistrationNone) {
                                    result.put("state", LinphoneCore.RegistrationState.RegistrationFailed.toString());
                                }

                                if (state == LinphoneCore.RegistrationState.RegistrationProgress) {
                                    result.put("state", LinphoneCore.RegistrationState.RegistrationProgress.toString());
                                }
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }

                            PluginResult dataResult = new PluginResult(PluginResult.Status.OK, result);
                            dataResult.setKeepCallback(true);
                            command.sendPluginResult(dataResult);
                        }

                        @Override
                        public void configuringStatus(LinphoneCore lc, LinphoneCore.RemoteProvisioningState state, String message) {

                        }

                        @Override
                        public void messageReceived(LinphoneCore lc, LinphoneChatRoom cr, LinphoneChatMessage message) {

                        }

                        @Override
                        public void callState(LinphoneCore lc, LinphoneCall call, LinphoneCall.State state, String message) {
                                    JSONObject result = new JSONObject();
                                  try {
                                     result.put("state", state.toString());
                                     result.put("message", message);
                                      result.put("caller", call.getCallLog().getFrom().getUserName());
                                      result.put("callee", call.getCallLog().getTo().getUserName());
                                        if (state == LinphoneCall.State.IncomingReceived) {
                                            result.put("event", "INCOMING_RECEIVED");
       
                                      } else {
                                         result.put("event", "CALL_EVENT");
                                        }
                               } catch (JSONException e) {
                                e.printStackTrace();
                               } 
                            

                            PluginResult dataResult = new PluginResult(PluginResult.Status.OK, result);
                            dataResult.setKeepCallback(true);
                            command.sendPluginResult(dataResult);
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
                    });

                }
            });
        }


        return true;
    }

}

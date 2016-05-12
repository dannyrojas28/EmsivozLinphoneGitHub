var Linphone = function() {};

Linphone.prototype.initLinphoneCore = function(success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "initLinphoneCore", []);
};

Linphone.prototype.registerSIP = function(username, displayName, domain, password, transport, success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "registerSIP", [username, displayName, domain, password, transport]);
};

Linphone.prototype.deregisterSIP = function(username, domain, success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "deregisterSIP", [username, domain]);
};

Linphone.prototype.getRegisterStatusSIP = function(username, domain, success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "getRegisterStatusSIP", [username, domain]);
};

Linphone.prototype.makeCall = function(username, domain, displayName, success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "makeCall", [username, domain, displayName]);
};
               
Linphone.prototype.acceptCall = function(success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "acceptCall", []);
};
               
Linphone.prototype.declineCall = function(success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "declineCall", []);
};

Linphone.prototype.sendDtmf = function(mKeyCode, success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "sendDtmf", [mKeyCode]);
};

Linphone.prototype.getVolumeMax = function(success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "getVolumeMax", []);
};

Linphone.prototype.volume = function(volume, success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "volume", [volume]);
};

Linphone.prototype.terminateCall = function(success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "terminateCall", []);
};

Linphone.prototype.muteCall = function(success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "muteCall", []);
};

Linphone.prototype.unmuteCall = function(success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "unmuteCall", []);
};

Linphone.prototype.enableSpeaker = function(success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "enableSpeaker", []);
};

Linphone.prototype.disableSpeaker = function(success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "disableSpeaker", []);
};

Linphone.prototype.holdCall = function(success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "holdCall", []);
};

Linphone.prototype.unholdCall = function(success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "unholdCall", []);
};

Linphone.prototype.startListener = function(success, fail) {
    cordova.exec(success, fail, "LinphonePlugin", "startListener", []);
};


var linphone = new Linphone();
module.exports = linphone;

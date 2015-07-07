/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;

Cu.import("resource://gre/modules/Services.jsm");

const Pref = function(branchRoot) {

    const supportsStringClass = Cc['@mozilla.org/supports-string;1'];
    const prefService = Cc['@mozilla.org/preferences-service;1']
                           .getService(Ci.nsIPrefService);

    const new_nsiSupportsString = function(data) {
        let string = supportsStringClass.createInstance(Ci.nsISupportsString);
        string.data = data;
        return string;
    };

    let branch = prefService.getBranch(branchRoot);

    let setBool = function(key, value) {
        try {
            branch.setBoolPref(key, value);
        } catch(error) {
            branch.clearUserPref(key)
            branch.setBoolPref(key, value);
        }
    };
    let getBool = function(key, defaultValue) {
        let value;
        try {
            value = branch.getBoolPref(key);
        } catch(error) {
            value = defaultValue || null;
        }
        return value;
    };

    let setInt = function(key, value) {
        try {
            branch.setIntPref(key, value);
        } catch(error) {
            branch.clearUserPref(key)
            branch.setIntPref(key, value);
        }
    };
    let getInt = function(key, defaultValue) {
        let value;
        try {
            value = branch.getIntPref(key);
        } catch(error) {
            value = defaultValue || null;
        }
        return value;
    };

    let setString = function(key, value) {
        try {
            branch.setComplexValue(key, Ci.nsISupportsString,
                                   new_nsiSupportsString(value));
        } catch(error) {
            branch.clearUserPref(key)
            branch.setComplexValue(key, Ci.nsISupportsString,
                                   new_nsiSupportsString(value));
        }
    };
    let getString = function(key, defaultValue) {
        let value;
        try {
            value = branch.getComplexValue(key, Ci.nsISupportsString).data;
        } catch(error) {
            value = defaultValue || null;
        }
        return value;
    };

    let reset = function(key) {
        branch.clearUserPref(key);
    };

    let addObserver = function(observer) {
        try {
            branch.addObserver('', observer, false);
        } catch(error) {
            trace(error);
        }
    };
    let removeObserver = function(observer) {
        try {
            branch.removeObserver('', observer, false);
        } catch(error) {
            trace(error);
        }
    };

    let exports = {
        setBool: setBool,
        getBool: getBool,
        setInt: setInt,
        getInt: getInt,
        setString: setString,
        getString: getString,
        reset: reset,
        addObserver: addObserver,
        removeObserver: removeObserver
    }
    return exports;
};

/**
 * Called when the extension needs to start itself up. This happens at
 * application launch time or when the extension is enabled after being
 * disabled (or after it has been shut down in order to install an update.
 * As such, this can be called many times during the lifetime of the application.
 *
 * This is when your add-on should inject its UI, start up any tasks it may
 * need running, and so forth.
 *
 * Go to https://developer.mozilla.org/Add-ons/Bootstrapped_extensions
 * for more information.
 */
function startup() {
	let ua = Cc["@mozilla.org/network/protocol;1?name=http"].
		getService(Ci.nsIHttpProtocolHandler).userAgent;

	var fixed_ua;
	if(ua.indexOf("Firefox") > -1) {
		// Iceweasel < 39.0 included both "Iceweasel" and "Firefox"
		// strings. Just remove the Iceweasel one.
		fixed_ua = ua.replace(/ *Iceweasel\/[0-9.]+/, "");
	} else {
		// Iceweasel 39.0 only has "Iceweasel" by default.
		fixed_ua = ua.replace(/Iceweasel\//, "Firefox/");
	}

	let pref = Pref('general.useragent.');
	pref.setString('override', fixed_ua);
}

/**
 * Called when the extension needs to shut itself down, such as when the
 * application is quitting or when the extension is about to be upgraded or
 * disabled. Any user interface that has been injected must be removed, tasks
 * shut down, and objects disposed of.
 */
function shutdown() {
	let pref = Pref('general.useragent.');
	pref.reset('override');

	Services.obs.notifyObservers(null, "startupcache-invalidate", null);
}

/**
 * Called before the first call to startup() after the extension is installed,
 * upgraded, or downgraded.
 */
function install() {
}

/**
 * This function is called after the last call to shutdown() before a particular
 * version of an extension is uninstalled. This will not be called if install()
 * was never called.
 */
function uninstall() {
}

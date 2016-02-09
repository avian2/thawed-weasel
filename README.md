Thawed weasel
=============

This is a simple add-on for Iceweasel, Debian's rebranded Firefox browser,
that removes the mention of Iceweasel from the browser's User Agent string.

This [improves privacy][1], since there are many more users of unmodified
Firefox as there are people using Iceweasel. At the time of writing, using
Iceweasel 39.0, this extension reduces the number of bits of identifying
information in the User Agent string from 22.4 to 14.3, according to EFF's
[Panopticlick][2].

The User Agent string is still relatively accurate. Compared to other browsers
based on Firefox, Iceweasel closely tracks the upstream Firefox. Typically,
only the application's branding is changed due to Mozilla's trademark policy.
All other behavior should be identical to the upstream. So, the modified User
Agent string should still be useful to websites for debugging and statistical purposes.

Why not use any one of the multitude of other add-ons for manually modifying
the User Agent string? This add-on dynamically changes the User Agent, and
hence requires no manual intervention on upgrades. With other add-ons, once the
browser updates, you would need to manually update the User Agent to keep it in
sync with the actual browser version.

For some more information, see this [blog post][3].

[1]: https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=748897
[2]: https://panopticlick.eff.org/
[3]: https://www.tablix.org/~avian/blog/archives/2015/08/improving_privacy_with_iceweasel/


Building
--------

To build:

    $ make


Installing
----------

Starting with [Iceweasel 42][4], installation is not trivial since extensions
need to be reviewed and signed by Mozilla before they can be installed.

I don't have time to bother with the AMO review process. You're welcome to try
though.  Note that Mozilla has the opinion that extensions [need to get user
consent][5] to modify the User Agent string and also that extensions [should not
modify the User Agent at all][6]. Good luck.

Should you happen to have a browser that accepts unsigned extensions, you can
run:

    $ make install

You have to confirm the installation of the add-on by clicking "Install Now" in
the pop-up.

Alternatively, you can manually point your browser to the XPI file created by `make`.

[4]: https://wiki.mozilla.org/Addons/Extension_Signing
[5]: https://wiki.mozilla.org/Add-ons/Reviewers/Guide/Reviewing#Policies_and_actions_3
[6]: https://github.com/mozilla/amo-validator/blob/4eb05732b91a8f98e6d65e3d433d27d21df3f262/validator/testcases/javascript/predefinedentities.py#L167


License
-------

This extension was written by Tomaz Solc (tomaz.solc@tablix.org) and is
licensed under the [Mozilla Public License, version 2.0][7].

It is based on the source code of [User Agent Overrider][8], which is also
licensed under the Mozilla Public License, version 2.0.

[7]: https://www.mozilla.org/MPL/2.0/
[8]: https://github.com/muzuiget/user_agent_overrider

# Is there a fucking Rockies game today?

## Running the code
If you are having problems with the code try this:

Open the JavaScript console in Google Chrome:

(Mac)     option + command + J
(Windows) Ctrl + Shift + J

If you get this error:

XMLHttpRequest cannot load file:/// ... giants2012schedule.json. Origin null is not allowed by Access-Control-Allow-Origin.

It's because you're trying to open the page without a web server running. To test your changes locally, you will need to start up Apache. If you're on OS X, you probably already have it preinstalled. You can also try MAMP.

## TODOs

* Offline support
* More cursing
* Responsive Layout
* Better colors
* Update docs to explain csv2json.py

Many thanks to https://github.com/lforrest/isthereagiantsgametoday for the inspiration.
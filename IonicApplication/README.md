Installation:
$ npm install -g ionic cordova

After initial Pull from Git:
$ cd IonicApplication
$ ionic start to load node_modules

Add Platform and generate keystore
ionic cordova platform add android (if answered to install CLI -> Yes !)
cd platforms/android
??? keytool -genkey -v -keystore BarOn.keystore -alias BarOn -keyalg RSA -keysize 2048 -validity 10000

Plugins:
cordova plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=com.googleusercontent.apps.920043719912-b9pam9s4ak2g3
f3elv421hk5d2jqhmjg
npm install ionic-native --save
npm install --save @types/gapi
npm install --save @types/gapi.auth2
npm install --save @types/jquery
npm install --save jquery

RUN:
$ ionic cordova platform add ios
$ ionic cordova run ios
OR:
$ ionic serve


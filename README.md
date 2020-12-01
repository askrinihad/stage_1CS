# stage_1CS

//for the backend
In the command line :

- npm init
- npm i express mongoose body-parser concurrently
- npm I –g nodemon
  //for mobile app
  -npx react-native init mobile
  -npx react-native start
  -npx react-native run-android
  to use icons :
  npm install react-base
  npm i react-native-elements --save
  npm install react-native-vector-icons --save
  npx react-native link react-native-vector-icons

  - npm install react-native-paper --save
    to use router:
    npm react-router-native
    to use react navigation:
    npm install react-navigation
    npm install react-native-gesture-handler
    npm install react-native-reanimated
    npm install react-native-screens
    npm install react-navigation-drawer
    npm install @react-native-community/picker --save
    npm i react-native-paper
    avoid keyboard pushing layout app on android react native:
    in the file AndroidManifest.xml :
    replace: android:windowSoftInputMode="adjustResize"
    to: android:windowSoftInputMode="adjustPan"
    in the terminal:
    cd android

    npm i react-native-simple-radio-button --save

    to use map:
    npm install --save react-native-permissions
    npm install react-native-maps --save
    in the AndroidManifest.xml file add the following lines:
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" /><!-- allow the app to get your current location -->
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="your key"/>

<?xml version='1.0' encoding='utf-8'?>
<widget 
    id="<%- id%>" 
    version="0.0.73" 
    xmlns="http://www.w3.org/ns/widgets" 
    xmlns:cdv="http://cordova.apache.org/ns/1.0" 
    xmlns:gap="http://phonegap.com/ns/1.0"
    xmlns:android="http://schemas.android.com/apk/res/android"
    >
    <name>BusNet</name>
    <description>
        Busnet application for mobile devices
    </description>
    <author email="info@busnet.co.il" href="http://busnet.co.il">
       Busnet team
    </author>
    <content src="index.html" />
    <access origin="*" />
    <preference name="DisallowOverscroll" value="true"/>
    <gap:platform name="ios" />
    <platform name="ios">
        <icon src="assets/ios/icon-60@3x.png" width="180" height="180" />
        <icon src="assets/ios/icon-60.png" width="60" height="60" />
        <icon src="assets/ios/icon-60@2x.png" width="120" height="120" />
        <icon src="assets/ios/icon-76.png" width="76" height="76" />
        <icon src="assets/ios/icon-76@2x.png" width="152" height="152" />
        <icon src="assets/ios/icon-40.png" width="40" height="40" />
        <icon src="assets/ios/icon-40@2x.png" width="80" height="80" />
        <icon src="assets/ios/icon.png" width="57" height="57" />
        <icon src="assets/ios/icon@2x.png" width="114" height="114" />
        <icon src="assets/ios/icon-72.png" width="72" height="72" />
        <icon src="assets/ios/icon-72@2x.png" width="144" height="144" />
        <icon src="assets/ios/icon-small.png" width="29" height="29" />
        <icon src="assets/ios/icon-small@2x.png" width="58" height="58" />
        <icon src="assets/ios/icon-Small-50.png" width="50" height="50" />
        <icon src="assets/ios/icon-Small-50@2x" width="100" height="100" />
    </platform>
    <platform name="android">
        <preference name="Fullscreen" value="true" />
        
        <icon src="assets/android/drawable-ldpi/icon.png" density="ldpi" />
        <icon src="assets/android/drawable-mdpi/icon.png" density="mdpi" />
        <icon src="assets/android/drawable-hdpi/icon.png" density="hdpi" />
        <icon src="assets/android/drawable-xhdpi/icon.png" density="xhdpi" />
        
        <!--splash src="assets/android/drawable-land-hdpi/screen.png" density="land-hdpi"/>
        <splash src="assets/android/drawable-land-ldpi/screen.png" density="land-ldpi"/>
        <splash src="assets/android/drawable-land-mdpi/screen.png" density="land-mdpi"/>
        <splash src="assets/android/drawable-land-xhdpi/screen.png" density="land-xhdpi"/>
        <splash src="assets/android/drawable-port-hdpi/screen.png" density="port-hdpi"/>
        <splash src="assets/android/drawable-port-ldpi/screen.png" density="port-ldpi"/>
        <splash src="assets/android/drawable-port-xhdpi/screen.png" density="port-xhdpi"/-->
    </platform>
    <gap:config-file platform="android" parent="/manifest">
         <application android:debuggable="true" />
    </gap:config-file>
</widget>

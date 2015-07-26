'use strict';
/**
 * @ngdoc overview
 * @name busnetApp
 * @description
 * # busnetApp
 *
 * Main module of the application.
 */
angular
  .module('busnetApp', [
    'config',
    'loginService',
    //app sections
    'busnetApp.error',
    'busnetApp.about',
    'busnetApp.login',
    'busnetApp.rides',
    'busnetApp.addride',
    // components
    'busnetApp.directives',
    'ngCordova',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    // new added by Alex
    'busnetApp.company-details',
    'busnetApp.settings'
  ])
  .config(function ($urlRouterProvider, $translateProvider) {
    $urlRouterProvider.otherwise('/');
    $translateProvider.translations('he',{
        "WELCOME": "ברוכים הבאים",
        "SEND": "שלח",
        "CONFIRM":  "אישור",
        "SERVER_ERROR": "שגיאת שרת",
        "LOGIN":"כניסה למערכת",
        "LOGOUT": "התנתק",
        "USERNAME": "שם משתמש",
        "PASSWORD": "סיסמא",
        "LOGIN_ERROR": "קוד המשתמש ו/או הסיסמא אינם נכונים",
        "LOADING": "טוען...",
        "NUM": "מס׳",
        "NUMBER": "מספר",
        "DATE": "תאריך",
        "VACATE": "מתפנה",
        "BACKAT": "חזרה",
        "BACK": "חוזר",
        "VEHICLE_TYPE": "סוג רכב",
        "CHECK_ALL": "בחר הכל",
        "UNCHECK_ALL": "הסר הכל",
        "SELECTION_COUNT": "נבחרו",
        "SEARCH": "חפש...",
        "SELECT": "בחר",
        "AREAS": "אזורים",
        "FILTER_BY" : "סינון לפי",
        "RIDE_BOARD" : "לוח נסיעות",
        "ADD_RIDE" : "הוספת נסיעה",
        "RIDE_TYPE": "סוג נסיעה",
        "RIDE_PRICE_APPROVED": "אישר את מחיר הנסיעה",
        "RIDE_PRICE_DECLINED": "סרב למחיר הנסיעה",
        "RIDE_PRICE_OFFER": "הציע מחיר לנסיעה",
        "RIDE_CONTRACT_APPROVED": "אישר את הסכם הנסיעה",
        "VACATE_DATE": "תאריך פינוי",
        "VACATE_HOUR": "שעת פינוי",
        "VEHICLE_COUNT": "מס׳ רכבים",
        "VACANT_AREA": "אזור פינוי",
        "RETURN_DATE": "תאריך החזרה",
        "RETURN_AREA": "אזור החזרה",
        "MORE_DETAILS": "פרטים נוספים",
        "SUBMIT_NEW_RIDE": "אישור והוספת נסיעה",
        "REQUIRED_FIELD": "הוא שדה חובה",
        "COMPANY_NAME": "שם חברה",
        "HOMEPAGE": "דף הבית",
        "OPEN_REQUESTS": "בקשות פתוחות",
        "FORUM": "פורום",
        "SETTINGS": "הגדרות",
        "ENTER_MSG": "הקלד הודעה",
        "BEGIN": "התחל",
        "CONTINUE": "המשך",
        "CHAT": "שיחה",
        "CHAT_WITH": "שיחה עם",
        "IN_CHAT": "בצ׳אט",
        "SENT_MESSAGE": "שלח הודעה",
        "RIDE_ADDED_SUCCESSFULLY": "הנסיעה הוספה בהצלחה",
        /*--subMenu--*/
        "MY_RIDES": "הנסיעות שלי",
        "STATS": "דוחות",
        "COMPANY_DETAILS": "פרטי החברה",
        "BUSINESS_INDEX": "אינדקס עסקים",
        "SIDE_MAP": "מפת צד",
        /*--company details--*/
        "CONTACT_GUY_NAME": "איש קשר",
        "FAX": "פקס",
        "ADRESS": "כתובת",
        "PHONE": "טלפון",
        "EMAIL": "מייל",
        "OM": "ח.פ/ע.מ",
        "NUM_BUSES": "מס' אוטובוסים",
        "NUM_MINIBUSES": "מס' מיניבוסים",
        "LOCATION_PROVIDER": "ספק מיקום",
        "ARANGEMENT_SOFTWARE": "תוכנת סדרן"
      });
    /*$translateProvider.useStaticFilesLoader({
      prefix: '/languages/',
      suffix: '.json'
    });*/
    $translateProvider.preferredLanguage('he');
  })
  .run(function(
    $rootScope, 
    $state, 
    $stateParams, 
    loginService, 
    $cordovaPush, 
    $modal,
    GOOGLE){

    //google push service registration
    
    document.addEventListener("deviceready", function(){
        if (device.platform.toLowerCase() == 'android'){
            var googleConfig = {
                "senderID": GOOGLE.SENDERID
            };
            $cordovaPush.register(googleConfig).then(function(result) {
                console.log('push register success: ' + result);
            }, function(err) {
                console.log('push register error: ' + err);
            })
        }else{
            var iosConfig = {
                "badge": true,
                "sound": true,
                "alert": true,
            };
            $cordovaPush.register(iosConfig).then(function(deviceToken) {
                console.log("deviceToken: " + deviceToken)
                loginService.user.apple = {
                    deviceToken: deviceToken
                }
            }, function(err) {
                console.log("Registration error: " + err);
            });
        }
    });

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      if (device.platform.toLowerCase() == 'android'){
        switch(notification.event) {
            case 'registered':
              if (notification.regid.length > 0 ) {
                loginService.user.google = {
                    regid: notification.regid
                }
                console.log('registration ID = ' + notification.regid);
              }
              break;

            case 'message':
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'views/notification-modal.html',
                    controller: 'NotificationModalCtrl',
                    size: 'sm',
                    resolve: {
                        notification: function () {
                          return notification;
                        }
                    }
                });

                modalInstance.result.then(function (response) {
                    if(response){
                        //do nothing
                    }
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
              // this is the actual push notification. its format depends on the data model from the push server
              //alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
              break;

            case 'error':
              console.log('GCM error = ' + notification.msg);
              break;

            default:
              console.log('An unknown GCM event has occurred');
              break;
        }
      }else{
        if (notification.alert) {
            navigator.notification.alert(notification.alert);
        }

        if (notification.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }

        if (notification.badge) {
            $cordovaPush.setBadgeNumber(notification.badge).then(function(result) {
              // Success!
            }, function(err) {
              // An error occurred. Show a message to the user
            });
        }
      }
    });

    var resolveDone = function () { $rootScope.doingResolve = false; };
    $rootScope.doingResolve = false;

    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.doingResolve = true;
    });
    $rootScope.$on('$stateChangeSuccess', resolveDone);
    $rootScope.$on('$stateChangeError', resolveDone);
    $rootScope.$on('$statePermissionError', resolveDone);

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams; 
  });

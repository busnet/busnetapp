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
        "SUGGEST": "הצע",
        "CONFIRM":  "אישור",
        "APPROVE": "אשר",
        "PRICE": "מחיר",
        "REMARKS": "הערות",
        "DECLINE_PRICE": "סרב למחיר",
        "SERVER_ERROR": "שגיאת שרת",
        "LOGIN":"כניסה למערכת",
        "LOGOUT": "התנתק",
        "FROM": "מאת",
        "FOR": "עבור",
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
        "RIDE_DETAILS": "פרטי הנסיעה",
        "RIDE_TYPE": "סוג נסיעה",
        "RIDE_PRICE": "מחיר העיסקה",
        "RIDE_PRICE_APPROVED": "אישר את מחיר הנסיעה",
        "RIDE_PRICE_DECLINED": "סרב למחיר הנסיעה",
        "RIDE_PRICE_OFFER": "הציע מחיר לנסיעה",
        "APPROVE_DEAL_PRICE": "אשר עסקה במחיר",
        "RIDE_CONTRACT_APPROVED": "אישר את הסכם הנסיעה",
        "CONTRACT_ORDER": "הזמנת עבודה",
        "CONTRACT_ORDER_APPROVAL": "BUSNET לא תשא באחריות ותהא פטורה מכל נזק לעניין העברת התמורות וההסכמות אשר יועברו וייקבעו בין משתמשי האתר. ההזמנה ואישור העסקה יישלחו באמצעות האתר - אוטומטית ובאופן מקוון וניתנת בזאת הסכמה בלתי חוזרת של משתמשי האתר כי אישור עסקה מקוון מהווה התחייבות בין משתמשי האתר ולא תהא ל – BUSNET כל אחריות לעניין תוכנו של אישור עסקה מקוון ו/או ביצוע או אי ביצוע של העסקה.",
        "DEAL_APPROVAL": "קבלת טופס זה משמעותו אישור לביצוע העסקה מודגש לטובת משתמשי האתר, כי בכפוף לחוק החוזים (חלק כללי), תשל\"ג-1973 (להלן: \"החוק\") הזמנת העסקה כמוה כהצעה ואישור העסקה כמוהו כקיבול – כמשמעותם בחוק. רק ביצוע התשלום בפועל, קרי: התשלום במזומן, פרעון ההמחאה במועדה או ביצוע העברה בנקאית וזיכוי של חשבון הנעבר בפועל יהוו אסמכתא מספקת לביצוע העסקה.",
        "CONTRACTOR_DETAILS": "פרטי המבצע",
        "PROVIDER_DETAILS": "פרטי המזמין",
        "WAITING_FOR_APPROVAL": "ממתין לאישור העיסקה",
        "VACATE_DATE": "תאריך פינוי",
        "VACATE_HOUR": "שעת פינוי",
        "VEHICLE_COUNT": "מס׳ רכבים",
        "VACANT_AREA": "אזור פינוי",
        "RETURN_DATE": "תאריך החזרה",
        "RETURN_AREA": "אזור החזרה",
        "ROUTE": "מסלול",
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
        "CONTACT_NAME": "איש קשר",
        "FAX": "פקס",
        "ADDRESS": "כתובת",
        "TELEPHONE": "טלפון",
        "EMAIL": "מייל",
        "COMPANY_LEGAL": "ח.פ/ע.מ",
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
    $cordovaDevice, 
    $modal,
    GOOGLE){

    //google push service registration
    
    document.addEventListener("deviceready", function(){
        var platform = $cordovaDevice.getPlatform().toLowerCase();
        if (platform == 'android'){
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
                loginService.setDeviceToken(
                    {
                        platform: 'ios',
                        token: deviceToken
                    }
                );
            }, function(err) {
                console.log("Registration error: " + err);
            });
        }
    });

    var showModal = function(notification){
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
    }

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
      var platform = $cordovaDevice.getPlatform().toLowerCase();
      if (platform == 'android'){
        switch(notification.event) {
            case 'registered':
              if (notification.regid.length > 0 ) {
                loginService.setDeviceToken(
                    {
                        platform: 'android',
                        token: notification.regid
                    }
                );
                console.log('registration ID = ' + notification.regid);
              }
              break;

            case 'message':
                showModal(notification);
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

        if(notification.body){
            showModal({
                message: notification.body,
                title: notification.title
            });
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

    window.addEventListener('native.showkeyboard', keyboardShowHandler);
    function keyboardShowHandler(e) {
        var platform = $cordovaDevice.getPlatform().toLowerCase();
        if (platform == 'android'){
            // get viewport height
            var activeElement = $(document.activeElement);
            var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            // get the maximum allowed height without the need to scroll the page up/down
            var scrollLimit = viewportHeight - (document.activeElement.offsetHeight + activeElement.offset().top);

            // if the keyboard height is bigger than the maximum allowed height
            if (e.keyboardHeight > scrollLimit) {
                // calculate the Y distance
                var scrollYDistance = document.activeElement.offsetHeight + (e.keyboardHeight - scrollLimit);
                // animate using move.min.js (CSS3 animations)
                move(document.body).to(0, -scrollYDistance).duration('.2s').ease('in-out').end();
            }
        }
    }

    window.addEventListener('native.hidekeyboard', keyboardHideHandler);

    // native.hidekeyboard callback
    function keyboardHideHandler() {
        // remove focus from activeElement 
        // which is naturally an input since the nativekeyboard is hiding
        document.activeElement.blur();
        // animate using move.min.js (CSS3 animations)
        move(document.body).to(0, 0).duration('.2s').ease('in-out').end();
    }

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

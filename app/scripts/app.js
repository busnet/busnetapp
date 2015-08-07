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
        "DECLINE_PRICE": "סרב למחיר",
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
        "RIDE_PRICE": "מחיר העיסקה",
        "RIDE_PRICE_APPROVED": "אישר את מחיר הנסיעה",
        "RIDE_PRICE_DECLINED": "סרב למחיר הנסיעה",
        "RIDE_PRICE_OFFER": "הציע מחיר לנסיעה",
        "RIDE_CONTRACT_APPROVED": "אישר את הסכם הנסיעה",
        "CONTRACTOR_DETAILS": "פרטי המבצע",
        "WAITING_FOR_APPROVAL": "ממתין לאישור העיסקה",
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
  .run(function($rootScope, $state, $stateParams, loginService, $cordovaPush, $modal){

    //google push service registration
    var googleConfig = {
        "senderID":"163438544120"
    };
    document.addEventListener("deviceready", function(){
        $cordovaPush.register(googleConfig).then(function(result) {
            console.log('push register success: ' + result);
        }, function(err) {
            console.log('push register error: ' + err);
        })
    });

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
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
    });

    window.addEventListener('native.showkeyboard', keyboardShowHandler);
    function keyboardShowHandler(e) {
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

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
        "RIDE_ADDED_SUCCESSFULLY": "הנסיעה הוספה בהצלחה",
        /*-----------------------------------------------subMenu -------------------------------*/
        // "LOGIN":"כניסה למערכת", allready exists as a page title
        "MY_RIDES": "הנסיעות שלי",
        // "ADD_RIDE" : "הוספת נסיעה", allready exists as a button in !!!
        "STATS": "דוחות",
        "COMPANY_DETAILS": "פרטי החברה",
        "BUSINESS_INDEX": "אינדקס עסקים",
        "SIDE_MAP": "מפת צד",
        /*----------------------------------------------company details-----------------------------------*/
        "COMPANY_NAME": "שם החברה",
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
  .run(function($rootScope, $state, $stateParams, loginService){
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

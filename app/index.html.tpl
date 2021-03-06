<!doctype html>
<html class="no-js" ng-app="busnetApp">
  <head>
    <meta charset="utf-8">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <!-- build:css(.) styles/vendor.css -->
    <!-- bower:css -->
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="bower_components/angular-ui-grid/ui-grid.css" />
    <!-- endbower -->
    <!-- endbuild -->
    <!-- build:css(.tmp) styles/main.css -->
    <link rel="stylesheet" href="styles/main.css">
    <!-- endbuild -->
  </head>
  <body class="container-fluid">
    <!--[if lt IE 7]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    <div ui-view></div>
    <script src="cordova.js"></script>
    <!-- build:js(.) scripts/vendor.js -->
    <!-- bower:js -->
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js"></script>
    <script src="bower_components/angular-animate/angular-animate.js"></script>
    <script src="bower_components/angular-cookies/angular-cookies.js"></script>
    <script src="bower_components/angular-resource/angular-resource.js"></script>
    <script src="bower_components/angular-route/angular-route.js"></script>
    <script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
    <script src="bower_components/angular-touch/angular-touch.js"></script>
    <script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="bower_components/angular-translate/angular-translate.js"></script>
    <script src="bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>
    <script src="bower_components/angular-translate-loader-url/angular-translate-loader-url.js"></script>
    <script src="bower_components/lodash/dist/lodash.compat.js"></script>
    <script src="bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
    <script src="bower_components/bs-typeahead/js/bootstrap-typeahead.js"></script>
    <script src="bower_components/angular-bootstrap-show-errors/src/showErrors.js"></script>
    <script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
    <script src="bower_components/angular-ui-grid/ui-grid.js"></script>
    <script src="bower_components/moment/moment.js"></script>
    <script src="bower_components/angular-moment/angular-moment.js"></script>
    <!-- endbower -->
    <!-- endbuild -->
        <!-- build:js({.tmp,app}) scripts/scripts.js -->
        <script src="scripts/config.js"></script>
        <script src="scripts/app.js"></script>
        <script src="scripts/grandfather.js"></script>
        <script src="scripts/controllers/about.js"></script>
        <script src="scripts/controllers/login.js"></script>
        <script src="scripts/controllers/my-requests.js"></script>
        <script src="scripts/controllers/body.js"></script>
        <script src="scripts/services/login-service.js"></script>
        <script src="scripts/services/push-notifications.js"></script>
        <script src="scripts/services/rides.js"></script>
        <script src="scripts/directives/password-match.js"></script>
        <script src="scripts/directives/remote-validated.js"></script>
        <script src="scripts/directives/chat.js"></script>
        <script src="scripts/controllers/error.js"></script>
        <script src="scripts/controllers/rides.js"></script>
        <script src="scripts/controllers/add-ride.js"></script>
        <script src="scripts/controllers/ride-chat.js"></script>
        <script src="scripts/controllers/ride-details.js"></script>
        <script src="scripts/controllers/ride-contract.js"></script>
        <script src="scripts/controllers/add-ride-modal.js"></script>
        <script src="scripts/controllers/notification-modal.js"></script>
        <!--bew made by Alex-->
        <script src="scripts/controllers/company-details.js"></script>
        <script src="scripts/controllers/settings.js"></script>
        <!-- endbuild -->
        <script src="<%- socket_server%>/socket.io/socket.io.js"></script>
        <script src="languages/angular-locale_he-il.js"></script>
<script>

/**
 * Directly from fnakstad
 * https://github.com/fnakstad/angular-client-side-auth/blob/master/client/js/routingConfig.js
 */
(function (exports) {
  var config = {

    /* List all the roles you wish to use in the app
    * You have a max of 31 before the bit shift pushes the accompanying integer out of
    * the memory footprint for an integer
    */
    roles: [
      'public',
      'user',
      'admin'
    ],

    /*
    Build out all the access levels you want referencing the roles listed above
    You can use the "*" symbol to represent access to all roles
     */
    accessLevels: {
      'public' : '*',
      'anon': ['public'],
      'user' : ['user', 'admin'],
      'admin': ['admin']
    }

  };

  /*
    Method to build a distinct bit mask for each role
    It starts off with "1" and shifts the bit to the left for each element in the
    roles array parameter
   */
  function buildRoles(roles) {

    var bitMask = "01";
    var userRoles = {};

    for (var role in roles) {
      var intCode = parseInt(bitMask, 2);
      userRoles[roles[role]] = {
        bitMask: intCode,
        title: roles[role]
      };
      bitMask = (intCode << 1).toString(2);
    }

    return userRoles;
  }

  /*
  This method builds access level bit masks based on the accessLevelDeclaration parameter which must
  contain an array for each access level containing the allowed user roles.
   */
  function buildAccessLevels(accessLevelDeclarations, userRoles) {

    var accessLevels = {},
        resultBitMask,
        role;
    for (var level in accessLevelDeclarations) {

      if (typeof accessLevelDeclarations[level] === 'string') {
        if (accessLevelDeclarations[level] === '*') {

          resultBitMask = '';

          for (role in userRoles) {
            resultBitMask += "1";
          }
          //accessLevels[level] = parseInt(resultBitMask, 2);
          accessLevels[level] = {
            bitMask: parseInt(resultBitMask, 2),
            title: accessLevelDeclarations[level]
          };
        }
        else {
          console.log("Access Control Error: Could not parse '" + accessLevelDeclarations[level] + "' as access definition for level '" + level + "'");
        }
      }
      else {

        resultBitMask = 0;
        for (role in accessLevelDeclarations[level]) {
          if (userRoles.hasOwnProperty(accessLevelDeclarations[level][role])) {
            resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask;
          }
          else {
            console.log("Access Control Error: Could not find role '" + accessLevelDeclarations[level][role] + "' in registered roles while building access for '" + level + "'");
          }
        }
        accessLevels[level] = {
          bitMask: resultBitMask,
          title: accessLevelDeclarations[level][role]
        };
      }
    }

    return accessLevels;
  }

  exports.userRoles = buildRoles(config.roles);
  exports.accessLevels = buildAccessLevels(config.accessLevels, exports.userRoles);

})(typeof exports === 'undefined' ? this : exports);
        </script>
</body>
</html>

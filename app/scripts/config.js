angular.module('config', [])

.constant('PACKAGE', {name:'busnetApp',version:'0.0.1',dependencies:{express:'^4.12.4','socket.io':'^1.3.5'},repository:{},devDependencies:{grunt:'^0.4.5','grunt-autoprefixer':'^2.0.0','grunt-concurrent':'^1.0.0','grunt-contrib-clean':'^0.6.0','grunt-contrib-compass':'^1.0.0','grunt-contrib-concat':'^0.5.0','grunt-contrib-connect':'^0.9.0','grunt-contrib-copy':'^0.7.0','grunt-contrib-cssmin':'^0.12.0','grunt-contrib-htmlmin':'^0.4.0','grunt-contrib-imagemin':'^0.9.2','grunt-contrib-jshint':'^0.11.0','grunt-contrib-uglify':'^0.7.0','grunt-contrib-watch':'^0.6.1','grunt-filerev':'^2.1.2','grunt-google-cdn':'^0.4.3','grunt-karma':'^0.10.1','grunt-newer':'^1.1.0','grunt-ng-annotate':'^0.9.2','grunt-ng-constant':'^1.1.0','grunt-phonegap':'^0.15.2','grunt-replace':'^0.9.2','grunt-shell':'^1.1.2','grunt-svgmin':'^2.0.0','grunt-template':'^0.2.3','grunt-usemin':'^3.0.0','grunt-wiredep':'^2.0.0','jasmine-core':'^2.2.0','jshint-stylish':'^1.0.0',karma:'^0.12.31','karma-jasmine':'^0.3.5','karma-phantomjs-launcher':'^0.1.4','load-grunt-tasks':'^3.1.0','time-grunt':'^1.0.0'},engines:{node:'>=0.10.0'},scripts:{test:'grunt test'}})

.constant('GOOGLE', {SENDERID:'163438544120'})

.constant('REST_URLS', {SOCKET_SERVER:'http://app.trucknet.co.il',VEHICLES:'http://app.trucknet.co.il/rest/vehicles',RIDE_TYPES:'http://app.trucknet.co.il/rest/ridetypes',AREAS:'http://app.trucknet.co.il/rest/areas',CITIES:'http://app.trucknet.co.il/rest/cities',RIDES:'http://app.trucknet.co.il/rest/rides',RIDE:'http://app.trucknet.co.il/rest/ride',LOGIN_SERVER:'http://app.trucknet.co.il/rest/login',USER:'http://app.trucknet.co.il/rest/user',NOTIFICATIONS:'http://app.trucknet.co.il/rest/notifications',REGISTER:'http://localhost:3002/register1'})

;
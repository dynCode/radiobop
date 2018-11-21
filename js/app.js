//-- AngularJS --//
(function(){
    'use strict';

    var module = angular.module('app', ['onsen', 'ngSanitize']);

    module.controller('AppController', function ($scope, $http, $window, $rootScope, $sce) {
        $scope.streamURL = $sce.trustAsResourceUrl('http://radioinbox.co.za:8000/radiobop');
        $scope.mapURL = $sce.trustAsResourceUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d898.4074446340522!2d28.23540712923897!3d-25.74975399897759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9561d05a38b6d7%3A0xe3dc9a63563b4156!2sRadio+Bop+South+Africa!5e0!3m2!1sen!2sza!4v1542789917287');
        
        $scope.errorCode = '';
        
        $scope.playAudio = function() {
            var audioUrl = "http://radioinbox.co.za:8000/radiobop";

            // Play the audio file at url
            var my_media = new Media(audioUrl,
                // success callback
                function () {
                    alert("playAudio():Audio Success");
                },
                // error callback
                function (err) {
                    alert("playAudio():Audio Error: " + err);
                }
            );
            // Play audio
            my_media.play({ playAudioWhenScreenIsLocked : true });
            my_media.setVolume('1.0');
        };
    });
})();

// normal JS //
document.addEventListener('deviceready', function () {
    cordova.plugins.backgroundMode.setEnabled(true);
        cordova.plugins.backgroundMode.setDefaults({
        title: "Radio Bop",
        text: "Listen now",
        icon: 'icon',
        color: "ed7924",
        resume: true,
        hidden: false,
        bigText: false
    });
    cordova.plugins.backgroundMode.on('activate', function() {
        cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
    });
}, false);


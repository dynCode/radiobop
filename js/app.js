//-- AngularJS --//
(function(){
    'use strict';

    var module = angular.module('app', ['onsen', 'ngSanitize']);

    module.controller('AppController', function ($scope, $http, $window, $rootScope, $sce) {
		var apiURL = "https://radiobop.co.za/app/app.php";
        $scope.streamURL = $sce.trustAsResourceUrl('https://live.urbanza.co.za/radio/8020/radiobop?1597770347');
        $scope.mapURL = $sce.trustAsResourceUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d898.4074446340522!2d28.23540712923897!3d-25.74975399897759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9561d05a38b6d7%3A0xe3dc9a63563b4156!2sRadio+Bop+South+Africa!5e0!3m2!1sen!2sza!4v1542789917287');
		$scope.djs = [];
        $scope.errorCode = '';
        
        $scope.playAudio = function() {
            var audioUrl = "https://live.urbanza.co.za/radio/8020/radiobop?1597770347";

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
		
		$http.post(apiURL)
		.then(function(data){
			//console.log("Data: ", data);
			$scope.djs = data.data;
			//console.log("Scope data:", $scope.djs);
		},function(data) {
			console.log("Func Data:", data);
		});
		
		$scope.djBio = function (dj, event) {
			//console.log("DJ Bio: ", dj);
			ons.notification.alert({buttonLabels:'Close',title:dj.DJname,messageHTML:dj.DJinfo,animation: 'default'});
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
function playAudio() {
	var control = document.getElementById("radio-box");
    control.play();
}

function pauseAudio() {
	var control = document.getElementById("radio-box");
    control.pause();
}

function SetVolume(val) {
	var player = document.getElementById('radio-box');
	player.volume = val / 100;
}

function togglePlay() {
	var play = document.getElementById("but-play").classList;
	var pause = document.getElementById("but-pause").classList;

	if (play.contains("active")) {
		play.remove("active");
		pause.add("active");
	} else {
		play.add("active");
		pause.remove("active");
	}
	if (play.contains("inactive")) {
		play.remove("inactive");
		pause.add("inactive");
	} else {
		play.add("inactive");
		pause.remove("inactive");
	}
}
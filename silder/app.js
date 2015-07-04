var sliderApp = angular.module('sliderApp', ['ngAnimate']);

sliderApp.controller('SliderController', function ($scope) {
   
    $scope.images = [
        { "src": 'img1.png', "title": 'Pic 1' },
        { "src": 'img2.jpg', "title": 'Pic 2' },
        { "src": 'img3.jpg', "title": 'Pic 3' },
        { "src": 'img4.png', "title": 'Pic 4' },
        { "src": 'img5.png', "title": 'Pic 5' }
    ];
}).directive('slider', function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            images: '='
        },
        link: function (scope, elem, attrs) {
            
            scope.currentIndex = 0;

            scope.next = function () {
                scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
            };

            scope.prev = function () {
                scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
            };

            scope.$watch('currentIndex', function () {
                scope.images.forEach(function (image) {
                    image.visible = false;
                    //image.display = "none";
                });
                scope.images[scope.currentIndex].visible = true;
                //scope.images[scope.currentIndex].display = "block";
            });

            

            var timer;

            var sliderFunc = function () {
                timer = $timeout(function () {
                    scope.next();
                    timer = $timeout(sliderFunc, 3000);
                }, 3000);
            };

            sliderFunc();

            scope.$on('$destroy', function () {
                $timeout.cancel(timer);
            });

            angular.element(document.querySelectorAll('.arrow')).one('click', function () {
                $timeout.cancel(timer);
            });
        },
        templateUrl: '/templates/silder/templateurl.html'
    }

});

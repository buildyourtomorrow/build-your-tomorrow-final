app.directive('bytNavbar', function(){
    return {
        templateUrl: '/partials/byt-navbar.html',
        controller: 'HomeCtrl'
    }
})

app.directive('homeArrow', function(){
    return {
        templateUrl: '/partials/byt-home-arrow.html'
    }
})

app.directive('bytEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.bytEnter);
                });

                event.preventDefault();
            }
        });
    };
});
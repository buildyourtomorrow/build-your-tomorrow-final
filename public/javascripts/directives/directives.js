app.directive('contenteditable', function() {
    return {
        require: "ngModel",
        link: function(scope, elm, attrs, ngModel) {
            function read() {
                ngModel.$setViewValue(elm.html());
            }
            function textValidation() {
                if (elm.html() == "") {
                    scope.$apply(elm.html("Yo. Add a description or amount"));
                    scope.$apply(elm.addClass("text_val_class"));
                } 
                if (elm.html() == "Yo. Add a description or amount") {
                    scope.$apply(elm.addClass("validation_class"));
                } else {
                    scope.$apply(elm.removeClass("validation_class"));
                };
            }
            // when the element loses focus, the text that is inside the element gets sent to the model.
            elm.bind("blur", function() {
                scope.$apply(read);
                textValidation();
            });
            // when enter is pressed, the text that is inside the element gets sent to the model.
            // the element then losses focus
            // not sure what preventDefault does            
            elm.bind('keypress', function(e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                }
            });
            // data from the model is pushed to the element
            ngModel.$render = function() {
                elm.html(ngModel.$viewValue || "");
            };                        
        }
    }
});

app.directive('calcTotalFunc', function() {
    return function(scope, elm, attr) {
        elm.bind("blur", function() {
            scope.$apply(attr.calcTotalFunc);
        });
    };
});

app.directive('aRegFunction', function() {
    return function(scope, elm, attr) {
        elm.bind("blur", function() {
            scope.$apply(attr.aRegFunction);
        });
    };
});
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.filters', [])
        .filter('statusFullForm', statusFullForm)
        .filter('answerTypeFullForm', answerTypeFullForm)
        .filter('emptyInputFilter', emptyInputFilter)
        .filter('noValueFilter', noValueFilter)
        .filter('answerSymbolTypeFilter', answerSymbolTypeFilter);


    function statusFullForm() {
        return function (value) {
            return value == "I" ? "InActive" : "Active";
        };
    }

    function answerTypeFullForm(questionAnswerTypes) {
        return function (value) {
            if (value == 1) {
                return questionAnswerTypes[0].text
            } else if (value == 2) {
                return questionAnswerTypes[1].text
            } else if (value == 3) {
                return questionAnswerTypes[2].text
            } else if (value == 4) {
                return questionAnswerTypes[3].text
            }
        };
    }

    function answerSymbolTypeFilter(symbolTypes) {
        return function (value) {
            if (value == 1) {
                return "<span><i class='fa fa-frown-o' aria-hidden='true'></i> " +
                    "<i class='fa fa-smile-o' aria-hidden='true'></i> " +
                    "<i class='fa fa-meh-o' aria-hidden='true'></i> " +
                    "<i class='fa fa-smile-o' aria-hidden='true'></i> </span>"
            }
            else if (value == 2) {
                return "<span><i class='fa fa-star' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o' aria-hidden='true'></i> " +
                    "<i class='fa fa-star' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o' aria-hidden='true'></i> </span>"
            }
            else if (value == 3) {
                return "<span><i class='fa fa-circle-o' aria-hidden='true'></i> " +
                    "<i class='fa fa-circle' aria-hidden='true'></i> " +
                    "<i class='fa fa-circle-o' aria-hidden='true'></i> " +
                    "<i class='fa fa-circle' aria-hidden='true'></i> </span>"
            }
            else if (value == 4) {
                return "<span><i class='fa fa-font' aria-hidden='true'></i> </span>"
            }
            else if (value == 5) {
                return "<span><i class='fa fa-male' aria-hidden='true'></i> " +
                    "<i class='fa fa-female' aria-hidden='true'></i> </span>"
            }

        };
    }


    function emptyInputFilter() {
        return function (value) {
            return value == "" || value == "NULL" ? "-" : value;
        };
    }

    function noValueFilter() {
        return function (value) {
            return value == "" || value == null || value == "0" ? "<em class='text-color-muted'><small>Not assigned</small></em>" : value;
        };
    }

})();

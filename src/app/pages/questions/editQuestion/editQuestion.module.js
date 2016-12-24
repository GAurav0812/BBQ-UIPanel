/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.questions')
        .config(routeConfig).controller('editQuestionCtrl', editQuestionCtrl);

    function editQuestionCtrl($location, $stateParams, Question, QuestionsData, toastr, $scope, symbolTypes, questionAnswerTypes) {

        $scope.questionListsData = $scope.questionListsMasterData = QuestionsData.getList();
        var editModalBox;

        $scope.QuestionTypeOptions = questionAnswerTypes;
        $scope.SymbolTypeOptions = symbolTypes;

        /*  $scope.editQuestion = {
         form: {},
         info: Question.newObject()
         };*/

        $scope.selected = {
            parentQuestion: {}
        };

        //$scope.questionInfo = QuestionsData.getRowById($stateParams.questionId);
        console.info($scope.questionInfo);


        $scope.editQuestion = {
            form: {},
            info: {
                id: "",
                questionDesc: "",
                questionType: "",
                parentAnswerId: "",
                parentQuestionId: "",
                answerSymbol: "",
                answerOption: [{
                    id: "",
                    label: "",
                    rating: ""
                }]
            }
        };
        $scope.addRow = function(index){
            var option = {id:"",label:"",rating:""};
            if($scope.editQuestion.info.answerOption.length <= index+1){
                $scope.editQuestion.info.answerOption.splice(index+1,0,option);
            }
        };

        $scope.deleteRow = function($event,index){
            if($event.which == 1)
                $scope.editQuestion.info.answerOption.splice(index,1);
        };


        getQuestionInfo();
        function getQuestionInfo() {
            QuestionsData.questionInfo($stateParams.questionId).then(function (response) {
                $scope.questionInfo = response;
                $scope.editQuestion.info = $scope.questionInfo;
                $scope.editQuestion.info.answerOption = $scope.questionInfo.options;
                console.info($scope.answerListByQuestion);
                $scope.selected.parentQuestion = QuestionsData.getRowById($scope.questionInfo.parentQuestionId);
                //$scope.selected.parentAnswer =  QuestionsData.getRowById($scope.questionInfo.parentAnswerId);
            });
        }


        $scope.goToQuestionListPage = function () {
            $location.path("/questions");
        };

        $scope.gotoTemplatePage = function () {
            $location.path("/templates");
        };
        /* getAnswerOptions();
         function getAnswerOptions() {
         if ($scope.questionInfo.parentQuestionId != null) {
         QuestionsData.answerByQuestion($scope.questionInfo.parentQuestionId).then(function (response) {
         $scope.answerListByQuestion = response;
         });
         }
         }*/

        $scope.updateQuestion = function (isValid) {
            $scope.editQuestion.info = $scope.questionInfo;
            $scope.editQuestion.info.parentQuestionId = $scope.selected.parentQuestion.id;
            if (isValid) {
                QuestionsData.update(Question.editFromObject($scope.editQuestion.info)).then(function () {
                    toastr.success("Question updated successfully!", "Success");
                    $scope.questionListsMasterData = QuestionsData.getList();
                    $scope.questionListsData = [].concat($scope.questionListsMasterData);

                    $location.path("/questions");
                }, function (errorMsg) {
                    toastr.error(errorMsg, "Failed");
                });
            }
        };

    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('editQuestion', {
                url: '/editQuestion/:questionId',
                templateUrl: 'app/pages/questions/editQuestion/editQuestion.html',
                controller: editQuestionCtrl,
                title: 'Edit Question',
                resolve: {
                    "LoadQuestions": function (QuestionsData) {
                        return QuestionsData.load();
                    }
                }
            })

    }

})();

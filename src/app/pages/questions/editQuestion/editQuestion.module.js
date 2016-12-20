/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.questions')
        .config(routeConfig).controller('editQuestionCtrl', editQuestionCtrl);

    function editQuestionCtrl($location,$stateParams,Question,QuestionsData ,toastr,$scope,symbolTypes,questionAnswerTypes) {

        $scope.questionListsData = $scope.questionListsMasterData = QuestionsData.getList();
        var editModalBox;

        $scope.QuestionTypeOptions = questionAnswerTypes;
        $scope.SymbolTypeOptions = symbolTypes;

        $scope.questionInfo = QuestionsData.getRowById($stateParams.questionId);


      /*  $scope.editQuestion = {
            form: {},
            info: Question.newObject()
        };*/

        $scope.selected = {
            parentQuestionId: {}
        };
        console.info($scope.questionInfo);

        $scope.selected.parentQuestionId=QuestionsData.getRowById($scope.questionInfo.parentQuestionId);

        console.info($scope.selected.parentQuestionId);

        $scope.editQuestion = {
            form: {},
            info: {
                questionDesc: "",
                questionType: "",
                parentAnswerId: "",
                parentQuestionId: "",
                answerSymbol: ""
            }
        };

        $scope.goToQuestionListPage = function () {
            $location.path("/questions");
        };

        $scope.gotoTemplatePage = function () {
            $location.path("/templates");
        };

        $scope.updateQuestion = function (isValid) {
            $scope.editQuestion.info= $scope.questionInfo;
            $scope.editQuestion.info.parentQuestionId= $scope.selected.parentQuestionId.id;
            if (isValid) {
                QuestionsData.update($scope.editQuestion.info).then(function () {
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

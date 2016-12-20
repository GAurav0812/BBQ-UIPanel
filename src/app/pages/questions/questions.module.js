/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.questions', [])
        .config(routeConfig).controller('questionsCtrl', questionsCtrl);

    function questionsCtrl($location, Question, $uibModal, QuestionsData, toastr, $scope, symbolTypes, questionAnswerTypes) {

        $scope.questionListsData = $scope.questionListsMasterData = QuestionsData.getList();
        var editModalBox;

        $scope.gotoCreateQuestion = function () {
            $location.path("/createQuestion");
        };

        $scope.QuestionTypeOptions = questionAnswerTypes;
        $scope.SymbolTypeOptions = symbolTypes;

        $scope.selected = {
            parentQuestion: {},
            parentAnswer:{}
        };

        /*  $scope.newQuestion = {
         form: {},
         info: Question.newObject()
         };
         */

        $scope.newQuestion = {
            form: {},
            info: {
                questionDesc: "",
                questionType: "",
                parentAnswerId: "",
                parentQuestionId:  "",
                answerSymbol: ""
            }
        };

        $scope.createQuestion = function (isValid) {
            if (isValid) {
                $scope.newQuestion.info.parentQuestionId= $scope.selected.parentQuestion.id;
                QuestionsData.create($scope.newQuestion.info).then(function (newdata) {
                    toastr.success("Question created successfully!", "Success");
                    $scope.newQuestion.form.$setPristine();
                    $scope.newQuestion.info = Question.newObject();
                    $scope.questionListsMasterData = newdata;
                    $scope.questionListsData = [].concat($scope.questionListsMasterData);
                    $location.path("/questions");
                }, function (errorMsg) {
                    toastr.error(errorMsg, "Failed");
                });
            }
        };

        $scope.checkAnswersTypeForQuestion = function () {
            if (angular.isDefined($scope.selected.parentQuestion.id)) {
                QuestionsData.answerByQuestion($scope.selected.parentQuestion.id).then(function (response) {
                    $scope.answerListByQuestion = response;
                });

            }
        };
        $scope.goToQuestionListPage = function () {
            $location.path("/questions");
        };

        $scope.deleteQuestion = function (id) {
            QuestionsData.delete(id).then(function () {
                toastr.success("Question deleted successfully!", "Success");
                $scope.questionListsMasterData = QuestionsData.getList();
                $scope.questionListsData = [].concat($scope.questionListsMasterData);
            }, function (errorMsg) {
                toastr.error(errorMsg, "Failed");
            });
        };

        $scope.gotoTemplatePage = function (courseId) {
            $location.path("/templates");
        };

        $scope.editQuestionData = function (item) {
            $location.path("editQuestion/" + item.id);
        };

        /* $scope.updateQuestion = function (isValid) {
         if (isValid) {
         QuestionsData.update($scope.editQuestion.info).then(function () {
         toastr.success("Question updated successfully!", "Success");
         $scope.questionListsMasterData = QuestionsData.getList();
         $scope.questionListsData = [].concat($scope.questionListsMasterData);
         editModalBox.close();
         }, function (errorMsg) {
         toastr.error(errorMsg, "Failed");
         });
         }
         };*/

    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider

            .state('questions', {
                url: '/questions',
                controller: questionsCtrl,
                templateUrl: 'app/pages/questions/questions.list.html',
                title: 'QUESTION BANK',
                sidebarMeta: {
                    icon: 'fa fa-question',
                    order: 1
                },
                resolve: {
                    "LoadQuestions": function (QuestionsData) {
                        return QuestionsData.load();
                    }
                }
            })

            .state('createQuestion', {
                url: '/createQuestion',
                templateUrl: 'app/pages/questions/createQuestion.html',
                controller: questionsCtrl,
                title: 'CREATE QUESTION'
            })


    }

})();

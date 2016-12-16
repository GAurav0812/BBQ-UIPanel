/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.questions', [])
        .config(routeConfig).controller('questionsCtrl', questionsCtrl);

    function questionsCtrl($location,Question,$uibModal,QuestionsData ,toastr,$scope,symbolTypes,questionAnswerTypes) {

        $scope.questionListsData = $scope.questionListsMasterData = QuestionsData.getList();
        var editModalBox;

        $scope.gotoCreateQuestion = function(){
          $location.path("/createQuestion");
        };

        $scope.QuestionTypeOptions = questionAnswerTypes;
        $scope.SymbolTypeOptions = symbolTypes;


        $scope.newQuestion = {
            form: {},
            info: Question.newObject()
        };
        $scope.editQuestion = {
            form: {},
            info: Question.newObject()
        };

       /* $scope.newQuestion = {
            form: {},
            info: {
                questionDesc: "",
                questionType: "",
                parentAnswerId: "",
                parentQuestionId: "",
                answerSymbol: ""
            }
        };
*/
        $scope.createQuestion = function (isValid) {
            if (isValid) {
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

        $scope.editQuestionData= function (item) {
            $scope.editQuestion = {};
            $scope.editQuestion.info = Question.createFromObject(item);
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/questions/editQuestion.html',
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };
        $scope.updateQuestion = function (isValid) {
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
        };

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
                title: 'Create Question',


            })

    }

})();

/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.templates')
        .config(routeConfig).controller('assignQuestionsCtrl', assignQuestionsCtrl);

    function assignQuestionsCtrl($location, $uibModal, editableThemes, editableOptions, Template, $stateParams, QuestionsData, Question, TemplatesData, toastr, $scope, symbolTypes, questionAnswerTypes) {

        $scope.questionListsData = $scope.questionListsMasterData = QuestionsData.getList();
        $scope.templateListsData = $scope.templateListsMasterData = TemplatesData.getList();

        $scope.templateId = $stateParams.templateId;

        var templateId = parseInt($stateParams.templateId);

        $scope.templateInfo = getTemplateInfoById(templateId);

        function getTemplateInfoById(templateId) {
            for (var i in $scope.templateListsData) {
                if ($scope.templateListsData[i].templateId == templateId)
                    return $scope.templateListsData[i];
            }
        }

        $scope.selected = {
            question: {},
            outlet: {}
        };


        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };
        $scope.popup2 = {
            opened: false
        };


        $scope.newAssignQuestions = {
            form: {},
            info: {
                questionId: "",
                priority: null
            }
        };

        $scope.goToTemplateListPage = function () {
            $location.path("/templates");
        };


        loadTemplateData();

        function loadTemplateData() {
            TemplatesData.listQuestions(templateId).then(function (response) {
                $scope.templateQuestionsMasterList = response;
                $scope.templateQuestionsList = [].concat($scope.templateQuestionsMasterList);
            });
            TemplatesData.OutletList().then(function (response) {
                $scope.outletListsData = response;
            });
        }


        $scope.assignQuestion = function (isValid) {
            if (isValid) {
                $scope.newAssignQuestions.info.questionId = $scope.selected.question.id;
                TemplatesData.assignQuestion(Template.assignQuestionObject($scope.newAssignQuestions.info), templateId).then(function () {
                    toastr.success("Question Assigned successfully!", "Success");
                    $scope.newAssignQuestions.form.$setPristine();
                    $scope.newAssignQuestions.info = Template.newObject();
                    $scope.selected.question = "";
                    loadTemplateData();
                }, function (errorMsg) {
                    toastr.error(errorMsg, "Failed");
                });
            }
        };

        $scope.deleteAssignQuestion = function (questionId) {
            TemplatesData.deleteAssignQuestion(templateId, questionId).then(function () {
                toastr.success("Question Removed From Template successfully!", "Success");
                loadTemplateData();
            }, function (errorMsg) {
                toastr.error(errorMsg, "Failed");
            });
        };

        $scope.newAssignOutlet = {
            form: {},
            info: {
                templateId: templateId,
                fromDate: "",
                toDate: ""
            }
        };


        $scope.assignOutlet = function (isValid) {
            if(isValid){
                var outletId = $scope.selected.outlet.id;
                TemplatesData.assignOutlet(outletId, Template.createAssignQuestionObject($scope.newAssignOutlet.info)).then(function (response) {
                    toastr.success("Outlet Assigned successfully", "Success");
                    $scope.newAssignOutlet.info="";
                    loadTemplateData();
                }, function (errorMsg) {
                    toastr.error(errorMsg, "Failed");
                })
            }

        };

        /*var assignOutletBox;
         $scope.assignOutletBox = function () {

         assignOutletBox = $uibModal.open({
         animation: true,
         templateUrl: 'app/pages/templates/assignOutlet.html',
         size: 'sm',
         backdrop: 'static',
         keyboard: false,
         scope: $scope
         });
         };*/

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="fa fa-check fa-lg" aria-hidden="true"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="fa fa-close fa-lg"></i></button>';

    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('assignQuestions', {
                url: '/assignQuestions/:templateId',
                templateUrl: 'app/pages/templates/assignQuestions/assignQuestions.html',
                controller: assignQuestionsCtrl,
                title: 'Assign Question'
                ,
                resolve: {
                    "LoadQuestions": function (QuestionsData) {
                        return QuestionsData.load();
                    },
                    "LoadTemplates": function (TemplatesData) {
                        return TemplatesData.load();
                    }
                }
            })

    }

})();

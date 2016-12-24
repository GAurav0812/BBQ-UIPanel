/**
 * Created by LENOVO on 13-12-2016.
 */
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.templates', [])
        .config(routeConfig).controller('TemplatesCtrl', TemplatesCtrl);

    function TemplatesCtrl($location, editableThemes, editableOptions, TemplatesData, toastr, $uibModal, Template, $scope) {

        $scope.templateListsData = $scope.templateListsMasterData = TemplatesData.getList();
        $scope.templatePageSize = 10;
        $scope.statusOptions = [
            {id: 'A', text: 'Active'},
            {id: 'I', text: 'InActive'}
        ];

        var editModalBox;

        $scope.gotoCreateTemplate = function (item) {
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/templates/createTemplate.html',
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };

        $scope.goToTemplateListPage = function () {
            $location.path("/templates");
        };

        $scope.goToAssignQuestionPage = function (item) {
            $location.path("/assignQuestions/" + item.templateId);
        };
        $scope.newTemplate = {
            form: {},
            info: Template.newObject()
        };

        $scope.createTemplate = function (isValid) {
            if (isValid) {
                TemplatesData.create($scope.newTemplate.info).then(function (newdata) {
                    toastr.success("Template created successfully!", "Success");
                    $scope.newTemplate.form.$setPristine();
                    $scope.newTemplate.info = Template.newObject();
                    $scope.templateListsMasterData = newdata;
                    $scope.templateListsData = [].concat($scope.templateListsMasterData);
                    editModalBox.close();
                }, function (errorMsg) {
                    toastr.error(errorMsg, "Failed");
                });
            }
        };

        $scope.deleteTemplate = function (id) {
            TemplatesData.delete(id).then(function () {
                toastr.success("Template deleted successfully!", "Success");
                $scope.templateListsMasterData = TemplatesData.getList();
                $scope.templateListsData = [].concat($scope.templateListsMasterData);
            }, function (errorMsg) {
                toastr.error(errorMsg, "Failed");
            });
        };

        $scope.editTemplate = {
            form: {},
            info: Template.newObject()
        };

        $scope.updateTemplate = function (item) {
            TemplatesData.update(Template.updateTemplateObject(item)).then(function () {
                toastr.success("Template updated successfully!", "Success");
            }, function (errorMsg) {
                toastr.error(errorMsg, "Failed");
            });
        };

        editableOptions.theme = 'bs3';
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="fa fa-check fa-lg" aria-hidden="true"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="fa fa-close fa-lg"></i></button>';

    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('templates', {
                url: '/templates',
                templateUrl: 'app/pages/templates/templates.list.html',
                controller: TemplatesCtrl,
                title: 'TEMPLATE',
                sidebarMeta: {
                    icon: 'fa fa-list-alt',
                    order: 2
                },
                resolve: {
                    "LoadTemplates": function (TemplatesData) {
                        return TemplatesData.load();
                    }
                }
            })
    }

})();

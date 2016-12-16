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

    function TemplatesCtrl($location) {



    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('templates', {
                url: '/templates',
                templateUrl: 'app/pages/templates/templates.html',
                controller: TemplatesCtrl,
                title: 'TEMPLATE',
                sidebarMeta: {
                    icon: 'fa fa-list-alt',
                    order: 2
                }
            })


    }

})();

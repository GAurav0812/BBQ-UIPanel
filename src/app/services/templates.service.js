/**
 * Created by Sandeep on 9/9/2016.
 */
(function () {
    'use strict';

    angular.module('UApps.services')
        .factory("TemplateServices", TemplateServices)
        .service("TemplatesData", TemplatesData)
        .service("Template", Template);

    /** @ngInject */
    function TemplateServices(HttpService) {

        var httpService = new HttpService("template");
        var httpOutletService = new HttpService("outlet");
        var TemplateServices = {
            create: function (obj) {
                return httpService.post("create", obj);
            }, update: function (obj) {
                return httpService.post("update", obj);
            }, delete: function (id) {
                return httpService.delete("delete/" + id);
            }, getList: function () {
                return httpService.get("list");
            }, listQuestions: function (templateId) {
                return httpService.get("listQuestions/" + templateId);
            }, assignQuestion: function (obj, templateId) {
                return httpService.post("assignQuestion/" + templateId, obj);
            }, deleteAssignQuestion: function (templateId, questionId) {
                return httpService.delete("deleteAssignQuestion/" + templateId + "/" + questionId);
            }, OutletList: function (templateId) {
                return httpOutletService.get("list");
            }, assignOutlet: function (outletId,obj) {
                return httpOutletService.post("assignOutlet/" + outletId, obj);
            }
        };
        return TemplateServices;
    }

    /** @ngInject */
    function TemplatesData(TemplateServices, DataObject) {

        var TemplatesData = new DataObject();
        TemplatesData.load = function () {
            var self = this;
            return TemplateServices.getList().then(function (data) {
                return self.rows = data.templateResponseList;
            });
        };
        TemplatesData.create = function (obj) {
            var self = this;
            if (obj.hasOwnProperty("templateId"))
                delete obj.templateId;
            return TemplateServices.create(obj).then(function (data) {
                obj.templateId = data.message;
                self.rows.push(obj);
                return self.rows;
            });
        };
        TemplatesData.delete = function (id) {
            var self = this;
            return TemplateServices.delete(id).then(function (data) {
                var index = self.getRowIndexById(id)
                self.rows.splice(index, 1);
                return data;
            });
        };
        TemplatesData.update = function (obj) {
            var self = this;
            return TemplateServices.update(obj).then(function (data) {
                var index = self.getRowIndexById(obj.templateId)
                self.rows[index] = obj;
                return data;
            });
        };
        TemplatesData.listQuestions = function (templateId) {
            var self = this;
            return TemplateServices.listQuestions(templateId).then(function (data) {
                return data.questions;
            });
        };

        TemplatesData.OutletList = function () {
            var self = this;
            return TemplateServices.OutletList().then(function (data) {
                return data.outletResponseList;
            });
        };
        TemplatesData.assignQuestion = function (obj, templateId) {
            var self = this;
            return TemplateServices.assignQuestion(obj, templateId).then(function (data) {
                return data
            });
        };
        TemplatesData.assignOutlet = function (outletId,obj) {
            var self = this;
            return TemplateServices.assignOutlet(outletId,obj).then(function (data) {
                return data
            });
        };
        TemplatesData.assignQuestion = function (obj, templateId) {
            var self = this;
            return TemplateServices.assignQuestion(obj, templateId).then(function (data) {
                return data
            });
        };
        TemplatesData.deleteAssignQuestion = function (templateId, questionId) {
            var self = this;
            return TemplateServices.deleteAssignQuestion(templateId, questionId).then(function (data) {
                return data;
            });
        };
        return TemplatesData;
    }

    /** @ngInject */
    function Template($filter) {
        var Template = {
            newObject: function () {
                return {
                    id: undefined,
                    templateDesc: undefined,
                    status: "A"
                }
            },

            createFromObject: function (obj) {
                return {
                    id: obj.id,
                    templateDesc: obj.templateDesc,
                    status: obj.status

                }

            },
            createAssignQuestionObject: function (obj) {

                return {
                    templateId: obj.templateId,
                    fromDate: $filter('date')(obj.fromDate, 'yyyy-MM-dd 00:00:00'),
                    toDate: $filter('date')(obj.toDate, 'yyyy-MM-dd 00:00:00')
                }
            },
            assignQuestionObject: function (obj) {
                return {
                    id: obj.id,
                    questionId: obj.questionId,
                    priority: obj.priority
                }
            }

        };

        return Template;

    }


})();

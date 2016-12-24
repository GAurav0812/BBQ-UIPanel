/**
 * Created by Sandeep on 9/9/2016.
 */
(function () {
    'use strict';

    angular.module('UApps.services')
        .factory("QuestionServices", QuestionServices)
        .service("QuestionsData", QuestionsData)
        .service("Question", Question);

    /** @ngInject */
    function QuestionServices(HttpService) {

        var httpService = new HttpService("question");

        var httpQuestionService = new HttpService("answer");
        var QuestionServices = {
            create: function (obj) {
                return httpService.post("create", obj);
            }, update: function (obj) {
                return httpService.post("update", obj);
            }, delete: function (id) {
                return httpService.delete("delete/" + id);
            }, getList: function () {
                return httpService.get("list");
            }, answerByQuestion: function (questionId) {
                return httpQuestionService.get("list/" + questionId);
            }, questionInfo: function (questionId) {
                return httpService.get("questionInfo/" + questionId);
            }
        };
        return QuestionServices;
    }

    /** @ngInject */
    function QuestionsData(QuestionServices, DataObject) {

        var QuestionsData = new DataObject();
        QuestionsData.load = function () {
            var self = this;
            return QuestionServices.getList().then(function (data) {
                return self.rows = data.questions;
            });
        };
        QuestionsData.create = function (obj) {
            var self = this;
            if (obj.hasOwnProperty("id"))
                delete obj.id;
            return QuestionServices.create(obj).then(function (data) {
                obj.id = data.message;
                self.rows.push(obj);
                return self.rows;
            });
        };
        QuestionsData.delete = function (id) {
            var self = this;
            return QuestionServices.delete(id).then(function (data) {
                var index = self.getRowIndexById(id)
                self.rows.splice(index, 1);
                return data;
            });
        };
        QuestionsData.update = function (obj) {
            var self = this;
            return QuestionServices.update(obj).then(function (data) {
                var index = self.getRowIndexById(obj.id)
                self.rows[index] = obj;
                return data;
            });
        };
        QuestionsData.answerByQuestion = function (questionId) {
            var self = this;
            return QuestionServices.answerByQuestion(questionId).then(function (data) {
                return data.answerResponseList;
            });
        };
        QuestionsData.questionInfo = function (questionId) {
            var self = this;
            return QuestionServices.questionInfo(questionId).then(function (data) {
                return data;
            });
        };


        return QuestionsData;
    }

    /** @ngInject */
    function Question() {
        var Question = {
            newObject: function () {
                return {
                    id: undefined,
                    questionDesc: undefined,
                    questionType: undefined,
                    parentAnswerId: "",
                    parentQuestionId: "",
                    answerOption: undefined,
                    answerSymbol: undefined
                }
            },

            createFromObject: function (obj) {
                return {
                    id: obj.id,
                    questionDesc: obj.questionDesc,
                    questionType: obj.questionType,
                    parentAnswerId: angular.isDefined(obj) ? obj.parentAnswerId : null,
                    parentQuestionId: angular.isDefined(obj) ? obj.parentQuestionId : null,
                    answerOption: obj.answerOption,
                    answerSymbol: obj.answerSymbol
                }

            },
            editFromObject: function (obj) {
                return {
                    id: obj.id,
                    questionDesc: obj.questionDesc,
                    questionType: obj.questionType,
                    parentAnswerId: angular.isDefined(obj) ? obj.parentAnswerId : null,
                    parentQuestionId: angular.isDefined(obj) ? obj.parentQuestionId : null,
                    answerOption: obj.options,
                    answerSymbol: obj.answerSymbol
                }

            }

        };

        return Question;

    }


})();

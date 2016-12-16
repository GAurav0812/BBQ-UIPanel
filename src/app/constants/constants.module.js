/**
 * @author v.lugovsky
 * created on 15.12.2015
 */
(function () {
    'use strict';


    angular.module('UApps.constants',[])
        .constant("clientDetails", {
            id: 1,
            name: "The Unique Media Solution",
            site: "www.theuniquemedia.in"
        })
        .constant("questionAnswerTypes", [
            {id: 'O', text: 'Objective'},
            {id: 'S', text: 'Subjective'}
        ])
        .constant("symbolTypes", [
            {id: '1', text: 'Smiley'},
            {id: '2', text: 'Star'},
            {id: '3', text: 'Circle'},
            {id: '4', text: 'Text'},
            {id: '5', text: 'Male-Female'}
        ])


        .constant("UserRoleType", {
            admin: "ROLE_ADMIN",
            all: "ROLE_ALL",
            student : "ROLE_STUDENT",
            invalid : "INVALID_USER"
        });


})();

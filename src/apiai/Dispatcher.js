"use strict";
exports.__esModule = true;
var Intents = {
    findInMenu: '?findInMenu',
    callWaiter: '?callWaiter'
};
var IntentsToActions = {};
exports.Dispatcher = {
    findAction: function (verdict) {
        var Action = IntentsToActions[verdict.intent];
        if (Action) {
            return new Action();
        }
        else {
            //return PassAction
        }
    }
};

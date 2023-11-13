"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.HasRole = exports.Roles = void 0;
function first() {
    console.log("first(): factory evaluated");
    return function () {
        console.log("first(): called");
    };
}
function Roles(roles) {
    return function (target, propertyKey, descriptor) {
        var value = descriptor.value;
        descriptor.value = function (req, res, next) {
            var _roles = req.roles;
            var hasRole = false;
            if (_roles && _roles.length && _roles.some(function (r) { return roles.includes(r); })) {
                hasRole = true;
            }
            if (!hasRole) {
                return res.status(403).json({ message: "Unauthorized action" });
            }
            else {
                var out = value.apply(this, [req, res, next]);
                return out;
            }
        };
        return descriptor;
    };
}
exports.Roles = Roles;
function HasRole(role) {
    return function (target, propertyKey, descriptor) {
        var value = descriptor.value;
        descriptor.value = function (req, res, next) {
            var _roles = req.roles;
            var hasRole = false;
            if (_roles && _roles.length && _roles.map(function (r) { return r === role; })) {
                hasRole = true;
            }
            if (!hasRole) {
                return res.status(403).json({ message: "Unauthorized action. The role required for this action is => ".concat(role) });
            }
            else {
                var out = value.apply(this, [req, res, next]);
                return out;
            }
        };
    };
}
exports.HasRole = HasRole;
var log = function (target, propertyKey, descriptor) {
    // Capture the functional behavior of the decorated method
    var originalMethod = descriptor.value;
    // Override the decorated method's behavior with new behavior
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var msg;
        // The decorated method's parameters will be passed in as args.
        // We'll assume the decorated method might only have a single parameter,
        // check to see if it's been passed in the method
        if (args[0]) {
            msg = ("".concat(propertyKey, ", that has a parameter value: ").concat(args[0]));
        }
        else {
            msg = "".concat(propertyKey);
        }
        // Emit a message to the console
        console.log("Logger says - calling the method: ".concat(msg));
        // Execute the behavior originally programmed in
        // the decorated method
        var result = originalMethod.apply(this, args);
        // if the decorated method returned a value when executed,
        // capture that result
        if (result) {
            msg = "".concat(propertyKey, " and returned: ").concat(JSON.stringify(result));
        }
        else {
            msg = "".concat(propertyKey);
        }
        // Having executed the decorated method's behavior, emit
        // a message to the console report what happened
        console.log("Logger says - called the method: ".concat(msg));
        return result;
    };
    return descriptor;
};
exports.log = log;

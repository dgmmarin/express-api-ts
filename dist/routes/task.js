"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)();
var tasks = [];
var taskValidationRules = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('completed').isBoolean().withMessage('Completed must be a boolean'),
];
router.post('/', taskValidationRules, function (req, res) {
    var task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };
    tasks.push(task);
    res.status(201).json(task);
});
router.get('/', function (req, res) {
    res.json(tasks);
});
router.get('/:id', function (req, res) {
    var task = tasks.find(function (t) { return t.id === parseInt(req.params.id); });
    if (!task) {
        res.status(404).send('Task not found');
    }
    else {
        res.json(task);
    }
});
exports.default = router;

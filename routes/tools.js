const express = require('express');
const toolsController = require('../controllers/tools');
const router = express.Router();

router.get('/tools', toolsController.viewTools);
router.get('/tools/add', toolsController.addToolsForm);
//router.post('/tools/add', toolsController.addTools);
router.get('/tools/edit/:id', toolsController.editToolForm);
//router.post('/tools/edit/:id', toolsController.editTool);
router.get('/tools/delete/:id', toolsController.deleteTool);

//router.post('/tools/add', toolsController.addTool);
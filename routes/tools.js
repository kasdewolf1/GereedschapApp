const express = require('express');
const toolsController = require('../controllers/tools');
const router = express.Router();

router.get('/tools', toolsController.viewTools);
router.get('/tools/add', toolsController.addToolsForm);
//router.post('/tools/add', toolsController.addTools);
router.get('/tools/edit/:id', toolsController.editToolForm);
//router.post('/tools/edit/:id', toolsController.editTool);
router.get('/tools/delete/:id', toolsController.deleteTool);

function getUserIdFromRequest(req) {
    if (req.user && req.user.userId) {
        return req.user.userId;
    }
    return null;
}

// Route om gebruikersgegevens op te halen
router.get('/api/resource/:resourceId', (req, res) => {
    const resourceId = req.params.resourceId;
    const userId = getUserIdFromRequest(req);

    if (!userId) {
        return res.status(401).send('Gebruiker niet geauthenticeerd.');
    }

    // Voer hier acties uit op basis van userId, bijvoorbeeld gegevens ophalen uit de database
    res.send(`Gebruikers-ID: ${userId}, Resource-ID: ${resourceId}`);
});




module.exports = router;
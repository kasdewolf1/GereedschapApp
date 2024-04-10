const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


// Controllermethode om alle gereedschappen op te halen
exports.viewTools = (req, res) => {
    res.render('tools', { tools }); // Render de toolsweergave met de lijst van gereedschappen
};

// Controllermethode om het formulier voor het toevoegen van een nieuw gereedschap te tonen
exports.addToolsForm = (req, res) => {
    res.render('addTool'); // Render het formulier voor het toevoegen van een nieuw gereedschap
};

// Controllermethode om een nieuw gereedschap toe te voegen
exports.addTool = (req, res) => {
    const { name, description } = req.body;
    const newTool = { id: tools.length + 1, name, description };
    tools.push(newTool);
    res.redirect('/tools'); // Na toevoegen, doorverwijzen naar de toolsweergave
};

// Controllermethode om het bewerkingsformulier voor een gereedschap te tonen
exports.editToolForm = (req, res) => {
    const { id } = req.params;
    const tool = tools.find(tool => tool.id === parseInt(id));
    if (!tool) {
        return res.status(404).send('Gereedschap niet gevonden');
    }
    res.render('editTool', { tool }); // Render het bewerkingsformulier met de gegevens van het gereedschap
};

// Controllermethode om een gereedschap bij te werken
exports.editTool = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const toolIndex = tools.findIndex(tool => tool.id === parseInt(id));
    if (toolIndex === -1) {
        return res.status(404).send('Gereedschap niet gevonden');
    }
    tools[toolIndex] = { id: parseInt(id), name, description };
    res.redirect('/tools'); // Na bewerken, doorverwijzen naar de toolsweergave
};

// Controllermethode om een gereedschap te verwijderen
exports.deleteTool = (req, res) => {
    const { id } = req.params;
    tools = tools.filter(tool => tool.id !== parseInt(id));
    res.redirect('/tools'); // Na verwijderen, doorverwijzen naar de toolsweergave
};
const PersonController = require('../controllers/person.controller');
const { authenticate } = require('../config/jwt.congfig');

module.exports = (app) => {
app.post("/api/people", PersonController.createpeople );
app.get("/api/people", PersonController.getallpeople);
app.get("/api/people/:id", PersonController.getpeople) ;
app.put("/api/people/:id", PersonController.updatepeople );
app.delete("/api/people/:id", PersonController.deletepeople ) ;
}
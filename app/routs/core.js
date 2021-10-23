module.exports = (application) => {

    application.get('/', (req, res) => {
        application.app.control.core.index(req, res);
    });

    application.get('/register', (req, res) => {
        application.app.control.core.register(req, res, application);
    });

    application.post('/register', (req, res) => {
        application.app.control.core.register(req, res, application);
    });

    application.get('/login', (req, res) => {
        application.app.control.core.login(req, res, application);
    });

    application.post('/login', (req, res) => {
        application.app.control.core.login(req, res, application);
    });

    application.get('/schedule', (req, res) => {
        application.app.control.core.schedule(req, res, application);
    });

    application.get('/schedule1', (req, res) => {
        application.app.control.core.schedule1(req, res, application);
    });

    application.get('/schedule2', (req, res) => {
        application.app.control.core.schedule2(req, res, application);
    });

    application.post('/confirm-scheduling', (req, res) => {
        application.app.control.core.confirmScheduling(req, res, application);
    });

    application.get('/core-change-date', (req, res) => {
        application.app.control.core.coreChangeDate(req, res, application);
    });

    application.get('/test-schedule', (req, res) => {
        application.app.control.core.testSchedule(req, res, application);
    });

    application.post('/my-schedulings', (req, res) => {
        application.app.control.core.mySchedulings(req, res, application);
    });

    application.post('/core-cancel-scheduling', (req, res) => {
        application.app.control.core.cancelScheduling(req, res, application);
    });

    application.post('/client-message', (req, res) => {
        application.app.control.core.clientMessage(req, res, application);
    });

    application.get('/client-message-wapp', (req, res) => {
        application.app.control.core.clientMessageWApp(req, res);
    });

    application.post('/client-message-wapp', (req, res) => {
        application.app.control.core.clientMessageWApp(req, res, application);
    });


};
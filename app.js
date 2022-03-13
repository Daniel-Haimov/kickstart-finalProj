const express = require('express');
const hbs = require('hbs');
const app = express();
const session = require('client-sessions');
const sessionHelper = require('./middlewares/sessionMiddleware')


// session configuration
app.use(session({
    cookieName: 'session',
    secret: 'banana kick',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartial('style', '/views/partials/styles')
hbs.registerPartial('navigation', '/views/partials/navigation')
hbs.registerPartial('navigation', '/views/partials/adminNav')
hbs.registerPartial('navigation', '/views/partials/staffNav')

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/views'))
app.use(express.json());
app.use(express.urlencoded());

// Routers
const loginRouter = require('./routers/loginRouter');
const regRouter = require('./routers/regRouter');
const mainRouter = require('./routers/mainRouter');
const eventsRouter = require('./routers/eventsRouter');
const adminRouter = require('./routers/adminRouter');
const staffRouter = require('./routers/staffRouter');

app.use('/login', loginRouter);
app.use('/reg', regRouter);
app.use('/main', sessionHelper.refreshCookie, sessionHelper.requireLogin, mainRouter);
app.use('/events', sessionHelper.refreshCookie, sessionHelper.requireLogin, eventsRouter);
app.use('/admin', sessionHelper.refreshCookie, sessionHelper.requireLogin, adminRouter);
app.use('/staff', sessionHelper.refreshCookie, sessionHelper.requireLogin, staffRouter);


app.get('/', (request, response) => {
    response.redirect('/login');
});


app.get('/logout', (request, response) => {
    if (request.session && request.session.user) {
        delete request.session;
        delete request.session.user;
    }
    response.redirect('/login');
})

module.exports = app;
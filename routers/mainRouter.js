// router methods definitions go here!

const mysql = require("mysql");
const express = require('express');
const router = express.Router();
const eventConnector = require('../connectors/eventConnector.js');

// "/main"

router.get('/', async (request, response) => {
    try {
        response.render('main.hbs', {
            username: `${request.session.user.users_firstName} ${request.session.user.users_lastName}`,
            userPoints: `${request.session.user.users_point}`,
            userEmail: `${request.session.user.users_email}`,
            userID: `${request.session.user.users_id}`

        });
    }
    catch (err) {
        console.log(err);
        response.render('main.hbs', { err });
    }
})

router.post('/quit', async (request, response) => {
    try {
        console.log('the event id is', request.body.value);
        console.log('the user is', request.session.user.users_id);
        event_id = request.body.value;
        user_id = request.session.user.users_id;

        quittingEvent = await eventConnector.quittingEvent(user_id, event_id);
        response.render('main.hbs');
    }
    catch (err) {
        response.render('event.hbs', 'error')
    }
});

module.exports = router;
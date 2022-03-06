// router methods definitions go here!

const express = require('express');
const router = express.Router();
const eventConnector = require('../connectors/eventConnector.js');

// "/events"

router.get('/', async (request, response) => {
    try {
        let renderedEvents = eventConnector.renderEvents(await eventConnector.fetchEvents());
        response.render('events.hbs', { renderedEvents });

    }
    catch (err) {
        console.log(err);
        response.render('events.hbs', "error")
    }
});

router.post('/join', async (request, response) => {
    try {
        console.log('the event id is ', request.body.value);
        console.log('user is ', request.session.user.users_id);
        event_id = request.body.value;
        user_id = request.session.user.users_id;

        result = await eventConnector.determineJoined(user_id, event_id);

        console.log(result);

        if (result.length !== 0) {
            var isJoined = true;
            console.log('==================================================================');
            console.log('the student has enrolled');
            console.log('==================================================================');

        } else {
            var isJoined = false;
            console.log('==================================================================');
            console.log('the student is not yet enrolled');
            console.log('==================================================================');
        }

        if (isJoined === false) {
            joining = await eventConnector.joiningEvent(user_id, event_id);
        }
        response.redirect('/main');
    }
    catch (err) {
        response.render('events.hbs', "error")

    }

});

/* 
    fetch an event 
*/
router.get('/:id', async (req, res) => {
    try {
        let renderedEvents = eventConnector.renderEvents(await eventConnector.fetchEventById(req.params.id));
        res.render('events.hbs', { renderedEvents });

    }
    catch (err) {
        console.log(err);
        res.render('events.hbs', err)
    }
});



module.exports = router;



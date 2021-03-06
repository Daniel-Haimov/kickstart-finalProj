// router methods definitions go here!


const express = require('express');
const router = express.Router();
const eventConnector = require('../connectors/eventConnector');

// "/admin" handlers

router.get('/', async (request, response) => {
    try {
        let events = await eventConnector.fetchEvents();
        let renderedAdminEvents = eventConnector.renderAdminEvents(events);
        response.render('adminEvents.hbs', {
            renderedAdminEvents
        });
    }
    catch (err) {
        console.log(err);
        response.render('adminEvents.hbs', err)
    }

});


/* 
 *  handler for Admin events inputs  
 * takes inputs from forms to perform 
 * the two types of db interactions: Insert & Update 
 *  events_title, date, start_time, end_time, events_campus, events_location, events_points
 *  
 */
router.post('/', async (request, response) => {
    try {
        console.log("in post handler to the route '/admin'", request.body);

        if (request.body.isEdit === "true") {
            //  validate update render
            console.log("update an event", request.body);
            let inputs = [
                request.body.eventTitleInput,
                request.body.dateInput,
                request.body.endTimeInput,
                request.body.goalInput,
                request.body.descInput,
                request.body.imgInput

            ]
            let result = await eventConnector.updateEvent(request.body.eventIdInput, inputs);
            console.log("result from update event:", result);
        } else if (request.body.isEdit === "false") {
            console.log("insert an event", request.body);
            let inputs = [
                request.body.eventTitleInput,
                request.body.dateInput,
                request.body.endTimeInput,
                request.body.goalInput,
                request.body.descInput,
                request.session.user.users_id,
                request.body.imgInput
            ]
            let result = await eventConnector.insertEvent(inputs);
            console.log(result);
            //  validate insert render
            // validate(obj ) => for key of obj if null value raise error("wrong input")
        }

        // render updated list of events
        let events = await eventConnector.fetchEvents();
        let renderedAdminEvents = eventConnector.renderAdminEvents(events);
        response.render('adminEvents.hbs', {
            renderedAdminEvents
        });
    }
    catch (err) {
        response.render('adminEvents.hbs', {
            errorMessage: err
        });
    }
})


/* 
 * when admin clicks edit button of an event
 * send json of the event with the id of $id
 *  so that the front end js will fill the forms 
*/
router.get('/edit/:id', async (request, response) => {
    // validate request.params.id;
    let event = await eventConnector.fetchEventById(request.params.id);
    response.json({ event: event });

})

router.get('/delete/:id', async (request, response) => {
    try {
        // delete 
        let deleteEventResult = await eventConnector.deleteEventById(request.params.id);
        console.log(deleteEventResult);
        let events = await eventConnector.fetchEvents();
        let renderedAdminEvents = eventConnector.renderAdminEvents(events);
        response.render('adminEvents.hbs', {
            renderedAdminEvents
        });
    }

    catch (err) {
        console.log(err);
        response.render('adminEvents.hbs', err)
    }
})



module.exports = router;
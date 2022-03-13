// router methods definitions go here!


const express = require('express');
const router = express.Router();
const eventConnector = require('../connectors/eventConnector');
const usersConnector = require('../connectors/usersConnector');
// "/staff" handlers

router.get('/', async (request, response) => {
    try {
        response.redirect('/staff/events');
    }
    catch (err) {
        console.log(err);
        response.render('staffEvents.hbs', { errorMessage: "error" })
    }
});

router.get('/events', async (request, response) => {
    try {
        let events = await eventConnector.fetchEventsByUser(request.session.user.users_id);
        let renderedAdminEvents = eventConnector.renderAdminEvents(events);
        response.render('staffEvents.hbs', {
            renderedAdminEvents
        });

    }
    catch (err) {
        console.log(err);
        response.render('staffEvents.hbs', err)
    }
});


router.get('/events', (request, response) => {
    try {
        //shows the list of events the current staff is assigned with
        // each list shows the participants
        console.log("/staff/events");
        response.render('staffEvents.hbs', {})

    }
    catch (err) {
        console.log(err);
        response.render('staffEvents.hbs', { errorMessage: "error" })
    }
});

/* 
    for staff evetns page  
    input: sid(user id), eid(event id)
    output json of result from delete query on participation table  
    */
router.post('/delete', async (request, response) => {
    try {
        let sid = request.body.studentId;
        let eid = request.body.eventId;
        console.log(sid, eid);
        let result = await eventConnector.deleteParticipant(sid, eid);
        response.json({ result })
    }
    catch (e) {
        console.log(e);
        response.json(e)
    }
})


router.get('/challenges', (request, response) => {
    try {
        //shows the list of events the current staff is assigned with
        // each list shows the participants
        console.log("/staff/challenges");
        response.render('staffChallenges.hbs', {})
    }
    catch (err) {
        console.log(err);
        response.render('staffChallenges.hbs', { errorMessage: "error" })
    }
});

router.post('/challenges/student', async (request, response) => {
    try {
        let sid = request.body.studentIdInput;
        let student = await usersConnector.fetchUser(sid);
        if (student) {
            // fetch challenges from db
            // render challenges (format html with the info fetched from db) 
            response.render('staffChallenges.hbs', {
                studentId: student.users_id,
                studentName: student.users_firstName + " " + student.users_lastName,
                studentPoints: student.users_point,
                challenges: "<p style='color:red'>There is currently no challenge available...</p>"
            })
        } else {
            let msg = `<p>No Student with ${sid}`
            response.render('staffChallenges.hbs', {
                statusMsg: msg
            })
        }

    } catch (e) {
        let msg = `No Student with ${request.body.studentIdInput}`
        console.log(e);
        response.render('staffChallenges.hbs', {
            statusMsg: msg
        })
    }
})



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

router.post('/', async (request, response) => {
    try {
        console.log("in post handler to the route '/staff'", request.body);

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
        let events = await eventConnector.fetchEventsByUser(request.session.user.users_id);
        let renderedAdminEvents = eventConnector.renderAdminEvents(events);
        response.render('staffEvents.hbs', {
            renderedAdminEvents
        });
    }
    catch (err) {
        response.render('staffEvents.hbs', {
            errorMessage: err
        });
    }
})

module.exports = router;
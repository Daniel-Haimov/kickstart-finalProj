// router methods definitions go here!


const express = require('express');
const router = express.Router();
const userConnector = require('../connectors/usersConnector');
// "/reg"

router.post('/', async (request, response) => {
    // validation/authentication goes here
    try {
        //    let user_id2 = await userConnector.fetchUser(request.body.regID);

        //    if (!user_id2) {
        let inputs = [
            request.body.regID,
            request.body.regPw,
            request.body.regType,
            request.body.regPoint,
            request.body.regFname,
            request.body.regLname,
            request.body.regEmail
        ]
        let result = await userConnector.insertUser(inputs);
        console.log("result from update user:", result);


        let user = await userConnector.fetchUser(request.body.regID);
        if (user) {
            if (user.users_type == "admin") response.redirect('/admin');
            else if (user.users_type == 'staff') response.redirect('/staff');
            else response.redirect('/main');
        }
    }
    // }
    catch (err) {
        response.render('reg.hbs', { errMsg: err })
    }
});

router.get('/', async (request, response) => {
    try {
        if (request.session && request.session.user) {
            let user = await userConnector.fetchUser(request.session.user.users_id);
            if (user) {
                if (user.users_type == "admin") response.redirect('/admin');
                else if (user.users_type == "staff") response.redirect('/staff');
                else response.redirect('/main');
            }

        } else {
            response.render('reg.hbs', {});
        }
    }
    catch (err) {
        console.log(err)
    }
})
module.exports = router;
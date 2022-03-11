const mysql = require("mysql");

const insertEvent = (inputArray) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });


        connector.connect();

        connector.query("INSERT INTO `realkickstart`.`kickstart_events` (`events_id`, `events_title`, `events_date`, `events_end_time`, `events_goal`, `events_desc`, `events_isFinished`,`events_ammount`,`staff_id`,`events_img_src`) VALUES ( NULL, ? , ?, ?, ?, ?,'0',0,?,?);", inputArray, (error, rows, fields) => {
            if (error) reject(error); else resolve(rows);
        });

        connector.end();
    });
}

const updateEvent = (id, inputArray) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query("UPDATE kickstart_events SET events_title = ?, events_date = ?, events_end_time = ?,  events_goal =?, events_desc =?,events_img_src=? where events_id = ?",
            inputArray.concat([id]), (error, rows, fields) => {
                if (error) reject(error); else resolve(rows);
            });

        connector.end();
    });
}

const deleteEventById = (id) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query("DELETE FROM kickstart_events where events_id = ?", id, (error, rows, fields) => {
            if (error) {
                console.log("ERROR from deleteEventByID() ")
                reject(error);
            }
            else resolve("DELETE SUCCESS from events table");
        });

        connector.end();
    });
}

const deleteParticipationById = (id) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });


        connector.connect();

        connector.query("DELETE FROM participations where frn_events_id = ?", id, (error, rows, fields) => {
            if (error) {
                console.log("ERROR from deleteParticipationById() ")
                reject(error);
            } else resolve(rows);
        });

        connector.end();
    });
}


const fetchEventById = (id) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query("select * from kickstart_events where events_id = ?", id, (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();
    });
}

const fetchEventsByUser = (id) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query("select * from kickstart_events where staff_id = ?", id, (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();
    });
}


const fetchEvents = () => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query("select * from kickstart_events", (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();
    });
}

const fetchEventIdFromParticipation = () => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query("select frn_events_id from participations", (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();

    })
}

const renderAdminEvents = (rows) => {
    return rows.map(row =>
        `<tr><td><div class="leftRowPart">Title: ${row.events_title} <br> Date:   ${new Date(row.events_date).toString().split(" ").slice(1, 4).join(" ")} <br>End Time: ${row.events_end_time} </div>
        <div class=rightRowPart><button onclick="editEvent(${row.events_id})" class="adminEventEditButton">Edit</button>
        <button onclick="deleteEvent(${row.events_id})" class="adminEventDeleteButton">Delete</button><div>
        <button onclick="confirmEvent(${row.events_id})" class="adminEventDeleteButton">Finish</button><div></td></tr>`
    ).join("").replace(/\s\s+/g, " ");
}


const fetchFinishedEvents = () => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query("select * from kickstart_events where events_isFinished = 0", (error, rows, fields) => {
            if (error) {
                console.log("in fetchFnishedEvents(): ");
                reject(error);
            } else resolve(rows);
        });

        connector.end();
    })
}


const finishEventById = (eventId) => {
    let query = "update kickstart_events set events_isFinished = 1 where events_id = ?;"
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
        connector.query(query, eventId, (error, rows, fields) => {
            if (error) {
                console.log("in finishEventById(): ");
                reject(error);
            } else resolve(rows);
        });

        connector.end();
    })
}

const renderEvents = (rows) => {
    return rows.map(row => {
        let pic = row.events_img_src;
        let alt = "PROJECT";
        try {
            new URL(pic);
        } catch (_) {
            pic = "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg";
        }
        let result;
        if (row.events_ammount >= row.events_goal) {

        }

        return `<div class="blocks">
                <img alt=${alt} src=${pic} style="position: relative; width: 100%; height: auto; border-radius: .5rem;"/>
                
                <div class="eventboxdate">
                    <span class="eventDate">${row.events_date}</span><br/>
                    
                </div>
                
                <div class="eventboxinfo">
                    <h3>${row.events_title}</h3>
                    <span class="endTime">${row.events_end_time}</span><br/>
                    <span class="eventsGoal">Total ${row.events_ammount} </br>From ${row.events_goal}</span><br/>
                    <p class="eventsDesc">${row.events_desc}</p>
                    <label class="floatLabel" for="donateInput">donate here </label>
                        <input class="fieldInput" style="background:none;border:2px solid $clr-gray300;width:25%;border-radius:$radius; padding:0.5rem; outline:none" name="donateInput" min=0 max=3000000 id="donateInput${row.events_id}" type="number"
                            value="" required>

                    <button class="eventsButton"  onclick="Donate(${row.events_id}); event.target.innerHTML='Donated'; event.target.style.backgroundColor='#7e7e7e'">Donate</button>
                </div>

            </div>`
    }
    ).join("").replace(/\s\s+/g, " ");
}

const determineJoined = (event_id) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();
        connector.query("select * from kickstart_events where events_id = ? ;", [event_id], (error, rows, fields) => {
            if (error) reject(error); else resolve(rows);
        })

        connector.end();
    });

}


const donatingEvent = (event_id, ammount) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query("UPDATE kickstart_events SET events_ammount = events_ammount + ? WHERE events_id = ?;", [Number(ammount), Number(event_id)], (error, rows, fields) => {
            if (error) reject(error); else resolve(rows);
        });
        connector.end();
    });


}

const quittingEvent = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query("delete from participations where frn_users_id = ? and frn_events_id = ?;", [user_id, event_id], (error, rows, fields) => {
            if (error) reject(error); else resolve(rows);
        })

        connector.end();
    })
}



const defaultFetchEvent = () => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query("select * from kickstart_events where events_isFinished = 0;", (error, rows, fields) => {
            if (error) reject("couldn't connect to db");
            else resolve(rows);
        });

        connector.end();
    });
}


const fetchSearchedEvent = (word) => {
    return new Promise((resolve, reject) => {
        const connector = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "password",
            database: "realkickstart",
            port: 3306
        });

        connector.connect();

        connector.query("select * from kickstart_events where events_title like ? and events_isFinished = 0;", [word], (error, rows, fields) => {
            if (error) reject("couldn't connect to db"); else resolve(rows);
        });

        connector.end();
    });
}



module.exports = {
    fetchEventById,
    fetchEvents,
    //fetchFeaturedEvents,
    fetchFinishedEvents,
    fetchSearchedEvent,
    renderEvents,
    renderAdminEvents,
    donatingEvent,
    defaultFetchEvent,
    determineJoined,
    insertEvent,
    updateEvent,
    deleteEventById,
    quittingEvent,
    deleteParticipationById,
    finishEventById,
    fetchEventIdFromParticipation,
    fetchEventsByUser,
};

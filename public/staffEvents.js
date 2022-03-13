let isEdit = document.getElementById("isEdit");
let title = document.getElementById("eventTitleInput");
let date = document.getElementById("dateInput");
let startTime = document.getElementById("startTimeInput");
let endTime = document.getElementById("endTimeInput");
let campus = document.getElementById("campusInput");
let address = document.getElementById("location");
let goal = document.getElementById("goalInput");
let desc = document.getElementById("descriptionInput");
let inputH2 = document.getElementById("inputH2");
let idInput = document.getElementById("eventIdInput");


let selectedEvent;
let PopupDiv = document.getElementById("adminEventDeletePopupDiv")
let PopupDivTitle = document.getElementById("deletePopupTitle")
let PopupDivDate = document.getElementById("deletePopupDate")
let PopupDivStart = document.getElementById("deletePopupStartTime")
let PopupDivEnd = document.getElementById("deletePopupEndTime")
let PopupDivCampus = document.getElementById("deletePopupCampus")
let PopupDivLocation = document.getElementById("deletePopupLocation")
let PopupDivPoints = document.getElementById("deletePopupPoints")
let PopupDivDesc = document.getElementById("deletePopupDesc")
let PopupDivFeatured = document.getElementById("deletePopupFeatured")
let contentDiv = document.getElementById("contentDiv");

let adminEventFinishPopupDiv = document.getElementById("adminEventFinishPopupDiv");
let finishPopupTitle = document.getElementById("finishPopupTitle");
let finishPopupDate = document.getElementById("finishPopupDate");
let participantsList = document.getElementById("participantsList");

let greyDiv = document.getElementById("greyDiv");




const editEvent = (id) => {
    fetch(window.location.origin + "/staff/edit/" + id)
        .then(res => res.json())
        .then(res => {
            inputH2.innerHTML = "Update Event " + id;
            let event = res.event[0];
            console.log(event);
            isEdit.value = "true";
            idInput.value = event["events_id"];
            title.value = event["events_title"];
            date.value = event["events_date"].split("T")[0];
            endTime.value = event["events_end_time"];
            goal.value = event["events_goal"];
            desc.value = event["events_desc"];
            imgInput.value = event["events_img_src"]
        })
        .catch(err => console.log(err));
}

const deleteEvent = (id) => {
    selectedEvent = id;

    fetch(window.location.origin + "/staff/delete/" + id)
        .then(res => res.json())
        .then(res => {
            let event = res.event[0];
            console.log(event);
            PopupDivTitle.innerHTML = event["events_title"];
            PopupDivDate.innerHTML = event["events_date"].split("T")[0];
            PopupDivStart.innerHTML = event["events_start_time"];
            PopupDivEnd.innerHTML = event["events_end_time"];
            PopupDivCampus.innerHTML = event["events_campus"];
            PopupDivLocation.innerHTML = event["events_locations"];
            PopupDivPoints.innerHTML = event["events_points"];
            PopupDivDesc.innerHTML = event["events_desc"];
            PopupDivFeatured.innerHTML = event["events_isFeatured"] ? "Yes" : "No";
            PopupDiv.style.display = "block";
            greyDiv.style.display = "block";
        })
}

const closePopup = () => {
    PopupDiv.style.display = "none";
    adminEventFinishPopupDiv.style.display = "none";
    while (participantsList.firstChild) {
        participantsList.removeChild(participantsList.firstChild);
    }
    greyDiv.style.display = "none";
}

const deleteConfirmed = () => {
    window.location.replace(window.location.origin + "/staff/delete/" + selectedEvent);
}


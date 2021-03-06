var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        var leaders = response['leaders'];
        var resources = response['resources'];
        var nextMeeting = response['nextMeeting'];

        // Load leaders
        var countLeaders = leaders.length;
        var leaderHTML = '';
        var row = 0;
        for (var i = 0; i < countLeaders; i++) {
            leaderHTML += '<div class="leader"><img class="profile-image" src="' + leaders[i]['profilepic'] + '" alt="' + leaders[i]['name'] + '\'s profile" width="70%"><br><b>' + leaders[i]['name'] + ' | ' + leaders[i]['ranks'] + '</b><p>' + leaders[i]['class'] + '</p><a href="' + leaders[i]['href'] + '" target="_blank" rel="noopener">' + leaders[i]['hyperlink'] + '</a></div>';
            row++;
            if (row == 4 || i == countLeaders - 1) {
                var leaderRow = '<div class="row">' + leaderHTML + '</div>';
                document.getElementById('leaders').innerHTML += leaderRow;
                leaderHTML = '';
                row = 0;
            }
        }

        // Load resources
        var countResources = resources.length;
        for (var i = 0; i < countResources; i++) {
            var resourceHTML = '<li><div class="resource"><a href="' + resources[i]['link'] + '" target="_blank" rel="noopener"><img class="resource-image" alt="' + resources[i]['name'] + ' resource" src="' + resources[i]['thumbnail'] + '"></a><h4>' + resources[i]['name'] + '</h4><p>' + resources[i]['description'] + '</p></div></li>';
            document.getElementById('resource-list').innerHTML += resourceHTML;
        }

        //Load next meeting info
        var time = new Date(nextMeeting['time']);
        var location = nextMeeting['location'];
        var notes = nextMeeting['notes'];
        var timeString = time.toUTCString() + '+7';
        var duration = nextMeeting['duration'];
        var meetingHTML = '<div title="Add to Calendar" class="addeventatc">Add to Calendar<span class="start">' + nextMeeting['time'] + '</span><span class="timezone">UTC+7</span><span class="title">Hack Club Singgasana Meeting</span><span class="description">' + notes + '</span><span class="location">' + location + '</span></div>';
        var notesHTML = '<p><b>Notes: </b>' + notes + '</p>';
        document.getElementById('time').innerHTML = '&#128197; ' + timeString + ' (' + duration + ')';
        document.getElementById('location').innerHTML = '&#128205; ' + location;
        document.getElementById('meeting').innerHTML += meetingHTML + notesHTML;
    }
};
xhttp.open("GET", ".netlify/functions/getAirtable/getAirtable.js", true);
xhttp.send();

// Defer Airtable Form
function deferIframe() {
    var iframeElem = document.getElementById('apply-form');
    iframeElem.setAttribute('src', iframeElem.getAttribute('data-src'));
}
window.onload = deferIframe;

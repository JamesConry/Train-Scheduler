var firebaseConfig = {
    apiKey: "AIzaSyCe5mVKmK2-3YoJ0_K51mT3a7d9P8XRYps",
    authDomain: "train-scheduler-f96d1.firebaseapp.com",
    databaseURL: "https://train-scheduler-f96d1.firebaseio.com",
    projectId: "train-scheduler-f96d1",
    storageBucket: "",
    messagingSenderId: "559673947134",
    appId: "1:559673947134:web:dd7907780877e190d706af"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var trainName;
  var destination;
  var trainTime;
  var frequency;



$("#submit").on("click", function() {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#train-time").val().trim();
    frequency = $("#frequency").val().trim();

    // Code for handling the push
    database.ref().push({
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
    });
});

database.ref().on("child_added", function(snapshot) {
    var tableBody = $("<tbody>");
    var tableRow = $("<tr>");
    tableBody.append(tableRow);

    var name = $("<td>");
    name.text(snapshot.val().trainName);
    tableRow.append(name);

    var tempDestination = $("<td>");
    tempDestination.text(snapshot.val().destination);
    tableRow.append(tempDestination);

    var tempFrequency = $("<td>");
    tempFrequency.text(snapshot.val().frequency);
    tableRow.append(tempFrequency);

    var timeConverted = moment(snapshot.val().trainTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(timeConverted), "minutes");
    var remainder = diffTime % snapshot.val().frequency;
    var minutesTillTrain = snapshot.val().frequency - remainder;
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");
    
    var arrival = $("<td>");
    arrival.text(nextTrain);
    tableRow.append(arrival);

    var minutesAway = $("<td>");
    minutesAway.text(minutesTillTrain);
    tableRow.append(minutesAway);

    
    
    $(".table").append(tableBody);

});
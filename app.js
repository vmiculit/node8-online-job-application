// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Connect to DB
mongoose.connect('mongodb://localhost/omega3');

// Create Job Application Schema

var jobApplicationSchema = mongoose.Schema({
	name		: {type:  String, default: ""},
	bio			: {type:  String, default: ""},
	skills		: {type:  String, default: ""},
	experience	: {type:  Number, default: 0},
	reason		: {type:  String, default: ""},
})

// Resgister Job Application Collection

var JobApplication = mongoose.model('JobApplication', jobApplicationSchema)

// Routes \\

app.get('/', function(req, res) {
	res.sendFile('html/index.html', {root : './public'});
});

app.get('/application/:appID', function(req, res) {
	res.sendFile('html/application.html', {root : './public'});
});

// displays a list of applicants
app.get('/applicants', function(req, res){

	res.sendFile('html/applicants.html', {root : './public'});
});

// Applicant Data API

// Get Application List
app.get('/api/applicants', function(req, res){
	var applicants = [];
	JobApplication.find({}, function(err, applications){
		if(err){

		} else {
			applications.forEach(function(application){
				applicants.push(application);
			})
		res.send(applicants)
		}
	})
});


// Remove Specific Applicant
app.post('/api/applicants', function(req, res){
	JobApplication.remove({ _id : req.body.appID }, function(err, response){

	});

	var applicants = [];

	JobApplication.find({}, function(err, applications){
		if(err){

		} else {
			applications.forEach(function(application){
				applicants.push(application);
			})
		res.send(applicants);
		}
	})
})

// Get a specific Applicant

app.get('/api/applicants/:appID', function(req, res){

	JobApplication.find({ _id : req.params.appID }, function(err, application){
		if(err){
			console.log("Oops! I could not get that specific application!");

		} else {

			res.send(application)

		};
	});
});

// Create and applicant
app.post('/applicant', function(req, res){
	// Store Application to DB
	var application = new JobApplication({
		name		: req.body.name,
		bio			: req.body.bio,
		skills		: req.body.skills,
		experience	: req.body.years,
		reason		: req.body.why,
	})
	application.save(function(err, document){
	})

	// Here is where you need to get the data
	// from the post body and store it in the database
	res.redirect('html/success.html');
});



// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})
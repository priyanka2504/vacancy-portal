const express = require('express');
const app = express();

// const path = require('path');
// app.use(express.static(path.join(__dirname, "./")))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, post, options, put, get, patch, delete, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())


var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://varshant:nitvasu14@ds123151.mlab.com:23151/vacancy");

var nameSchema = new mongoose.Schema({
    name: String,
    empID: String,
    password: String,
    role: String,
    experience: String,
    location: String,
    technology: String,
    jobTitle: String,
    description: String,
    experienceRequired: String,
    jobLocation: String,
    technologies: String,
    jobID: String,
    ApppliedJobTitle: String,
    AppliedJobLocation: String,
    AppliedJobTechnology: String,
    userID: String,
    AppliedOn: String,
    PostedOn: String,
    phoneNo: String,
    userApplied: Array,
    startingDate: String,
    endingDate: String
});

var user = mongoose.model("user", nameSchema);
var Jobs = mongoose.model("Jobs", nameSchema);
var appliedJobs = mongoose.model("appliedJobs", nameSchema);

app.get('/users-list', (req, res) => {
    user.find({}, function (err, docs) {
        if (err)
            console.log('error occured in the database');
        res.send(docs);
    });
    return res;
});

app.get('/all-jobs', (req, res) => {
    Jobs.find({}, function (err, docs) {
        if (err)
            console.log('error occured in the database');
        res.send(docs);
    });
    return res;
});

app.post('/view-applied-job', (req, res) => {
    appliedJobs.find({ "userID": req.body.userID }, function (err, docs) {
        if (err)
            console.log('error occured in the database');
        res.send(docs);
    });
    return res;
});

app.post('/view-posted-job', (req, res) => {
    Jobs.find({ "jobID": req.body.jobID }, function (err, docs) {
        if (err)
            console.log('error occured in the database');
        res.send(docs);
    });
    return res;
});

app.post('/update-applied-user', (req, res) => {
    Jobs.update({ jobTitle: req.body.jobTitle }, { $push: { userApplied: req.body.userApplied } }, function (err, docs) {
        if (err)
            console.log('error occured in the database');
        res.send(docs);
    });
    return res;
});

app.post('/get-user-details', (req, res) => {
    user.find({ "empID": req.body.empID }, function (err, docs) {
        if (err)
            console.log('error occured in the database');
        res.send(docs);
    });
    return res;
});

app.post('/registered-users', (req, res) => {
    var myData = new user(
        {
            name: req.body.name,
            empID: req.body.empID,
            password: req.body.password,
            role: req.body.role,
            experience: req.body.experience,
            location: req.body.location,
            technology: req.body.technology,
            phoneNo: req.body.phoneNo
        });
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        })
});

app.post('/post-jobs', (req, res) => {
    var jobs = new Jobs(
        {
            jobID: req.body.jobID,
            jobTitle: req.body.jobTitle,
            description: req.body.description,
            experienceRequired: req.body.experienceRequired,
            jobLocation: req.body.jobLocation,
            technologies: req.body.technologies,
            PostedOn: req.body.PostedOn,
            userApplied: req.body.userApplied,
            startingDate: req.body.startingDate,
            endingDate: req.body.endingDate
        });
    jobs.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        })
});

app.post('/apply-job', (req, res) => {
    var applied = new appliedJobs(
        {
            ApppliedJobTitle: req.body.ApppliedJobTitle,
            AppliedJobLocation: req.body.AppliedJobLocation,
            AppliedJobTechnology: req.body.AppliedJobTechnology,
            userID: req.body.userID,
            AppliedOn: req.body.AppliedOn,
            jobID: req.body.jobID
        });
    applied.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        })
});

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//     } );
// }

const port = process.env.PORT || 2007;
app.listen(port, () => console.log(`Listening ${port}`))
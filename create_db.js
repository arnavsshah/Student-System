const driver = require('./config/db');
const fs = require('fs');
const faker = require('faker');

var session = driver.session();

/*
    creating an array 'files' consisting of all the names of all the files in the DATA directory
*/
fs.readdir('./DATA', function(err, files) {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    //will convert to map() later
    for (var i = 0; i < 50; i++) {
        //parsing data of each file as json object
        try {
            var obj = JSON.parse(fs.readFileSync('./DATA/' + files[i], 'utf8'));
        } catch (err) {
            console.log(err);
        }

        //formatting data for neo4j queries

        //array for randomisng domain name for the email ids
        let domainName = ['@yahoo.com', '@gmail.com', '@rediffmail.com', '@outlook.com'];

        var studentData = {
                //  id : ,
                name: obj.personal_info.name,
                // age : ,
                email: obj.personal_info.name.split(" ")[0].toLowerCase() + '_' + obj.personal_info.name.split(" ")[1].toLowerCase() + domainName[Math.floor(Math.random() * domainName.length)],
                phone: faker.phone.phoneNumber('9########'),
                // currentlyStudying: ,
                department: obj.experiences.education[0].field_of_study,
            }
            // console.log(studentData);

        var teacherData = {
                //  id : ,
                name: obj.personal_info.name,
                // age : ,
                email: obj.personal_info.name.split(" ")[0].toLowerCase() + '_' + obj.personal_info.name.split(" ")[1].toLowerCase() + domainName[Math.floor(Math.random() * domainName.length)],
                phone: faker.phone.phoneNumber('9########'),
                // currentlyTeaching: ,
                // department: ,
            }
            // console.log(teacherData);

        //split location string into city, state, country
        let place = obj.personal_info.location.split(", ");
        //spread operator in case location not mentioned
        var studentLocation = {
                // id : "",
                // latitude : "",
                // longitude : "",
                ...(place.length > 2) && { city: place[0] },
                ...(place.length > 1) && { state: place[1] },
                ...(place.length > 0) && { country: place[2] },
                // continent : "",
                // address : "",
                // postalCode : ""
            }
            // console.log(studentLocation);

        var institutes = obj.experiences.education.map(institute => {
                return {
                    // id:,
                    name: institute.name,
                    // website:,
                    // phone:,
                    degree: institute.degree,
                }
            })
            // console.log(institutes);

        //subjects --pending


        //skills
        var skills = obj.skills.map(skill => {
                return {
                    // id:,
                    name: skill.name
                }
            })
            // console.log(skills);

        //books --pending


        //courses
        var courses = obj.accomplishments.courses.map(course => {
                return {
                    // id:,
                    name: course,
                }
            })
            // console.log(courses);

        //interests
        var interests = obj.interests.map(interest => {
                return {
                    // id:,
                    name: interest,
                }
            })
            // console.log(interests);

        //clubs
        var clubs = obj.accomplishments.organizations.map(organization => {
                return {
                    // id:,
                    name: organization,
                }
            })
            // console.log(clubs);

        //projects
        var projects = obj.accomplishments.projects.map(project => {
                return {
                    // id:,
                    name: project,
                }
            })
            // console.log(projects);

        //languages
        var languages = obj.accomplishments.languages.map(language => {
                return {
                    // id:,
                    name: language,
                }
            })
            // console.log(languages);

        //Achievement
        var achievements = obj.accomplishments.honors.map(honor => {
                return {
                    // id:,
                    title: honor,
                    // description:,
                }
            })
            // console.log(achievements);

        //ResearchPaper
        var researchPapers = obj.accomplishments.publications.map(publication => {
                return {
                    // id:,
                    title: publication,
                    // citations:,
                }
            })
            // console.log(researchPapers);

        //Company
        var companies = obj.experiences.jobs.map(job => {
                return {
                    // id : "",
                    name: job.company.split("\n")[0],
                    field: job.description,
                    // foundedIn : ,
                    website: job.li_company_url,
                }
            })
            // console.log(companies);






































        /*
        var writeTxResultPromise = session.writeTransaction(async txc => {
            var res = await txc.run('CREATE (s:Student { id : "$id",name : "$name",age : "$age",email : "$email",phone : "$phone",currentlyStudying : "$currentlyStudying",department : "$department")', )
        });

        writeTxResultPromise
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
            .then(() => {
                session.close();
                // driver.close();
            })
        */
    }
})
/*
    subjects ---->
    Node creation --pending
    enrolledIn --pending (no subjects)
    completedSubject --pending(no subjects)
    teachesSubject --pending --no subject data
    
    book ----->
    Node creation --pending
    readBook --pending (no books)

    course ------>
    completedCourse --pending (no data about courses except name)
    
    hasSkill --done --no properties 
    interestedIn --done --no properties 
    speaksLanguage --done --no properties 

    date ----->
    publishedReasearchPaper --pending --no date in data
    hasDoneProject --pending --no dates in data
    hasAchieved --pending --no date in data
    
    topic data missing ----->

    hostel data not reqd. here
*/
// const driver = require('../../config/db');
const fs = require('fs');
const faker = require('faker');
const worldMapData = require('city-state-country');

// const session = driver.session();


//creating an array 'files' consisting of all the names of all the files in the DATA directory
fs.readdir('../../DATA', function(err, files) {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }
    //will convert to map() later
    for (var i = 0; i < 50; i++) {
        //parsing data of each file as json object
        try {
            var obj = JSON.parse(fs.readFileSync('../../DATA/' + files[i], 'utf8'));
        } catch (err) {
            console.log(err);
        }

        //formatting data for neo4j queries

        //array for randomisng domain name for the email ids
        let domainName = ['@yahoo.com', '@gmail.com', '@rediffmail.com', '@outlook.com'];
        var age = 2020 - parseInt(obj.experiences.education[0].date_range.split(" \u2013 ")[0]) + 18
        var studentData = {
            //  id : ,
            name: obj.personal_info.name,
            age: age,
            email: obj.personal_info.name.split(" ")[0].toLowerCase() + '_' + obj.personal_info.name.split(" ")[1].toLowerCase() + domainName[Math.floor(Math.random() * domainName.length)],
            phone: faker.phone.phoneNumber('9########'),
            // currentlyStudying: ,
            department: obj.experiences.education[0].field_of_study,
        }
        console.log(age);

        var teacherData = {
            //  id : ,
            name: obj.personal_info.name,
            // age : ,
            email: obj.personal_info.name.split(" ")[0].toLowerCase() + '_' + obj.personal_info.name.split(" ")[1].toLowerCase() + domainName[Math.floor(Math.random() * domainName.length)],
            phone: faker.phone.phoneNumber('9########'),
            // currentlyTeaching: ,
            // department: ,
        }

        //split location string into city, state, country
        let StudentlocStirng = obj.personal_info.location.split(", ");
        var studentLoc = {}
            //categorise city, state and country
        StudentlocStirng.forEach(place => {
                if (worldMapData.searchCountry(place).length > 0) {
                    studentLoc.country = place
                } else if (worldMapData.searchState(place).length > 0) {
                    studentLoc.state = place
                } else if (worldMapData.searchCity(place).length > 0) {
                    studentLoc.city = place
                }
            })
            //spread operator in case location not mentioned
        var studentLocation = {
            // id : "",
            // latitude : "",
            // longitude : "",
            // continent : "",
            // address : "",
            // postalCode : ""
            ...studentLoc
        }

        //institutes
        var institutes = obj.experiences.education.map(institute => {
            return {
                // id:,
                name: institute.name,
                // website:,
                // phone:,
                degree: institute.degree,
            }
        })

        //skills
        var skills = obj.skills.map(skill => {
            return {
                // id:,
                name: skill.name
            }
        })

        //courses
        var courses = obj.accomplishments.courses.map(course => {
            return {
                // id:,
                name: course,
            }
        })

        //interests
        var interests = obj.interests.map(interest => {
            return {
                // id:,
                name: interest,
            }
        })

        //clubs -in volunteering and organization
        var clubs1 = obj.experiences.volunteering.map(volunteer => {
            return {
                // id:,
                name: volunteer.company,
            }
        })
        var clubs2 = obj.accomplishments.organizations.map(organization => {
            return {
                // id:,
                name: organization,
            }
        })
        var clubs = [...clubs1, ...clubs2];

        //projects
        var projects = obj.accomplishments.projects.map(project => {
            return {
                // id:,
                name: project,
            }
        })

        //languages
        var languages = obj.accomplishments.languages.map(language => {
            return {
                // id:,
                name: language,
            }
        })

        //Achievements
        var achievements = obj.accomplishments.honors.map(honor => {
            return {
                // id:,
                title: honor,
                // description:,
            }
        })

        //ResearchPapers
        var researchPapers = obj.accomplishments.publications.map(publication => {
            return {
                // id:,
                title: publication,
                // citations:,
            }
        })

        //Companies
        var companies = obj.experiences.jobs.map(job => {
            return {
                // id : "",
                name: job.company.split("\n")[0],
                field: job.description,
                // foundedIn : ,
                website: job.li_company_url,
            }
        })

        //companyLocation
        var companyLocations = obj.experiences.jobs.map(job => {
            if (job.location === null) return {}
            let companyLocString = job.location.split(", ");

            let companyLoc = {}
                //categorise city, state and country
            companyLocString.forEach(place => {
                if (worldMapData.searchCountry(place).length > 0) {
                    companyLoc.country = place
                } else if (worldMapData.searchState(place).length > 0) {
                    companyLoc.state = place
                } else if (worldMapData.searchCity(place).length > 0) {
                    companyLoc.city = place
                }
            })
            return {
                // id : "",
                // latitude : "",
                // longitude : "",
                // continent : "",
                // address : "",
                // postalCode : ""
                ...companyLoc
            }
        })

        //relationship data --'rel' prefix

        //institute studied in
        var relStudiedIn = obj.experiences.education.map(studiedIn => {
            if (studiedIn.date_range === null) return {}
            let date = studiedIn.date_range.split(" \u2013 ");
            return {
                startDate: date[0],
                endDate: date[1],
                score: studiedIn.grades,
            }
        })

        //part of club
        var relPartOfClub = obj.experiences.volunteering.map(volunteer => {
            if (volunteer.date_range === null) return { position: volunteer.title, }
            let date = volunteer.date_range.split(" \u2013 ");
            return {
                startDate: date[0],
                endDate: date[1],
                position: volunteer.title,
            }
        })

        //worked in company
        var workedInCompany = obj.experiences.jobs.map(job => {
            if (job.date_range === null) return { position: job.title, }
            let date = job.date_range.split(" \u2013 ");
            return {
                startDate: date[0],
                endDate: date[1],
                position: job.title,
            }
        })

        var writeTxResultPromise = session.writeTransaction(async txc => {
            var studentNode = await txc.run('CREATE (s:Student { id : $id,name : $name,age : $age,email : $email,phone : $phone,currentlyStudying : $currentlyStudying,department : $department)', studentData)

            var studentLocationNode = await txc.run('CREATE (l:Location { id : $id,latitude : $latitude,longitude : $longitude,city : $city,state : $state,country : $country,continent : $continent,address : $address,postalCode : $postalCode})', studentLocation)

            var studentInstitutes = await institutes.map(institute => {
                return await txc.run('CREATE (i:Institute { id : $id, name : $name, website : $website, phone : $phone, degree : $degree } )', institute);
            })

            var studentCourses = await courses.map(course => {
                return await txc.run('CREATE (c:Course { id : $id, name : $name } )', course)
            })

            var studentSkills = await skills.map(skill => {
                return await txc.run('CREATE (c:Skill { id : $id, name : $name } )', skill)
            })

            var studentInterests = await interests.map(interest => {
                return await txc.run('CREATE (c:Interest { id : $id, name : $name } )', interest)
            })

            var studentClubs = await clubs.map(club => {
                return await txc.run('CREATE (c:Club { id : $id, name : $name } )', club)
            })

            var studentProjects = await projects.map(project => {
                return await txc.run('CREATE (c:Project { id : $id, name : $name } )', project)
            })

            var studentLanguages = await languages.map(language => {
                return await txc.run('CREATE (c:Language { id : $id, name : $name } )', language)
            })

            var studentAchievements = await achievements.map(achievement => {
                return await txc.run('CREATE (c:Achievement { id : $id, title : $title, description : &description} )', achievement)
            })

            var studentReseacrhPapers = await reseacrhPaper.map(reseacrhPaper => {
                return await txc.run('CREATE (c:ReseacrhPaper { id : $id, title : $title} )', reseacrhPaper)
            })



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
    }
})
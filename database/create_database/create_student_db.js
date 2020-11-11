/*
    book ----->
    data missing

    hostel -----> 
    data missing
    
    topic  ----->
    data missing
*/
const driver = require('../../config/db');
const fs = require('fs');
const faker = require('faker');
const worldMapData = require('city-state-country');

try {
    fs.readdir('../../DATA/Students/', async(err, files) => {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }
        for (var i = 0; i < files.length; i++) {
            var res = await create_db(files[i]);
            console.log(i);
        }
        driver.close();
    });

} catch (err) {
    console.log(err);
}

async function create_db(file_name) {
    let session = driver.session();

    //parsing data of each file as json object
    var obj = JSON.parse(fs.readFileSync('../../DATA/Students/' + file_name, 'utf8'));

    //formatting data for neo4j queries

    //array for randomisng domain name for the email ids
    let domainName = ['@yahoo.com', '@gmail.com', '@rediffmail.com', '@outlook.com'];
    var age = '',
        dept = '';
    if (obj.experiences.education.length > 0) {
        if (obj.experiences.education[0].date_range !== null) {
            age = 2020 - parseInt(obj.experiences.education[0].date_range.split(" \u2013 ")[0]) + 18;
        }
        dept = obj.experiences.education[0].field_of_study === null ? '' : obj.experiences.education[0].field_of_study;
    }

    var studentData = {
        //  id : ,
        studentData_name: obj.personal_info.name,
        studentData_age: age,
        studentData_email: obj.personal_info.name.split(" ")[0].toLowerCase() + '_' + obj.personal_info.name.split(" ")[1].toLowerCase() + domainName[Math.floor(Math.random() * domainName.length)],
        studentData_phone: faker.phone.phoneNumber('9########'),
        studentData_currentlyStudying: obj.currently_studying,
        studentData_department: dept,
        studentData_semester: Object.keys(obj.current_courses).length === 0 ? '' : Object.keys(obj.completed_college_courses).length + 1,
        studentData_isAlumni: Object.keys(obj.current_courses).length === 0,
    };

    var teacherData = {
        //  id : ,
        name: obj.personal_info.name,
        // age : ,
        email: obj.personal_info.name.split(" ")[0].toLowerCase() + '_' + obj.personal_info.name.split(" ")[1].toLowerCase() + domainName[Math.floor(Math.random() * domainName.length)],
        phone: faker.phone.phoneNumber('9########'),
        // currentlyTeaching: ,
        // department: ,
    }

    var studentLocation = {
        // id : "",
        studentLocation_latitude: '',
        studentLocation_longitude: '',
        studentLocation_continent: '',
        studentLocation_address: '',
        studentLocation_postalCode: '',
        studentLocation_city: '',
        studentLocation_state: '',
        studentLocation_country: ''
    };
    if (obj.personal_info.location !== null) {
        //split location string into city, state, country
        let studentlocStirng = obj.personal_info.location.split(", ");

        //categorise city, state and country
        studentlocStirng.forEach(place => {
            if (worldMapData.searchCountry(place).length > 0) {
                studentLocation.studentLocation_country = place
            } else if (worldMapData.searchState(place).length > 0) {
                studentLocation.studentLocation_state = place
            } else if (worldMapData.searchCity(place).length > 0) {
                studentLocation.studentLocation_city = place
            }
        });
    }


    //institutes
    var institutes = obj.experiences.education.map(institute => {
        return {
            // id:,
            institute_name: institute.name,
            institute_website: '',
            institute_phone: faker.phone.phoneNumber('9########'),
            institute_degree: institute.degree === null ? '' : institute.degree,
        }
    });


    //subjects --format {name: , credits: , sem:}
    var completedSubjects = [];
    Object.entries(obj.completed_college_courses).map(entry => {
        let key = entry[0];
        let value = entry[1];
        let valueWithSem = value.map(val => {
            val.sem = parseInt(key.charAt(3)); //sem number
            return val;
        })
        completedSubjects = completedSubjects.concat(valueWithSem);
    });

    var enrolledSubjects = [];
    Object.entries(obj.current_courses).map(entry => {
        let key = entry[0];
        let value = entry[1];
        let valueWithSem = value.map(val => {
            val.sem = parseInt(key.charAt(3)); //sem number
            return val;
        })
        enrolledSubjects = enrolledSubjects.concat(valueWithSem);
    });

    //skills
    var skills = obj.skills.map(skill => {
        return {
            // id:,
            skill_name: skill.name
        }
    })

    //courses
    var courses = obj.accomplishments.courses.map(course => {
        return {
            // id:,
            course_name: course,
        }
    });

    //interests
    var interests = obj.interests.map(interest => {
        return {
            // id:,
            interest_name: interest,
        }
    });

    //clubs -in volunteering and organization
    var clubs1 = obj.experiences.volunteering.map(volunteer => {
        return {
            // id:,
            club_name: volunteer.company,
        }
    });
    var clubs2 = obj.accomplishments.organizations.map(organization => {
        return {
            // id:,
            club_name: organization,
        }
    });
    var clubs = [...clubs1, ...clubs2];

    //projects
    var projects = obj.accomplishments.projects.map(project => {
        return {
            // id:,
            project_name: project,
            project_description: ''
        }
    });

    //languages
    var languages = obj.accomplishments.languages.map(language => {
        return {
            // id:,
            language_name: language,
        }
    });

    //Achievements
    var achievements = obj.accomplishments.honors.map(honor => {
        return {
            // id:,
            achievement_title: honor,
            achievement_description: '',
        }
    });


    //ResearchPapers
    var researchPapers = obj.accomplishments.publications.map(publication => {
        return {
            // id:,
            researchPaper_title: publication,
            researchPaper_description: '',
            //citations:,
        }
    });

    //Companies
    var companies = obj.experiences.jobs.map(job => {
        return {
            // id : "",
            company_name: job.company.split("\n")[0],
            company_field: job.description === null ? '' : job.description,
            company_website: job.li_company_url === null ? '' : job.li_company_url,
        }
    });

    //companyLocation
    var companyLocations = obj.experiences.jobs.map(job => {

        let companyLocation = {
            // id : "",
            companyLocation_latitude: '',
            companyLocation_longitude: '',
            companyLocation_continent: '',
            companyLocation_address: '',
            companyLocation_postalCode: '',
            companyLocation_city: '',
            companyLocation_state: '',
            companyLocation_country: ''
        };

        if (job.location === null) return companyLocation;

        let companyLocString = job.location.split(", ");

        //categorise city, state and country
        companyLocString.forEach(place => {
            if (worldMapData.searchCountry(place).length > 0) {
                companyLocation.companyLocation_country = place
            } else if (worldMapData.searchState(place).length > 0) {
                companyLocation.companyLocation_state = place
            } else if (worldMapData.searchCity(place).length > 0) {
                companyLocation.companyLocation_city = place
            }
        });
        return companyLocation;
    });

    //relationship data --'rel' prefix

    //institute studied in
    var relStudiedIn = obj.experiences.education.map(studiedIn => {
        let res = {
            relStudiedIn_startDate: '',
            relStudiedIn_endDate: '',
            relStudiedIn_score: studiedIn.grades === null ? '' : studiedIn.grades,
        }
        if (studiedIn.date_range !== null) {
            let date = studiedIn.date_range.split(" \u2013 ");
            res.relStudiedIn_startDate = date[0] === undefined ? '' : date[0];
            res.relStudiedIn_endDate = date[1] === undefined ? '' : date[1];
        }
        return res;
    });

    //enrolled in a subject (current subject) --no properties
    //completed a subject (past subject) --no properties


    //part of club
    var relPartOfClub = obj.experiences.volunteering.map(volunteer => {
        let res = {
            relPartOfClub_startDate: '',
            relPartOfClub_endDate: '',
            relPartOfClub_position: volunteer.title === null ? '' : volunteer.title,
        }
        if (volunteer.date_range !== null) {
            let date = volunteer.date_range.split(" \u2013 ");
            res.relPartOfClub_startDate = date[0] === undefined ? '' : date[0];
            res.relPartOfClub_endDate = date[1] === undefined ? '' : date[1];
        }
        return res;
    });

    //worked in company
    var relWorkedInCompany = obj.experiences.jobs.map(job => {
        let res = {
            workedInCompany_startDate: '',
            workedInCompany_endDate: '',
            workedInCompany_position: job.title === null ? '' : job.title,
        }
        if (job.date_range !== null) {
            let date = job.date_range.split(" \u2013 ");

            res.workedInCompany_startDate = date[0] === undefined ? '' : date[0];
            res.workedInCompany_endDate = date[1] === undefined ? '' : date[1];
        }
        return res;
    });


    var writeTxResultPromise = await session.writeTransaction(async txc => {

        var studentLivesInLocationData = {
            ...studentData,
            ...studentLocation,
        }
        var studentLivesInLocation = await txc.run('MERGE (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni}) MERGE (l:Location { latitude : $studentLocation_latitude, longitude : $studentLocation_longitude, city : $studentLocation_city, state : $studentLocation_state, country : $studentLocation_country, continent : $studentLocation_continent, address : $studentLocation_address, postalCode : $studentLocation_postalCode}) MERGE (s) - [:LIVES_IN] -> (l);', studentLivesInLocationData);

        for (var j = 0; j < institutes.length; j++) {
            var studentStudiedInInstituteData = {
                ...studentData,
                ...institutes[j],
                ...relStudiedIn[j]
            }

            var studentStudiedInInstitute = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni}) MERGE (i:Institute { name : $institute_name, website : $institute_website, phone : $institute_phone, degree : $institute_degree } ) MERGE (s) - [:STUDIED_IN { startDate : $relStudiedIn_startDate, endDate : $relStudiedIn_endDate, score : $relStudiedIn_score }] -> (i);', studentStudiedInInstituteData);
        };

        completedSubjects.map(async completedSubject => {
            var studentCompletedSubjectData = {
                ...studentData,
                ...completedSubject,
            }
            var studentCompletedSubject = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni}) MERGE (sub:Subject { name : $name, credits : $credits, sem : $sem}) MERGE (s) - [:COMPLETED] -> (sub);', studentCompletedSubjectData);
        });

        enrolledSubjects.map(async enrolledSubject => {
            var studentEnrolledSubjectData = {
                ...studentData,
                ...enrolledSubject,
            }
            var studentEnrolledSubject = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni}) MERGE (sub:Subject { name : $name, credits : $credits, sem : $sem}) MERGE (s) - [:ENROLLED] -> (sub);', studentEnrolledSubjectData);
        });

        skills.map(async skill => {
            var studentHasSkillData = {
                ...studentData,
                ...skill,
            }
            var studentHasSkill = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni}) MERGE (sk:Skill { name : $skill_name}) MERGE (s) - [:HAS] -> (sk);', studentHasSkillData);
        });

        courses.map(async course => {
            var studentCompletedCourseData = {
                ...studentData,
                ...course,
            }
            var studentCompletedCourse = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni}) MERGE (c:Course { name : $course_name}) MERGE (s) - [:COMPLETED] -> (c);', studentCompletedCourseData);
        });

        interests.map(async interest => {
            var studentHasInterestData = {
                ...studentData,
                ...interest,
            }
            var studentHasInterest = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni}) MERGE (i:Interest { name : $interest_name}) MERGE (s) - [:INTERESTED_IN] -> (i);', studentHasInterestData);
        });

        languages.map(async language => {
            var studentSpeakslanguageData = {
                ...studentData,
                ...language,
            };
            var studentSpeakslanguage = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni}) MERGE (l:Language { name : $language_name}) MERGE (s) - [:SPEAKS] -> (l);', studentSpeakslanguageData);
        });

        achievements.map(async achievement => {
            var studentHasAchievedAchievementData = {
                ...studentData,
                ...achievement,
            };
            var studentHasAchievedAchievement = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni}) MERGE (a:Achievement { title : $achievement_title, description : $achievement_description}) MERGE (s) - [:HAS_ACHIVED] -> (r);', studentHasAchievedAchievementData)
        });

        researchPapers.map(async researchPaper => {
            var studentPublishedResearchPaperData = {
                ...studentData,
                ...researchPaper,
            };
            var studentPublishedResearchPaper = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni}) MERGE (r:ResearchPaper {title : $researchPaper_title, description : $researchPaper_description}) MERGE (s) - [:PUBLISHED] -> (r);', studentPublishedResearchPaperData)
        });

        projects.map(async project => {
            var studentHasDoneProjectData = {
                ...studentData,
                ...project,
            };
            var studentHasDoneProject = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni}) MERGE (p:Project { name : $project_name, description : $project_description}) MERGE (s) - [:HAS_DONE] -> (p);', studentHasDoneProjectData)
        });

        for (var j = 0; j < companies.length; j++) {
            var studentWorkedInCompanyData = {
                ...studentData,
                ...companies[j],
                ...relWorkedInCompany[j],
            };
            var studentWorkedInCompany = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni}) MERGE (c:Company { name : $company_name, field : $company_field, website : $company_website}) MERGE (s) - [:WORKED_IN { startDate : $workedInCompany_startDate , endDate : $workedInCompany_endDate, position : $workedInCompany_position }] -> (c);', studentWorkedInCompanyData);
        }

        for (var j = 0; j < companies.length; j++) {
            var companyLocatedInLocationData = {
                ...companies[j],
                ...companyLocations[j],
            };
            var companyLocatedInLocation = await txc.run('MATCH (c:Company { name : $company_name, field : $company_field, website : $company_website}) MERGE (l:Location { latitude : $companyLocation_latitude, longitude : $companyLocation_longitude, city : $companyLocation_city, state : $companyLocation_state, country : $companyLocation_country, continent : $companyLocation_continent, address : $companyLocation_address, postalCode : $companyLocation_postalCode}) MERGE (c) - [:LOCATED_IN] -> (l);', companyLocatedInLocationData)
        }
    });
    session.close();
}
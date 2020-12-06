const driver = require('../../config/db');
const fs = require('fs');
const faker = require('faker');
const bcrypt = require('bcryptjs');

try {
    fs.readdir('../../DATA/Students/', async(err, files) => {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }

        let session = driver.session();
        var dbConstraints = await session.writeTransaction(async txc => {
            var existsStudentName = await txc.run('CREATE CONSTRAINT exists_student_name IF NOT EXISTS ON (s:Student) ASSERT EXISTS (s.name)')
            var existsStudentEmail = await txc.run('CREATE CONSTRAINT exists_student_email IF NOT EXISTS ON (s:Student) ASSERT EXISTS (s.email)')
            var existsStudentPassword = await txc.run('CREATE CONSTRAINT exists_student_password IF NOT EXISTS ON (s:Student) ASSERT EXISTS (s.password)')
            var existsInstituteName = await txc.run('CREATE CONSTRAINT exists_institute_name IF NOT EXISTS ON (i:Institute) ASSERT EXISTS (i.name)')
            var existsSkillName = await txc.run('CREATE CONSTRAINT exists_skill_name IF NOT EXISTS ON (s:Skill) ASSERT EXISTS (s.name)')
            var existsCourseName = await txc.run('CREATE CONSTRAINT exists_course_name IF NOT EXISTS ON (c:Course) ASSERT EXISTS (c.name)')
            var existsSubjectName = await txc.run('CREATE CONSTRAINT exists_subject_name IF NOT EXISTS ON (s:Subject) ASSERT EXISTS (s.name)')
            var existsInterestName = await txc.run('CREATE CONSTRAINT exists_interest_name IF NOT EXISTS ON (i:Interest) ASSERT EXISTS (i.name)')
            var existsLanguageName = await txc.run('CREATE CONSTRAINT exists_language_name IF NOT EXISTS ON (l:Language) ASSERT EXISTS (l.name)')
            var existsClubName = await txc.run('CREATE CONSTRAINT exists_club_name IF NOT EXISTS ON (c:Club) ASSERT EXISTS (c.name)')
            var existsAchievementTitle = await txc.run('CREATE CONSTRAINT exists_achievement_title IF NOT EXISTS ON (a:Achievement) ASSERT EXISTS (a.title)')
            var existsProjectName = await txc.run('CREATE CONSTRAINT exists_project_name IF NOT EXISTS ON (p:Project) ASSERT EXISTS (p.name)')
            var existsResearchPaperTitle = await txc.run('CREATE CONSTRAINT exists_researchPaper_title IF NOT EXISTS ON (r:ResearchPaper) ASSERT EXISTS (r.title)')
            var existsCompanyName = await txc.run('CREATE CONSTRAINT exists_company_name IF NOT EXISTS ON (c:Company) ASSERT EXISTS (c.name)')
            var uniqueStudentEmail = await txc.run('CREATE CONSTRAINT unique_student_email IF NOT EXISTS ON (s:Student) ASSERT s.email IS UNIQUE');
            var uniqueStudentPhone = await txc.run('CREATE CONSTRAINT unique_student_phone IF NOT EXISTS ON (s:Student) ASSERT s.phone IS UNIQUE');
        });
        session.close();

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
    let age = '',
        dept = '',
        password = 'password',
        hashed_password = '';

    if (obj.experiences.education.length > 0) {
        if (obj.experiences.education[0].date_range !== null) {
            age = 2020 - parseInt(obj.experiences.education[0].date_range.split(" \u2013 ")[0]) + 18;
        }
        dept = obj.experiences.education[0].field_of_study === null ? '' : obj.experiences.education[0].field_of_study;
    }

    hashed_password = await bcrypt.hash(password, 10);

    var studentData = {
        //  id : ,
        studentData_name: obj.personal_info.name,
        studentData_age: age,
        studentData_email: obj.personal_info.name.split(" ")[0].toLowerCase() + '_' + obj.personal_info.name.split(" ")[1].toLowerCase() + domainName[Math.floor(Math.random() * domainName.length)],
        studentData_password: hashed_password,
        studentData_phone: faker.phone.phoneNumber('9########'),
        studentData_currentlyStudying: obj.currently_studying,
        studentData_department: dept,
        studentData_semester: Object.keys(obj.current_courses).length === 0 ? '' : (Object.keys(obj.completed_college_courses).length + 1).toString(),
        studentData_class: obj.class_name === undefined ? '' : obj.class_name,
        studentData_isAlumni: Object.keys(obj.current_courses).length === 0,
    };

    // var address = obj.fake_address.split(', ');
    var studentLocation = {
        // id : "",
        studentLocation_latitude: obj.latitude,
        studentLocation_longitude: obj.longitude,
        studentLocation_address: obj.fake_address,
        // studentLocation_district: address[1],
        // studentLocation_city: address[0],
        // studentLocation_postalCode: !NaN(address[3]) ? address[3] : '',
        // studentLocation_state: address[2],
        // studentLocation_country: address[address.length]
    };


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

    //instituteLocation
    var instituteLocations = obj.experiences.education.map(institute => {

        let instituteLocation = {
            // id : "",
            instituteLocation_latitude: institute.latitude,
            instituteLocation_longitude: institute.longitude,
            instituteLocation_address: institute.fake_address,
            // instituteLocation_district: '',
            // instituteLocation_postalCode: '',
            // instituteLocation_city: '',
            // instituteLocation_state: '',
            // instituteLocation_country: ''
        };
        return instituteLocation;
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
            companyLocation_latitude: job.latitude,
            companyLocation_longitude: job.longitude,
            companyLocation_address: job.fake_address,
            // companyLocation_district: '',
            // companyLocation_postalCode: '',
            // companyLocation_city: '',
            // companyLocation_state: '',
            // companyLocation_country: ''
        };
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
    var relPartOfClub1 = obj.experiences.volunteering.map(volunteer => {
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
    var relPartOfClub2 = obj.accomplishments.organizations.map(organization => {
        let res = {
            relPartOfClub_startDate: '',
            relPartOfClub_endDate: '',
            relPartOfClub_position: 'Intern',
        }
        return res;
    });
    var relPartOfClub = [...relPartOfClub1, ...relPartOfClub2];

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
        var studentLivesInLocation = await txc.run('MERGE (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, password : $studentData_password, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni, class : $studentData_class}) MERGE (l:Location { latitude : $studentLocation_latitude, longitude : $studentLocation_longitude, address : $studentLocation_address}) MERGE (s) - [:LIVES_IN] -> (l);', studentLivesInLocationData);

        for (var j = 0; j < institutes.length; j++) {
            var studentStudiedInInstituteData = {
                ...studentData,
                ...institutes[j],
                ...relStudiedIn[j]
            }

            var studentStudiedInInstitute = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, password : $studentData_password, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni, class : $studentData_class}) MERGE (i:Institute { name : $institute_name, website : $institute_website, phone : $institute_phone, degree : $institute_degree } ) MERGE (s) - [:STUDIED_IN { startDate : $relStudiedIn_startDate, endDate : $relStudiedIn_endDate, score : $relStudiedIn_score }] -> (i);', studentStudiedInInstituteData);
        };

        for (var j = 0; j < institutes.length; j++) {
            var instituteLocatedInLocationData = {
                ...institutes[j],
                ...instituteLocations[j],
            };
            var instituteLocatedInLocation = await txc.run('MATCH (i:Institute { name : $institute_name, website : $institute_website, phone : $institute_phone, degree : $institute_degree }) MERGE (l:Location { latitude : $instituteLocation_latitude, longitude : $instituteLocation_longitude, address : $instituteLocation_address}) MERGE (i) - [:LOCATED_IN] -> (l);', instituteLocatedInLocationData)
        }

        completedSubjects.map(async completedSubject => {
            var studentCompletedSubjectData = {
                ...studentData,
                ...completedSubject,
            }
            var studentCompletedSubject = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, password : $studentData_password, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni, class : $studentData_class}) MERGE (sub:Subject { name : $name, credits : $credits, sem : $sem}) MERGE (s) - [:COMPLETED] -> (sub);', studentCompletedSubjectData);
        });

        enrolledSubjects.map(async enrolledSubject => {
            var studentEnrolledSubjectData = {
                ...studentData,
                ...enrolledSubject,
            }
            var studentEnrolledSubject = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, password : $studentData_password, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni, class : $studentData_class}) MERGE (sub:Subject { name : $name, credits : $credits, sem : $sem}) MERGE (s) - [:ENROLLED] -> (sub);', studentEnrolledSubjectData);
        });

        skills.map(async skill => {
            var studentHasSkillData = {
                ...studentData,
                ...skill,
            }
            var studentHasSkill = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, password : $studentData_password, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni, class : $studentData_class}) MERGE (sk:Skill { name : $skill_name}) MERGE (s) - [:HAS] -> (sk);', studentHasSkillData);
        });

        courses.map(async course => {
            var studentCompletedCourseData = {
                ...studentData,
                ...course,
            }
            var studentCompletedCourse = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, password : $studentData_password, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni, class : $studentData_class}) MERGE (c:Course { name : $course_name}) MERGE (s) - [:COMPLETED] -> (c);', studentCompletedCourseData);
        });

        interests.map(async interest => {
            var studentHasInterestData = {
                ...studentData,
                ...interest,
            }
            var studentHasInterest = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, password : $studentData_password, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni, class : $studentData_class}) MERGE (i:Interest { name : $interest_name}) MERGE (s) - [:INTERESTED_IN] -> (i);', studentHasInterestData);
        });

        languages.map(async language => {
            var studentSpeakslanguageData = {
                ...studentData,
                ...language,
            };
            var studentSpeakslanguage = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, password : $studentData_password, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni, class : $studentData_class}) MERGE (l:Language { name : $language_name}) MERGE (s) - [:SPEAKS] -> (l);', studentSpeakslanguageData);
        });

        achievements.map(async achievement => {
            var studentHasAchievedAchievementData = {
                ...studentData,
                ...achievement,
            };
            var studentHasAchievedAchievement = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, password : $studentData_password, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni, class : $studentData_class}) MERGE (a:Achievement { title : $achievement_title, description : $achievement_description}) MERGE (s) - [:HAS_ACHIVED] -> (r);', studentHasAchievedAchievementData)
        });

        researchPapers.map(async researchPaper => {
            var studentPublishedResearchPaperData = {
                ...studentData,
                ...researchPaper,
            };
            var studentPublishedResearchPaper = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, password : $studentData_password, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni, class : $studentData_class}) MERGE (r:ResearchPaper {title : $researchPaper_title, description : $researchPaper_description}) MERGE (s) - [:PUBLISHED] -> (r);', studentPublishedResearchPaperData)
        });

        projects.map(async project => {
            var studentHasDoneProjectData = {
                ...studentData,
                ...project,
            };
            var studentHasDoneProject = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, password : $studentData_password, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni, class : $studentData_class}) MERGE (p:Project { name : $project_name, description : $project_description}) MERGE (s) - [:HAS_DONE] -> (p);', studentHasDoneProjectData)
        });

        for (var j = 0; j < clubs.length; j++) {
            var studentPartOfClubData = {
                ...studentData,
                ...clubs[j],
                ...relPartOfClub[j],
            };
            var studentPartOfClub = await txc.run('MERGE (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, password : $studentData_password, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department}) MERGE (c:Club { name : $club_name}) MERGE (s) - [:PART_OF { startDate : $relPartOfClub_startDate, endDate : $relPartOfClub_endDate, position : $relPartOfClub_position }] -> (c);', studentPartOfClubData);
        }

        for (var j = 0; j < companies.length; j++) {
            var studentWorkedInCompanyData = {
                ...studentData,
                ...companies[j],
                ...relWorkedInCompany[j],
            };
            var studentWorkedInCompany = await txc.run('MATCH (s:Student { name : $studentData_name, age : $studentData_age, email : $studentData_email, password : $studentData_password, phone : $studentData_phone, currentlyStudying : $studentData_currentlyStudying, department : $studentData_department, semester : $studentData_semester, isAlumni : $studentData_isAlumni, class : $studentData_class}) MERGE (c:Company { name : $company_name, field : $company_field, website : $company_website}) MERGE (s) - [:WORKED_IN { startDate : $workedInCompany_startDate , endDate : $workedInCompany_endDate, position : $workedInCompany_position }] -> (c);', studentWorkedInCompanyData);
        }

        for (var j = 0; j < companies.length; j++) {
            var companyLocatedInLocationData = {
                ...companies[j],
                ...companyLocations[j],
            };
            var companyLocatedInLocation = await txc.run('MATCH (c:Company { name : $company_name, field : $company_field, website : $company_website}) MERGE (l:Location { latitude : $companyLocation_latitude, longitude : $companyLocation_longitude, address : $companyLocation_address}) MERGE (c) - [:LOCATED_IN] -> (l);', companyLocatedInLocationData)
        }
    });
    session.close();
}
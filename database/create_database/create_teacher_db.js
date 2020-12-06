const driver = require('../../config/db');
const fs = require('fs');
const faker = require('faker');
const bcrypt = require('bcryptjs');

try {
    fs.readdir('../../DATA/Faculty/', async(err, files) => {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }

        let session = driver.session();
        var dbConstraints = await session.writeTransaction(async txc => {
            var existsTeacherName = await txc.run('CREATE CONSTRAINT exists_teacher_name IF NOT EXISTS ON (t:Teacher) ASSERT EXISTS (t.name)');
            var existsTeacherEmail = await txc.run('CREATE CONSTRAINT exists_teacher_email IF NOT EXISTS ON (t:Teacher) ASSERT EXISTS (t.email)');
            var existsTeacherPassword = await txc.run('CREATE CONSTRAINT exists_teacher_password IF NOT EXISTS ON (t:Teacher) ASSERT EXISTS (t.password)')
            var uniqueTeacherEmail = await txc.run('CREATE CONSTRAINT unique_teacher_email IF NOT EXISTS ON (t:Teacher) ASSERT t.email IS UNIQUE');
            var uniqueTeacherPhone = await txc.run('CREATE CONSTRAINT unique_teacher_phone IF NOT EXISTS ON (t:Teacher) ASSERT t.phone IS UNIQUE');
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

    var obj = JSON.parse(fs.readFileSync('../../DATA/Faculty/' + file_name, 'utf8'));

    let domainName = ['@yahoo.com', '@gmail.com', '@rediffmail.com', '@outlook.com'];
    let age = '',
        dept = '',
        password = 'password',
        hashed_password = '';

    if (obj.experiences.education.length > 0) {
        if (obj.experiences.education[0].date_range !== null) {
            age = 2020 - parseInt(obj.experiences.education[0].date_range.split(" \u2013 ")[0]) + 22;
        }
        dept = obj.experiences.education[0].field_of_study === null ? '' : obj.experiences.education[0].field_of_study;
    }

    hashed_password = await bcrypt.hash(password, 10);

    var teacherData = {

        teacherData_name: obj.personal_info.name,
        teacherData_age: age,
        teacherData_email: obj.personal_info.name.split(" ")[0].toLowerCase() + '_' + obj.personal_info.name.split(" ")[1].toLowerCase() + domainName[Math.floor(Math.random() * domainName.length)],
        teacherData_password: hashed_password,
        teacherData_phone: faker.phone.phoneNumber('9########'),
        teacherData_currentlyTeaching: true,
        teacherData_department: dept,
        teacherData_field_of_teaching: obj.field_of_teaching,
    };

    var teacherLocation = {
        // id : "",
        teacherLocation_latitude: obj.latitude,
        teacherLocation_longitude: obj.longitude,
        teacherLocation_address: obj.fake_address,
        // teacherLocation_district: '',
        // teacherLocation_postalCode: '',
        // teacherLocation_city: '',
        // teacherLocation_state: '',
        // teacherLocation_country: ''
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

    //subjects_taught
    var subjects_taught = obj.subjects_teaching.map(subject => {
        return {
            // id:,
            subject_name: subject,
        }
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
            // companyLocation_address: '',
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

        var teacherLivesInLocationData = {
            ...teacherData,
            ...teacherLocation,
        }
        var teacherLivesInLocation = await txc.run('MATCH (t:Teacher { name : $teacherData_name, age : $teacherData_age, email : $teacherData_email, password : $teacherData_password, phone : $teacherData_phone, currentlyTeaching : $teacherData_currentlyTeaching, department : $teacherData_department, field_of_teaching : $teacherData_field_of_teaching}) MERGE (l:Location { latitude : $teacherLocation_latitude, longitude : $teacherLocation_longitude, address : $teacherLocation_address}) MERGE (t) - [:LIVES_IN] -> (l);', teacherLivesInLocationData);

        for (var j = 0; j < institutes.length; j++) {
            var teacherStudiedInInstituteData = {
                ...teacherData,
                ...institutes[j],
                ...relStudiedIn[j]
            }

            var teacherStudiedInInstitute = await txc.run('MATCH (t:Teacher { name : $teacherData_name, age : $teacherData_age, email : $teacherData_email, password : $teacherData_password, phone : $teacherData_phone, currentlyTeaching : $teacherData_currentlyTeaching, department : $teacherData_department, field_of_teaching : $teacherData_field_of_teaching}) MERGE (i:Institute { name : $institute_name, website : $institute_website, phone : $institute_phone, degree : $institute_degree } ) MERGE (t) - [:STUDIED_IN { startDate : $relStudiedIn_startDate, endDate : $relStudiedIn_endDate, score : $relStudiedIn_score }] -> (i);', teacherStudiedInInstituteData);
        };

        for (var j = 0; j < institutes.length; j++) {
            var instituteLocatedInLocationData = {
                ...institutes[j],
                ...instituteLocations[j],
            };
            var instituteLocatedInLocation = await txc.run('MATCH (i:Institute { name : $institute_name, website : $institute_website, phone : $institute_phone, degree : $institute_degree }) MERGE (l:Location { latitude : $instituteLocation_latitude, longitude : $instituteLocation_longitude, address : $instituteLocation_address}) MERGE (i) - [:LOCATED_IN] -> (l);', instituteLocatedInLocationData)
        }

        subjects_taught.map(async subject => {
            var teacherTeachesSubjectData = {
                ...teacherData,
                ...subject,
            }
            var teacherTeachesSubject = await txc.run('MATCH (t:Teacher { name : $teacherData_name, age : $teacherData_age, email : $teacherData_email, password : $teacherData_password, phone : $teacherData_phone, currentlyTeaching : $teacherData_currentlyTeaching, department : $teacherData_department, field_of_teaching : $teacherData_field_of_teaching}) MERGE (s:Subject { name : $subject_name}) MERGE (t) - [:TEACHES] -> (s);', teacherTeachesSubjectData);
        });

        skills.map(async skill => {
            var teacherHasSkillData = {
                ...teacherData,
                ...skill,
            }
            var teacherHasSkill = await txc.run('MATCH (t:Teacher { name : $teacherData_name, age : $teacherData_age, email : $teacherData_email, password : $teacherData_password, phone : $teacherData_phone, currentlyTeaching : $teacherData_currentlyTeaching, department : $teacherData_department, field_of_teaching : $teacherData_field_of_teaching}) MERGE (sk:Skill { name : $skill_name}) MERGE (t) - [:HAS] -> (sk);', teacherHasSkillData);
        });

        courses.map(async course => {
            var teacherCompletedCourseData = {
                ...teacherData,
                ...course,
            }
            var teacherCompletedCourse = await txc.run('MATCH (t:Teacher { name : $teacherData_name, age : $teacherData_age, email : $teacherData_email, password : $teacherData_password, phone : $teacherData_phone, currentlyTeaching : $teacherData_currentlyTeaching, department : $teacherData_department, field_of_teaching : $teacherData_field_of_teaching}) MERGE (c:Course { name : $course_name}) MERGE (t) - [:COMPLETED] -> (c);', teacherCompletedCourseData);
        });

        interests.map(async interest => {
            var teacherHasInterestData = {
                ...teacherData,
                ...interest,
            }
            var teacherHasInterest = await txc.run('MATCH (t:Teacher { name : $teacherData_name, age : $teacherData_age, email : $teacherData_email, password : $teacherData_password, phone : $teacherData_phone, currentlyTeaching : $teacherData_currentlyTeaching, department : $teacherData_department, field_of_teaching : $teacherData_field_of_teaching}) MERGE (i:Interest { name : $interest_name}) MERGE (t) - [:INTERESTED_IN] -> (i);', teacherHasInterestData);
        });

        languages.map(async language => {
            var teacherSpeakslanguageData = {
                ...teacherData,
                ...language,
            };
            var teacherSpeakslanguage = await txc.run('MATCH (t:Teacher { name : $teacherData_name, age : $teacherData_age, email : $teacherData_email, password : $teacherData_password, phone : $teacherData_phone, currentlyTeaching : $teacherData_currentlyTeaching, department : $teacherData_department, field_of_teaching : $teacherData_field_of_teaching}) MERGE (l:Language { name : $language_name}) MERGE (t) - [:SPEAKS] -> (l);', teacherSpeakslanguageData);
        });

        achievements.map(async achievement => {
            var teacherHasAchievedAchievementData = {
                ...teacherData,
                ...achievement,
            };
            var teacherHasAchievedAchievement = await txc.run('MATCH (t:Teacher { name : $teacherData_name, age : $teacherData_age, email : $teacherData_email, password : $teacherData_password, phone : $teacherData_phone, currentlyTeaching : $teacherData_currentlyTeaching, department : $teacherData_department, field_of_teaching : $teacherData_field_of_teaching}) MERGE (a:Achievement { title : $achievement_title, description : $achievement_description}) MERGE (t) - [:HAS_ACHIVED] -> (r);', teacherHasAchievedAchievementData)
        });

        researchPapers.map(async researchPaper => {
            var teacherPublishedResearchPaperData = {
                ...teacherData,
                ...researchPaper,
            };
            var teacherPublishedResearchPaper = await txc.run('MATCH (t:Teacher { name : $teacherData_name, age : $teacherData_age, email : $teacherData_email, password : $teacherData_password, phone : $teacherData_phone, currentlyTeaching : $teacherData_currentlyTeaching, department : $teacherData_department, field_of_teaching : $teacherData_field_of_teaching}) MERGE (r:ResearchPaper {title : $researchPaper_title, description : $researchPaper_description}) MERGE (t) - [:PUBLISHED] -> (r);', teacherPublishedResearchPaperData)
        });

        projects.map(async project => {
            var teacherHasDoneProjectData = {
                ...teacherData,
                ...project,
            };
            var teacherHasDoneProject = await txc.run('MATCH (t:Teacher { name : $teacherData_name, age : $teacherData_age, email : $teacherData_email, password : $teacherData_password, phone : $teacherData_phone, currentlyTeaching : $teacherData_currentlyTeaching, department : $teacherData_department, field_of_teaching : $teacherData_field_of_teaching}) MERGE (p:Project { name : $project_name, description : $project_description}) MERGE (t) - [:HAS_DONE] -> (p);', teacherHasDoneProjectData)
        });

        for (var j = 0; j < companies.length; j++) {
            var teacherWorkedInCompanyData = {
                ...teacherData,
                ...companies[j],
                ...relWorkedInCompany[j],
            };
            var teacherWorkedInCompany = await txc.run('MATCH (t:Teacher { name : $teacherData_name, age : $teacherData_age, email : $teacherData_email, password : $teacherData_password, phone : $teacherData_phone, currentlyTeaching : $teacherData_currentlyTeaching, department : $teacherData_department, field_of_teaching : $teacherData_field_of_teaching}) MERGE (c:Company { name : $company_name, field : $company_field, website : $company_website}) MERGE (t) - [:WORKED_IN { startDate : $workedInCompany_startDate , endDate : $workedInCompany_endDate, position : $workedInCompany_position }] -> (c);', teacherWorkedInCompanyData);
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
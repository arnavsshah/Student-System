const driver = require('../../config/db');

//for each query, end with <space> so as to add next part of query


async function studentSearch(data, id) {
    var isQuery = false; //checks if there is a query to be matched

    var session = driver.session();
    var student;
    var readTxResultPromise = await session.readTransaction(async txc => {
        var query = `MATCH (s:Student) WHERE ID(s) = ${id} RETURN s;`;
        var studentNode = await txc.run(query);
        student = studentNode.records[0]._fields[0].properties;
    });
    session.close();

    query = `MATCH (s:Student) WITH COLLECT(ID(s)) AS s_filter `;

    var student_filter = false;

    if (data.myClass === true || (data.department && data.semester)) {
        isQuery = true;
        student_filter = true;
        query += `OPTIONAL MATCH (s:Student) WHERE s.class = '${student.class}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) AS s_filter `
    } else {
        if (data.department) {
            isQuery = true;
            student_filter = true;
            query += `OPTIONAL MATCH (s:Student) WHERE s.department = '${student.department}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) AS s_filter `
        } else if (data.semester) {
            isQuery = true;
            student_filter = true;
            query += `OPTIONAL MATCH (s:Student) WHERE s.semester = ${student.semester} AND ID(s) IN s_filter WITH COLLECT(ID(s)) AS s_filter  `
        }
    }

    if (student_filter) {
        query += `WITH s_filter AS res, s_filter `

        data.institutes.forEach(institute => {
            query += `OPTIONAL MATCH (s:Student)-[:STUDIED_IN]->(i:Institute) WHERE i.name CONTAINS '${institute.name}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        data.skills.forEach(skill => {
            query += `OPTIONAL MATCH (s:Student)-[:HAS]->(sk:Skill) WHERE sk.name CONTAINS '${skill.name}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        data.courses.forEach(course => {
            query += `OPTIONAL MATCH (s:Student)-[:COMPLETED]->(c:Course) WHERE c.name CONTAINS '${course.name}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        data.projects.forEach(project => {
            query += `OPTIONAL MATCH (s:Student)-[:HAS_DONE]->(p:Project) WHERE p.name CONTAINS '${project.name}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        data.achievements.forEach(achievement => {
            query += `OPTIONAL MATCH (s:Student)-[:HAS_ACHIEVED]->(a:Achievement) WHERE a.title CONTAINS '${achievement.title}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        data.researchPapers.forEach(researchPaper => {
            query += `OPTIONAL MATCH (s:Student)-[:PUBLISHED]->(r:ResearchPaper) WHERE r.title CONTAINS '${researchPaper.title}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        data.clubs.forEach(club => {
            query += `OPTIONAL MATCH (s:Student)-[:PART_OF]->(c:Club) WHERE c.name CONTAINS '${club.name}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        data.interests.forEach(interest => {
            query += `OPTIONAL MATCH (s:Student)-[:INTERESTED_IN]->(i:Interest) WHERE i.name CONTAINS '${interest.name}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        data.languages.forEach(language => {
            query += `OPTIONAL MATCH (s:Student)-[:SPEAKS]->(l:Language) WHERE l.name CONTAINS '${language.name}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        data.companies.forEach(company => {
            query += `OPTIONAL MATCH (s:Student)-[:WORKED_IN]->(c:Company) WHERE c.name CONTAINS '${company.name}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter OPTIONAL MATCH (s:Student)-[:WORKED_IN]->(c:Company) WHERE c.field CONTAINS '${company.name}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        })

        query += `RETURN res; `
    } else {
        query = `WITH [] AS res `

        data.institutes.forEach(institute => {
            isQuery = true;
            query += `OPTIONAL MATCH (s:Student)-[:STUDIED_IN]->(i:Institute) WHERE i.name CONTAINS '${institute}' WITH COLLECT(ID(s)) + res AS res `
        });

        data.skills.forEach(skill => {
            isQuery = true;
            query += `OPTIONAL MATCH (s:Student)-[:HAS]->(sk:Skill) WHERE sk.name CONTAINS '${skill}' WITH COLLECT(ID(s)) + res AS res `
        });

        data.courses.forEach(course => {
            isQuery = true;
            query += `OPTIONAL MATCH (s:Student)-[:COMPLETED]->(c:Course) WHERE c.name CONTAINS '${course}' WITH COLLECT(ID(s)) + res AS res `
        });

        data.projects.forEach(project => {
            isQuery = true;
            query += `OPTIONAL MATCH (s:Student)-[:HAS_DONE]->(p:Project) WHERE p.name CONTAINS '${project}' WITH COLLECT(ID(s)) + res AS res `
        });

        data.achievements.forEach(achievement => {
            isQuery = true;
            query += `OPTIONAL MATCH (s:Student)-[:HAS_ACHIEVED]->(a:Achievement) WHERE a.title CONTAINS '${achievement}' WITH COLLECT(ID(s)) + res AS res `
        });

        data.researchPapers.forEach(researchPaper => {
            isQuery = true;
            query += `OPTIONAL MATCH (s:Student)-[:PUBLISHED]->(r:ResearchPaper) WHERE r.title CONTAINS '${researchPaper}' WITH COLLECT(ID(s)) + res AS res `
        });

        data.clubs.forEach(club => {
            isQuery = true;
            query += `OPTIONAL MATCH (s:Student)-[:PART_OF]->(c:Club) WHERE c.name CONTAINS '${club}' WITH COLLECT(ID(s)) + res AS res `
        });

        data.interests.forEach(interest => {
            isQuery = true;
            query += `OPTIONAL MATCH (s:Student)-[:INTERESTED_IN]->(i:Interest) WHERE i.name CONTAINS '${interest}' WITH COLLECT(ID(s)) + res AS res `
        });

        data.languages.forEach(language => {
            isQuery = true;
            query += `OPTIONAL MATCH (s:Student)-[:SPEAKS]->(l:Language) WHERE l.name CONTAINS '${language}' WITH COLLECT(ID(s)) + res AS res `
        });

        data.companies.forEach(company => {
            isQuery = true;
            query += `OPTIONAL MATCH (s:Student)-[:WORKED_IN]->(c:Company) WHERE c.name CONTAINS '${company}' WITH COLLECT(ID(s)) + res AS res OPTIONAL MATCH (s:Student)-[:WORKED_IN]->(c:Company) WHERE c.field CONTAINS '${company}' WITH COLLECT(ID(s)) + res AS res `
        })

        query += `RETURN res; `
    }
    var res = await queryNeo4j(query);
    // console.log('res inside neo4j', res)
    var student = res.map(r => {
        return(
        r.records.map(record => {

            return {
                ...record._fields[0].properties,
                ...record._fields[1].properties,
            }
        })

        )

    })
    console.log("studen inside neo", student);
    return isQuery === true ? student : [];
}


async function teacherSearch(data, id) {
    var query = `MATCH (t:Teacher) WITH COLLECT(ID(t)) AS t_filter `;

    var isQuery = false;
    var teacher_filter = false;

    if (data.department) {
        isQuery = true;
        teacher_filter = true;
        query += `OPTIONAL MATCH (t:Teacher) WHERE t.department = '${req.dept}' AND ID(t) IN s_filter WITH COLLECT(ID(t)) AS t_filter `
    }

    if (teacher_filter) {
        query += 'WITH t_filter AS res, t_filter '

        data.institutes.forEach(institute => {
            query += `OPTIONAL MATCH (t:Teacher)-[:STUDIED_IN]->(i:Institute) WHERE i.name CONTAINS '${institute}' AND ID(t) IN t_filter WITH COLLECT(ID(t)) + res AS res, t_filter `
        });

        data.skills.forEach(skill => {
            query += `OPTIONAL MATCH (t:Teacher)-[:HAS]->(sk:Skill) WHERE sk.name CONTAINS '${skill}' AND ID(t) IN t_filter WITH COLLECT(ID(t)) + res AS res, t_filter `
        });

        data.courses.forEach(course => {
            query += `OPTIONAL MATCH (t:Teacher)-[:COMPLETED]->(c:Course) WHERE c.name CONTAINS '${course}' AND ID(t) IN t_filter WITH COLLECT(ID(t)) + res AS res, t_filter `
        });

        data.projects.forEach(project => {
            query += `OPTIONAL MATCH (t:Teacher)-[:HAS_DONE]->(p:Project) WHERE p.name CONTAINS '${project}' AND ID(t) IN t_filter WITH COLLECT(ID(t)) + res AS res, t_filter `
        });

        data.achievements.forEach(achievement => {
            query += `OPTIONAL MATCH (t:Teacher)-[:HAS_ACHIEVED]->(a:Achievement) WHERE a.title CONTAINS '${achievement}' AND ID(t) IN t_filter WITH COLLECT(ID(t)) + res AS res, t_filter `
        });

        data.researchPapers.forEach(researchPaper => {
            query += `OPTIONAL MATCH (t:Teacher)-[:PUBLISHED]->(r:ResearchPaper) WHERE r.title CONTAINS '${researchPaper}' AND ID(t) IN t_filter WITH COLLECT(ID(t)) + res AS res, t_filter `
        });

        data.interests.forEach(interest => {
            query += `OPTIONAL MATCH (t:Teacher)-[:INTERESTED_IN]->(i:Interest) WHERE i.name CONTAINS '${interest}' AND ID(t) IN t_filter WITH COLLECT(ID(t)) + res AS res, t_filter `
        });

        data.languages.forEach(language => {
            query += `OPTIONAL MATCH (t:Teacher)-[:SPEAKS]->(l:Language) WHERE l.name CONTAINS '${language}' AND ID(t) IN t_filter WITH COLLECT(ID(t)) + res AS res, t_filter `
        });

        data.companies.forEach(company => {
            query += `OPTIONAL MATCH (t:Teacher)-[:WORKED_IN]->(c:Company) WHERE c.name CONTAINS '${company}' AND ID(t) IN t_filter WITH COLLECT(ID(t)) + res AS res, t_filter OPTIONAL MATCH (t:Teacher)-[:WORKED_IN]->(c:Company) WHERE c.field CONTAINS '${company}' AND ID(t) IN t_filter WITH COLLECT(ID(t)) + res AS res, t_filter `
        })

        query += `RETURN res; `

    } else {
        query = `WITH [] AS res `

        data.institutes.forEach(institute => {
            isQuery = true;
            query += `OPTIONAL MATCH (t:Teacher)-[:STUDIED_IN]->(i:Institute) WHERE i.name CONTAINS '${institute}' WITH COLLECT(ID(t)) + res AS res `
        });

        data.skills.forEach(skill => {
            isQuery = true;
            query += `OPTIONAL MATCH (t:Teacher)-[:HAS]->(sk:Skill) WHERE sk.name CONTAINS '${skill}' WITH COLLECT(ID(t)) + res AS res `
        });

        data.courses.forEach(course => {
            isQuery = true;
            query += `OPTIONAL MATCH (t:Teacher)-[:COMPLETED]->(c:Course) WHERE c.name CONTAINS '${course}' WITH COLLECT(ID(t)) + res AS res `
        });

        data.projects.forEach(project => {
            isQuery = true;
            query += `OPTIONAL MATCH (t:Teacher)-[:HAS_DONE]->(p:Project) WHERE p.name CONTAINS '${project}' WITH COLLECT(ID(t)) + res AS res `
        });

        data.achievements.forEach(achievement => {
            isQuery = true;
            query += `OPTIONAL MATCH (t:Teacher)-[:HAS_ACHIEVED]->(a:Achievement) WHERE a.title CONTAINS '${achievement}' WITH COLLECT(ID(t)) + res AS res `
        });

        data.researchPapers.forEach(researchPaper => {
            isQuery = true;
            query += `OPTIONAL MATCH (t:Teacher)-[:PUBLISHED]->(r:ResearchPaper) WHERE r.title CONTAINS '${researchPaper}' WITH COLLECT(ID(t)) + res AS res `
        });

        data.interests.forEach(interest => {
            isQuery = true;
            query += `OPTIONAL MATCH (t:Teacher)-[:INTERESTED_IN]->(i:Interest) WHERE i.name CONTAINS '${interest}' WITH COLLECT(ID(t)) + res AS res `
        });

        data.languages.forEach(language => {
            isQuery = true;
            query += `OPTIONAL MATCH (t:Teacher)-[:SPEAKS]->(l:Language) WHERE l.name CONTAINS '${language}' WITH COLLECT(ID(t)) + res AS res `
        });

        data.companies.forEach(company => {
            isQuery = true;
            query += `OPTIONAL MATCH (t:Teacher)-[:WORKED_IN]->(c:Company) WHERE c.name CONTAINS '${company}' WITH COLLECT(ID(t)) + res AS res OPTIONAL MATCH (t:Teacher)-[:WORKED_IN]->(c:Company) WHERE c.field CONTAINS '${company}' WITH COLLECT(ID(t)) + res AS res `
        })

        query += `RETURN res; `
    }
    var res = await queryNeo4j(query);
    var teacher = res.records.map(record => {
        return {
            ...record._fields[0].properties,
            ...record._fields[1].properties,
        }
    })
    return isQuery === true ? teacher : [];
}


async function alumniSearch(data, id) {
    var query = `MATCH (s:Student) WHERE s.isAlumni = "true" WITH COLLECT(ID(s)) AS s_filter `;

    var isQuery = false;

    if (data.department) {
        isQuery = true;
        query += `OPTIONAL MATCH (s:Student) WHERE s.department = '${data.dept}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) AS s_filter `
    }
    if (data.year) {
        isQuery = true;
        query += `OPTIONAL MATCH (s:Student)-[studiedIn:STUDIED_IN]->(:Institute) WHERE studiedIn.endDate = ${data.yr} AND ID(s) IN s_filter WITH COLLECT(ID(s)) AS s_filter `
    }

    query += `WITH s_filter AS res, s_filter `

    data.institutes.forEach(institute => {
        isQuery = true;
        query += `OPTIONAL MATCH (s:Student)-[:STUDIED_IN]->(i:Institute) WHERE i.name CONTAINS ${institute} AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
    });

    data.skills.forEach(skill => {
        isQuery = true;
        query += `OPTIONAL MATCH (s:Student)-[:HAS]->(sk:Skill) WHERE sk.name CONTAINS ${skill} AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
    });

    data.courses.forEach(course => {
        isQuery = true;
        query += `OPTIONAL MATCH (s:Student)-[:COMPLETED]->(c:Course) WHERE c.name CONTAINS '${course}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
    });

    data.projects.forEach(project => {
        isQuery = true;
        query += `OPTIONAL MATCH (s:Student)-[:HAS_DONE]->(p:Project) WHERE p.name CONTAINS '${project}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
    });

    data.achievements.forEach(achievement => {
        isQuery = true;
        query += `OPTIONAL MATCH (s:Student)-[:HAS_ACHIEVED]->(a:Achievement) WHERE a.title CONTAINS '${achievement}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
    });

    data.researchPapers.forEach(researchPaper => {
        isQuery = true;
        query += `OPTIONAL MATCH (s:Student)-[:PUBLISHED]->(r:ResearchPaper) WHERE r.title CONTAINS '${researchPaper}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
    });

    data.clubs.forEach(club => {
        isQuery = true;
        query += `OPTIONAL MATCH (s:Student)-[:PART_OF]->(c:Club) WHERE c.name CONTAINS '${club}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
    });

    data.interests.forEach(interest => {
        isQuery = true;
        query += `OPTIONAL MATCH (s:Student)-[:INTERESTED_IN]->(i:Interest) WHERE i.name CONTAINS '${interest}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
    });

    data.languages.forEach(language => {
        isQuery = true;
        query += `OPTIONAL MATCH (s:Student)-[:SPEAKS]->(l:Language) WHERE l.name CONTAINS '${language}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
    });

    data.companies.forEach(company => {
        isQuery = true;
        query += `OPTIONAL MATCH (s:Student)-[:WORKED_IN]->(c:Company) WHERE c.name CONTAINS '${company}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter OPTIONAL MATCH (s:Student)-[:WORKED_IN]->(c:Company) WHERE c.field CONTAINS '${company}' AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
    })

    query += `RETURN res; `

    var res = await queryNeo4j(query);
    var student = res.records.map(record => {
        return {
            ...record._fields[0].properties,
            ...record._fields[1].properties,
        }
    })
    return isQuery === true ? student : [];
}

async function similarStudentSuggestion(data, id) {
    var query = ``;
    var isQuery = false;

    if (data.isSkill) {
        isQuery = true;
        query += `OPTIONAL MATCH (s1:Student)-[:HAS]->(sk:Skill)<-[:HAS]-(s2:Student) WHERE ID(s1) = ${id} RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC `;
        query += `UNION `
    }

    if (data.isCourse) {
        isQuery = true;
        query += `OPTIONAL MATCH (s1:Student)-[:COMPLETED]->(c:Course)<-[:COMPLETED]-(s2:Student) WHERE ID(s1) = ${id} RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC `;
        query += `UNION `;
    }

    if (data.isProject) {
        isQuery = true;
        query += `OPTIONAL MATCH (s1:Student)-[:HAS_DONE]->(p:Project)<-[:HAS_DONE]-(s2:Student) WHERE ID(s1) = ${id} RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC `;
        query += `UNION `;
    }

    if (data.isClub) {
        isQuery = true;
        query += `OPTIONAL MATCH (s1:Student)-[:PART_OF]->(c:Club)<-[:PART_OF]-(s2:Student) WHERE ID(s1) = ${id} RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC `;
        query += `UNION `;
    }

    if (data.isAchievement) {
        isQuery = true;
        query += `OPTIONAL MATCH (s1:Student)-[:HAS_ACHIEVED]->(a:Achievement)<-[:HAS_ACHIEVED]-(s2:Student) WHERE ID(s1) = ${id} RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC `;
        query += `UNION `;
    }

    if (data.isLanguage) {
        isQuery = true;
        query += `OPTIONAL MATCH (s1:Student)-[:SPEAKS]->(l:Language)<-[:SPEAKS]-(s2:Student) WHERE ID(s1) = ${id} RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC `;
        query += `UNION `;
    }

    if (data.isInterest) {
        isQuery = true;
        query += `OPTIONAL MATCH (s1:Student)-[:INTERESTED_IN]->(l:Interest)<-[:INTERESTED_IN]-(s2:Student) WHERE ID(s1) = ${id} RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC `;
        query += `UNION `;
    }

    if (data.isCompany) {
        isQuery = true;
        query += `OPTIONAL MATCH (s1:Student)-[:WORKED_IN]->(c:Company)<-[:WORKED_IN]-(s2:Student) WHERE ID(s1) = ${id} RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC `;
        query += `UNION `;
    }

    if (isQuery) {
        query = query.substring(0, query.length - 6);
        query += `;`;
        var res = await queryNeo4j(query);
        var student = res.records.map(record => {
            return {
                ...record._fields[0].properties,
                ...record._fields[1].properties,
            }
        })
        return student;
    } else { return []; }

}

async function queryNeo4j(query) {
    try {
        const session = driver.session();
        var searchResult = [];
        var readTxResultPromise = await session.readTransaction(async txc => {
            var result = await txc.run(query);

            var arrayOfIds = result.records[0]._fields[0];
            console.log('arrOfId', arrayOfIds);
            var cnts = arrayOfIds.reduce((obj, val) => {
                obj[val] = (obj[val] || 0) + 1;
                return obj;
            }, {});

            var sortedArrayOfIds = Object.keys(cnts).sort(function(a, b) {
                return cnts[b] - cnts[a];
            });

            searchResult = await Promise.all(sortedArrayOfIds.map(async id => {
                let res = await txc.run(`MATCH (n)-[:LIVES_IN]-(l) WHERE ID(n) = ${id} RETURN n, l; `);
                return res;
            }));

        });
        session.close();

        return searchResult;

    } catch (err) {
        console.log(err);
    }
}

async function studentAttributeSuggestion(data, id) {
    var session = driver.session();
    var res = {};
    var readTxResultPromise = await session.readTransaction(async txc => {
        var queryForSkill = `OPTIONAL MATCH (s1:Student)-[:HAS]->(sk1:Skill)<-[:HAS]-(s2:Student)-[:HAS]->(sk2:Skill) WHERE ID(s1) = ${id} NOT EXISTS((s1)-[:HAS]->(sk2)) RETURN sk2, COUNT(s2) AS count ORDER BY count DESC;`;
        var skillSuggestion = await txc.run(queryForSkill);

        var queryForCourse = `OPTIONAL MATCH (s1:Student)-[:COMPLETED]->(c1:Course)<-[:COMPLETED]-(s2:Student)-[:COMPLETED]->(c2:Course) WHERE ID(s1) = ${id} NOT EXISTS((s1)-[:COMPLETED]->(c2)) RETURN c2, COUNT(s2) AS count ORDER BY count DESC;`
        var courseSuggestion = await txc.run(queryForCourse);

        var queryForProject = `OPTIONAL MATCH (s1:Student)-[:HAS_DONE]->(p1:Project)<-[:HAS_DONE]-(s2:Student)-[:HAS_DONE]->(p2:Project) WHERE ID(s1) = ${id} NOT EXISTS((s1)-[:HAS_DONE]->(p2)) RETURN p2, COUNT(s2) AS count ORDER BY count DESC;`
        var projectSuggestion = await txc.run(queryForProject);

        var queryForAchievement = `OPTIONAL MATCH (s1:Student)-[:HAS_ACHIEVED]->(a1:Achievement)<-[:HAS_ACHIEVED]-(s2:Student)-[:HAS_ACHIEVED]->(a2:Achievement) WHERE ID(s1) = ${id} NOT EXISTS((s1)-[:HAS_ACHIEVED]->(a2)) RETURN a2, COUNT(s2) AS count ORDER BY count DESC;`
        var achievementSuggestion = await txc.run(queryForAchievement);

        var queryForClub = `OPTIONAL MATCH (s1:Student)-[:PART_OF]->(c1:Club)<-[:PART_OF]-(s2:Student)-[:PART_OF]->(c2:Club) WHERE ID(s1) = ${id} NOT EXISTS((s1)-[:PART_OF]->(c2)) RETURN c2, COUNT(s2) AS count ORDER BY count DESC;`
        var clubSuggestion = await txc.run(queryForClub);

        var queryForCompany = `OPTIONAL MATCH (s1:Student)-[:WORKED_IN]->(c1:Company)<-[:WORKED_IN]-(s2:Student)-[:WORKED_IN]->(c2:Company) WHERE ID(s1) = ${id} NOT EXISTS((s1)-[:WORKED_IN]->(c2)) RETURN c2, COUNT(s2) AS count ORDER BY count DESC;`
        var companySuggestion = await txc.run(queryForCompany);

        res = {
            skillSuggestion: skillSuggestion.records.map(record => {
                return {
                    ...record._fields[0].properties
                }
            }),
            courseSuggestion: courseSuggestion.records.map(record => {
                return {
                    ...record._fields[0].properties
                }
            }),
            projectSuggestion: projectSuggestion.records.map(record => {
                return {
                    ...record._fields[0].properties
                }
            }),
            achievementSuggestion: achievementSuggestion.records.map(record => {
                return {
                    ...record._fields[0].properties
                }
            }),
            clubSuggestion: clubSuggestion.records.map(record => {
                return {
                    ...record._fields[0].properties
                }
            }),
            companySuggestion: companySuggestion.records.map(record => {
                return {
                    ...record._fields[0].properties
                }
            }),
        }
    });
    session.close();
    return res;
}


module.exports = {
    studentSearch: studentSearch,
    teacherSearch: teacherSearch,
    alumniSearch: alumniSearch,
    similarStudentSuggestion: similarStudentSuggestion,
    studentAttributeSuggestion: studentAttributeSuggestion,
}
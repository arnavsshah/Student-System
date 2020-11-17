const express = require("express");
const router = express.Router();
const driver = require('../config/db');


router.get('/search', (req, res) => {
    //for each query, end with <space> so as to add next part of query
    var query = 'MATCH (s:Student) WITH COLLECT(ID(s)) AS s_filter ';

    var flag = false;
    if (req.body.myClass || (req.body.department && req.body.semester)) {
        flag = true;
        query += `OPTIONAL MATCH (s:Student) WHERE s.class = ${} AND ID(s) IN s_filter WITH COLLECT(ID(s)) AS s_filter `
    } else {
        if (req.body.department) {
            flag = true;
            query += `OPTIONAL MATCH (s:Student) WHERE s.department = ${} AND ID(s) IN s_filter WITH COLLECT(ID(s)) AS s_filter `
        } else if (req.body.semester) {
            flag = true;
            query += `OPTIONAL MATCH (s:Student) WHERE s.semester = ${} AND ID(s) IN s_filter WITH COLLECT(ID(s)) AS s_filter  `
        }
    }

    if (flag) {
        query += 'WITH [] AS res, s_filter '

        req.body.institutes.forEach(institute => {
            query += `OPTIONAL MATCH (s:Student)-[:STUDIED_IN]->(i:Institute) WHERE i.name CONTAINS "${institute}" AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        req.body.skills.forEach(skill => {
            query += `OPTIONAL MATCH (s:Student)-[:HAS]->(sk:Skill) WHERE sk.name CONTAINS "${skill}" AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        req.body.courses.forEach(course => {
            query += `OPTIONAL MATCH (s:Student)-[:COMPLETED]->(c:Course) WHERE c.name CONTAINS "${course}" AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        req.body.projects.forEach(project => {
            query += `OPTIONAL MATCH (s:Student)-[:HAS_DONE]->(p:Project) WHERE p.name CONTAINS "${project}" AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        req.body.achievements.forEach(achievement => {
            query += `OPTIONAL MATCH (s:Student)-[:HAS_ACHIVED]->(a:Achievement) WHERE a.title CONTAINS "${achievement}" AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        req.body.researchPapers.forEach(researchPaper => {
            query += `OPTIONAL MATCH (s:Student)-[:PUBLISHED]->(r:ResearchPaper) WHERE r.title CONTAINS "${researchPaper}" AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        req.body.clubs.forEach(club => {
            query += `OPTIONAL MATCH (s:Student)-[:PART_OF]->(c:Club) WHERE c.name CONTAINS "${club}" AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        req.body.interests.forEach(interest => {
            query += `OPTIONAL MATCH (s:Student)-[:INTERESTED_IN]->(i:Interest) WHERE i.name CONTAINS "${interest}" AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        req.body.languages.forEach(language => {
            query += `OPTIONAL MATCH (s:Student)-[:SPEAKS]->(l:Language) WHERE l.name CONTAINS "${language}" AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        });

        req.body.companies.forEach(company => {
            query += `OPTIONAL MATCH (s:Student)-[:WORKED_IN]->(c:Company) WHERE c.name CONTAINS ${company} AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter OPTIONAL MATCH (s:Student)-[:WORKED_IN]->(c:Company) WHERE c.field CONTAINS ${company} AND ID(s) IN s_filter WITH COLLECT(ID(s)) + res AS res, s_filter `
        })

        query += `RETURN res;`
    }

});

module.exports = router;
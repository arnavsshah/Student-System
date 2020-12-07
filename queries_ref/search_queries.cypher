// Regular search

// Categories for 
// Students
// Faculty
// Alumni
//can also search by name as default in tags


// Student --filters

//if condition for first 3 filters myClass/Dept/Sem

// My Class --dropdown

OPTIONAL MATCH (s:Student) WHERE s.class = "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) AS s_filter 

// Department --dropdown

OPTIONAL MATCH (s:Student) WHERE s.department = "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) AS s_filter 

// Semester --dropdown

OPTIONAL MATCH (s:Student) WHERE s.semester = "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) AS s_filter   

//for multiple parameters,add the myClass/department/semester query
//then, add the necessary skill/course/project/achievement/language query
//run it for each parametera
//store all ids and their counts in an object and query in descending order

//flag here will tell us if s_filter is reqd

WITH [] AS res, s_filter

// Institute --tags

OPTIONAL MATCH (s:Student)-[:STUDIED_IN]->(i:Institute) WHERE i.name CONTAINS "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) + res AS res, s_filter

// Skills --tags

OPTIONAL MATCH (s:Student)-[:HAS]->(sk:Skill) WHERE sk.name CONTAINS "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) + res AS res, s_filter

// Courses --tags

OPTIONAL MATCH (s:Student)-[:COMPLETED]->(c:Course) WHERE c.name CONTAINS "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) + res AS res, s_filter

// Projects --tags

OPTIONAL MATCH (s:Student)-[:HAS_DONE]->(p:Project) WHERE p.name CONTAINS "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) + res AS res, s_filter

// Achievements --tags

OPTIONAL MATCH (s:Student)-[:HAS_ACHIEVED]->(a:Achievement) WHERE a.title CONTAINS "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) + res AS res, s_filter

// ResearchPaper --tags

OPTIONAL MATCH (s:Student)-[:PUBLISHED]->(r:ResearchPaper) WHERE r.title CONTAINS "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) + res AS res, s_filter

// Clubs

OPTIONAL MATCH (s:Student)-[:PART_OF]->(c:Club) WHERE c.name CONTAINS "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) + res AS res, s_filter

//Interests

OPTIONAL MATCH (s:Student)-[:INTERESTED_IN]->(i:Interest) WHERE i.name CONTAINS "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) + res AS res, s_filter

// Languages --tags

OPTIONAL MATCH (s:Student)-[:SPEAKS]->(l:Language) WHERE l.name CONTAINS "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) + res AS res, s_filter

// Internships & Jobs --tags

OPTIONAL MATCH (s:Student)-[:WORKED_IN]->(c:Company) WHERE c.name CONTAINS "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) + res AS res, s_filter
OPTIONAL MATCH (s:Student)-[:WORKED_IN]->(c:Company) WHERE c.field CONTAINS ""  AND ID(s) IN s_filter
WITH COLLECT(ID(s)) + res AS res, s_filter

RETURN res

// Teacher --filters

// Subjects --dropdown
// Department --dropdown

OPTIONAL MATCH (t:Teacher) WHERE t.department = "" AND ID(t) IN s_filter
WITH COLLECT(ID(t)) AS t_filter 

// Institute --tags

OPTIONAL MATCH (t:Teacher)-[:STUDIED_IN]->(i:Institute) WHERE i.name CONTAINS "" AND ID(t) IN t_filter
WITH COLLECT(ID(t)) + res AS res, t_filter

// Skills --tags

OPTIONAL MATCH (t:Teacher)-[:HAS]->(sk:Skill) WHERE sk.name CONTAINS "" AND ID(t) IN t_filter
WITH COLLECT(ID(t)) + res AS res, t_filter

// Courses --tags

OPTIONAL MATCH (t:Teacher)-[:COMPLETED]->(c:Course) WHERE c.name CONTAINS "" AND ID(t) IN t_filter
WITH COLLECT(ID(t)) + res AS res, t_filter

// Projects --tags

OPTIONAL MATCH (t:Teacher)-[:HAS_DONE]->(p:Project) WHERE p.name CONTAINS "" AND ID(t) IN t_filter
WITH COLLECT(ID(t)) + res AS res, t_filter

// Achievements --tags

OPTIONAL MATCH (t:Teacher)-[:HAS_ACHIEVED]->(a:Achievement) WHERE a.title CONTAINS "" AND ID(t) IN t_filter
WITH COLLECT(ID(t)) + res AS res, t_filter

// ResearchPaper --tags

OPTIONAL MATCH (t:Teacher)-[:PUBLISHED]->(r:ResearchPaper) WHERE r.title CONTAINS "" AND ID(t) IN t_filter
WITH COLLECT(ID(t)) + res AS res, t_filter

// Languages --tags

OPTIONAL MATCH (t:Teacher)-[:SPEAKS]->(l:Language) WHERE l.name CONTAINS "" AND ID(t) IN t_filter
WITH COLLECT(ID(t)) + res AS res, t_filter

//Interests

OPTIONAL MATCH (t:Teacher)-[:INTERESTED_IN]->(i:Interest) WHERE i.name CONTAINS "" AND ID(t) IN t_filter
WITH COLLECT(ID(t)) + res AS res, t_filter

RETURN res

// Alummni --filters --same as student queries

//Department
// Year --dropdown
OPTIONAL MATCH (s:Student)-[studiedIn:STUDIED_IN]->(:Institute) WHERE studiedIn.endDate = "" AND ID(s) IN s_filter
WITH COLLECT(ID(s)) AS s_filter  

// Institute --tags 
// Skills --tags
// Courses --tags
// Projects --tags
// Achievements --tags
// Internships & Jobs --tags
// Languages --tags


//customize based on your profile --add union after each query
//list of ids will be returned with the count. Create an object and sort based on count.
//return all students.
//can limit


// Skills --tags

OPTIONAL MATCH (s1:Student)-[:HAS]->(sk:Skill)<-[:HAS]-(s2:Student) WHERE ID(s1) = {}
RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC 
UNION 

// Courses --tags

OPTIONAL MATCH (s1:Student)-[:COMPLETED]->(c:Course)<-[:COMPLETED]-(s2:Student) WHERE ID(s1) = {}
RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC 
UNION 

// Projects --tags

OPTIONAL MATCH (s1:Student)-[:HAS_DONE]->(p:Project)<-[:HAS_DONE]-(s2:Student) WHERE ID(s1) = {}
RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC 
UNION 

// Achievements --tags

OPTIONAL MATCH (s1:Student)-[:HAS_ACHIEVED]->(a:Achievement)<-[:HAS_ACHIEVED]-(s2:Student) WHERE ID(s1) = {}
RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC 
UNION 

// Clubs

OPTIONAL MATCH (s1:Student)-[:PART_OF]->(c:Club)<-[:PART_OF]-(s2:Student) WHERE ID(s1) = {}
RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC 
UNION 

// Languages --tags

OPTIONAL MATCH (s1:Student)-[:SPEAKS]->(l:Language)<-[:SPEAKS]-(s2:Student) WHERE ID(s1) = {}
RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC 
UNION 

//Interests

OPTIONAL MATCH (s1:Student)-[:INTERESTED_IN]->(l:Interest)<-[:INTERESTED_IN]-(s2:Student) WHERE ID(s1) = {}
RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC 
UNION 

// Internships & Jobs --tags

OPTIONAL MATCH (s1:Student)-[:WORKED_IN]->(c:Company)<-[:WORKED_IN]-(s2:Student) WHERE ID(s1) = {}
RETURN ID(s2), COUNT(*) AS count ORDER BY count DESC 
UNION 


//Suggestions

//Skills

OPTIONAL MATCH (s1:Student)-[:HAS]->(sk1:Skill)<-[:HAS]-(s2:Student)-[:HAS]->(sk2:Skill)
WHERE ID(s1) = ${} NOT EXISTS((s1)-[:HAS]->(sk2))
RETURN sk2.name, COUNT(s2) AS count ORDER BY count DESC;

//Courses --tags

OPTIONAL MATCH (s1:Student)-[:COMPLETED]->(c1:Course)<-[:COMPLETED]-(s2:Student)-[:COMPLETED]->(c2:Course)
WHERE ID(s1) = ${} NOT EXISTS((s1)-[:COMPLETED]->(c2))
RETURN c2.name, COUNT(s2) AS count ORDER BY count DESC;

// Projects --tags

OPTIONAL MATCH (s1:Student)-[:HAS_DONE]->(p1:Project)<-[:HAS_DONE]-(s2:Student)-[:HAS_DONE]->(p2:Project)
WHERE ID(s1) = ${} NOT EXISTS((s1)-[:HAS_DONE]->(p2))
RETURN p2.name, COUNT(s2) AS count ORDER BY count DESC;

// Achievements --tags

OPTIONAL MATCH (s1:Student)-[:HAS_ACHIEVED]->(a1:Achievement)<-[:HAS_ACHIEVED]-(s2:Student)-[:HAS_ACHIEVED]->(a2:Achievement)
WHERE ID(s1) = ${} NOT EXISTS((s1)-[:HAS_ACHIEVED]->(a2))
RETURN a2.name, COUNT(s2) AS count ORDER BY count DESC;

// Clubs

OPTIONAL MATCH (s1:Student)-[:PART_OF]->(c1:Club)<-[:PART_OF]-(s2:Student)-[:PART_OF]->(c2:Club)
WHERE ID(s1) = ${} NOT EXISTS((s1)-[:PART_OF]->(c2))
RETURN c2.name, COUNT(s2) AS count ORDER BY count DESC;

// Languages --tags

OPTIONAL MATCH (s1:Student)-[:SPEAKS]->(l1:Language)<-[:SPEAKS]-(s2:Student)-[:SPEAKS]->(l2:Language)
WHERE ID(s1) = ${} NOT EXISTS((s1)-[:SPEAKS]->(l2))
RETURN l2.name, COUNT(s2) AS count ORDER BY count DESC;

// Internships & Jobs --tags

OPTIONAL MATCH (s1:Student)-[:WORKED_IN]->(c1:Company)<-[:WORKED_IN]-(s2:Student)-[:WORKED_IN]->(c2:Company)
WHERE ID(s1) = ${} NOT EXISTS((s1)-[:WORKED_IN]->(c2))
RETURN c2.name, COUNT(s2) AS count ORDER BY count DESC;









// Students from nearby location




// Students with similar academics




// Students taught by same teacher




// Student with similar journey till now (different weights to region, 11, 12, entrance, acads, book, skills, dept, interests, job position, completed subjects/courses)




// Region wise score and count



























//Book

CREATE (b:Book {
  name : ,
  //true-false
  isIssued : , 
})

//Author

CREATE (a:Author {
  name : ,
})

//Topic

CREATE (t:Topic {
  name : ,
}) 

CREATE (b:Book) -[:WRITTEN_BY]-> (a:Author) WHERE b.name = {} AND a.name = {}

CREATE (b:Book) -[:ABOUT]-> (t:Topic) WHERE b.name = {}  AND t.name = {}

CREATE (b:Book) -[:ISSUED_BY]-> (s:Student) WHERE b.name = {} AND s.name = {}
CREATE (s:Student) -[:READ]-> (b:Book) WHERE s.name = {} AND b.name = {}

//delete for library
CREATE (b:Book) -[i:ISSUED_BY]-> (s:Student) WHERE b.name = {} AND s.name = {} DELETE i


//issue

//check if issued or not on server side --search by name
OPTIONAL MATCH (b:Book) WHERE name = {} RETURN b;

//if issued, set property
OPTIONAL MATCH (b:Book) WHERE name = {} SET b.issued = true RETURN b;

//if book returned
OPTIONAL MATCH (b:Book) WHERE name = {} SET b.issued = false RETURN b;


//recommendation

//based on user's interests
MATCH (s:Student) -[:INTERESTED_IN_CATEGORY]-> (c:Category), 
(s) -[:READ]-> (b:Book) - [:ABOUT]-> (c)
WITH s, c, COUNT(*) AS score,
MATCH (b:Book) -[:ABOUT]-> (c)
WHERE NOT EXISTS((s) -[:READ]-> (b)) 
RETURN b, SUM(score) AS score ORDER BY score DESC

//based on same books read by other students
MATCH (s1:Student) -[:READ]-> (b:Book) <-[:READ]- (s2:Student) WHERE ID(s1) = {} AND ID(s1) <> ID(s2)
WITH s1, s2, COUNT(b) AS score ORDER BY score,
MATCH (s2) -[:READ]-> (b:Book) WHERE NOT EXISTS((s1) -[:READ]-> (b))
RETURN b

//based on topics in common
MATCH (s1:Student) -[:INTERESTED_IN_CATEGORY]-> (c:Category) <-[:INTERESTED_IN_CATEGORY]- (s2:Student) WHERE ID(s1) = {} AND ID(s1) <> ID(s2)
WITH s1, s2, COUNT(c) AS score ORDER BY score,
MATCH (s2) -[:READ]-> (b:Book) WHERE NOT EXISTS((s1) -[:READ]-> (b))
RETURN b

//based on authors in common
MATCH (s1:Student) -[:AUTHOR_READ]-> (a:Author) <-[:AUTHOR_READ]- (s2:Student) WHERE ID(s1) = {} AND ID(s1) <> ID(s2)
WITH s1, s2, COUNT(a) AS score ORDER BY score,
MATCH (s2) -[:READ]-> (b:Book) WHERE NOT EXISTS((s1) -[:READ]-> (b))
RETURN b
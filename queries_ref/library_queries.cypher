//issue

//check if issued or not on server side --search by name
OPTIONAL MATCH (b:Book) WHERE name = {} RETURN b;

//if issued, set property
OPTIONAL MATCH (b:Book) WHERE name = {} SET b.issued = true RETURN b;

//if book returned
OPTIONAL MATCH (b:Book) WHERE name = {} SET b.issued = false RETURN b;


//recommendation

//based on user's interests
MATCH (s:Student) -[:INTERESTED_IN]-> (t:Topic), 
(s) -[:READ]-> (b:Book) - [:ABOUT]-> (t)
WITH s, t, COUNT(*) AS score,
MATCH (b:Book) -[:ABOUT]-> (t)
WHERE NOT EXISTS((s) -[:READ]-> (b)) 
RETURN b.name, SUM(score) AS score ORDER BY score DESC

//based on same books read by other students
MATCH (s1:Student) -[:READ]-> (b:Book) <-[:READ]- (s2:Student) WHERE ID(s1) = {} AND ID(s1) <> ID(s2)
WITH s1, s2, COUNT(b) AS score ORDER BY score,
MATCH (s2) -[:READ]-> (b:Book) WHERE NOT EXISTS((s1) -[:READ]-> (b))
RETURN b

//based on topics in common
MATCH (s1:Student) -[:INTERESTED_IN]-> (t:Topic) <-[:INTERESTED_IN]- (s2:Student) WHERE ID(s1) = {} AND ID(s1) <> ID(s2)
WITH s1, s2, COUNT(t) AS score ORDER BY score,
MATCH (s2) -[:READ]-> (b:Book) WHERE NOT EXISTS((s1) -[:READ]-> (b))
RETURN b
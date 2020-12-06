//student
CREATE (s:Student { 
  id : ,
  name : ,
  age : ,
  email : ,
  phone : ,
  currentlyStudying : ,
  department : 
  })

CREATE (s:Student) - [:LIVES_IN] -> (l:Location)

CREATE (s:Student) - [:STUDIED_IN {
  startDate : ,
  endDate : ,
  score : 
}] -> (i:Institute)

CREATE (s:Student) - [:ENROLLED_IN {
  instructor : 
}] -> (s:Subject)

CREATE (s:Student) - [:READ {
  rated : 
}] -> (b:Book)

CREATE (s:Student) - [:COMPLETED {
  startDate : ,
  endDate : ,
  instructor : ,
  resource : 
}] -> (c:Course)

CREATE (s:Student) - [:COMPLETED {
  instructor : 
}] -> (s:Subject)

CREATE (s:Student) - [:HAS] -> (s:Skill)

CREATE (s:Student) - [:HAS] -> (i:Interest)

CREATE (s:Student) - [:PART_OF {
  startDate : ,
  endDate : ,
  position : 
}] -> (c:Club)

CREATE (s:Student) - [:SPEAKS] -> (l:Language)

CREATE (s:Student) - [:WORKED_IN {
  startDate : ,
  endDate : ,
  position : 
}] -> (c:Company)

CREATE (s:Student) - [:PUBLISHED {
  date : 
}] -> (r:ResearchPaper)

CREATE (s:Student) - [:IS_ALLOTED {
  startDate : ,
  endDate : 
}] -> (h:HostelRoom)

CREATE (s:Student) - [:HAS_DONE {
  startDate : ,
  endDate : 
}] -> (p:Project)

CREATE (s:Student) - [:HAS_GIVEN {
  date : ,
  score : 
}] -> (e:Exam)

CREATE (s:Student) - [:HAS_ACHIEVED {
  date : 
}] -> (a:Achievement)
//student end

//teacher
CREATE (t:Teacher 
    { id : ,
      name : ,
      age : ,
      email : ,
      phone : ,
      currentlyTeaching : ,
      department : 
      }
    )

CREATE (t:Teacher) - [:LIVES_IN] -> (l:Location)

CREATE (t:Teacher) - [:STUDIED_IN {
  startDate : ,
  endDate : ,
  score : 
}] -> (i:Institute)

CREATE (t:Teacher) - [:TEACHES {
  startDate : "",
  endDate : "",
  score : "",
  instructor : ""
}] -> (s:Subject)

CREATE (t:Teacher) - [:READ {
  rated : ""
}] -> (b:Book)

CREATE (t:Teacher) - [:INTERESTED_IN] -> (t:Topic)

CREATE (t:Teacher) - [:SPEAKS {
  level : ""
}] -> (l:Language)

CREATE (t:Teacher) - [:PUBLISHED {
  date : ""
}] -> (l:ResearchPaper)

CREATE (t:Teacher) - [:HAS_DONE {
  startDate : "",
  endDate : ""
}] -> (p:Project)

CREATE (t:Teacher) - [:HAS_ACHIEVED {
  date : ""
}] -> (a:Achievement)
//teacher end


//College Authority
CREATE (c:CollegeAuthority 
    { id : "",
      name : "",
      email : "",
      phone : "",
      department : ""
      }
    )

CREATE (c:CollegeAuthority) - [:POSTED { date : "" }] -> (n:Notice)
//College Authority end

//Institute
CREATE (i:Institute 
    { id : "",
      name : "",
      website : "",
      phone : "",
      degree : "",
      }
    )

CREATE (i:Institute) - [:LOCATED_IN] -> (l:Location)
//Institute end

CREATE (l:Location 
    { id : "",
      latitude : "",
      longitude : "",
      city : "",
      state : "",
      country : "",
      continent : "",
      address : "",
      postalCode : ""
      }
    )

//Book
CREATE (b:Book 
    { id : "",
      author : "",
      publisher : "",
      title : "",
      cost : "",
      stock : "",
      rating : "",
      }
    )

CREATE (b:Book) - [:ABOUT] -> (t:Topic)
//Book end

//Skill
CREATE (s:Skill 
    { id : "",
      name : "",
      }
    )

CREATE (s:Skill) - [:RELATED_TO] -> (t:Topic)
//Skill end

//Interest
CREATE (i:Interest 
    { id : "",
      name : "",
      }
    )


CREATE (t:Topic 
    { id : "",
      name : "",
      }
    )

CREATE (c:Club 
    { id : "",
      name : "",
      }
    )

//Subject
CREATE (s:Subject 
    { id : ,
      name : ,
      credits : ,
      sem : ,
      }
    )

CREATE (s:Subject) - [:RELATED_TO] -> (t:Topic)
//Subject end

//Course
CREATE (c:Course 
    { id : ,
      name : ,
      }
    )
  
CREATE (s:Course) - [:RELATED_TO] -> (t:Topic)
//Course end

CREATE (l:Language 
    { id : ,
      name : ,
      }
    )

//Company
CREATE (c:Company 
    { id : ,
      name : ,
      field : ,
      foundedIn : ,
      website : 
      }
    )

CREATE (c:Company) - [:LOCATED_IN] -> (l:Location)
//Company end

//ResearchPaper
CREATE (r:ResearchPaper 
    { id : ,
      title : ,
      citations : 
      }
    )
  
CREATE (r:ResearchPaper) - [:WITH] -> (s:Student)

CREATE (r:ResearchPaper) - [:WITH] -> (t:Teacher)

CREATE (r:ResearchPaper) - [:ABOUT] -> (t:Topic)
//ResearchPaper end

//HostelRoom
CREATE (h:HostelRoom 
    { id : "",
      block : "",
      roomNo : "",
      capacity : "",
      occupancy : ""
      }
    )

CREATE (h:HostelRoom) - [:LOCATED_IN] -> (l:Location)
//HostelRoom end 

CREATE (n:Notice 
    { id : "",
      title : "",
      content : "",
      tag : ""
      }
    )
//Project
CREATE (p:Project 
    { id : "",
      name : ""
      }
    )

CREATE (p:Project) - [:ABOUT] -> (t:Topic)

CREATE (p:Project) - [:WITH] -> (s:Student)

CREATE (p:Project) - [:WITH] -> (t:Teacher)
//Project end

//Exam
CREATE (e:Exam 
    { id : "",
      name : ""
      }
    )

CREATE (e:Exam) - [:ABOUT] -> (t:Topic)
//Exam end 

//Achievement

CREATE (a:Achievement 
    { id : "",
      title : "",
      description : ""
      }
    )

CREATE (a:Achievement) - [:ABOUT] -> (t:Topic)
//Achievement end


//queries template


MERGE (s:Student 
{ name : $studentData_name,
age : $studentData_age,
email : $studentData_email,
phone : $studentData_phone,
currentlyStudying : $studentData_currentlyStudying,
department : $studentData_department}) 
MERGE (l:Location 
{ latitude : $studentLocation_latitude,
longitude : $studentLocation_longitude,
city : $studentLocation_city,
state : $studentLocation_state,
country : $studentLocation_country,
continent : $studentLocation_continent,
address : $studentLocation_address,
postalCode : $studentLocation_postalCode}) 
MERGE (s) - [:LIVES_IN] -> (l);


MERGE (s:Student 
{ name : $studentData_name,
age : $studentData_age,
email : $studentData_email,
phone : $studentData_phone,
currentlyStudying : $studentData_currentlyStudying,
department : $studentData_department}) 
MERGE (i:Institute 
{ name : $institute_name, 
website : $institute_website, 
phone : $institute_phone, 
degree : $institute_degree } ) 
MERGE (s) - [:STUDIED_IN {
  startDate : $relStudiedIn_startDate,
  endDate : $relStudiedIn_endDate,
  score : $relStudiedIn_score
}] -> (i);

MATCH (i:Institute { 
  name : $institute_name, 
  website : $institute_website, 
  phone : $institute_phone, 
  degree : $institute_degree }) 
  MERGE (l:Location 
  { latitude : $instituteLocation_latitude, 
  longitude : $instituteLocation_longitude, 
  address : $instituteLocation_address}) 
MERGE (i) - [:LOCATED_IN] -> (l);


MERGE (s:Student 
{ name : $studentData_name,
age : $studentData_age,
email : $studentData_email,
phone : $studentData_phone,
currentlyStudying : $studentData_currentlyStudying,
department : $studentData_department}) 
MERGE (sub:Subject 
{ name : $name,
credits : $credits,
sem : $sem})
MERGE (s) - [:COMPLETED] -> (sub);

MERGE (s:Student 
{ name : $studentData_name,
age : $studentData_age,
email : $studentData_email,
phone : $studentData_phone,
currentlyStudying : $studentData_currentlyStudying,
department : $studentData_department}) 
MERGE (sub:Subject 
{ name : $name,
credits : $credits,
sem : $sem})
MERGE (s) - [:ENROLLED_IN] -> (sub);


MERGE (s:Student 
{ name : $studentData_name,
age : $studentData_age,
email : $studentData_email,
phone : $studentData_phone,
currentlyStudying : $studentData_currentlyStudying,
department : $studentData_department}) 
MERGE (sk:Skill { name : $skill_name})
MERGE (s) - [:HAS] -> (sk);


MERGE (s:Student 
{ name : $studentData_name,
age : $studentData_age,
email : $studentData_email,
phone : $studentData_phone,
currentlyStudying : $studentData_currentlyStudying,
department : $studentData_department}) 
MERGE (l:Language { name : $language_name,})
MERGE (s) - [:SPEAKS] -> (l);



MERGE (s:Student 
{ name : $studentData_name,
age : $studentData_age,
email : $studentData_email,
phone : $studentData_phone,
currentlyStudying : $studentData_currentlyStudying,
department : $studentData_department}) 
MERGE (c:Course { name : $course_name,})
MERGE (s) - [:COMPLETED] -> (c);


MERGE (s:Student 
{ name : $studentData_name,
age : $studentData_age,
email : $studentData_email,
phone : $studentData_phone,
currentlyStudying : $studentData_currentlyStudying,
department : $studentData_department}) 
MERGE (i:Interest { name : $interest_name,})
MERGE (s) - [:INTERESTED_IN] -> (i);



MERGE (s:Student 
{ name : $studentData_name,
age : $studentData_age,
email : $studentData_email,
phone : $studentData_phone,
currentlyStudying : $studentData_currentlyStudying,
department : $studentData_department}) 
MERGE (c:Club { name : club_name})
MERGE (s) - [:PART_OF {
startDate : $relPartOfClub_startDate,
endDate : ,$relPartOfClub_endDate,
position : $relPartOfClub_position
}] -> (c);


MERGE (s:Student 
{ name : $studentData_name,
age : $studentData_age,
email : $studentData_email,
phone : $studentData_phone,
currentlyStudying : $studentData_currentlyStudying,
department : $studentData_department}) 
MERGE (r:ResearchPaper {title : $researchPaper_title, description : $researchPaper_description})
MERGE (s) - [:PUBLISHED] -> (r);

MERGE (s:Student 
{ name : $studentData_name,
age : $studentData_age,
email : $studentData_email,
phone : $studentData_phone,
currentlyStudying : $studentData_currentlyStudying,
department : $studentData_department}) 
MERGE (a:Achievement { title : $achievement_title, description : $achievement_description})
MERGE (s) - [:HAS_ACHIEVED] -> (r);


MERGE (s:Student 
{ name : $studentData_name,
age : $studentData_age,
email : $studentData_email,
phone : $studentData_phone,
currentlyStudying : $studentData_currentlyStudying,
department : $studentData_department}) 
MERGE (p:Project { name : $project_name, description : $project_description})
MERGE (s) - [:HAS_DONE] -> (p);


MERGE (s:Student 
{ name : $studentData_name,
age : $studentData_age,
email : $studentData_email,
phone : $studentData_phone,
currentlyStudying : $studentData_currentlyStudying,
department : $studentData_department}) 
MERGE (c:Company 
{ name : $company_name,
field : $company_field, 
website : $company_website})
MERGE (s) - [:WORKED_IN {
  startDate : $workedInCompany_startDate ,
  endDate : $workedInCompany_endDate,
  position : $workedInCompany_position
}] -> (c);


MERGE (c:Company 
{ name : $company_name,
field : $company_field, 
website : $company_website})
MERGE (l:Location 
{ latitude : $companyLocation_latitude,
longitude : $companyLocation_longitude,
city : $companyLocation_city,
state : $companyLocation_state,
country : $companyLocation_country,
continent : $companyLocation_continent,
address : $companyLocation_address,
postalCode : $companyLocation_postalCode}) 
CREATE (c) - [:LOCATED_IN] -> (l);





















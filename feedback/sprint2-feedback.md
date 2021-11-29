# Sprint 2 feedback for MIMDB

( ) tagged commit on main for sprint2
(-) set of closed user stories
( ) working deployment on Heroku
( ) travis reports build passing
(-) team members have completed reflection
(X) demo

## Checklist notes

- no `sprint2` tag
- I see some closed user stories. The sprint 1 and sprint 2 stories are jumbled together and only some of them are tagged, so it is hard to know what you did ths sprint. 
- Deployment to heroku was not working at time of demo
- Travis remains inert, but you are failing a test


I have reflections from 
Nick M
Nicholas S
Katie

## Discussion

You have done some strong work on this project, but some of the process side seems to have gotten away from you. 

I am also very concerned about what appears to be an unbalanced amount of effort. Nicholas seems to be dominating. Jiaqi and Katie are making a good showing. Nick and Wayne show up less often. Becca is trailing well behind and Alex doesn't appear to have made any commits. Some of this is probably due to some pair programming, but I suspect that not all of it is. This project should not be the Nicholas show. Your team is probably out ahead productivity-wise, but if the forward push needs to slow down a little to let everyone get up to speed, that is okay.

### User stories

There is some vagueness in your acceptance criteria that should be addressed.

- In #54: "with varying levels of exposure". What does that mean? How do we test for it?

- In #59: "easy-to-use interface". Measured how? "reliable database". This just seems redundant.

- In #56: "details such as". Some specifics are listed so stop there. These details should also be mentioned in the user story itself with the rationale. The rationale of wanting a "better understanding" is too vague. _Everything_ should be justified or it isn't worth the effort. For example, why include the class year? Why would a visitor to the web site need that for any reason? I'm not saying that there isn't a reason, I'm saying you need to name it. In naming it you may discover that there are better ways to support it. Or you may discover that the rationale is weak when compared to the cost and the potential for harm that sharing the data might incur. 


#60 is not a user story, it is a developer story in user story format. 

### Agility/scrum

I see  steady pattern of commits. I see some points on backlog items. I would prefer to see separate Completed columns, or more consistent tagging. Also, some things in the Completed column are not closed.

I'll also note that at the end of the sprint there should be no open PRs, no more items in the pending pile, and we shouldn't have so many open branches. The idea of a sprint is to _finish_ things. If you can't get them finished, they were too big and should have been split up more.


### Integration

I am seeing some good PR interaction with real reviews and comments. 

### Implementation

I appreciate the specification documents. However, they should not under `pages` because the Next server will try to serve them. They should either be included in the README.md or in a `doc` folder outside of `src`.

I would like to see some higher quality tests. Don't focus on the little unit tests that test if the component shows the thing you told it to show. While some of those are reasonable, it can lead to you writing a lot of tests that don't tell you much. Focus on functionality. I would like to see tests that make sure that you can search by course, or that when you look at a film page you are showing the data from the server. 

Another suggestion would be to use a layout component to maintain your look and feel across the different pages. 


### Functionality

We don't have much change in the visible functionality, but I see that a lot has been done incorporating the server side, which is a positive step forward. 

One bug for you to address is the presence on the drop down menus and search in the different views. These shouldn't be in place for submission, and when looking at a single film it probably doesn't make much sense either (the menus are also blank in that view). 

I think there is also some iteration that could be done on the submission page. You need to think through exactly what is needed and what is extra information. You should think about Course Id versus the Courses drop down. I would also think a little bit about how to make it more obvious how to use the tools for adding actors and directors. The interface is not clear and click to remove is not expected. It is strange that the two similar looking fields behave differently. I also think you will rapidly have a scalability problem when there are more than ten actors or directors in the system. Who will do the submitting?
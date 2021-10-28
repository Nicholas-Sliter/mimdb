# Sprint 0 feedback for MIMDB



(X) project repository with all team members
(X) package.json updated
(X) `npm test` and `npm run lint` run without errors
(X) travis reports build passing
(X) project deployed to heroku
(X) README.md is updated
(X) one pull request
(X) commit tagged sprint0
(X) backlog populated with epic user stories
(-) lo-fi storyboards created
(X) CRC cards created

## Checklist notes

- Make sure to delete old feature branches that are fully merged (like `template-fixes`)
- The little board scrawl could have stood another iteration or two

## Design notes

It looks like you have a reasonable start on the epic user stories. I appreciate that the stories associated with issues #9 and #13 are detailed and have an acceptance criteria (though the criteria in #9 gets a little into the weeds with specific user interface elements). Story #10 is a little sparser and could stand to be fleshed out with a rationale and acceptance criteria (is this about wanting to watch student films?). I think you could dig a little deeper about why someone would use the site. Would a professor use this? What for? Why do you want to find people who helped out? Is it just curiosity, or are you looking for actors/electricians/camera operators/sound techs? 

The more you understand about _why_ someone would come to the site, the more you will know about what it should do. For example, you may have a goal to find students who have done lighting that haven't graduated so they can help you on your film. That implies a data model that associates role and class year to students. It may even suggest that you want to support a way for students to register their availability for similar roles in the future. this is why we want to have some good solid user stories to start with, because they cascade down into design decisions. Be wary of "this is Midd IMDB -- we can just copy how they do things".

For the CRC cards, it appears that you focused more on the interface elements, and it is a little early for that. I was hoping for you to focus on the data model. The one card that speaks to that is 'Film'. I suspect you may have more data than that. Presumably you will have user data, at the very least for administrators. It probably also makes sense to have a separate data item for contributors (possibly one that knows the roles they have played). 

The storyboard is _very_ preliminary. However, it already contains a number of things not hinted to by your user stories. For example, you have a "featured" section. What makes a film featured? Is this a curated list? A random collection? User rated? Why do you have a featured section at all -- what are you trying to support and for whom?

A second thing I spot is the menu with "classes" in it. Is it important that films be viewable by class? For whom? Why? (I can imagine scenarios where it is useful, but it needs to be supported by user stories). 

This is the big message I would like you to take away from this review. You need to think more about why someone would come to this site and what they are trying to accomplish, _and_ don't include any features that aren't accounted for by user stories. It is okay to brainstorm a bunch of designs that have things like "featured" present (please do!), but acknowledge that they are there and support them with user stories, or throw them away.

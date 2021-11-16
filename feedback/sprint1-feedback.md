# Sprint 1 feedback for MIMDB

(X) tagged commit on main for sprint1
(X) set of closed user stories
(X) working deployment on Heroku
(X) travis reports build passing
(-) team members have completed reflection
(X) demo

## Checklist notes

I have reflections from 
Nick M
Nicholas S
Katie
Alex

## Discussion

### User stories

Overall, the user stories seem reasonable, and I see some attempts to include acceptance criteria, which is a good. 

However, I think there is some room for improvement in your process here. 

Take this user story for example:

"As a random viewer who does not necessarily have immediate interest in a specific film, I would like to see a grid/list of films on the main page, so I can browse around.

I will know this is finished when on the landing page there exists a grid of movies on the landing page that I can interact with."

On the face of it this is okay, but it is implying an interface in the user story. The user story should just be something along the lines of "As a user I would like to be able to browse the entire collection of films because I am generally interested in what kinds of films Middlebury film students are making". The focus is on the activity (browsing the collection), not on the interface. It is then up to the development team to determine _how_ to satisfy this requirement, which you can then write as a follow up on the issue. The reason to stress this distinction is to make the design process more flexible. if you bake the design into the requirements from the beginning, you won't be able to take on board alternate design suggestions. 

I also wanted to talk about this one:

"As a random viewer I would like to easily know that I can filter and search the movies that I can see based on given categories so that I can browse for a movie I want to watch.

I know this is done when I can filter films based on categories listed at the top"

There are a couple of things that I would highlight about this. The first is a little bit of vagueness to the language. Are we talking about selecting categories, filtering, search, or browsing? Those are all slightly different activities. Browsing, in particular, is the opposite of searching. When we get to the acceptance criteria, this is reduced down to "filter films based on categories listed on the top", which is _very_ specific and implies things not present elsewhere (like that there are categories on the top).

There are, in fact, many things that this story seems to imply. 

- For some reason, there are special categories for the films. Why? What are they?
- There is some indication that search is a possibility. Again, why? What are you trying to support? Search was certainly shown off in the demo. Is this the only user story that covered its use? The search even appeared to support fuzzy search terms. Why? I'm not saying fuzzy search is a bad thing, but if you don't have a user story that justifies a feature because it offers a real benefit to the user, you are wasting your time implementing it. 
- There _are_ some user stories about searching for things, but they are still in product backlog. 


### Agility/scrum

I do see a steady pattern of commits over the sprint, and a reasonable velocity. I will note that Nicholas S is slightly over-represented in the commit history and some others in the group are... less so.


### Integration

I am seeing some good PR activity. I do, however, see a collection of merged feature branches hanging out. When you merge in a feature, throw out the branch. With shortlived feature branches that are only local to your own repos, it will be easier to rebase and reduce merge conflicts with main.



### Implementation

You clearly roared out of the gate and have a lot of work in place for the end of sprint 1. Just remember that we are trying to use some good Agile practices, like TDD, with tests coming first, and design decisions justified by user stories. 

I do see some tests, but they are perhaps on the simplistic side. They seem to focus primarily on checking if interface elements are visible. This is okay, but you'll want to make sure you are checking functionality, like testings you search capabilities. 

### Functionality

The interface looks great, and everything appears to be functioning (other than the drop-down menus). The only real issue I see right now is the pinched images in the detail view. 

Just to get it in writing, I will repeat two of the things I pointed out during the demos:

- part of what makes the site look nice is that you have all of these well-sized movie posters and screen grabs. The typical student film will not have that. How are you going to compensate? You don't want to just pawn this off to your users, or you will rapid discover you don't have any. 

- I think you should address the "featured films" part of the site. As I said in class, it isn't really "featured" if it is randomly chosen on every page load. So, is this about actually _featuring_ films in some way, or just showing random films at the top. Start by going back to the user story. Huh... there isn't one. So maybe one needs to be written -- if the feature is worth keeping. What is the goal of this privileged section? If it is just to give exposure to random films, that's fine, but consider if that is actually something that a user would actually want. In our discussion, it seems like many of the users of the site would have something of a focus (looking up a particular person or film, looking to see what different classes produce, etc...). Even folks who are browsing probably don't need this feature. It looks nice, but I can't off the top of my head think of a scenario where it would be useful. 
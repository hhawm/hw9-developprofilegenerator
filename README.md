# Unit 09 Node.js and ES6+ Homework: 
# Developer Profile Generator

The user will be prompted for a GitHub username, and this profile generator application will dynamically generate a PDF profile. The application will be invoked with the following command:

```sh
node index.js
```

The user will also be prompted to choose a color (green, blue, pink, or red) which will be used as the background color for cards.

The PDF will be populated with the following:

* Profile image
* User name
* Links to the following:
  * User location via Google Maps
  * User GitHub profile
  * User blog
* User bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following

Given user story:

```
AS A product manager

I WANT a developer profile generator

SO THAT I can easily prepare reports for stakeholders
```


## Business Context

When preparing a report for stakeholders, it is important to have up-to-date information about members of the development team. Rather than navigating to each team member's GitHub profile, a command-line application will allow for quick and easy generation of profiles in PDF format.

```
GIVEN the developer has a GitHub profile

WHEN prompted for the developer's GitHub username and favorite color

THEN a PDF profile is generated

THANKS!

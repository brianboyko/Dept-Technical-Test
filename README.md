# Dept Technical Test - Brian Boyko

This is a technical take home test for a front-end developer role at Dept. 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Installation

For local installation, run the following commands:

For NPM, 
```bash
$ npm i
$ npm run build
$ npm run start
```

For Yarn
```bash
$ yarn
$ yarn build
$ yarn start
```

This should run the 

## Specifications 

* Recreate the design of the provided PDF as closely as possible.
* Using the Open AQ Air Quality API, create a tool which allows the user to compare air quality across cities in the UK. 
* Create a search box with an autocomplete select input. 
* The search box should allow the user to search and select a city from a list of options. 
* These options should be filtered from a larger list of options, based on the current input. (I.e., "ma" would result in "Manchester" and "Maidenhead" but not "London")
* When an option is selected, a card should appear listing
  * The time the statistics were updated (in human-readable language, e.g. "an hour ago, 1 day ago")
  * The location name
  * The city name and country
  * The air quality values at time of retrieval
  * A remove call to action (X) in the right hand corner which removes the card when clicked. 

## Deliverables

* Submit the source code to a public repo or a ZIP file. 
* Have a compiled distribution which can be run driectly in the browser (i.e., without having to server from a task runner such as gulp or webpack). 
  * Alternatively, host the files somewhere. 

## Technical Decisions

Some technical decisions: 

### Typescript

Typescript is chosen because it's ability to 'document as you code' and to allow the project to scale.  

### Next.js

There are two reasons for using Next.js here. The first is performance - while there will be client-side API calls (as is the nature of the application), there needs to be at least one API call before the application can produce anything performant - the list of towns available - which can be done server-side. This should reduce time-to-interactivity slightly. 

Secondly, a more personal reason - when I do these technical tests, which can be repetitive, I always try to do something new with each. In this case, it would be the inclusion of Next.js.  While I have worked with Next.js before, I don't have anything on my Github to reflect that - this seems like a good opportunity to do so. 

The third - and the biggest - is that this uses a third party API, and there are CORS issues with trying to grab that API data and run it in localhost.  A "neat trick" of Next.js is that we can use Next.js's built in API to fetch the data we want, and then re-fetch that data from the Next.js API.  

### ReduxJS/Toolkit

Redux is overkill for this project - most of the information could be handled via React's built in Context API. However, there are two reasons I choose Redux here - the first is that most production codebases are better served with Redux than with the Context API, because most production projects are much, much larger - Context API, if not used well, can result in a lot of unnecessary re-renders that can be avoided "out of the box" with Redux Toolkit. 

Secondly, I find Redux easier to test than most other state management solutions, including the context API.
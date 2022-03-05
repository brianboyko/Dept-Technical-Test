# Dept Technical Test - Brian Boyko

This is a technical take home test for a front-end developer role at Dept. 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

There are two reasons for using Next.js here. The first is performance - while there will be client-side API calls (as is the nature of the application), there needs to be at least one API call before the application can produce anything performant - the list of towns available. This should reduce time-to-interactivity slightly. 

Secondly, a more personal reason - when I do these technical tests, which can be repetitive, I always try to do something new with each. In this case, it would be the inclusion of Next.js.  While I have worked with Next.js before, I don't have anything on my Github to reflect that - this seems like a good opportunity to do so. 
# Next.JS Documentation

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

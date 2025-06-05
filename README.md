# JS Game

This projects take over from a game I created for [13K Games](https://js13kgames.com/) in 2021. The idea of this project is to review some of the elements created back then, and improve them.

In the [original project](https://github.com/montfoc/js13kgames2021), there were multiple elements that had some flaws in the design and code. I would like to haver a better understanding of how to make the character to work with gravity over platforms, specially over moving platfroms.

This time, size is not a contraint, so I want to use sprites if needed, and improve the music.

My plan for this project is just learning, so I will use external resources to learn as well as Gen AI to improve code are have better understanding of cretain parts.

## Project overview

The initial project was a 2D platform game. We reincarnated an astronaut that had to repair a spacesheep by fixing the terminals. In order to do that, the player needed to move from platform to platform and collect some elements before arriving to the terminals.

In this project I want to create something similar. I want to start with a simple scene, and keep making them more and more complex.

I want to also document the learnings and findings, to be able to reuse the knowledge if I ever need it.

Tasks to do:

- [X] Create a local server to load the project
- [X] Do the setup to generate TypeScript code for the project
- [ ] Review the character creation
- [ ] Review the logic of collisions
- [ ] Creation of a floor to keep the character in the floor
- [ ] Review the logic to move the player (right and left, with rotation of character depending on the movement direction)
- [ ] Review creation of the limits of the screen. I would like to have:
    - [ ] Fixed scenarios (all is in the screen)
    - [ ] Fixed camera on scenarios (scenario is bigger than the camera, the camera moves along the character)
- [ ] Review the player jump logic
- [ ] Review differentiation between solid objects and collectable items
- [ ] Check how to improve event games. I think it would be great to manage events in a general way, not in each class
- [ ] Create a second scence, and create transition between scenes
- [ ] Review creation of moving platforms and improve logic for collisions with player and other objects

## Run the project

Initially the project was created with the bundle of the different files into a single one. And the index.html file was executing the project according to the built assets.

This time, I will just go with the simple import of the `main.js` file from the `index.html`, and will create an onload attribute that will be executing the initial function to execute the game loop.

Nowadays, browsers do not allow to load local javascript files without using `file://` protocol, instead we need to use `http://` protocol.

We can use different alternatives, like using Python, Node.js to create local servers. Another option is to just intall extensions that allow to do it from the IDE. In this case, I will use the VS Code extension called [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), that allows to serve the project as we program it.

Once we install the extension, we should see an icon in the bottom right corner of the editor, that says **Go Live**. If we click into it, it will load the content of the page in the system default browser.

The extension works with hot-reload, meaning that the page will reload when we save the files.

## Migration to TypeScript

```bash
# Install TypeScript as development dependency
npm install typescript --save-dev

# Initialize a TypeScript configuration file (this will generate a tsconfig.json file)
npx tsc --init
```

I have made some changes to `tsconfig.json`, like changing the target JS Version selecting the latest `target`. I have also configured the `rootDir` to match the locations of the project files (TS files). I have added the `outDir` to the `public/dist` folder (this helps to remove problems with live server), so all the generated JS files will be saved there. Finally I have specified the `include` attribute to setup the files that we need to include as part of the compilation, including all subfolders of the `src` folder.

To run the project I will continue using the Live Server extension. But I have added the folder `.vscode`, with the file `settings.json` . This allows to override certain configurations at the project level. One of the configurations is to setup the load folder for the extension, pointing to the public folder, where the `index.html` file lives.

In addition to start the Live Server, I need to run also the command `npm install && npm run dev`.

## Questions

- **Why was Gulp used in the original project? Should I continue using it?**
  - This project was created for a participation on [13K Games](https://js13kgames.com/), and to follow the contest requirements, I had to be very mindful about the space that the game uses. Since I worked using several files the conde was taking more than 13KB without minifying the project. Gulp is a tool to automate workflows, and in the original project I added multiple tasks to generate the bundle in a zip file, which contained the minified versions f the files, both JS and CSS.
- **Should I use a library or a framework or use custom made implementations?**
  - I want to learn or review some basic knowledge respect to how to build some parts manually, before using existing frameworks to create games. I'm specially interested on learning about the hit boxes, and the gravity on moving platforms, but also about how to work with sprites.

## Troubleshooting

- When using `type="module"` when importing a JavaScript file from an HTML page, we need to add global objects and variables part of the `window` object. For example: `(window as any).start = start;`, or in vanilla JS: `window.start = start;`.
- I found an issue when using TypeScript imports serving the project with Live Server. The server was not able to find JS files, because the src was not finding the files. Eventually I realised that the file it was trying to import was missing the `.js` extension given that I was using imports without extension as I am used to do. Appending the extension make the project to work.


## Resources

- [Original project (Github)](https://github.com/montfoc/js13kgames2021)

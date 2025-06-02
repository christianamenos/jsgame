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
- [ ] Do the setup to generate TypeScript code for the project
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

## Questions

- **Why was Gulp used in the original project? Should I continue using it?**
  - This project was created for a participation on [13K Games](https://js13kgames.com/), and to follow the contest requirements, I had to be very mindful about the space that the game uses. Since I worked using several files the conde was taking more than 13KB without minifying the project. Gulp is a tool to automate workflows, and in the original project I added multiple tasks to generate the bundle in a zip file, which contained the minified versions f the files, both JS and CSS.
- **Should I use a library or a framework or use custom made implementations?**
  - I want to learn or review some basic knowledge respect to how to build some parts manually, before using existing frameworks to create games. I'm specially interested on learning about the hit boxes, and the gravity on moving platforms, but also about how to work with sprites.




## Resources


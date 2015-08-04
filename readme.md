# Words That Matter

This is a web game created by Andrea Gonzales, Jasmine Mithani, and Jon Uy for DoSomething.org. The player navigates the game as a high schooler on their way to prom. Throughout gameplay, the player learns different, more subtle ways unhealthy relationships can manifest. At the end of the game, the player is given a chance to intervene in a situation. After, statistics relating to unhealthy relationships are shown, and then the player can choose to sign up for a DoSomething.org campaign to combat the numbers.

## Setting up for development

Fork the repository, which is based off of the Phaser Project Template. Follow the steps below to install `grunt.js` and `nope.js`.

The following are included:

*   A **package.json** for installing npm dependencies
*   **GruntFile.js** for automating build tasks and compiling your game
*   **src** folder where you can put your game code.
*   **deploy** folder where all code gets compiled to and you can push to a server

To get started all you need to do is download a <a target="_blank" href="https://github.com/gamecook/phaser-template-project">copy of this template</a>, the latest version of <a target="_blank" href="https://github.com/photonstorm/phaser">Phaser</a>, [NodeJS](http://nodejs.org) and [Grunt](http://gruntjs.com/).

### Installing NodeJS and Grunt

You can get a copy of NodeJS on its site <a target="_blank" href="http://nodejs.org/">here</a> and install it. After installing it you will want to install grunt from the command line.

Now you can install Grunt's command line tools by typing out the following:

<pre lang="javascript">> npm install -g grunt-cli</pre>

From here, Grunt should work via the command line. If you have never installed Node or Grunt, make sure you watch these two videos:

* [Installing Git, NodeJS and PHP for Impact Game Dev Part 1](http://vimeo.com/78634968)
* [Installing Git, NodeJS and PHP for Impact Game Dev Part 2](http://vimeo.com/78637475)

These two videos help walk you through how I have used Node and Grunt in the past with my other game starterkits. *Note: You will not need to install PHP for this project which is covered in these videos*.


### Setting up the Template's Dependencies

Via the command line, navigate into the template directory's root and run the following command:

<pre lang="javascript">> npm install</pre>

This will download all the dependencies in the package.json file and install them locally for you to use. 

<img border="0" width="624" id="Picture 1" src="http://jessefreeman.com/wp-content/uploads/2014/03/pt-install.png" />

After that you can simply run the following:

<pre lang="javascript">> grunt</pre>

It will launch a browser with the default screen which will look something like this:

<img border="0" width="624"id="Picture 3" src="http://jessefreeman.com/wp-content/uploads/2014/03/Phaser-Template.png" />

You can start building a game with Phaser, simply modify the main.js file inside of the src/game directory. As long as you have the Grunt task running, your project will automatically recompile every time you make a change to any JavaScript file inside of the src directory. Once the project is recompiled, simply refresh your browser to see the changes. Also make sure you disable your browser's cache.

### What Else?

Make sure you are using the most recent version of Phaser. Go to the Phaser github page and download the latest source code. Once you have that, simply copy the minified version of Phaser into the src/lib directory and replace the one that is currently there.

<img border="0" width="333"id="Picture 3" src="http://jessefreeman.com/wp-content/uploads/2014/03/pt-src.png" />

Also, if you are lost or need some point of reference go through <a target="_blank" href="http://gametest.mobi/phaser/">each of the tests</a> in the Phaser project to see how things work until more of the framework is documented.

*Adapted from Jesse Freeman's readme*

## Deployment

This project is set up with `gh-pages`. The game lives [here](http://dosomethinggames.github.io/words-that-matter/) - it can take a few minutes for it to catch up with any recent merges to master.

# What's Cookin'? 

## Contributors: Whitney Perricone, Zachary Saile, TylerTedesco

## Overview: What's Cookin' is an app to help find recipes and plan what to cook. A user can either search for a specific tag or title, or they can browse recipes in each tag or all the recipes available. Once the user has chosen a recipe they would like to try, they are able to add it to their 'To Cook' list. If there is a recipe they like and would like to keep easily accessable, they can add it to their 'Favorites' list. If their favorites list gets long, they can serch within their favorites to find what they are looking for. Additionally, if the user decides they no longer want a recipe in their favorites, they can delete it. 

### Technologies Used: JavaScript, Mocha, Chai, Webpack, GitHub, GitHub Projects

The details of this project are outlined in the <a href="https://frontend.turing.edu/projects/What%27sCookin-PartOne.html" target="\__blank">project spec</a>.

## Set Up

1. Within your group, decide on one person to have the project repository on their Github account. This person will *fork* this repository - on the top right corner of the page, click the fork button.
2. All group members should then clone down the forked repository (make sure that everyone is added as a collaborator as well). Since you don't want your project to be named "whats-cookin-starter-kit", add an optional argument after the repo url when cloning. The command should look like this: `git clone [remote-address] [what you want to name the repo]`.
3. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` or `npm i` to install project dependencies.
4. Run npm start in the terminal to see the HTML page (you should see some boilerplate HTML displayed on the page). `Control + C` is the command to stop running the local server. Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems. This command is not specific to Webpack; make note of it for future use.
5. Make sure both members of your team are collaborators on the forked repo.
6. Do not run `npm audit fix --force`. This will update to the latest version of packages. We need to be using `webpack-dev-server@3.11.2` which is not the latest version. If you start to run into Webpack errors, first check that all group members are using the correct version.

## Testing

Mocha and chai are already set up, with a boilerplate test for you.

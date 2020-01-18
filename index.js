const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");
const fs = require('fs');
var pdf = require('html-pdf');

const makeHTML = require('./generateHTML.js');

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
  {
    type: "input",
    message: "What is GitHub username?",
    name: "username",
  },
  {
    type: "list",
    message: "Pick a color theme:",
    choices: Object.keys(makeHTML.colors),
    name: "color",
  }
];

// Parse response data from API into an object
function parseResponse(resUser, resStarred, userColor) {
  const data = {
    name: resUser.name,
    login: resUser.login,
    img: resUser.avatar_url,
    bio: resUser.bio,
    blog: resUser.blog,
    location: resUser.location,
    url: resUser.html_url,
    publicRepos: resUser.public_repos,
    followers: resUser.followers,
    following: resUser.following,
    stars: resStarred.stargazers_count,
    color: userColor
  }
  formatData(data);
  console.log(data);
  return data;
}

function formatData(data) {
  if (data.location) {
    // Sets location to map
    data.map = "https://www.google.com/maps/place/" +
      data.location.replace(/\s/g, "+");
  } else {
    // Sets default value if null or undefined for location 
    data.location = "Location not provided";
    data.map = "#";
  }

  // Sets default value if null or undefined
  if (!data.name) {
    data.name = data.login;
  }

  if (!data.bio) {
    data.bio = "";
  }

  if (!data.blog) {
    data.blog = "#";
  }
  // Hacked this one because couldnt figure it out
  if (!data.stars) {
    data.stars = 0;
  }
}

// MAIN FUNCTION
async function init() {
  console.log("Welcome to Github Profile Generator!")
  let data = {};
  try {
    // asks user for github username and color
    const inputData = await inquirer.prompt(questions);
    // console.log(inputData.username);
    // console.log(inputData.color);
    const userName = inputData.username;
    const userColor = inputData.color;

    const urlUser = `https://api.github.com/users/${userName}`;

    const urlStarred = `https://api.github.com/users/${userName}/starred`;

    const responses = await Promise.all(
      [
        axios.get(urlUser),
        axios.get(urlStarred),
      ]);

    const [resUser, resStarred] = responses.map(res => res.data);

    // console.log(resUser);
    // console.log(resStarred);


    // Saves the user data from Github and sets color theme
    data = parseResponse(resUser, resStarred, userColor);

    const html = makeHTML.generateHTML(data);

    var filename = data.login + "-" + data.color + ".html";

    await writeFileAsync(filename, html)
    // await writeToPDF
    var html1 = fs.readFileSync(filename, 'UTF8');
    var options = { orientation: "portrait" };
    var PDFfilename = data.login + "-" + data.color + ".pdf";

    pdf.create(html1, options).toFile(PDFfilename, function (err, res) {
      if (err) return console.log(err);
      console.log(res.filename);
      console.log("Successfully wrote HTML file to " + filename);
      console.log("Successfully wrote PDF file to " + PDFfilename);
    });


  } catch (err) {
    console.log(err);

  }
}

init();


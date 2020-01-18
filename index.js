const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");

var fs = require('fs');
var pdf = require('html-pdf');

const makeHTML = require('./generateHTML.js');

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
  {
    type: "input",
    message: "What is GitHub user name?",
    name: "username"
  },
  {
    type: "list",
    message: "Pick a color",
    name: "color",
    choices: Object.keys(makeHTML.colors)
  }
];

function promptUser() {
  return inquirer.prompt(questions);
}

async function init() {
  console.log("Hello")
  try {
    const data = await promptUser();
    console.log(data.username);
    console.log(data.color);

    const githubURL = `https://api.github.com/users/${data.username}`;
    const response = await axios.get(githubURL);
    const response1 = await axios.get(githubURL + `/starred`);
    console.log(response.data);
    console.log(response1.data);

    const name = response.data.name;
    console.log(name);

    const starred = response1.data.length;
    console.log(starred);

    const html = makeHTML.generateHTML(data);

    var filename = data.username + ".html"

    await writeFileAsync(filename, html)
    var html1 = fs.readFileSync(filename, 'utf8');
    var options = { format: 'Letter' };
    var PDFfilename = data.username + ".pdf"

    pdf.create(html1, options).toFile(PDFfilename, function (err, res) {
      if (err) return console.log(err);
      console.log(res);
    });

    console.log("Successfully wrote HTML file to " + filename);
    console.log("Successfully wrote PDF file to " + PDFfilename);

  } catch (err) {
    console.log(err);
  }
}

init();


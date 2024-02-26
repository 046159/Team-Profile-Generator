/* ----------------------------- Setup constants ---------------------------- */
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = []; // Will contain the employee objects that will be rendered in the HTML

/* --------------------- Function to initialise program --------------------- */
function init() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'teamManagerName',
                message: 'Team Manager - Name:',
            },
            {
                type: 'input',
                name: 'teamManagerId',
                message: 'Team Manager - Employee ID:',
            },
            {
                type: 'input',
                name: 'teamManagerEmail',
                message: 'Team Manager - Email:',
            },
            {
                type: 'input',
                name: 'teamManagerOfficeNumber',
                message: 'Team Manager - Office Number:',
            }
        ])
        .then((data) => {
            const manager = new Manager(data.teamManagerName, data.teamManagerId, data.teamManagerEmail, data.teamManagerOfficeNumber);
            team.push(manager);
            displayMenu();
        })
}

/* ---------------------- Function to display the menu ---------------------- */
function displayMenu() {
    console.log(`\n`);
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'Would you like to:',
                choices: ['Add an engineer', 'Add an intern', 'Finish building the team']
            }
        ])
        .then((data) => {
            switch (data.menu) {
                case "Add an engineer":
                    addEngineer();
                    break;

                case "Add an intern":
                    addIntern();
                    break;

                case "Finish building the team":
                    finish();
                    break;

                default:
                    break;
            }
        })
}

/* ----------------------- Function to add an Engineer ---------------------- */
function addEngineer() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: 'Engineer - Name:',
            },
            {
                type: 'input',
                name: 'engineerId',
                message: 'Engineer - Employee ID:',
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: 'Engineer - Email:',
            },
            {
                type: 'input',
                name: 'GitHub',
                message: 'Engineer - GitHub Username:',
            }
        ])
        .then((data) => {
            const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.GitHub);
            team.push(engineer);
            displayMenu();
        })
}

/* ------------------------ Function to add an Intern ----------------------- */
function addIntern() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'internName',
                message: 'Intern - Name:',
            },
            {
                type: 'input',
                name: 'internId',
                message: 'Intern - Employee ID:',
            },
            {
                type: 'input',
                name: 'internEmail',
                message: 'Intern - Email:',
            },
            {
                type: 'input',
                name: 'school',
                message: 'Intern - School:',
            }
        ])
        .then((data) => {
            const intern = new Intern(data.internName, data.internId, data.internEmail, data.school);
            team.push(intern);
            displayMenu();
        })
}

/* -------- Function to finish up, render the HTML and write to file -------- */
function finish() {
    const html = render(team);
    fs.writeFile(outputPath, html, function (err) {
        if (err) {
            console.log(err);
        }
    })
}

/* ------------------- Function call to initialise program ------------------ */
console.clear();
init();
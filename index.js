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
            displayEmployee("Manager", manager);
            displayMenu();
        })
}

function displayEmployee(type, data) {
    console.log(data);
}

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
            console.log(`You chose ${data.menu}`);
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
            displayEmployee("Engineer", data);
            displayMenu();
        })
}

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
            displayEmployee("Intern", data);
            displayMenu();
        })
}

function finish() {
    console.log(`Will finish`);
}

/* ------------------- Function call to initialise program ------------------ */
console.clear();
init();
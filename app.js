const inquirer= require('inquirer');
/*
const fs = require('fs');
const generatePage= require('./src/page-template.js');

const pageHTML= generatePage(name, github);

fs.writeFile('index.html', generatePage(name,github), err=>{
    if (err) throw err;
    console.log('Portfolio Complete! checkout index.html to see the output!');
});
*/

const promptUser= ()=>{
    return inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message: 'What is your name? (required)',
            validate: nameInput =>{
                if(nameInput){
                    return true;
                } else {
                    console.log('please enter your name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github username',
            validate: githubInput =>{
                if(githubInput){
                    return true;
                } else {
                    console.log('please enter your username')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourslef'
        }
    ]);
};

const promptProject = portfolioData =>{
    //if there's no 'projects' array property, create one.
    if(!portfolioData.projects){
        portfolioData.projects=[];
    }

    console.log(`
    ===========================
    Add a new project
    ===========================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your Project?',
            validate: projectNameInput =>{
                if(projectNameInput){
                    return true;
                } else {
                    console.log('please enter project name')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput =>{
                if(descriptionInput){
                    return true;
                } else {
                    console.log('please enter a description');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'what did you build this project with? (check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the github link to your Project. (required) ',
            validate: linkInput => {
                if(linkInput){
                    return true;
                } else {
                    console.log('please enter a link');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'would you like to enter another project?',
            default: false
        }
    ]).then(projectData =>{
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject){
            return promptProject(portfolioData);
        } else{
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData=>{
        console.log(portfolioData);
    });
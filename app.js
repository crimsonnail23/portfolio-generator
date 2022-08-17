const inquirer= require('inquirer');
const generatePage= require('./src/page-template.js');
const { writeFile, copyFile} = require('./utils/generate-site.js');

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
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "about" section',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'provide some information about yourself',
            when: ({confirmAbout}) =>{
                if (confirmAbout){
                    return true;
                } else {
                    return false;
                }
            }
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
        return generatePage(portfolioData);
    })
    .then(pageHTML =>{
        return writeFile(pageHTML);
    })
    .then(writeFileResponse=>{
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse=>{
        console.log(copyFileResponse);
    })
    .catch(err=>{
        console.log(err);
    });

        
   
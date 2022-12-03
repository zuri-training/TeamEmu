# Project Title
My Content Management System (CMS)
## Project Description
A  content management system (CMS) is a piece of software which provides website authoring,collaboration and administration tools that help users with little knowledge of programming languages to create and manage website content.  
A platform that allows users spin up a basic website,manage content,create, edit and publish sites.
## Technologies Used:
_**HTML**  
_**CSS**  
_**JAVASCRIPT**  
_**FIGMA**  
### Features:
**User: Unauthenticated**  
Visit the platform to view basic information about it
View and Interact with the documentation
Register to setup a new website
Setup website by filling out some information
Browse through available templates 

**User: Authenticated**  
Full access to the platform
Access to backend of created website
Ability to create more pages
Ability to change template
Unique address
Ability to add social media links

## How to Contribute 
- __Fork the project repository__<br/>
In the project repository on github, click the fork button in the upper right corner

- __Cloning the forked repository to your local machine__
 - Click on the "Code" button on the repo page
 - Copy the URL for the forked repo, it looks like this format: https://github.com/github_username/TeamEmu.git
 - Create a folder on your local machine to serve as your project workspace.
 - Open command prompt or termninal in the same folder location, then in the terminal, type: 
    
    ```ruby
    git clone https://github.com/github_username/TeamEmu.git
    ```
- __Navigate to the local directory and open in your IDE/ Text Editor__

- __In the IDE terminal set main branch__

    ```ruby
    git remote add origin https://github.com/github_username/TeamEmu.git
    ```
- __Pull origin__

    ```ruby
    git pull origin main
    ```
    
- __Create a new branch to make your changes__

    ```ruby
    git checkout -b <your_branch_name>
    ```
    
- __Stage the file__
 After making edits, type the below command in your terminal.
 
    - For all changed files at once: 
    
    ```ruby
    git add .
    ```
    
    - For a particular changed file: 
    
    ```ruby
    git add <changed_files>
    ```
    
- __Commit changes__

    ```ruby
    git commit -m "your_message"
    ```
- __Push your local changes__

    ```ruby
    git push origin <your_branch_name>
    ```

- __Create a pull request__

- __Wait till the admin accepts and merges your pull request__

## Setup and Installation 
  __In your IDE run the following commands in the terminal to setup__
- Confirm that you have nodejs installed by running the following command : 

    ``` ruby
    node --version
    ```
    
    if the output is not the version of your nodejs installation, install nodejs from :
    ``` ruby
    https://nodejs.org/en/download/
    ```
    
- Then install the dependencies after cloning the project, please use npm :

    ``` ruby
    npm install
    ``` 
    
- To Run Server:
 - Say, the application source is in a folder /src/server.js
 - Add this format to your package.json file, inside scripts :
        "scripts" : {
          "start": "node src/server.js"
         }
 
 -We would then be able to run server.js using npm by calling:
 
    ``` ruby
    npm run start
    ```


### Credits
  **Developers:**  
  @Miss-shebly  
  
  @Ademuyiwa-Joy  
  
  @efezinoidisi  
  
  

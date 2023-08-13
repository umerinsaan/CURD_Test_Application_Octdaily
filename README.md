# CURD Project README

Welcome to the CURD (Create, Update, Read, Delete) project! This README will guide you through the process of setting up the project on both Windows and Linux systems. The project contains a Backend folder, a Frontend folder, and a leetcode_DB.sql file.

## Setting up MySQL Database

Before you begin, ensure you have MySQL installed on your system. If not, you can download it from the official MySQL website.

   ### Windows
        Creating Database from SQL File:
        Open Command Prompt or PowerShell.
        Navigate to the location of your leetcode_DB.sql file using the cd command.

        Navigate to C:/Program Files/MySQL/MySQL Server X.Y/bin

        Log in to MySQL using: 
            mysql -u username -p 
          (replace username with your MySQL username).

        Enter your MySQL password.

        Create a new database: CREATE DATABASE your_database_name;

        Use the newly created database: USE your_database_name;

        Import the SQL file: source path\to\leetcode_DB.sql;

### Linux

        Creating Database from SQL File:
        Open a terminal.
        Navigate to the location of your leetcode_DB.sql file using the cd command.

        Log in to MySQL using:
             mysql -u username -p
           (replace username with your MySQL username).
        
        Enter your MySQL password.

        Create a new database: CREATE DATABASE your_database_name;

        Use the newly created database: USE your_database_name;

        Import the SQL file: source leetcode_DB.sql;

### Setting up Backend

    Open a terminal and navigate to the Backend folder using the cd command.

    Follow these steps to set up the backend:

        Install Node.js dependencies using the command below:
            npm install

Open the index.js file in the Backend folder using a text editor.

At the beginning of the index.js file, locate the section where you can enter the database name and password:

javascript

        const databaseName = 'your_database_name';
        const databasePassword = 'your_database_password';

        Replace 'your_database_name' with the name of the database you created, and 'your_database_password' with the MySQL password you set.

    Save the index.js file after making changes and execute the following command:

      node index.js

     Congrats, we have started our backend server successfully.

### Setting up Frontend

    Open a terminal and navigate to the Frontend folder using the cd command.
    Run the following command to install the required dependencies:

         npm install

    You have installed the dependencies successfully.

    Now excecute the command below to start serving your angular application:
         
         ng serve --proxy-config proxy.conf.json
    
    Now the app is live and running most probably on localhost:4200 you can access via your browser.
    
    If the app is not live on loacalhost:4200 then check your terminal, there must be the access point specified.

That's it! Your CURD project is now set up and ready to use. If you encounter any issues or have questions, feel free to reach out for assistance. Happy coding!
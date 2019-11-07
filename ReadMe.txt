create a new firebase account

1. create a database collection namely --> users
2. Add following
Email --> String
Name --> String
PhoneNumber --> Number
Password --> String


I am not doing any hashing for the Password, it can be done using any encryption techniques


Steps to add your credentials:

1. Go to your project, then select the "GEAR" icon
2. Choose project setting 
3. Go to service accounts tab
4. click on generate private key
5. Copy the downloaded file under config/config


Steps to run the project

1. Download node js
2. run "node backend.js"
3. In your browser type localhost:3030 --> it will open the project in web browser
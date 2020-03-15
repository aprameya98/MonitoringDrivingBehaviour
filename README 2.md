**Technologies used**

ReactJs for Frontend (3000)
NodeJs for Backend (4000)
Django to run the Machine learning algorithms in the background (8000)
Golang for running GO API's to connect the application with the Database (8080)
MongoDB as NoSQL Database (27017)
Vanilla Js for functions and bits of React code

How to start the application :
Steps to run the application (may involve downloading mongo,go libraries and setting up django environment)
clone the git

Reactjs : 3000
1. cd Client
2. npm install
3. npm start

Go API: 8080
1. cd API_Go
2. go run main.go

NodeServer: 4000
1. cd NodeServer
2. node server.js

if npm build is failing, install by : npm install

anywhere in the system
To get mongo working :
1. use GoDB
2. db.createCollection("ImageNames")
3. db.createCollection("UserData")


Have fun ########--------------------------------------------------------------------------------------------------
General guide : To Kill Ports : lsof -P | grep ':8080' | awk '{print $2}' | xargs kill -9

Reactjs :

Figure this out or copy paste previous projects NodeServe :

cd polls mkdir templates touch index.html extras: Add static paths in settings.py Add the installed apps in settings.py Add the cross origin request corsheaders in installed apps http://www.srikanthtechnologies.com/blog/python/enable_cors_for_django.aspx

LOC and program list :

main.go : 437
CustomRouting.js : 53
EditPage.js : 23
Error.js : 27
Footer.js : 14
Home.js : 17
IntroBar.js : 197
Routes.js : 63
Signin.js : 73
SignUp.js : 233
Test_Cookies.js : 53
TestApi.js : 282
TestDjango.js : 46
TestNodeApi.js : 116
UploadMultipleFiles.js : 164
WorkingArea.js : 257
Views.py : 320
Server.js : 127
checkmloutput.py : 45
iou.py : 177
dividevideo.py : 68

LOC : 2812

To count files : ls -F |grep -v / | wc -l

To run build in production : serve -s build -l 3000

// git : to check number of lines :

all files : git ls-files | xargs wc -l

only the grep (go) files : git ls-files | grep '.go' | xargs wc -l

limits to 5 : git ls-files | grep '.go' | xargs wc -l | head -n 5

save output in file : git ls-files | xargs wc -l >> LOC.txt

//API CALLS : POST : create new record in the database GET : Read from database PUT : Update/Replace row in database PATCH : Update/Modify row in database DELETE : delete row in database

Extended : GET : The GET method requests a representation of the specified resource. Requests using GETshould only retrieve data. HEAD : The HEAD method asks for a response identical to that of a GET request, but without the response body. POST : The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server. PUT : The PUT method replaces all current representations of the target resource with the request payload. DELETE : The DELETE method deletes the specified resource. CONNECT : The CONNECT method establishes a tunnel to the server identified by the target resource. OPTIONS : The OPTIONS method is used to describe the communication options for the target resource. TRACE : The TRACE method performs a message loop-back test along the path to the target resource. PATCH : The PATCH method is used to apply partial modifications to a resource.

Good practices for user accounts : https://cloud.google.com/blog/products/gcp/12-best-practices-for-user-account

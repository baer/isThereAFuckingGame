# Is there a fucking ____ game today?

## Running the code
First, the compiled code is not checked in so you will have to build the project using [Grunt](http://gruntjs.com/):

    cd <location-of-the-downloaded-project>
    npm install
    grunt

Because this project makes same-origin requests you will have to use some sort of container to run the code. The simplest way is to use python but tomcat jetty etc will work fine.
    
    cd <location-of-the-downloaded-project>/dist
    python -m SimpleHTTPServer

## Create a version for your favorite team
There are two things that need to be done to add a team:

####Edit the application variables:
- Edit the @homeTeamColor variable in <project>/app/styles/main.less
- Edit the homeTeam and homeStadium variables in <project>/app/scripts/main.js

####Retrieve a schedule and generate the json:
- Go to http://mlb.mlb.com/mlb/schedule/team_by_team.jsp
- Click on Regular Schedule
- Click on Downloadable schedule
  - http://colorado.rockies.mlb.com/schedule/downloadable.jsp?c_id=col&year=2013
- Click on Download Full Season Schedule
- Run csv2json.py against the downloaded schedule 
- re-run Grunt.

Many many thanks to [isthereagiantsgametoday](https://github.com/lforrest/isthereagiantsgametoday) for the inspiration.
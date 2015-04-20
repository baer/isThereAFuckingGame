# Is there a fucking ____ game today?

Running the code
-------

First, the compiled code is not checked in so you will have to build the project using [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/):

    cd <location-of-the-downloaded-project>
    npm install
    bower install
    grunt

Because this project makes same-origin requests you will have to use some sort of container to run the code. The simplest way is to use python but tomcat jetty etc will work fine.

    cd <location-of-the-downloaded-project>/dist
    python -m SimpleHTTPServer
    (Note: for python 3.x run python -m http.server)

Create a version for your favorite team
-------

There are three things that need to be done to add a team:

####Edit the application variables:
- Edit the @homeTeamColor variable in <project>/app/styles/main.less
- Edit the homeTeam and homeStadium variables in <project>/app/scripts/main.js

####Retrieve a schedule and generate the json:
- Go to http://mlb.mlb.com/mlb/schedule/team_by_team.jsp
- Click on Regular Season Schedule under desired team.
- Scroll down to "In this Section". Click on Downloadable Schedule.
  - http://colorado.rockies.mlb.com/schedule/downloadable.jsp?c_id=col&year=2014
- Download Full Season Schedule CSV
- Run python csv2json.py <Full Schedule.csv> app/data/schedule.json
- Run Grunt.

####Edit the HTML:
- You will need to change the title and meta data to be about your team rather than rockies


Many many thanks to [isthereagiantsgametoday](https://github.com/lforrest/isthereagiantsgametoday) for the inspiration.

***

## License

[MIT License](http://opensource.org/licenses/MIT)

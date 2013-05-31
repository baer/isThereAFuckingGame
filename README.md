# Is there a fucking Rockies game today?

## Running the code
The compiled code is not checked in so you will have to have [Grunt](http://gruntjs.com/) installed:
'''bash
cd <location-of-the-downloaded-project>
npm install
grunt
'''
This code is requires a server to run due to same-origin browser security constraints. To run the code you will need to startup a webserver. The simplest way to do this is to navigate to the dist directory and run the following command:
'''bash
python -m SimpleHTTPServer
'''

## Development
The code is managed with a Grunt based asset pipeline and Bower for dependency management. 

To make changes you should be modifying files in the app directory. Running the grunt command will compile and minify the assets and copy them into the dist directory.
'''bash
grunt
'''

## New Teams
All that needs to be done to support a new team is to update the json shedule located in app/data. To generate a schedule for your team:

- How to retrieve input data for this script:
- Go to http://mlb.mlb.com/mlb/schedule/team_by_team.jsp
- Click on Regular Schedule
- Scroll down and click on Downloadable schedule
  - http://colorado.rockies.mlb.com/schedule/downloadable.jsp?c_id=col&year=2013
- Click on Download Full Season Schedule

Run csv2json.py against this schedule and update the file reference in main.js to point to the new file.

## TODOs

- Offline support
- Update docs to explain csv2json.py better

Many many thanks to [isthereagiantsgametoday](https://github.com/lforrest/isthereagiantsgametoday) for the inspiration.
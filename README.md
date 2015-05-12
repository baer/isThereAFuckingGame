# Is there a fucking ____ game today?

## Running the code

Compiled code is not checked in so you will have to build the project using [Gulp](http://gulpjs.com/)

```
git clone https://github.com/baer/isThereAFuckingGame
cd isThereAFuckingGame
npm install
gulp
```

The project will build to a `dist` directory which is then served as a static website
```
open dist/index.html
```

## Create a version for your favorite team

There are two things that need to be done to add a team:

#### Edit the application variables:
- Edit the @homeTeamColor variable in <project>/src/client/styles/main.less
- Edit the anything you'd like to change in variables in <project>/project.config.js

#### Download the schedule and convert it to json:
- Go to http://mlb.mlb.com/mlb/schedule/team_by_team.jsp
- Click on Regular Season Schedule under desired team.
- Scroll down to "In this Section". Click on Downloadable Schedule.
  - http://colorado.rockies.mlb.com/schedule/downloadable.jsp?c_id=col&year=2014
- Download Full Season Schedule CSV
- Run `python csv2json.py <Full Schedule.csv> app/data/schedule.json`
- Run `gulp`.

## Credits
Many many thanks to [isthereagiantsgametoday](https://github.com/lforrest/isthereagiantsgametoday) for the inspiration.

***

## License

[MIT License](http://opensource.org/licenses/MIT)

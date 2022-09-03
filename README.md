# Is there a fucking \_\_\_\_ game today?

## Running the code

First, run the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
- Download Full Season Schedule CSV and overwrite `data/schedule.csv`
- Run `node schedule-converter.js`
- Run `gulp build`

## Credits

Many many thanks to [isthereagiantsgametoday](https://github.com/lforrest/isthereagiantsgametoday) for the inspiration.

## License

[MIT License](http://opensource.org/licenses/MIT)

# Is there a fucking \_\_\_\_ game today?

## Quickstart

### Run a local build

Install the dependencies

```bash
npm ci
```

Run the Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Export, and serve, the static site

Install the dependencies

```bash
npm ci
```

Build the assets

```bash
npm run build:production
```

Run a static webserver

```bash
npm run serve-static
```

## Create a version for your favorite team

There are two things that need to be done to add a team:

#### Edit the application variables:

- Edit the @homeTeamColor variable in `./src/client/styles/globals.css`
- Edit the anything you'd like to change in variables in `./next.config.js`

#### Download the schedule and convert it to json:

1. Go to the [MLB Schedule Website](https://www.mlb.com/schedule/team-by-team)
2. Click on "Downloadable Schedule" for your team
3. Scroll down and download the "Full Season Schedule" csv file
4. Run `node schedule-converter.js` with the csv you just downloaded

_Note:_ The converter script relies on several Node modules. Make sure you've already run `npm ci`

## Credits

Many many thanks to [isthereagiantsgametoday](https://github.com/lforrest/isthereagiantsgametoday) for the inspiration.

## License

[MIT License](http://opensource.org/licenses/MIT)

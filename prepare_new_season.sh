#!/bin/bash

# This script is used to prepare the schedule for the new season for a specific team.

# Usage: ./prepare_new_season.sh <team> <year>
# Example: ./prepare_new_season.sh "cubs" 2021
# Example: ./prepare_new_season.sh "cubs" (will use the current year)


TEAM=$1
YEAR=${2:-$(date +%Y)}

# Check if the team is specified
if [ -z "$TEAM" ]; then
    echo "Please specify the team name"
    exit 1
fi

# Lowercase the team name
TEAM=$(echo "$TEAM" | tr '[:upper:]' '[:lower:]')


# Get the team ID
TEAM_IDS_FILE="team_ids.json"
# shellcheck disable=SC2002
TEAM_ID=$(jq -r ".$TEAM" < $TEAM_IDS_FILE)

# Check if the team ID is found
if [ -z "$TEAM_ID" ]; then
    echo "Team not found"
    exit 1
fi

# Download the schedule for the team
FILE="src/game-data/$TEAM-$YEAR.csv"
ENDPOINT="https://www.ticketing-client.com/ticketing-client/csv/GameTicketPromotionPrice.tiksrv?team_id=$TEAM_ID&leave_empty_games=true&event_type=T&year=$YEAR"
curl -s "$ENDPOINT" > "$FILE"

# Convert the schedule to JSON
node scripts/convert-schedule.mjs -p "$FILE"

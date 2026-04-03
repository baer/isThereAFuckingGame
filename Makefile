# prepare-schedule - Prepares a schedule for the specified team and year
# @param team The team for which to prepare the schedule
# @param year The year for which to prepare the schedule
prepare-schedule:
	@echo "Preparing schedule data..."
	sh ./prepare_new_season.sh $(team) $(year)

//Branch
//jec 170706 conversion begin

try{

	if ((appMatch("Planning/Flexible Standard/*/*") || appMatch("Planning/Flexible Development/*/*")) &&capStatus == "Received" && !matches(AInfo['Planner'],"Unassigned")) {
		asgnPlanner =lookup("PLN_PLANNERS", AInfo['Planner']);
		assignTask("Determination of Completeness",asgnPlanner);
		comment("Assigned Planner is " + asgnPlanner );
	}
	
}catch(err){
	logDebug("An error occurred in ASIUA:Planning/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end
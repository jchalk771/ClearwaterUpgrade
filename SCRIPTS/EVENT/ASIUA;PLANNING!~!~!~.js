//Branch
//jec 170706 conversion begin

try{

	if ((appMatch("Planning/Flexible Standard/*/*") || appMatch("Planning/Flexible Development/*/*")) &&capStatus == "Received" && !matches(AInfo['Planner'],"Unassigned")) {
		asgnPlanner =lookup("PLN_PLANNERS", AInfo['Planner']);
		assignTask("Determination of Completeness",asgnPlanner);
		comment("Assigned Planner is " + asgnPlanner );
	}
	
    //used (rarely) - when it is necessary to add multiple parcels and owners to a single case
	//First run the batch to add the parcels (AddMultipleParcelsToCap) and then alter the following line with correct case number
        
        //if(appMatch("Planning/Rezoning/*/*")&& capId.getCustomID() =="REZ2017-09005"){
		//comment("CapId is " + capIDString); //display is event manager, but I don't see it.
                //logDebug("capIDString is " + capId.getCustomID());
                //logDebug("CapId is " + capId);
               // addOwnersFromAPOToCap();
       
                //logDebug("Are there owners on the case?");

         
	//}
	
}catch(err){
	logDebug("An error occurred in ASIUA:Planning/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end
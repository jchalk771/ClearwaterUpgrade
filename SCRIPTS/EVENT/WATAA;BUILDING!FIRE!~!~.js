//Branch
//jec 170720 conversion begin

try{

	if (wfTask == "Begin Reviews" && AInfo['Target'] != null) {
		assignDueDateToTaskLevelWATAA("020001000000000", AInfo['Target']);
	}

	if (wfTask == "Response to Comments") {
		reactivateTaskLevel( "020" );
		deactivateTask("Permit Verification");
		updateAppStatus("In Review","New Cycle Begins",capId);
	}

	if (wfTask == "Courtesy Review") {
		reactivateRevisionsOnly("020001000000000",3);
		deactivateTask("Permit Verification");
		updateAppStatus("In Review","New Cycle Begins",capId);
	}
	
}catch(err){
	logDebug("An error occurred in WATAA:Building/Fire/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170720 conversion end
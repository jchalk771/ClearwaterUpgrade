//Branch
//jec 170717 conversion begin

try{

	if (AInfo['Removal Reason'] != null) {
		updateWorkDesc("Online Tree Permit: Removal Reason - " + AInfo['Removal Reason']);
		updateShortNotes("Online Tree Permit: Removal Reason - " + AInfo['Removal Reason']);
	}

	setPrimaryLicProf(capId);
	scheduleInspectDate("Site Visit",dateAdd(null, 1, "Y"));
	closeTask("Determination of Completeness", "Complete", "Web Permit Staff Review on Submittal");
	
}catch(err){
	logDebug("An error occurred in CTRCA:Planning/Tree/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170717 conversion end
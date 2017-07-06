//Branch
//jec 170706 conversion begin
try{
	//branch("ES_CW_TMP_ADD_INSPECTION") - called once, added inline
	if (AInfo['Assigned Inspector'] != null) {
		inspUserId = lookup("INSPECTOR_USERNAME_LOOKUP",AInfo['Assigned Inspector']);
	} 
	else {
		inspUserId = null;
	}

	if (inspUserId != null && !isScheduled("Site Visit")) {
		scheduleInspectDate("Site Visit", dateAdd(null, 1, "Y"), inspUserId);
	}
}catch(err){
	logDebug("An error occurred in ASIUA:Planning/Temporary Use/TMP/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end
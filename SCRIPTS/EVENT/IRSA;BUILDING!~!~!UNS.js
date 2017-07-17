//Branch
//jec 170717 conversion begin

try{
	if (AInfo['Assigned Inspector'] != null) {
		inspUserId = lookup("BCP_INSPECTORS",AInfo['Assigned Inspector']);
	} 
	else {
		inspUserId = null;
	}

	if (inspResult != "Pass" && inspType == "Initial Inspection") {
		scheduleInspectDate("Reinspection", dateAdd(null, 30, "Y"), inspUserId);
	}

	if (inspResult != "Pass" && inspType == "Reinspection") {
		scheduleInspectDate("Site Visit", dateAdd(null, 30, "Y"), inspUserId);
	}

	if (inspResult != "Pass" && inspType == "Site Visit") {
		scheduleInspectDate("Site Visit", dateAdd(null, 30, "Y"), inspUserId);
	}	

}catch(err){
	logDebug("An error occurred in IRSA:Building/*/*/UNS: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170717 conversion end
//Branch
//jec 170724 conversion begin

try{

	//@TODO inspUserId defined globally in WTUA:BUILDING/ENFORCEMENT/*/*
	if (wfTask == "Flood Board") {
		scheduleInspectDate("Reinspection",wfDate,inspUserId);
	}

	if (wfTask == "Owner" && wfStatus == "Permit Applied") {
		scheduleInspectDate("Reinspection",dateAddMonths(null,6),inspUserId);
	}

	if (wfTask == "Abatement" && (wfStatus == "Building Secured - Lien" || wfStatus == "Building Secured - No Lien")) {
		scheduleInspection("Reinspection",30,inspUserId);
	}

	if (wfTask == "Unsafe Structure Report" && wfStatus == "Letter Sent") {
		editTaskDueDate("7 Day Letter", dateAdd(startDate, 7, 1));
		editTaskDueDate("27 Day Letter", dateAdd(startDate, 27, 1));
		editTaskDueDate("Last Letter", dateAdd(startDate, 90, 1));
	}

	if (wfTask == "Unsafe Structure Report" && wfStatus == "Letter Sent" && AInfo['Assigned Inspector'] != null) {
		assignTask("7 Day Letter", lookup("INSPECTOR_USERNAME_LOOKUP", AInfo['Assigned Inspector']));
		assignTask("27 Day Letter", lookup("INSPECTOR_USERNAME_LOOKUP", AInfo['Assigned Inspector']));
		assignTask("Last Letter", lookup("INSPECTOR_USERNAME_LOOKUP", AInfo['Assigned Inspector']));
	}

}catch(err){
	logDebug("An error occurred in WTUA:Building/*/*/UNS: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170724 conversion end
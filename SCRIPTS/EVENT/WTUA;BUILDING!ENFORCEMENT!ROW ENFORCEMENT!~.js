//Branch
//jec 170724 conversion begin

try{

	//@TODO inspUserId defined globally in WTUA:BUILDING/ENFORCEMENT/*/* this is bad form variables that are not Accela or Custom GLOBALS should be established in the script they are used in, otherwise they seem to come from nowhere and are likely to cause null pointers or developer error.
	if (wfTask == "Complaint Received" && (wfStatus == "Violation Letter")) {
		scheduleInspection("Reinspection",15,inspUserId);
	}

}catch(err){
	logDebug("An error occurred in WTUA:Building/Enforcement/ROW Enforcement/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170724 conversion end
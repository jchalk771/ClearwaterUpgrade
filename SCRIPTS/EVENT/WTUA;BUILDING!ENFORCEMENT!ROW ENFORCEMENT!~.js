//Branch
//jec 170724 conversion begin

try{

	//@TODO inspUserId defined globally in WTUA:BUILDING/ENFORCEMENT/*/*
	if (wfTask == "Complaint Received" && (wfStatus == "Violation Letter")) {
		scheduleInspection("Reinspection",15,inspUserId);
	}

}catch(err){
	logDebug("An error occurred in WTUA:Building/Enforcement/ROW Enforcement/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170724 conversion end
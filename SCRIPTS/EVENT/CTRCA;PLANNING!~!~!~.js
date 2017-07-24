//Branch
//jec 170717 conversion begin

try{

	if (appMatch("Planning/Flexible Development/*/*") || appMatch("Planning/Flexible Standard/*/*")) {
		editAppSpecific("Planner",  "Unassigned");
		updateWorkDesc(AInfo['Description of Request'],capId);
		var sNotes = AInfo['Description of Request'];
		updateShortNotes(String(sNotes).substring(0,200),capId);
		//branch("ES_CK_SUBMITTAL_DATE")
		checkSubmittalDate();
		//aa.debug("Line 16 of CTRCA","Made  it here.");
		aa.debug("Line 14 of CTRCA:Planning/*/*/*, Made  it here.");
	}

}catch(err){
	logDebug("An error occurred in CTRCA:Planning/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170717 conversion end
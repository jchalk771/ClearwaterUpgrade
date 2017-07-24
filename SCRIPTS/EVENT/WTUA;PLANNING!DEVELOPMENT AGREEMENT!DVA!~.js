//Branch
//jec 170724 conversion begin

try{

	if (wfTask == "Development Review Committee" && wfStatus == "Route to City Council") {
		activateTask("City Council");
		deactivateTask("Awaiting Re-Submittal");
		comment("City Council Activated");
	}

}catch(err){
	logDebug("An error occurred in WTUA:Planning/Development Agreement/DVA/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170724 conversion end
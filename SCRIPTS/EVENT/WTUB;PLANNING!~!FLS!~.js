//Branch
//jec 170721 conversion begin

try{

	if (matches(wfProcess,"P_LEVEL1","P_LEVEL2","P_LEVEL3_DVA","P_LEVEL3_LUZ","P_LEVEL3_REZ") && wfTask == "Route to Meeting" && wfStatus == "Ready for DO" && !isTaskComplete("Development Review Committee")) {
		showMessage = true;
		comment("This case has not been to DRC. Cannot go to DO without having been to DRC.");
		cancel = true;
	}

}catch(err){
	logDebug("An error occurred in WTUB:Planning/*/FLS/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170721 conversion end
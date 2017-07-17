//Branch
//jec 170717 conversion begin

try{

	if (capStatus == "Hold" && inspType == "007 Tie In Survey" && inspResult == "Pass") {
		updateAppStatus("Active","Updated via Event Script-Tie in Survey received.");
	}

	if (inspType == "520 Fire Final" && inspResult =="Pass") {
		resolveCondition("Building","Not Met","Fire - Final Inspection Required","Notice","Met","");
	}
	
}catch(err){
	logDebug("An error occurred in IRSA:Building/Construction Permit/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170717 conversion end
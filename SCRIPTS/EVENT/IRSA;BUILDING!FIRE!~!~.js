//Branch
//jec 170717 conversion begin

try{

	if (AInfo['Type of Permit'] == "Pre-Engineered Fire Suppression"  && checkInspectionResult("520 Fire Final","Pass")) {
		editAppSpecific("Finaled",sysDateMMDDYYYY);
		closeTask("Active Permit","Completed","Updated by script IRSA - Line 19");
	}

	if (AInfo['Type of Permit'] == "Fire Sprinkler"  && (checkInspectionResult("520 Fire Final", "Pass") || checkInspectionResult( "515 Fire Sprinkler Final","Pass"))) {
		editAppSpecific("Finaled",sysDateMMDDYYYY);
		closeTask("Active Permit","Completed","Updated by script IRSA - Line 20");
	}

	if (AInfo['Type of Permit'] == "Fire Alarm"  && (checkInspectionResult("520 Fire Final" ,"Pass")|| checkInspectionResult("510 Fire Alarm System Final", "Pass") ) &&  checkInspectionResult("204 Final - Electrical", "Pass") && AInfo['Multi-Story Structure']=="No") {
		editAppSpecific("Finaled",sysDateMMDDYYYY);
		closeTask("Active Permit","Completed","Updated by script IRSA - Line 21");
	}

}catch(err){
	logDebug("An error occurred in IRSA:Building/Commercial/Sign/Permanent: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170717 conversion end
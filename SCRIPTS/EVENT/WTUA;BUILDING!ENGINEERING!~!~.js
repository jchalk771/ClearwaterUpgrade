//Branch
//jec 170724 conversion begin

try{

	//@TODO - Note use of branchTask ok for classic workflows.  Not so great for new designer workflows
	if (isTaskStatus("Application Submittal","Accepted") && AInfo['Type']=="Address Change Receipt") {
		branchTask("Active Permit","Completed","Updated by script");
		deactivateTask("Permit Verification");
	}

}catch(err){
	logDebug("An error occurred in WTUA:Building/Engineering/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170724 conversion end
//Branch
//jec 170717 conversion begin

try{

	//branch("ES_UPDATE_CODE_WF_TASKS")
		//@TODO: Why are we establishing an inspector ID that isn't being used?
		if (AInfo['Assigned Inspector'] != null) {
			inspUserId = lookup("CODE_ASSIGNED_INSP",AInfo['Assigned Inspector']);
		} 
		else {
			inspUserId = null;
		}

		if (isTaskActive("Complaint Received") && inspType == "Initial Inspection" && inspResult == "Pass") {
			branchTask("Complaint Received","No Violation","Updated via Event Script");
		}
		
}catch(err){
	logDebug("An error occurred in IRSA:CodeCompliance/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170717 conversion end
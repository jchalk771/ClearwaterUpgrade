//Branch
//jec 170724 conversion begin

try{

	if (isNewPNU() == true) {
		//branch ("ES_PNU_MOVE_WF")
		
		if (wfTask == "Complaint Received" && matches(wfStatus, "No Violation", "Referred","Void") && isTaskActive("Closed")) {
			closeTask("Closed","Close Case","Script - ES_PNU_MOVE_WF");
		}

		if (matches(wfTask, "Courtesy Phase" ,"Enforcement") && wfStatus=="Complied" && isTaskActive("Closed")) {
			closeTask("Closed","Close Case","Script - ES_PNU_MOVE_WF");
		}

		if (wfTask =="Courtesy Phase"  && wfStatus == "Written Warning" &&isTaskActive("Enforcement")) {
			deactivateTask("Enforcement");
			activateTask("Court");
		}

		if (wfTask =="Enforcement"  && wfStatus == "Abatement") {
			deactivateTask("Court");
			deactivateTask("Code Board");
			activateTask("Abatement");
		}

		if (wfTask =="Enforcement"  && wfStatus == "MCEB") {
			deactivateTask("Court");
			deactivateTask("Abatement");
			activateTask("Code Board");
		}

		if (wfTask =="Enforcement"  && wfStatus == "Notice to Appear") {
			deactivateTask("Abatement");
			deactivateTask("Code Board");
			activateTask("Court");
		}

		if (wfTask =="Enforcement"  && wfStatus == "Parking Ticket Issued") {
			deactivateTask("Abatement");
			deactivateTask("Code Board");
			activateTask("Court");
		}

		if (wfTask == "Code Board"  && wfStatus == "MCEB - No Violation") {
			closeTask("Closed","Case Closed","Script - ES_PNU_MOVE_WF");
		}

		if (matches(wfTask,"Code Board" , "Court") && wfStatus == "Case Closed") {
			closeTask("Closed","Case Closed","Script - ES_PNU_MOVE_WF");
		}

		if (matches(wfTask ,"Code Board","Court")  && wfStatus == "Owner Complied") {
			closeTask("Closed","Case Closed","Script - ES_PNU_MOVE_WF");
		}

		if (wfTask =="Court"  && matches(wfStatus, "Nolle Pros","Court - Dismissed")) {
			closeTask("Closed","Case Closed","Script - ES_PNU_MOVE_WF");
		}

		if (wfTask == "Court"  && wfStatus == "Court - No Violation") {
			closeTask("Closed","Case Closed","Script - ES_PNU_MOVE_WF");
		}
		
	}

}catch(err){
	logDebug("An error occurred in WTUA:CodeCompliance/*/PNU/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170724 conversion end
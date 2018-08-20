//Branch
//jec 170720 conversion begin

try{

	if (wfTask == "Begin Reviews") {
		vDueDate = getCurrentBeginReviewDueDate("Begin Reviews");
		editAppSpecific("Target",jsDateToASIDate(vDueDate));
		comment("WF Due: " + vDueDate);
	}

	//jj Test
	updateShortNotes('JJ this event ran!!!');
	

	if (!appMatch("Building/Fire/*/*") && wfTask == "Begin Reviews" && AInfo['Target'] != null) {
		assignDueDateToTaskLevelWATAA("030001000000000", AInfo['Target']);
	}
	
	if (!appMatch("Building/Fire/*/*")&& wfTask == "Response to Comments") {
		reactivateTaskLevel( "030" );
		deactivateTask("Permit Verification");
		updateAppStatus("In Review","New Cycle Begins",capId);
	}
	
	if (matches(wfTask,"Begin Reviews","Courtesy Review","Response to Comments")) {
		var vComment = getWFComment (wfTask,  vComment);
		comment("WF Comment: "+ vComment);
	}

	if (!appMatch("Building/Fire/*/*") && (wfTask =="Courtesy Review") && AInfo['Bin Number']!="ACA") {
		reactivateRevisionsOnly("030001000000000",3);
		deactivateTask("Permit Verification");
		updateAppStatus("In Review","New Cycle Begins",capId);
	}
	
}catch(err){
	logDebug("An error occurred in WATAA:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170720 conversion end
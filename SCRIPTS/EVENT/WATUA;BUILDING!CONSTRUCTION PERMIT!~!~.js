//Branch
//jec 170721 conversion begin

try{

	if (wfTask =="Online Customer Request" &&matches(wfStatus, "Walk Through Review","Log - Begin Reviews","Log - Response to Comments")) {
		//branch("ES_ACTIVATE_REVIEWS")
		activateReviews();
	}

	if (wfTask =="Online Customer Request" && wfStatus =="Log - Begin Reviews") {
		var vDueDate = dateAdd(null,wfComment, true);
		comment("The date due is " + vDueDate);
		todayDate = jsDateToASIDate(new Date());
		vTaskNote = (currentUserID + "-"+ todayDate);
		addAdHocTask("ADHOC_TASKS","Begin Reviews",vTaskNote);
		setDueDateOnActiveTask("Begin Reviews",wfComment);
		editAppSpecific("Bin Number","EDR");
		editAppSpecific("Walk-Thru", "No");
		editAppSpecific("Target", vDueDate);
		assignDueDateToTaskLevel("030001000000000", vDueDate );
	}

	if (wfTask =="Online Customer Request" && wfStatus == "Log - Response to Comments") {
		addAdHocTask("ADHOC_TASKS","Response to Comments","Another Cycle Begins");
		reactivateTaskLevelWATUA("030001000000000");
		deactivateTask("Permit Verification");
		updateAppStatus("In Review","Another Cycle Begins",capId);
	}

	if (wfTask =="Online Customer Request" && wfStatus == "Log - Courtesy Review") {
		addAdHocTask("ADHOC_TASKS","Courtesy Review","Another Cycle Begins");
		reactivateRevisionsOnly("030001000000000",3);
		deactivateTask("Permit Verification");
		updateAppStatus("In Review","Another Cycle Begins",capId);
	}

	if (wfTask =="Online Customer Request" && wfStatus == "Walk Through - Revisions Only") {
		reactivateRevisionsOnly("030001000000000",1);
		updateAppStatus("In Review","New Cycle Begins",capId);
		deactivateTask("Permit Verification");
	}

	if (wfTask =="Online Customer Request" && wfStatus == "Outstanding Issues") {
		var permitNbr = capId.getCustomID();
		updateTask("Application Submittal","Need Addtl Info", "", "");
		updateAppStatus("Additional Info Required","status set by WFAdhocUA scipt");
		rptParams = aa.util.newHashMap();
		rptParams.put("alt_id", permitNbr);
		rptParams.put("condition_status", "Not Met");
		var noticeTemp = "MESSAGE_OUTSTANDING_ISSUES";
		var noticeParams = aa.util.newHashtable();
		noticeParams.put("$$altID$$", permitNbr);
		if (wfComment == null) 
			noticeParams.put("$$wfComment$$",  " " );
		if (wfComment != null) 
			noticeParams.put("$$wfComment$$",  wfComment );
		comment("Case Nbr is "+permitNbr);
		emailRpt_Save2Case("Case Conditions",permitNbr, rptParams, noticeParams, eAddress, noticeTemp);
	}

	if (wfTask =="Permit Verification" && wfStatus == "Issue" &&  cap.isCreatedByACA()) {
		var permitNbr = capId.getCustomID();
		rptParams = aa.util.newHashMap();
		rptParams.put("capid", permitNbr);
		rptParams.put("agencyid", "CLEARWATER");
		var noticeTemp = "MESSAGE_PERMIT_ISSUED";
		var noticeParams = aa.util.newHashtable();
		noticeParams.put("$$altID$$", permitNbr);
		comment("Case Nbr is "+permitNbr);
		emailRpt_Save2Case("ACA Building Permit",permitNbr, rptParams, noticeParams, eAddress, noticeTemp);
		if (isAdhocTaskActive("Online Customer Request")) 
			closeActiveTask("Online Customer Request","Permit Issued","","");
		if (isAdhocTaskActive("Begin Reviews")) 
			closeActiveTask("Begin Reviews","Email Permit","","");
		if (isAdhocTaskActive("Response to Comments")) 
			closeActiveTask("Response to Comments","Email Permit","","");
		if (isAdhocTaskActive("Courtesy Review")) 
			closeActiveTask("Courtesy Review","Email Permit","","");
	}

}catch(err){
	logDebug("An error occurred in WATUA:Building/Construction Permit/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170721 conversion end
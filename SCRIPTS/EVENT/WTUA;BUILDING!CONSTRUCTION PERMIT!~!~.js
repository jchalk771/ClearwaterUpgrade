//Branch
//jec 170724 conversion begin

try{

	if (wfTask == "Active Permit" && matches(wfStatus,"Completed","Certificate of Occupancy", "Certificate of Completion","Temp Certificate of Occupancy")&& feeExists("FCOO","INVOICED","CREDITED")  && !checkInspectionResult("520 Fire Final","Pass")) {
		updateAppStatus("Active","status set by Fire Final scipt WTUA, line 13. Fire Final Inspection required before permit can be completed.");
		activateTask( "Active Permit" );
		editAppSpecific("Finaled",null);
		comment("The final field is " + AInfo['Finaled']);
		showMessage = true;
		comment("Final fire inspection is needed before this case can be closed.");
		//branch("Email_FireInspReqd");
		
		showDebug = true;
		var eAddress = getPrimaryEmail4PlanReview(capId);
		comment("Email is " + eAddress);
		var permitNbr = capId.getCustomID();
		var rptArray = [];
		var noticeTemp = "MESSAGE_FIRE_FINAL_REQD";
		var noticeParams = aa.util.newHashtable();
		noticeParams.put("$$altID$$", permitNbr);
		comment("Case Nbr is "+permitNbr);
		sendNotification("noReply@myclearwater.com",eAddress,"", noticeTemp,noticeParams,rptArray);
		//end Email_FireInspReqd
	}

	if (wfTask =="Online Customer Request" &&matches(wfStatus, "Walk Through Review","Log - Begin Reviews","Log - Response to Comments")) {
		//branch("ES_ACTIVATE_REVIEWS")
		activateReviews();
	}

	if (wfTask =="Online Customer Request" && wfStatus =="Log - Begin Reviews") {
		var vDueDate = dateAdd(startDate,wfComment, true);
		comment("The date due is " + vDueDate);
		todayDate = jsDateToASIDate(new Date());
		vTaskNote = (currentUserID + "-"+ todayDate);
		addAdHocTask("ADHOC_TASKS","Begin Reviews",vTaskNote);
		setDueDateOnActiveTask("Begin Reviews",wfComment);
		editAppSpecific("Bin Number","EDR");
		editAppSpecific("Walk-Thru", "No");
		editAppSpecific("Target", vDueDate);
		assignDueDateToTaskLevel("030001000000000", vDueDate);
	}

	if (wfTask =="Online Customer Request" && wfStatus == "Log - Response to Comments") {
		addAdHocTask("ADHOC_TASKS","Response to Comments","Another Cycle Begins");
		reactivateTaskLevel("030001000000000");
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
		if (wfComment == null) noticeParams.put("$$wfComment$$",  " " );
		if (wfComment != null) noticeParams.put("$$wfComment$$",  wfComment );
		comment("Case Nbr is "+permitNbr);
		emailRpt_Save2Case("Case Conditions",permitNbr, rptParams, noticeParams, eAddress, noticeTemp);
	}

	if (wfTask =="Permit Verification" && wfStatus == "Issue" && cap.isCreatedByACA() && AInfo['Online Permit Type'] =="Roof") {
		var permitNbr = capId.getCustomID();
		rptParams = aa.util.newHashMap();
		rptParams.put("RptParam", "Hello");
		var noticeTemp = "MESSAGE_ROOF_AFFIDAVIT";
		var noticeParams = aa.util.newHashtable();
		noticeParams.put("$$altID$$", permitNbr);
		comment("Case Nbr is "+permitNbr);
		emailRpt_Save2Case("Roofing Affidavait",permitNbr, rptParams, noticeParams, eAddress, noticeTemp);
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
	logDebug("An error occurred in WTUA:Building/Construction Permit/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170724 conversion end
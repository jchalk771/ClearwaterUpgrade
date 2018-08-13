//Branch /Accela_PROD/SCRIPTS/EVENT/WTUA;BUILDING!CONSTRUCTION PERMIT!~!~.js
//jec 170724 conversion begin


try{

	//Relocated out of Active Permit block so that it is available for all clauses - 9.1.17
	eAddress = getPrimaryEmail4PlanReview(capId);
	comment("Email is " + eAddress);
	
	
	if (wfTask == "Active Permit" && matches(wfStatus,"Completed","Certificate of Occupancy", "Certificate of Completion","Temp Certificate of Occupancy")&& feeExists("FCOO","INVOICED","CREDITED")  && !checkInspectionResult("520 Fire Final","Pass")) {
		//updateAppStatus("Active","status set by Fire Final scipt WTUA, line 13. Fire Final Inspection required before permit can be completed.");
		updateAppStatus("Active","status set by Fire Final script WTUA:Building/Construction Permit/*/*, line 8. Fire Final Inspection required before permit can be completed.");
		activateTask( "Active Permit" );
		editAppSpecific("Finaled",null);
		updateTask("Active Permit","Notes", "Fire final inspection required before permit can be completed.","Fire final inspection required before permit can be completed.");
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
		assignDueDateToTaskLevelWTUA("030001000000000", vDueDate);
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

	if (wfTask =="Online Customer Request" && wfStatus =="Walk Through Review") { // added this for SD+ 23764
		var workflowResult = aa.workflow.getTasks(capId);
	 	if (workflowResult.getSuccess())
	  	 	wfObj = workflowResult.getOutput();
	  	else { 
	  		logMessage("**ERROR: Failed to get workflow object: "); 
	//  		return false; 
	  	}
		
		for (i in wfObj) {
	   		fTask = wfObj[i];
			//comment("=======================================");
			//comment("Loop iteration is " + i);
			//comment("In the for loop, wf task = " + fTask.getTaskDescription());
	        //comment("WF Status = " + fTask.getDisposition());
	        //comment("Active Flag = " + fTask.getActiveFlag());
	       	//comment("Process Code = " + fTask.getProcessCode());
	        //comment("DispComment = " + fTask.getDispositionComment());
	        //comment("Disp Note = " + fTask.getDispositionNote());
	        //comment("Process ID = " + fTask.getProcessID());
	        //comment("Res Disp Comment = " + fTask.getResDispositionComment());
	        //comment("Res Task Desc = " + fTask.getResTaskDescription());
	        //comment("Asgn Staff = " + fTask.getAssignedStaff());
	        //comment("Asgn Date = " + fTask.getAssignmentDate());
	        //comment("Task ID: " + fTask.getCurrentTaskID());
	       	//comment("Cmp Flag: " + fTask.getCompleteFlag());

			//set due date on all active tasks
			if (fTask.getCurrentTaskID() == "030001000000000"){ //parallel task ID
				//comment("Inside 030001000000000 if");
				if (fTask.getActiveFlag() == "Y") 	{		//sd_chk_lv1 column in GPROCESS
					//comment("Inside getActiveFlag if");
					setDueDateOnActiveTask(fTask.getTaskDescription(), 1); // calling existing custom script
					//comment("Went to setDueDateOnActiveTask and came back");
				}
			}
		}
	}

	if (wfTask =="Online Customer Request" && wfStatus == "Walk Through - Revisions Only") {
		reactivateRevisionsOnly("030001000000000",1);
		updateAppStatus("In Review","New Cycle Begins",capId);
		deactivateTask("Permit Verification");
	}

	if (wfTask =="Online Customer Request" && wfStatus == "Outstanding Issues") {
		var permitNbr = capId.getCustomID();
		updateTask("Application Submittal","Need Addtl Info", "", "");
		if (capStatus != "Revisions Needed")
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
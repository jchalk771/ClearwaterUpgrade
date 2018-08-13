//Accela_PROD/SCRIPTS/EVENT/WATUA;BUILDING!CONSTRUCTION PERMIT!~!~.js
//Branch
//jec 170721 conversion begin

// Actions taken when the Adhoc task is submitted.

try{
    //Begin Reviews - Response to Comments - Courtesy Review
	//Adhoc Task Add After Work Arounds
	
		
	//Online Customer Request
   
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
                //following worked in 8.0.0.0.3, would not work in 9.3.1
		//assignDueDateToTaskLevel("030001000000000", vDueDate );
                assignDueDateToTaskLevelWATAA("03", vDueDate );
	}

	if (wfTask =="Online Customer Request" && wfStatus == "Log - Response to Comments") {
		addAdHocTask("ADHOC_TASKS","Response to Comments","Another Cycle Begins");
		//following worked in 8.0.0.0.3, would not work in 9.3.1
                //reactivateTaskLevelWATUA("030001000000000");
                reactivateTaskLevel("030");
		deactivateTask("Permit Verification");
		updateAppStatus("In Review","Another Cycle Begins",capId);
	}

	if (wfTask =="Online Customer Request" && wfStatus == "Log - Courtesy Review") {
		addAdHocTask("ADHOC_TASKS","Courtesy Review","Another Cycle Begins");
		reactivateRevisionsOnly("030001000000000",3);
		deactivateTask("Permit Verification");
		updateAppStatus("In Review","Another Cycle Begins",capId);
	}

	if (wfTask =="Online Customer Request" && wfStatus =="Walk Through Review") { // added this for SD+ 23127
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
		var eAddress = getPrimaryEmail4PlanReviewWATUA(capId);  //adding for compatibility, jec 9.1.2017
		var permitNbr = capId.getCustomID();
		updateTask("Application Submittal","Need Addtl Info", "", "");
		if (capStatus !="Revisions Needed")
		     updateAppStatus("Additional Info Required","status set by WFAdhocUA scipt");
		rptParams = aa.util.newHashMap();
		rptParams.put("alt_id", permitNbr);
		rptParams.put("condition_status", "Not Met");
		var noticeTemp = "MESSAGE_OUTSTANDING_ISSUES";
		var noticeParams = aa.util.newHashtable();
		noticeParams.put("$$altID$$", permitNbr);
        
        //Staff Name
		var vName;
		vName = asgnName.substr(0, asgnName.indexOf(','));
		comment("vName is " + vName);
		noticeParams.put("$$userStaff$$",vName);
		
		//phone
		var vPhone;
		//comment("Comma is in position " + asgnName.indexOf(','));
		vPhone =  asgnName.substr(asgnName.indexOf(',') +1,asgnName.length - asgnName.indexOf(','));
		comment("vPhone is " + vPhone);		
		noticeParams.put("$$userPhone$$",vPhone);
        
		//Staff email address - format email address  
		comment("Space is in position " + asgnName.indexOf(' '));
		comment("Comma is in position " + asgnName.indexOf(','));
		var vEmail;
		vEmail = asgnName.slice(0,asgnName.indexOf(' '))+"." + asgnName.substr(asgnName.indexOf(' ') +1, asgnName.length - 5 - asgnName.indexOf(' ')-1)+"@myclearwater.com";    		
		comment("vEmail is " + vEmail);
		noticeParams.put("$$userEmail$$", vEmail);

		if (wfComment == null) 
			noticeParams.put("$$wfComment$$",  " " );
		if (wfComment != null) 
			noticeParams.put("$$wfComment$$",  wfComment );
		comment("Case Nbr is "+permitNbr);
		emailRpt_Save2Case("Case Conditions",permitNbr, rptParams, noticeParams, eAddress, noticeTemp);
	}

	if (wfTask =="Permit Verification" && wfStatus == "Issue" &&  cap.isCreatedByACA()) {
		var eAddress = getPrimaryEmail4PlanReviewWATUA(capId);  //adding for compatibility, jec 8.28.2017
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
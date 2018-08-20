///Accela_PROD/SCRIPTS/EVENT/WATUA;BUILDING!~!~!~.js
//
//

// Actions taken when the Adhoc task is submitted.

try{
	//jj Test
	updateShortNotes('JJ this event ran!!!');
	

	if (matches(wfTask,"Begin Reviews","Response to Comments", "Courtesy Review","Online Customer Request") && matches(wfStatus,"Applicant Notified","Pick-up letter","Pick-up Amendment","Incomplete","Outstanding Issues")) {
		eAddress = getPrimaryEmail4PlanReviewWATUA(capId);  //eliminating scope limiter to enable for following branches, jec 8.28.2017
		comment("WATUA Email is " + eAddress);
	}

	if (matches(wfTask,"Begin Reviews","Response to Comments", "Courtesy Review") && matches(wfStatus,"Applicant Notified","Pick-up letter","Pick-up Amendment") && matches(eAddress, "No email.", "Owner-Builder","Problem") && AInfo['Bin Number'] != "EDR") {
		showMessage = true;
		comment("There is no email available for this permit!");
		comment("*********************************************");
		comment("");
	}

	if (matches(wfTask,"Begin Reviews","Response to Comments", "Courtesy Review") &&  wfStatus == "Applicant Notified" && !matches(eAddress, "No email.", "Owner-Builder")) {
		var permitNbr = capId.getCustomID();
		var noticeTemp = "MESSAGE_REVISIONS_NEEDED";
		rptParams = aa.util.newHashMap();
		rptParams.put("alt_id", permitNbr);
		rptParams.put("condition_status", "Not Met");
		var noticeParams = aa.util.newHashtable();
		noticeParams.put("$$altID$$", permitNbr);
		//noticeParams.put("$$wfComment$$", wfComment);
		emailRpt_Save2Case("Case Conditions",permitNbr, rptParams, noticeParams, eAddress, noticeTemp);
		if (isAdhocTaskActive("Online Customer Request")) 
			closeActiveTask("Online Customer Request","Outstanding Issues","","");
	}

	if (matches(wfTask,"Begin Reviews","Response to Comments", "Courtesy Review") && wfStatus == "Pick-up Amendment" && !cap.isCreatedByACA() && !matches(eAddress, "No email.", "Owner-Builder")) {
		var permitNbr = capId.getCustomID();
		var noticeTemp = "MESSAGE_PICK_UP_AMENDMENT";
		rptParams = aa.util.newHashMap();
		rptParams.put("altID", permitNbr);
		var noticeParams = aa.util.newHashtable();
		noticeParams.put("$$altID$$", permitNbr);
		//noticeParams.put("$$wfComment$$", wfComment);
		emailRpt_Save2Case("PickUpAmendment",permitNbr, rptParams, noticeParams, eAddress, noticeTemp);
	}

	if (matches(wfTask,"Begin Reviews","Response to Comments",  "Courtesy Review") && wfStatus == "Pick-up letter" && !cap.isCreatedByACA() && !matches(eAddress, "No email.", "Owner-Builder")) {
		var permitNbr = capId.getCustomID();
		var noticeTemp = "MESSAGE_PICK_UP_PERMIT";
		rptParams = aa.util.newHashMap();
		rptParams.put("altID", permitNbr);
		var noticeParams = aa.util.newHashtable();
		noticeParams.put("$$altID$$", permitNbr);
		//noticeParams.put("$$wfComment$$", wfComment);
		emailRpt_Save2Case("PickUpLetter",permitNbr, rptParams, noticeParams, eAddress, noticeTemp);
	}

	//comment("Get Value From is" + aa.env.getValue("From"));
	//comment("Case created in aca is " + cap.isCreatedByACA());
	
	//**********************************************
    //Begin Reviews - Response to Comments - Courtesy Review
	//Adhoc Task Add After Work Arounds
	
	if (wfTask =="Begin Reviews" && wfStatus =="Set Due Date") {
		var vDueDate = dateAdd(startDate,wfComment, true);
		comment("The date due is " + vDueDate);
		todayDate = jsDateToASIDate(new Date());
		vTaskNote = (currentUserID + "-"+ todayDate);
		editAppSpecific("Target", vDueDate);
		//addAdHocTask("ADHOC_TASKS","Begin Reviews",vTaskNote);
		setDueDateOnActiveTask("Begin Reviews",wfComment);
		if (!appMatch("Building/Fire/*/*")){
			assignDueDateToTaskLevelWATAA("03", vDueDate );}
		else
			{assignDueDateToTaskLevelWATAA("02", vDueDate );
		}
        //assignDueDateToTaskLevelWATAA("03", vDueDate );
		//editAppSpecific("Bin Number","EDR");
		editAppSpecific("Walk-Thru", "No");
		//assignDueDateToTaskLevelWTUA("030001000000000", vDueDate);
		}

	if (wfTask =="Response to Comments" && wfStatus == "Set Due Date") {
		//addAdHocTask("ADHOC_TASKS","Response to Comments","Another Cycle Begins");
		if (!appMatch("Building/Fire/*/*")){
			reactivateTaskLevel("030");}
		else
			{reactivateTaskLevel("020");
		}
		//reactivateTaskLevel("030");
		deactivateTask("Permit Verification");
		updateAppStatus("In Review","Another Cycle Begins",capId);
	}

	if (wfTask =="Courtesy Review" && wfStatus == "Set Due Date") {
		//addAdHocTask("ADHOC_TASKS","Courtesy Review","Another Cycle Begins");
	
		//reactivateRevisionsOnly("030001000000000",3);
		
		if (!appMatch("Building/Fire/*/*")){
			reactivateRevisionsOnly("030001000000000",3);}
		else
			{reactivateRevisionsOnly("020001000000000",3);
		}
		deactivateTask("Permit Verification");
		updateAppStatus("In Review","Another Cycle Begins",capId);
	}
	

}catch(err){
	logDebug("An error occurred in WATUA:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170721 conversion end

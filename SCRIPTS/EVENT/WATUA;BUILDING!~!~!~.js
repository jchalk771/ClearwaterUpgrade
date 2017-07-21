//Branch
//jec 170721 conversion begin

try{

	if (matches(wfTask,"Begin Reviews","Response to Comments", "Courtesy Review","Online Customer Request") && matches(wfStatus,"Applicant Notified","Pick-up letter","Pick-up Amendment","Incomplete","Outstanding Issues")) {
		var eAddress = getPrimaryEmail4PlanReview(capId);
		comment("Email is " + eAddress);
	}

	if (matches(wfTask,"Begin Reviews","Response to Comments", "Courtesy Review") && matches(wfStatus,"Applicant Notified","Pick-up letter","Pick-up Amendment") && matches(eAddress, "No email.", "Owner-Builder") && AInfo['Bin Number'] != "EDR") {
		showMessage = true;
		comment("There is no email available for this permit!");
	}

	if (matches(wfTask,"Begin Reviews","Response to Comments", "Courtesy Review") &&  wfStatus == "Applicant Notified" && !matches(eAddress, "No email.", "Owner-Builder")) {
		var permitNbr = capId.getCustomID();
		var noticeTemp = "MESSAGE_REVISIONS_NEEDED";
		rptParams = aa.util.newHashMap();
		rptParams.put("alt_id", permitNbr);
		rptParams.put("condition_status", "Not Met");
		var noticeParams = aa.util.newHashtable();
		noticeParams.put("$$altID$$", permitNbr);
		if (wfComment!=null) 
			noticeParams.put("$$wfComment$$", wfComment);
		comment("Case Nbr is "+permitNbr);
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
		noticeParams .put("$$altID$$", permitNbr);
		if (wfComment!=null) 
			noticeParams.put("$$wfComment$$", wfComment);
		comment("Case Nbr is "+permitNbr);
		emailRpt_Save2Case("PickUpAmendment",permitNbr, rptParams, noticeParams, eAddress, noticeTemp);
	}

	if (matches(wfTask,"Begin Reviews","Response to Comments",  "Courtesy Review") && wfStatus == "Pick-up letter" && !cap.isCreatedByACA() && !matches(eAddress, "No email.", "Owner-Builder")) {
		var permitNbr = capId.getCustomID();
		var noticeTemp = "MESSAGE_PICK_UP_PERMIT";
		rptParams = aa.util.newHashMap();
		rptParams.put("altID", permitNbr);
		var noticeParams = aa.util.newHashtable();
		noticeParams.put("$$altID$$", permitNbr);
		if (wfComment!=null) 
			noticeParams.put("$$wfComment$$", wfComment);
		comment("Case Nbr is "+permitNbr);
		emailRpt_Save2Case("PickUpLetter",permitNbr, rptParams, noticeParams, eAddress, noticeTemp);
	}

	comment("Get Value From is" +aa.env.getValue("From")=="AA" );
	comment("Case created in aca is " + cap.isCreatedByACA());

}catch(err){
	logDebug("An error occurred in WATUA:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170721 conversion end
//Branch
//jec 170724 conversion begin

try{

	if (wfTask=="Staff Review" && matches(wfStatus,"Denied","Approved","Issue - Partial Approval","Issue - Replacement Insp Req")) {
		//branch("ES_EMAIL_TREE_PERMIT")
		
		var eAddress = getPrimaryEmail4PlanReview(capId);
		comment("Email is" +eAddress);
		if (matches(eAddress, "No email.", "Owner-Builder") && AInfo['Owner Email'] != null) {
			eAddress = AInfo['Owner Email'];
			showMessage = true;
			//comment("Line 2, email is " + eAddress);
			comment("WTUA:Planning/Tree/*/*, Line 15, email is " + eAddress);
		}

		var cAddr = getPrimaryAddress();
		comment ("Address is " + cAddr);
		comment ("Workflow Comment is " + wfComment);
		if (matches(eAddress, "No email.", "Owner-Builder")) {
			showMessage = true;
			comment("There is no email available for this permit!");
		}

		if (!matches(eAddress, "No email.", "Owner-Builder")) {
			var permitNbr = capId.getCustomID();
			var noticeTemp = "MESSAGE_TREE_PERMIT";
			rptParams = aa.util.newHashMap();
			rptParams.put("altID", permitNbr);
			var noticeParams = aa.util.newHashtable();
			noticeParams.put("$$altID$$", permitNbr);
			noticeParams.put("$$CAPADDR$$", cAddr);
			if (wfComment !=null) noticeParams.put("$$wfComment$$", wfComment);
			comment("Case Nbr is "+permitNbr);
			emailRpt_Save2Case("TreePermit",permitNbr, rptParams, noticeParams, eAddress, noticeTemp);
		}
		logDebug("testMasterAddress is: " + testMasterAddress);
	}
	
}catch(err){
	logDebug("An error occurred in WTUA:Planning/Tree/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170724 conversion end
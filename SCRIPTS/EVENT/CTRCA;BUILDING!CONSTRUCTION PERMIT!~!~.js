//Branch
//jec 170717 conversion begin

try{

	var bDesc = "Online Permit - " + workDescGet(capId);
	//aa.debug("CTRCA - Line 5","bdesc is "+ bDesc);
	logDebug("CTRCA:Building/Construction Permit/*/* - Line 8","bdesc is "+ bDesc);
	updateWorkDesc(bDesc,capId);
	updateShortNotes(AInfo['Online Permit Type'],capId);
	
			
	editAppSpecific("Received",dateAdd(null,0));
	editAppSpecific("Expired",dateAddMonths(null,6));
	editAppSpecific("Walk-Thru", "Yes");
		
	//aa.debug("CTRCA Line 20 *****","Branches to ES_BCP_ADD_TRADE_FEE");
	logDebug("CTRCA:Building/Construction Permit/*/* Line 17 *****, Calls bcpAddTradeFee");
	//branch("ES_BCP_ADD_TRADE_FEE")
	bcpAddTradeFee();
	
	var permitNbr = capId.getCustomID();
	email("lydia.moreda@myClearwater.com","noReply@myclearwater.com", "New Online Permit - "+ permitNbr, "A new permit application has been submitted! Verify business rules are processed correctly.");
	
	//branch("ES_ACA_NEW_BLDG__APP")
	var vCaseLink = getACAUrl();
	comment("The URL is " + vCaseLink);
	setPrimaryLicProf(capId);
	var revStartDate = new Date();
	var vStartTime = formatDateTime(revStartDate);
	comment("Hello, the start time is " + vStartTime);
	logDebug("***********Debug ","RevStartDate is " + vStartTime);
	addAdHocTask("ADHOC_TASKS","Online Customer Request", vStartTime + " - New Case");
	//aa.debug("**********Debug Line*************","Made it to line 6!");
	logDebug("**********Debug Line*************","Made it to line 34 of CTRCA:Building/Construction Permit/*/*!");
	var eAddress = getPrimaryEmail4PlanReview(capId);
	comment("Email is " + eAddress);
	logDebug("**********Debug Line*************","CapID is "+ capId);
	logDebug("**********Debug Line*************","eAddress is" + eAddress);
	var permitNbr = capId.getCustomID();
	var rptArray = [];
	var noticeParams = aa.util.newHashtable();
	noticeParams.put("$$altID$$", permitNbr);
	noticeParams.put("$$Url$$", vCaseLink);
	sendNotification("noReply@myclearwater.com",eAddress,"","MESSAGE_NEW_ACA_BLDG_APP",noticeParams,rptArray);
	if (!matches(AInfo['Online Permit Type'], "Fence", "Roof", "Windows, Doors and Garage Doors", "A/C Change Out","Demolition")) {
		updateFee("PERM", "B_NCC", "FINAL", 1, "N");
		updateFee("DBPR", "B_NCC", "FINAL", 1, "N");
		updateFee("DCAF", "B_NCC", "FINAL", 1, "N");
		updateFee("PERMT","B_NCC","FINAL",(parseInt(AInfo['Number of Trades'])-1)*30,"N");
	}

	if (estValue > 7500 && AInfo['Online Permit Type'] =="A/C Change Out" && !appHasCondition("Online Review",null,"Recorded NOC")) {
		addStdCondition("Online Review","Recorded NOC","Not Met");
		//aa.debug("*********************ES_ACA_NEW_BLDG_APP, Line 11","AC changeout");
		logDebug("*********************CTRCA:Building/Construction Permit/*/*, Line 55","AC changeout");
	}

	if (estValue > 2500 &&!matches(AInfo['Online Permit Type'], "A/C Change Out") && !appHasCondition("Online Review",null,"Recorded NOC")) {
		addStdCondition("Online Review","Recorded NOC","Not Met");
		//aa.debug("*********************ES_ACA_NEW_BLDG_APP, Line 12","Not AC");
		logDebug("*********************CTRCA:Building/Construction Permit/*/*, Line 61","Not AC");
	}

}catch(err){
	logDebug("An error occurred in CTRCA:Building/Construction Permit/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170717 conversion end
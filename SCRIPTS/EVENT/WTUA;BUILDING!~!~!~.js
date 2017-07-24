//Branch
//jec 170724 conversion begin

try{

	if (wfTask == "Permit Verification" && wfStatus == "Issue") {
		editAppSpecific("Expired",dateAddMonths(null,6));
	}
	
	//branch("ES_ADD_ASI_DATES")

	jsfileDate = new Date(fileDate);
	jsexpDate = new Date(dateAddMonths(null,6));
	if (AInfo['Received'] == null) {
		editAppSpecific("Received",jsDateToASIDate(jsfileDate));
	}

	if ((appMatch("Building/Over the Counter/*/*") || appMatch("Building/Construction Permit/*/*") || appMatch("Building/Fire/*/*") || appMatch("Building/Engineering/*/*")) &&  wfTask == "Permit Verification" && wfStatus == "Issue") {
		editAppSpecific("Issued",wfDateMMDDYYYY);
		editAppSpecific("Expired",jsDateToASIDate(jsexpDate));
	}

	if (appMatch("Building/Sign/*/*") && wfTask == "Permit Verification" && wfStatus == "Issue") {
		editAppSpecific("Issued Date",wfDateMMDDYYYY);
		editAppSpecific("Expired Date",jsDateToASIDate(jsexpDate));
	}

	if (wfTask == "Active Permit" && matches(wfStatus,"Completed","Certificate of Completion", "License Holder Self Certify")) {
		editAppSpecific("Finaled",wfDateMMDDYYYY);
	}

	if ((appMatch("Building/Amendment/*/*") || appMatch("Building/Sign/*/*")) && wfTask == "Active Permit" && matches(wfStatus,"Completed","License Holder Self Certify")) {
		editAppSpecific("Finaled Date",wfDateMMDDYYYY);
	}
	
	//end ES_ADD_ASI_DATES
	
	if (!appMatch("Building/Fire/*/*") && !matches(wfTask,"Application Submittal","Permit Verification", "Active") && matches(capStatus,"In Review", "Revisions Needed", "Review Approved")) {
		var vRevStatus = UpdateCapReviewStatus(capId,"03");
		comment("Review Status: "+ vRevStatus);
	}
	
	if (matches(wfTask,"Begin Reviews","Response to Comments", "Courtesy Review","Online Customer Request", "Permit Verification") && matches(wfStatus,"Applicant Notified","Pick-up letter","Pick-up Amendment","Incomplete","Outstanding Issues","Issue","Walk Through Review", "NOTE", "Task Processed")) {
		var eAddress = getPrimaryEmail4PlanReview(capId);
		comment("Email is " + eAddress);
	}
	
	if ((appMatch("Building/Construction Permit/*/*") || appMatch("Building/Sign/*/*") || appMatch("Building/Amendment/*/*")) && wfTask =="Application Submittal" && wfStatus == "Route to Review") {
		//branch("ES_ACTIVATE_REVIEWS")
		activateReviews();
	}

}catch(err){
	logDebug("An error occurred in WTUA:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170724 conversion end
//Branch
//jec 170720 conversion begin

try{

	if (wfTask == "Online Customer Request" && (AInfo['Type of Permit'] == "" ||AInfo['Type of Permit'] == null)) {
		showMessage = true;
		comment("The Type of Permit field is blank. Please enter permit type.");
		cancel = true;
	}

	if (isAdhocTaskActive("Online Customer Request")) {
		var eAddress = getPrimaryEmail4PlanReview(capId);
		comment("Email is " + eAddress);
	}

	if (wfTask == "Online Customer Request" && matches(wfStatus,"Incomplete","Outstanding Issues")&& matches(eAddress, "No email.", "Owner-Builder","")) {
		showMessage = true;
		comment("Email is " + eAddress+". There is no email available for this permit!  Update the professional record.");
		cancel = true;
	}

	if (wfTask == "Permit Verification" && wfStatus=="Issue" &&isAdhocTaskActive("Online Customer Request")&& matches(eAddress, "No email.", "Owner-Builder")) {
		showMessage = true;
		comment("Email is " + eAddress+". There is no email available for this permit!  Update the professional record.");
		cancel = true;
	}
	
}catch(err){
	logDebug("An error occurred in WATUB:Building/Construction Permit/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170720 conversion end
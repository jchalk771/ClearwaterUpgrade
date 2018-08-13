///Accela_PROD/SCRIPTS/EVENT/WATUB;BUILDING!CONSTRUCTION PERMIT!~!~.js
//

try{
	if (wfTask == "Begin Reviews" && wfStatus == "Set Due Date" && matches(AInfo['Type of Permit'], "Construction Trailer", "Demo - Building","Addition","Foundation", "New Commercial","New Duplex/Triplex","New Mobile Home", "New Multi-Family Dwelling","New SF Detached","New Townhome","Pool - In Ground","Portable Storage", "Site Work Only","Structure Move") && !isTaskActive("Land Resources Review")) {
		showMessage = true;
		comment("Land Resource Review is not active. Please activate before beginning review process");
		cancel = true;
	}

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
    
	//Prevent staff from selecting Issue Permit from the Online customer Request Task
	
	if (wfTask =="Online Customer Request" && wfStatus =="Permit Issued"){
		showMessage = true;
		comment("Do not issue the permit with Online Customer Request. Issue it with Permit Verification task.");
		cancel = true;
	}
}catch(err){
	logDebug("An error occurred in WATUB:Building/Construction Permit/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170720 conversion end
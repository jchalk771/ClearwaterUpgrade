//Branch
//jec 170721 conversion begin

try{
	
	eAddress = getPrimaryEmail4PlanReview(capId);  //adding for compatibility, jec 8.28.17

	if (capStatus == "Expired") {
		showMessage = true;
		comment("CAP is expired. Cannot update workflow until CAP is reinstated.");
		cancel = true;
	}

	if (capStatus == "Hold") {
		showMessage = true;
		comment("CAP is on hold status. Cannot update workflow until CAP is active.");
		cancel = true;
	}

	if (capStatus == "Red") {
		showMessage = true;
		comment("CAP is on RED status. Cannot update workflow until CAP is active.");
		cancel = true;
	}

	if ((appMatch("Building/Construction Permit/*/*") || appMatch("Building/Over the Counter/*/*")|| appMatch("Building/Sign/*/*") || appMatch("Building/Fire/*/*")) && !feeExists("NOFE","NEW")) {
		//branch("ES_VERIFY_BCP_PERMIT_FEES")
		
		var newFeeTotal = caseFeeTotalByStatus("NEW");
		comment ("New Fee Totals = " + newFeeTotal);
		var feesDue = unpaidIssFeesDue(capId);
		comment("Non-impact fees due = " + feesDue);
		if (wfTask == "Permit Verification" && wfStatus =="Issue" && newFeeTotal > 0) {
			showMessage = true;
			comment("There are fees on this case that need to be invoiced and paid before the permit can be issued");
			cancel = true;
		}

		if (wfTask == "Permit Verification" && wfStatus == "Issue" && feesDue > 0) {
			showMessage = true;
			comment("There is a balance due on this permit. Fees must be paid before permit is issued.");
			cancel = true;
		}

		if (wfTask == "Active Permit" && matches(wfStatus, "Certificate of Completion","Certificate of Occupancy","Completed","License Holder Self Certify", "No Access","Temp Certificate of Occupancy") &&( balanceDue > 0 || newFeeTotal > 0 )) {
			showMessage = true;
			comment("There are unpaid fees on this permit. Fees must be paid before the permit can be completed.");
			cancel = true;
		}
	}

	if (wfTask == "Permit Verification" && wfStatus == "Issue" && (appHasCondition("DRT Review","Not Met",null,null) || appHasCondition("Pln Review","Not Met",null,null) ||appHasCondition("Online Review","Not Met",null,null) ||appHasCondition("Dev Review","Not Met",null,null))) {
		showMessage = true;
		comment("Cannot issue with unmet condition.");
		cancel = true;
	}

	if (appHasCondition("C of O","Not Met",null,null) && wfTask == "Active Permit" && wfStatus == "Completed") {
		showMessage = true;
		comment("Cannot complete this permit because there are C of O conditions that have not been met.");
		cancel = true;
	}

	if (wfTask == "Active Permit" && wfStatus == "Completed") {
		pCapID = getParent();
		// comment("Parent CAP Id is: " + pCapID);
	}

	if (wfTask == "Active Permit" && wfStatus == "Completed" && pCapID != false && appHasCondition("C of O","Not Met",null,null,pCapID)) {
		showMessage = true;
		comment("Cannot complete this permit because there are C of O conditions on the parent CAP that have not been met.");
		cancel = true;
		}

	LPArray = null;
	refLPSeq = null;
	licCondArray = null;
	if (wfTask == "Permit Verification" && wfStatus == "Issue") {
		LPArray = getLicenseProfessional(capId);
	}

	if (wfTask == "Permit Verification" && wfStatus == "Issue" && LPArray != null && typeof(LPArray) == "object") {
		for (eachLP in LPArray) 
			//branch("ES_CHECK_LP_ATT_EXP")
			checkLPAttExp();
	}

	if (wfTask == "Permit Verification" && wfStatus == "Issue" && refLPSeq != null) {
		licCondArray = aa.caeCondition.getCAEConditions(refLPSeq).getOutput();
	}

	if (wfTask == "Permit Verification" && wfStatus == "Issue" && licCondArray != null && typeof(licCondArray) == "object") {
		for (eachcond in licCondArray) 
			//branch("ES_CHECK_LP_COND")
			checkLPCond();
	}

	if (matches(AInfo['Type of Permit'],"Addition","New Commercial","New Duplex / Triplex","New Mobile Home","New Multi-Family Dwelling","New SF Detached","New Townhome","Remodel", "Foundation") && wfTask == "Building Review" && wfStatus == "Approve") {
		//branch("ES_BCP_CHECK_FEMA")
		bcpCheckFEMA();
	}

	if (!matches("Building/Enforcement/*/*") && matches(wfTask,"Flood Review","Building Review", "Mechanical Review", "Planning Review", "Plumbing Review","Engineering Review","Environmental Review","Land Resources Review","Gas Review","Electrical Review","Fire Review","Traffic Engineering Review","Stormwater Review","Parks and Recreation Review") && wfStatus=="Approve" && appHasCondition(null,"Not Met", wfTask ,null)) {
		showMessage = true;
		comment("You have unmet conditions on the case. Please mark as met before approving workflow.");
		cancel = true;
	}

	if (!matches("Building/Enforcement/*/*") && (wfTask == "Building Review" && wfStatus=="Approve" )&& isTaskActive ("Flood Review")) {
		showMessage = true;
		comment("Flood Review task is active. Please set status before approving the Building Review task.");
		cancel = true;
	}
	
	if (wfTask == "Online Customer Request" && matches(wfStatus,"Incomplete","Outstanding Issues")&& matches(eAddress, "No email.", "Owner-Builder")) {
		showMessage=true;
		comment("Email is " + eAddress+". There is no email available for this permit!  Update the professional record.");
		cancel = true;
	}
	
}catch(err){
	logDebug("An error occurred in WTUB:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170721 conversion end
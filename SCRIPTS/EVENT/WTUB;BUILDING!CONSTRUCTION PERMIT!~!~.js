//Branch
//jec 170721 conversion begin
//@TODO COMPARE SIDE BY SIDE WITH WATUB - Can we consolidate?
try{

	if ((wfTask == "Online Customer Request" || wfTask == "Application Submittal") && (AInfo['Type of Permit'] == "" ||AInfo['Type of Permit'] == null)) {
		showMessage = true;
		comment("The Type of Permit field is blank. Please enter permit type.");
		cancel = true;
	}

	if (matches(AInfo['Type of Permit'],"New Duplex / Triplex","New Mobile Home","New Multi-Family Dwelling","New SF Detached","New Townhome","Remodel","New Commercial", "Addition", "Foundation") && wfTask == "Permit Verification" && wfStatus == "Issue") {
		//branch("ES_BCP_CHECK_FEMA")
		bcpCheckFEMA();
	}

	if (wfTask == "Active Permit" && (wfStatus == "Completed" || wfStatus == "Certificate of Occupancy" || wfStatus == "Certificate of Completion" || wfStatus == "Temp Certificate of Occupancy")&& matches(AInfo['Replacement Trees Required'],"CHECKED") && !checkInspectionResult("733 Tree Replacement","Pass")) {
		showMessage = true;
		comment("Tree Replacement inspection is needed before this case can be closed.");
		//@emailTest - comment for production deployment
			email(testMasterAddress,"Lydia.Moreda@myClearwater.com","Permit Missing Tree Replacement Inspection","Permit (" + capIDString + ") needs Tree Replacement before it can be Completed.");
		//@emailProd - uncomment for production deployment
			//email("Matthew.Anderson1@myClearwater.com","Lydia.Moreda@myClearwater.com","Permit Missing Tree Replacement Inspection","Permit (" + capIDString + ") needs Tree Replacement before it can be Completed.");
		cancel = true;
	}
	

	if (wfTask == "Application Submittal" && (AInfo['ParcelAttribute.InspectionDistrict'] == null)) {
		showMessage = true;
		comment("Please choose a parcel that is active and has an inspection district.");
		cancel = true;
	}
	
	if (wfTask == "Permit Verification" && wfStatus == "Issue") {
		//branch("ES_CHECK_PLAN_REVIEW_STATUS")
		
		var revFlag;
		revFlag = getPlanReviewStatus(capId);
		comment("Review Flag = "+revFlag);
		if (revFlag != "Approve") {
			cancel = true;
			showMessage=true;
			message = "Plan review revisons are needed before permit can be issued.";
		}
	}

	if (isAdhocTaskActive("Online Customer Request")) {
		var eAddress = getPrimaryEmail4PlanReview(capId);
		//comment("Email is " + eAddress);
	}

	if (wfTask == "Permit Verification" && wfStatus=="Issue" && isAdhocTaskActive("Online Customer Request")&&matches(eAddress, "No email.", "Owner-Builder")) {
		showMessage = true;
		comment("Email is " + eAddress+". There is no email available for this permit!  Update the professional record.");
		cancel = true;
	}
	
}catch(err){
	logDebug("An error occurred in WTUB:Building/Construction Permit/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170721 conversion end
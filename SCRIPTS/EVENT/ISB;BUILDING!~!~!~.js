//Branch
//jec 170718 conversion begin

try{

	changeStatus = false;
	addTieInSurvey = false;
	addEleCert = false;
	var feesDue = unpaidIssFeesDue(capId);
	comment("Non-impact fees due = " + feesDue);
	
	if (capStatus == "Red" && (feeExists("RE01","INVOICED") || feeExists("RE02","INVOICED")) && (feeBalanceByStatus("RE01", "INVOICED") == 0 && feeBalanceByStatus("RE02", "INVOICED") == 0) && !(feeExists("RE01","NEW") || feeExists("RE02","NEW"))) {
		updateAppStatus("Active","Reinspection fee was paid");
		changeStatus = true;
	}

	if (!appMatch("Building/Enforcement/*/*") &&  !matches(capStatus, "Active","Revisions Needed","In Review","Additional Info Required") && changeStatus == false) {
		showMessage = true;
		comment("CAP Status is: " + capStatus + ". Cannot schedule inspections until CAP is Active.");
		cancel = true;
		}

	if (!appMatch("Building/Enforcement/*/*")  && !appMatch("Building/Fire/*/*") && !appMatch("Building/Engineering/*/*") && cancel == false) {
		//branch("ES_CW_VERIFY_TRADE_FOR_INSPECTION")
		
		inspectionFound = false;
		tradePaid = false;
		inspCode = inspType.substring(0,3);
		inspTrade = "";
		if (lookup("TRADE_REQ_FOR_INSPECTIONS", "BLD").indexOf(inspCode) != -1) {
			inspectionFound = true;
			tradePaid = (AInfo['BLD'] != null && matches(AInfo['BLD'], "Y", "CHECKED"));
			inspTrade = "BLD";
		}

		if (inspectionFound == false && lookup("TRADE_REQ_FOR_INSPECTIONS", "ELE").indexOf(inspCode) != -1) {
			inspectionFound = true;
			tradePaid = (AInfo['ELE'] != null && matches(AInfo['ELE'], "Y", "CHECKED"));
			inspTrade = "ELE";
		}

		if (inspectionFound == false && lookup("TRADE_REQ_FOR_INSPECTIONS", "GAS").indexOf(inspCode) != -1) {
			inspectionFound = true;
			tradePaid = (AInfo['GAS'] != null && matches(AInfo['GAS'], "Y", "CHECKED"));
			inspTrade = "GAS";
		}

		if (inspectionFound == false && lookup("TRADE_REQ_FOR_INSPECTIONS", "MEC").indexOf(inspCode) != -1) {
			inspectionFound = true;
			tradePaid = (AInfo['MEC'] != null && matches(AInfo['MEC'], "Y", "CHECKED"));
			inspTrade = "MEC";
		}

		if (inspectionFound == false && lookup("TRADE_REQ_FOR_INSPECTIONS", "PLM").indexOf(inspCode) != -1) {
			inspectionFound = true;
			tradePaid = (AInfo['PLM'] != null && matches(AInfo['PLM'], "Y", "CHECKED"));
			inspTrade = "PLM";
		}

		if (inspectionFound == false && lookup("TRADE_REQ_FOR_INSPECTIONS", "ROOF").indexOf(inspCode) != -1) {
			inspectionFound = true;
			tradePaid = (AInfo['ROOF'] != null && matches(AInfo['ROOF'], "Y", "CHECKED"));
			inspTrade = "ROOF";
		}

		if (inspectionFound == true && tradePaid == false) {
			showMessage = true;
			comment("Inspection " + inspType + " could not be scheduled because the " + inspTrade + " trade was not paid for.  Please contact the office for more information.");
			cancel = true;
		}
	}

	if (!appMatch("Building/Enforcement/*/*")&& capStatus == "Active"  &&  (feesDue > 0 ) &&  !feeExists("NOFE","NEW")) {
		showMessage = true;
		comment("There is a balance due on this permit. All fees must be paid before the inspection can be scheduled.");
		cancel = true;
	}
	
}catch(err){
	logDebug("An error occurred in ISB:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170718 conversion end
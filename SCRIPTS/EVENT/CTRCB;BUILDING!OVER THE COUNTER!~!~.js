//Branch
//jec 170717 conversion begin

try{

	refLPSeq = null;
	licCondArray = null;
	if (estValue > 2500 && AInfo['Type of Online Permit'] != "A/C Change Out") {
		showMessage = true;
		comment("Cannot submit this application online. Project value cannot exceed $2500 for this " + AInfo['Type of Online Permit'] + " application. A Notice of Commencement is required by the City.");
		cancel = true;
	}

	if (estValue >= 7500 && AInfo['Type of Online Permit'] == "A/C Change Out") {
		showMessage = true;
		comment("Cannot submit this application online. Project value cannot exceed $7500 for A/C Change Out. A Notice of Commencement is required by the City.");
		cancel = true;
	}

	LPArray = getLicenseProfessional(capId);
	if (typeof(LPArray) == "object") {
		for (eachLP in LPArray) {
			//branch("ES_CHECK_LP_ATT_EXP_ACA")
				LPDetails = LPArray[eachLP];
				stateLicNbr = LPDetails["licenseNbr"];
				todayDate = jsDateToASIDate(new Date());
				PCExpDate = refLicProfGetAttribute(stateLicNbr,"PC LICENSE EXPIRATION");
				BTRExpDate = refLicProfGetAttribute(stateLicNbr,"BTR EXPIRATION");
				BTRExpJCDate = null;
				PCExpJCDate = null;
				if (BTRExpDate != null && BTRExpDate != "") {
					BTRExpJCDate = new Date( BTRExpDate );
				}

				if (PCExpDate != null && PCExpDate != "") {
					PCExpJCDate = new Date( PCExpDate );
				}

				if (capHasExpiredLicProf("EXPIRE") == true) {
					showMessage = true;
					comment("Cannot issue this permit, LicPro has an expired or invalid FL license.");
					cancel = true;
				}

				if (PCExpJCDate != null && PCExpJCDate <= startDate) {
					showMessage = true;
					comment("Cannot issue this permit, LicPro has an expired or invalid PC license." + PCExpDate);
					cancel = true;
				}
				
				if (BTRExpJCDate != null && BTRExpJCDate <= startDate) {
					showMessage = true;
					comment("Cannot issue this permit, LicPro has an expired or invalid BTR license. " + BTRExpDate);
					cancel = true;
				}

				refLicProObj = getRefLicenseProf(stateLicNbr);
				if (typeof(refLicProObj) == "object") {
					//branch("ES_GET_LP_SEQNO")
					refLPSeq = refLicProObj["licSeqNbr"];
				}
		
			//branch("ES_CHECK_LICTYPE")
				//rendundant
				//LPDetails = LPArray[eachLP];   
				//stateLicNbr = LPDetails["licenseNbr"];
				LicTypeRef = refLicProfGetAttribute(stateLicNbr,"CONTRACTOR TYPE");
				if (AInfo['Type of Online Permit'] == "A/C Change Out" && !matches(LicTypeRef,"A/C","FL A/C-Class B","FL A/C-Class C","Mechanical")) {
					showMessage = true;
					comment("Cannot issue this permit, LicPro does not have the required license type for this type of permit: " + AInfo['Type of Online Permit'] + ".");
					cancel = true;
				}

				if (AInfo['Type of Online Permit'] == "Alarm - Security" && !matches(LicTypeRef,"Alarm","Electrical","Low Voltage")) {
					showMessage = true;
					comment("Cannot issue this permit, LicPro does not have the required license type for this type of permit: " + AInfo['Type of Online Permit'] + ".");
					cancel = true;
				}

				if (AInfo['Type of Online Permit'] == "Electrical" && !matches(LicTypeRef,"Electrical")) {
					showMessage = true;
					comment("Cannot issue this permit, LicPro does not have the required license type for this type of permit: " + AInfo['Type of Online Permit'] + ".");
					cancel = true;
				}

				if (AInfo['Type of Online Permit'] == "Irrigation Sprinkler" && !matches(LicTypeRef,"Plumbing","Irrigation")) {
					showMessage = true;
					comment("Cannot issue this permit, LicPro does not have the required license type for this type of permit: " + AInfo['Type of Online Permit'] + ".");
					cancel = true;
				}

				if (AInfo['Type of Online Permit'] == "Water Heater Change Out" && !matches(LicTypeRef,"Plumbing","LP Gas")) {
					showMessage = true;
					comment("Cannot issue this permit, LicPro does not have the required license type for this type of permit: " + AInfo['Type of Online Permit'] + ".");
					cancel = true;
				}

				if (AInfo['Type of Online Permit'] == "Cut and Cap" && !matches(LicTypeRef,"Plumbing")) {
					showMessage = true;
					comment("Cannot issue this permit, LicPro does not have the required license type for this type of permit: " + AInfo['Type of Online Permit'] + ".");
					cancel = true;
				}
		}
	}

	if (refLPSeq != null) {
		licCondArray = aa.caeCondition.getCAEConditions(refLPSeq).getOutput();
	}

	if (licCondArray != null && typeof(licCondArray) == "object") {
		for (eachcond in licCondArray) 
			//branch("ES_CHECK_LP_COND")
			checkLPCond();
	}

	if (estValue < 500) {
		showMessage = true;
		comment("Cannot submit this application with a job value less than $500.");
		cancel = true;
	}
	
}catch(err){
	logDebug("An error occurred in CTRCB:Building/Over the Counter/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170717 conversion end
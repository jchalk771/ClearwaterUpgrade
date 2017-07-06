//custom function
//jec 170706 conversion begin
//formerly ES_CHECK_LP_ATT_EXP
function checkLPAttExp(){
	try{
		
		LPDetails = LPArray[eachLP];
		stateLicNbr = LPDetails["licenseNbr"];
		todayDate = jsDateToASIDate(new Date());
		comment("Today's Date is: " + todayDate);
		comment("State License Number is: " + stateLicNbr);
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

		if (fileDate > 04/25/2010) {
			refLicProObj = getRefLicenseProf(stateLicNbr);
			if (typeof(refLicProObj) == "object") {
				//branch("ES_GET_LP_SEQNO") - Single line, added in line to both places where called
				refLPSeq = refLicProObj["licSeqNbr"];
			}
		}
	}catch(err){
		logDebug("An error occurred in custom function checkLPAttExp Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end
//custom function
//jec 170717 conversion begin
function addLicProfessionalToCapIDByLicNum(capid, licnum){
	try{

		var result = false;
		var refLicPro = getRefLicenseProf(licnum);
		if( refLicPro != null ) {
			aa.licenseScript.associateLpWithCap(capid, refLicPro);
			result = true;
		}
		
		return result;

	}catch(err){
		logDebug("An error occurred in custom function addLicProfessionalToCapIDByLicNum Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170717 conversion end
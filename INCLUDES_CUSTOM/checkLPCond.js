//custom function
//jec 170706 conversion begin
//formerly ES_CHECK_LP_COND
function checkLPCond(){
	try{
		licCond = licCondArray[eachcond];
		condName = null;
		condName = licCond["conditionDescription"];
		comment("License Condition is: " + condName);
		condStatus = licCond["conditionStatus"];
		comment("License Condition Status is: " + condStatus);
		if (condName == "Red Tag" && condStatus == "Not Met") {
			showMessage = true;
			comment("Cannot issue this permit, LicPro has a Red Tag Condition which hasn't been Met.");
			cancel = true;
		}

		if (condName == "Expired CAP" && condStatus == "Not Met") {
			showMessage = true;
			comment("Cannot issue this permit, LicPro has an Expired Permit Condition which hasn't been Met");
			cancel = true;
		}
		

	}catch(err){
		logDebug("An error occurred in custom function checkLPCond Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end
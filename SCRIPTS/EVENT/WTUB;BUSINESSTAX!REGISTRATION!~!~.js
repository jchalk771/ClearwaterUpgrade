//Branch
//jec 170721 conversion begin

try{

	if (appHasCondition(null,"Not Met",null,null) && matches(wfTask,"Issue REG","Renewal") && matches(wfStatus,"Issue New","Issue Renewal")) {
		showMessage = true;
		comment("Cannot complete issuance at this time because there are conditions that have not been met.");
		cancel = true;
	}
	
}catch(err){
	logDebug("An error occurred in WTUB:BusinessTax/Registration/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170721 conversion end
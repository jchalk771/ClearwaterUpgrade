//Branch
//jec 170724 conversion begin

try{

	if (!matches(wfTask,"Application Submittal","Permit Verification", "Active") && matches(capStatus,"In Review", "Revisions Needed", "Review Approved")) {
		var vRevStatus = updateCapReviewStatus(capId,"02");
		comment("Review Status: "+ vRevStatus);
	}

}catch(err){
	logDebug("An error occurred in WTUA:Building/Fire/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170724 conversion end
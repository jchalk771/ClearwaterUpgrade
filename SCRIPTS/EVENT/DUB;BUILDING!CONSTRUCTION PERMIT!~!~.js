//Branch
//jec 170706 conversion begin

try{
	if (capStatus == "In Review" && publicUser == true) {
		showMessage = true;
		comment("Documents cannot be uploaded at this time as Plan Review is in progress.");
		cancel = true;
	}

	if (matches(capStatus, "Completed","Expired","Retired", "Withdrawn") && publicUser == true) {
		showMessage = true;
		comment("Documents cannot be uploaded to permits with this status. Please call the office for more information.");
		cancel = true;
	}
}catch(err){
	logDebug("An error occurred in DUB:Building/Construction Permit/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end
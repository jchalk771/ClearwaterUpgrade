//Branch
//jec 170706 conversion begin
try{
	var proposedStatus = aa.env.getValue("ApplicationStatus");
	if (matches(proposedStatus, "Completed") && balanceDue > 0) {
		showMessage = true;
		comment("A Record cannot be set to Completed without all fees being paid first.");
		cancel = true;
	}
}catch(err){
	logDebug("An error occurred in ASUB:*/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end
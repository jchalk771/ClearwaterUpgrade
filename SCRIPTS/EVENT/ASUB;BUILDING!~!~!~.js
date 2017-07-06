//Branch
//jec 170706 conversion begin
try{
	var proposedStatus = aa.env.getValue("ApplicationStatus");
	if (capStatus == "Expired" && !matches(proposedStatus, "Completed", "No Access - Owner Refused", "License Holder Self Certify") && (!feeExists("EXPD") || (feeExists("EXPD","INVOICED") && feeBalance("EXPD") > 0) || feeExists("EXPD","NEW"))) {
		showMessage = true;
		comment("This CAP must have the Expired Permit Deposit fee paid before the status can be changed from expired.");
		cancel = true;
	}

	if (capStatus == "Red" && (((feeExists("RE01","INVOICED") || feeExists("RE02","INVOICED")) && (feeBalance("RE01") > 0 || feeBalance("RE02") > 0)) || (feeExists("RE01","NEW") || feeExists("RE02","NEW")))) {
		showMessage = true;
		comment("This CAP must have the Reinspection fee paid before the status can be changed from Red." + feeBalance("RE01") + " " + feeBalance("RE02"));
		cancel = true;
	}
}catch(err){
	logDebug("An error occurred in ASUB:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end
//Branch
//jec 170714 conversion begin

try{

	if (AInfo['Type of Flexible Development'] == "Attached dwellings, mixed-uses or non-residential uses" && !feeExists("FL","NEW","INVOICED")) {
		updateFee("FL","P_ALL","FINAL",1,"N");
		updateFee("FPRE","P_ALL","FINAL",1,"N");
		}

	if (AInfo['Type of Flexible Development'] == "Detached dwellings, duplexes or associated accessory uses/structures" && !feeExists("FLR","NEW","INVOICED")) {
		updateFee("FLR","P_ALL","FINAL",1,"N");
		}
	
}catch(err){
	logDebug("An error occurred in ASA:Planning/Flexible Development/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170714 conversion end
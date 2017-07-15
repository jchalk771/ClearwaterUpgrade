//Branch
//jec 170714 conversion begin

try{

	if (AInfo['Type of Flexible Standard'] == "Detached dwellings and two attached dwellings" && !feeExists("FLSR","NEW","INVOICED")) {
		updateFee("FLSR","P_ALL","FINAL",1,"N");
	}

	if (AInfo['Type of Flexible Standard'] == "Accessory uses or structures for detached dwellings and two attached dwellings" && !feeExists("FLSA","NEW","INVOICED")) {
		updateFee("FLSA","P_ALL","FINAL",1,"N");
	}

	if (AInfo['Type of Flexible Standard'] == "Attached dwellings, mixed-uses or non-residential uses" && !feeExists("FLSC","NEW","INVOICED")) {
		updateFee("FLSC","P_ALL","FINAL",1,"N");
	}

	if (AInfo['Type of Flexible Standard'] == "Attached dwellings, mixed-uses or non-residential uses" && !feeExists("FPRE","NEW","INVOICED")) {
		updateFee("FPRE","P_ALL","FINAL",1,"N");
	}

}catch(err){
	logDebug("An error occurred in ASA:Planning/Flexible Standard/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170714 conversion end
//Branch
//jec 170714 conversion begin

try{

	if (!feeExists("REGS","NEW","INVOICED")) {
		updateFee("REGS","T_REG","FINAL",1,"N");
	}

}catch(err){
	logDebug("An error occurred in ASA:BusinessTax/Registration/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170714 conversion end
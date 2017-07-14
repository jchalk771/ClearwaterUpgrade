//Branch
//jec 170714 conversion begin

try{

	updateFee("PLAN","B_NCC","FINAL",1,"N");
	
}catch(err){
	logDebug("An error occurred in ASA:Building/Sign/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170707 conversion end
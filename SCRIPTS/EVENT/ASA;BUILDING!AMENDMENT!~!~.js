//Branch
//jec 170714 conversion begin

try{

	//branch("ES_ADD_AMENDMENT_FEES")
	updateFee("PACP","B_NCC","FINAL","1","N");
	
	
}catch(err){
	logDebug("An error occurred in ASA:Building/Amendment/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170714 conversion end
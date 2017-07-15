//Branch
//jec 170714 conversion begin

try{

	//branch("ES_ADD_PLN_TREE_FEES")
	addPlnTreeFees();
	scheduleInspectDate("Site Visit",dateAdd(null, 1, "Y"));
	

}catch(err){
	logDebug("An error occurred in ASA:Planning/Tree/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170714 conversion end
//Branch
//jec 170706 conversion begin

try{

	//branch("ES_BTR_CATEGORY_FEES")
	btrCategoryFees();	
	
}catch(err){
	logDebug("An error occurred in ASIUA:BusinessTax/Receipt/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end
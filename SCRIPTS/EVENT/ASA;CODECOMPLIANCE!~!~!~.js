//Branch
//jec 170714 conversion begin

try{

	//branch("ES_ADD_CODE_CONDITIONS")
	addCodeConditions();

	addOwnersFromAPOToCap();
	//required because only one owner added to other case types. Code needs all owners.
		
	
}catch(err){
	logDebug("An error occurred in ASA:CodeCompliance/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170714 conversion end
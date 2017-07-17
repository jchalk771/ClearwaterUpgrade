//Branch
//jec 170717 conversion begin

try{

	if (matches(AInfo['Type of Permit'], "Addition", "New Commercial", "Remodel" ) && matches( AInfo['Dwelling'], "No" )) {
		addStdCondition("DRT Review","Asbestos Notification Faxed","Not Met");
	}
	
	if (!appMatch("Building/Enforcement/*/*") && AInfo['Online Permit Type'] == "Demolition" && !appHasCondition("DRT Review",null,"Sewer Cut and Cap")) {
		addStdCondition("DRT Review","Sewer Cut and Cap","Not Met");
	}

}catch(err){
	logDebug("An error occurred in CTRCA:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170717 conversion end
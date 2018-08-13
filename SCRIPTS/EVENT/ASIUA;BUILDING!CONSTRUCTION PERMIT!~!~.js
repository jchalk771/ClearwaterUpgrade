//Branch
//jec 170706 conversion begin
try{
	if (appHasCondition("DRT Review",null,"NOC") &&AInfo['NOC Received'] == "CHECKED") {
		resolveCondition("DRT Review","Not Met","NOC","Notice","Met","");
	}

	if (appHasCondition("Online Review",null,"Recorded NOC") &&AInfo['NOC Received'] == "CHECKED") {
		resolveCondition("Online Review","Not Met","Recorded NOC","Notice","Met","");
	}
	if (matches(AInfo['Type of Permit'], "Addition", "Remodel","Demo - Building" ) && matches( AInfo['Fee Type'], "Building Code - Commercial" ) && !appHasCondition("DRT Review",null,"Asbestos")) {
		addStdCondition("DRT Review","Asbestos","Not Met");
	}
}catch(err){
	logDebug("An error occurred in ASIUA:Building/Construction Permit/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end
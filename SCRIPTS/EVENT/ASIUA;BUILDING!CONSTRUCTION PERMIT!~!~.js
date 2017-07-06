//Branch
//jec 170706 conversion begin
try{
	if (appHasCondition("DRT Review",null,"NOC") &&AInfo['NOC Received'] == "CHECKED") {
		resolveCondition("DRT Review","Not Met","NOC","Notice","Met","");
	}

	if (appHasCondition("Online Review",null,"Recorded NOC") &&AInfo['NOC Received'] == "CHECKED") {
		resolveCondition("Online Review","Not Met","Recorded NOC","Notice","Met","");
	}
}catch(err){
	logDebug("An error occurred in ASIUA:Building/Construction Permit/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end
//Branch
//jec 170717 conversion begin 
//Asbestos condition added for commercial permits only.

try{

	if (matches(AInfo['Online Permit Type'], "Addition",  "Remodel","Demolition" ) && matches( AInfo['Fee Type'], "Building Code - Commercial" )) {
		addStdCondition("Online Review","Asbestos Notification Form","Not Met");
	}
	
	if (!appMatch("Building/Enforcement/*/*") && AInfo['Online Permit Type'] == "Demolition" && !appHasCondition("DRT Review",null,"Sewer Cut and Cap")) {
		addStdCondition("DRT Review","Sewer Cut and Cap","Not Met");
	}
	if (!appMatch("Building/Enforcement/*/*") && AInfo['Online Permit Type'] == "Demolition" && !appHasCondition("DRT Review",null,"Sent Notifcation Email")) {
		addStdCondition("DRT Review","Sent Notifcation Email","Not Met");
	}


}catch(err){
	logDebug("An error occurred in CTRCA:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170717 conversion end
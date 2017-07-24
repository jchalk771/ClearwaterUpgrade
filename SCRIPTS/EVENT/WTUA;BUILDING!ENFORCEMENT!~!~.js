//Branch
//jec 170724 conversion begin

try{

	//@TODO, make sure this script stays active and inspUserId stays global (no "var") or subsequent branches will 
	//throw 'inspUserId' is undefined
	if (AInfo['Assigned Inspector'] != null) {
		inspUserId = lookup("BCP_INSPECTORS",AInfo['Assigned Inspector']);
	} else {
		inspUserId = null;
	}

}catch(err){
	logDebug("An error occurred in WTUA:Building/Enforcement/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170724 conversion end
//Branch
//jec 170721 conversion begin

try{

	if (wfTask == "Development Review Committee" && wfStatus == "Ready for DO") {
		showMessage = true;
		comment("'Ready for DO' is not a valid workflow status for this CAP type. It only applies to PLT.");
		cancel = true;
	}

}catch(err){
	logDebug("An error occurred in WTUB:Planning/*/FLD/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170721 conversion end
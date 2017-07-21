//custom function
//jec 170721 conversion begin
function bcpCheckFEMA(){
	try{

		if (AInfo['Elevation Certificate Required'] == null && AInfo['Not Located in Flood Zone'] == null && AInfo['UNS - Mandatory Improvement'] == null && AInfo['Improvement Less Than 50 Percent'] == null) {
			showMessage = true;
			comment("Elev Cert is not checked. Check box to indicate why.");
			cancel = true;
		}

		if (AInfo['Elevation Certificate Required'] == "CHECKED" && (AInfo['Panel Number'] == null || AInfo['Structure Value (Prior to Improvement)'] == null || AInfo['Base Flood'] == null)) {
			showMessage = true;
			comment("Elev Cert is required. Verify the flood zone, add value, base flood, panel number.");
			cancel = true;
		}

		if (AInfo['Elevation Certificate Required'] == "CHECKED" && AInfo['Flood Zone'] == null) {
			showMessage = true;
			comment("Flood zone missing. Enter flood zone.");
			cancel = true;
		}
		
	}catch(err){
		logDebug("An error occurred in custom function bcpCheckFEMA Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170721 conversion end
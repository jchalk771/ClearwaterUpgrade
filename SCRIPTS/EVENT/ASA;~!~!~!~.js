//Branch
//jec 170714 conversion begin

try{

	if ((appMatch("CodeCompliance/*/*/*") || appMatch("Building/Enforcement/*/*")) && !appMatch("CodeCompliance/*/WTR/*") && AInfo['Assigned Inspector'] != null) {
		inspUserId = lookup("CODE_ASSIGNED_INSP",AInfo['Assigned Inspector']);
	} 
	else {
		inspUserId = null;
	}

	if (appMatch("CodeCompliance/*/*/*") || appMatch("Building/Enforcement/*/*")) {
		scheduleInspectDate("Initial Inspection",dateAdd(null, 1, "Y"),inspUserId);
	}
	
	//not neccessary per Lydia.  Appear to be loading in with APO load and pulling from parcel attributes.
	//copyParcelGisObjects();
	//branch("ES_PARCEL_TO_ASI");
	parcelToASI();
	
	//accomplished via expression per Lydia	
	//if (appMatch("*/*/*/*") && AInfo["ParcelAttribute.ATLAS PAGE"] != null) {
		//editAppSpecific("Atlas Page", AInfo["ParcelAttribute.ATLAS PAGE"]);
		//comment( AInfo["ParcelAttribute.AtlasPage"] );
	//}
}catch(err){
	logDebug("An error occurred in ASA:*/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170707 conversion end
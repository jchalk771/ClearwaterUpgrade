//Branch
//jec 170721 conversion begin
//@TODO - Why is this on WTUB and not After event early?  This is an after rule and won't execute if any other branch cancels the event.
try{

	if (appMatch("Building/*/*/UNS") && wfTask == "Complaint Received" && wfStatus == "No Violation") {
		//branch ("ES_REMOVE_PARCEL_CONDITION")
			removeParcelCondition (null,"Parcel","Unsafe Building");
	}

	if (appMatch("Building/*/*/UNS") && wfTask == "Abatement" && (wfStatus == "Building Secured - Lien" || wfStatus == "Building Secured - No Lien" || wfStatus == "Repaired")) {
		//branch ("ES_REMOVE_PARCEL_CONDITION")
			removeParcelCondition (null,"Parcel","Unsafe Building");
	}
	
}catch(err){
	logDebug("An error occurred in WTUB:Building/*/*/UNS: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170721 conversion end
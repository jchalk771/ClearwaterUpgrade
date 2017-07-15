//Branch
//jec 170714 conversion begin

try{

	//branch ("ES_ADD_PARCEL_CONDITION")
	if (!parcelConditionExists("Parcel","Unsafe Building")) {
		addParcelCondition(null,"Parcel","Not Met(Applied)","Unsafe Building","Unsafe Building","Notice");
	}
	
}catch(err){
	logDebug("An error occurred in ASA:Building/*/*/UNS: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170714 conversion end
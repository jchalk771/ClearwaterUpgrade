//Branch
//jec 170721 conversion begin

try{

	if (wfTask == "Application Submittal" && (AInfo['ParcelAttribute.InspectionDistrict'] == null)) {
		showMessage = true;
		comment("Please choose a parcel that is active and has an inspection district.");
		cancel = true;
	}

}catch(err){
	logDebug("An error occurred in WTUB:Building/Sign/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170721 conversion end
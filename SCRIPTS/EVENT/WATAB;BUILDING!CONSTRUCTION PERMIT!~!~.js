//Branch
//jec 170720 conversion begin

try{

	if (wfTask == "Begin Reviews" && matches(AInfo['Type of Permit'], "Construction Trailer", "Demo - Building","Addition","Foundation","Marine", "New Commercial","New Duplex/Triplex","New Mobile Home", "New Multi-Family Dwelling","New SF Detached","New Townhome","Pool - In Ground","Portable Storage", "Site Work Only","Structure Move") && !isTaskActive("Land Resources Review")) {
		showMessage = true;
		comment("Land Resource Review is not active. Please activate before beginning review process");
		cancel = true;
	}

}catch(err){
	logDebug("An error occurred in WATAB:Building/Construction Permit/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170720 conversion end
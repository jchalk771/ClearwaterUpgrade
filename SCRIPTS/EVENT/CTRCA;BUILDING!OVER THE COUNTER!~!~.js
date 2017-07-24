//Branch
//jec 170717 conversion begin

try{
	
	var bDesc ="Online Permit - " +  AInfo['Type of Online Permit'] + " - " + workDescGet(capId);
	//aa.debug("CTRCA - Line 5","bdesc is "+ bDesc);
	aa.debug("CTRCA:Building/Over the Counter - Line 8","bdesc is "+ bDesc);
	updateWorkDesc(bDesc,capId);
	updateShortNotes(AInfo['Type of Online Permit'],capId);
	setPrimaryLicProf(capId);
	
	closeTask("Application Submittal","Approved","Web Permit Issued on Submittal");
	

	closeTask("Permit Verification","Issue","Web Permit Issued on Submittal");
	editAppSpecific("Issued",dateAdd(null,0));
	editAppSpecific("Received",dateAdd(null,0));
	editAppSpecific("Expired",dateAddMonths(null,6));
	
	editAppSpecific("Type of Permit", AInfo['Type of Online Permit']);
		
	if (matches(AInfo['Type of Online Permit'], "Electrical", "A/C Change Out")) {
		//branch("ES_CW_CONVERT_TO_REAL_CAP_OTC_CHCKBOXES")
		chckOptions = new Array();
		if (matches(AInfo['Type of Online Permit'], "Electrical") && AInfo['Online Electrical - Electrical - Add Outlets/Circuits'] == "CHECKED") {
			chckOptions.push("Add Outlets/Circuits");
		}

		if (matches(AInfo['Type of Online Permit'], "Electrical") && AInfo['Online Electrical - Electrical - Change Panel Box'] == "CHECKED") {
			chckOptions.push("Change Panel Box");
		}

		if (matches(AInfo['Type of Online Permit'], "Electrical") && AInfo['Online Electrical - Electrical - Upgrade Service'] == "CHECKED") {
			chckOptions.push("Upgrade Service");
		}

		if (matches(AInfo['Type of Online Permit'], "A/C Change Out") && AInfo['Online Electrical - A/C Change Out - Air Handler'] == "CHECKED") {
			chckOptions.push("Air Handler");
		}

		if (matches(AInfo['Type of Online Permit'], "A/C Change Out") && AInfo['Online Electrical - A/C Change Out - Condenser'] == "CHECKED") {
			chckOptions.push("Condenser");
		}

		if (matches(AInfo['Type of Online Permit'], "A/C Change Out") && AInfo['Online Electrical - A/C Change Out - Package Unit'] == "CHECKED") {
			chckOptions.push("Package Unit");
		}

		if (chckOptions.length > 0) {
			updateWorkDesc(workDescGet(capId) + " (" + chckOptions.join() + ")",capId);
		}
	}
	
	if (AInfo['Electrician License'] != null) {
		addLicProfessionalToCapIDByLicNum( capId, AInfo['Electrician License']);
		editAppSpecific("ELE", "CHECKED");
	}

	if (matches(AInfo['Type of Online Permit'], "Alarm - Security", "Electrical", "Low Voltage - Commercial")) {
		editAppSpecific("ELE", "CHECKED");
	}

	if (matches(AInfo['Type of Online Permit'], "A/C Change Out")) {
		editAppSpecific("MEC", "CHECKED");
		if (AInfo['Number of Trades']   == "2") 
			editAppSpecific("ELE", "CHECKED");
	}

	if (matches(AInfo['Type of Online Permit'], "Cut and Cap", "Water Service","Sewer Repair - Replacement")) {
		editAppSpecific("PLM", "CHECKED");
	}
	
	if (matches(AInfo['Type of Online Permit'],"Water Heater Change Out","Irrigation Sprinkler")) {
		editAppSpecific("PLM", "CHECKED");
		if (AInfo['Number of Trades']   == "2") 
			editAppSpecific("ELE", "CHECKED");
	}
	
	if (matches(AInfo['Type of Online Permit'], "Gas Line","Gas Water Heater")) {
		editAppSpecific("GAS", "CHECKED");
		if (AInfo['Number of Trades']   == "2") 
			editAppSpecific("PLM", "CHECKED");
	}

}catch(err){
	logDebug("An error occurred in CTRCA:Building/Over the Counter/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170717 conversion end
//Branch
//jec 170714 conversion begin

try{

	if (appMatch("Building/Construction Permit/*/*") || appMatch("Building/Over the Counter/*/*") || appMatch("Building/Sign/*/*") || appMatch("Building/Amendment/*/*")  || appMatch("Building/Fire/*/*")) {
		//branch("ES_ADD_BLDG_REQ_FEES")
		addBldgReqFees();
	}
	
	if (!appMatch("Building/Enforcement/*/*") && AInfo['Type of Permit'] == "Demo - Building" && !appHasCondition("DRT Review",null,"Sewer Cut and Cap")) {
		addStdCondition("DRT Review","Sewer Cut and Cap","Not Met");
	}
	
	if (!appMatch("Building/Enforcement/*/*") && aa.env.getValue("From")=="AA" && !(appHasCondition("DRT Review",null,"NOC") || appHasCondition("Online Review",null,"Recorded NOC") )) {
		//branch("ES_ADD_NOC")
		if (AInfo['Type of Permit'] == "A/C Change Out" && estValue > 7500 && AInfo['NOC Received']!= "CHECKED") {
			addStdCondition("DRT Review","NOC","Not Met");
			aa.debug("*********************ES_ADD_NOC","Line 1");
		}

		if (AInfo['Type of Permit'] == "A/C Change Out" && estValue > 7500 && AInfo['NOC Received']== "CHECKED") {
			addStdCondition("DRT Review","NOC","Met");
			aa.debug("*********************ES_ADD_NOC","Line 2");
		}

		if (AInfo['Type of Permit'] != "A/C Change Out" && AInfo['Type of Permit'] != "" && AInfo['Type of Permit'] != null && estValue > 2500 && AInfo['NOC Received'] != "CHECKED") {
			addStdCondition("DRT Review","NOC","Not Met");
			aa.debug("*********************ES_ADD_NOC","Line 3");
		}

		if (AInfo['Type of Permit'] != "A/C Change Out" && AInfo['Type of Permit'] != "" && AInfo['Type of Permit'] != null && estValue > 2500 && AInfo['NOC Received'] == "CHECKED") {
			addStdCondition("DRT Review","NOC","Met");
			aa.debug("*********************ES_ADD_NOC","Line 4");
		}
	}

	if (appMatch("Building/Over the Counter/*/*") || ("Building/Construction Permit/*/*") || ("Building/Fire/*/*")) {
		updateShortNotes(AInfo['Type of Permit'],capId);
	}
	
	if (matches(AInfo['Type of Permit'], "Addition", "New Commercial", "Remodel" ) && matches( AInfo['Dwelling'], "No" )) {
		addStdCondition("DRT Review","Asbestos","Not Met");
	}
	
	if (!appMatch("Building/Amendment/*/*")) {
		var myLps = getLicenseProfessional(capId);
		if (myLps != null) {
			for(vlp in myLps){ 
				if (myLps[vlp].getLicenseNbr() == "OUTTOBID"){ 
					addStdCondition("DRT Review","Application Signature","Not Met");
					addStdCondition("DRT Review","Contractor License Info","Not Met");					
					addStdCondition("DRT Review","Notarized Letter of Authorization","Not Met");
				}
			}	
		}	
	}

}catch(err){
	logDebug("An error occurred in ASA:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170714 conversion end
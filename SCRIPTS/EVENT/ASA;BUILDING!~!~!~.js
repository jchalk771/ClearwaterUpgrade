//Branch
//jec 170714 conversion begin

try{
	//fees
	if (appMatch("Building/Construction Permit/*/*") || appMatch("Building/Over the Counter/*/*") || appMatch("Building/Sign/*/*") || appMatch("Building/Amendment/*/*")  || appMatch("Building/Fire/*/*")) {
		//branch("ES_ADD_BLDG_REQ_FEES")
		addBldgReqFees();
	}
	//demo
	if (!appMatch("Building/Enforcement/*/*") && AInfo['Type of Permit'] == "Demo - Building"){
		 if(!appHasCondition("DRT Review",null,"Sewer Cut and Cap")) {
			addStdCondition("DRT Review","Sewer Cut and Cap","Not Met");}
		if(!appHasCondition("DRT Review",null,"Sent Notifcation Email")) {
			addStdCondition("DRT Review","Sent Notifcation Email","Not Met");}
		 
	}
	
	//NOC Condition
	if (!appMatch("Building/Enforcement/*/*") && aa.env.getValue("From")=="AA" && !(appHasCondition("DRT Review",null,"NOC")  )) {
		//Sign Permits
		if(appMatch("Building/Sign/*/*")&& estValue > 2500 && AInfo['NOC Received'] != "CHECKED"){
			addStdCondition("DRT Review","NOC","Not Met");
		}
		if(appMatch("Building/Sign/*/*")&& estValue > 2500 && AInfo['NOC Received'] == "CHECKED"){
			addStdCondition("DRT Review","NOC","Met");
		}
		
		//branch("ES_ADD_NOC")
		if (AInfo['Type of Permit'] == "A/C Change Out" && estValue > 7500 && AInfo['NOC Received']!= "CHECKED") {
			addStdCondition("DRT Review","NOC","Not Met");
			//aa.debug("*********************ES_ADD_NOC","Line 1");
			logDebug("*********************ASA:Building/*/*/*","Line 20");
		}

		if (AInfo['Type of Permit'] == "A/C Change Out" && estValue > 7500 && AInfo['NOC Received']== "CHECKED") {
			addStdCondition("DRT Review","NOC","Met");
			//aa.debug("*********************ES_ADD_NOC","Line 2");
			logDebug("*********************ASA:Building/*/*/*","Line 26");
		}

		if (AInfo['Type of Permit'] != "A/C Change Out" && AInfo['Type of Permit'] != "" && AInfo['Type of Permit'] != null && estValue > 2500 && AInfo['NOC Received'] != "CHECKED") {
			addStdCondition("DRT Review","NOC","Not Met");
			//aa.debug("*********************ES_ADD_NOC","Line 3");
			logDebug("*********************ASA:Building/*/*/*","Line 32");
		}

		if (AInfo['Type of Permit'] != "A/C Change Out" && AInfo['Type of Permit'] != "" && AInfo['Type of Permit'] != null && estValue > 2500 && AInfo['NOC Received'] == "CHECKED") {
			addStdCondition("DRT Review","NOC","Met");
			//aa.debug("*********************ES_ADD_NOC","Line 4");
			logDebug("*********************ASA:Building/*/*/*","Line 38");
		}
	}
	//Short Notes
	if (appMatch("Building/Over the Counter/*/*") || ("Building/Construction Permit/*/*") || ("Building/Fire/*/*")) {
		updateShortNotes(AInfo['Type of Permit'],capId);
	}
	//Asbestos Condition
	if (matches(AInfo['Type of Permit'], "Addition", "Remodel","Demo - Building" ) && matches( AInfo['Fee Type'], "Building Code - Commercial" )) {
		addStdCondition("DRT Review","Asbestos","Not Met");
	}
	//Outtobid Conditions
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
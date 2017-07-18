//Branch
//jec 170718 conversion begin

try{

	if (capStatus == "Active" && matches(AInfo['Type of Permit'],"Foundation", "New", "Addition","New Commercial","New Duplex / Triplex","New Mobile Home","New Multi-Family Dwelling","New SF Detached","New Townhome") && AInfo['Elevation Certificate Required'] == "CHECKED" && matches(AInfo['Flood Zone'],"NAVD A - No Base Flood Elev. Determined","NAVD AE - Base Flood Elev. Determined","NAVD VE Coastal Flooding, Velocity Wave; Elevation")) {
		//branch("ES_BCP_ELEV_CERT_INSP")
	
		inspCode = inspType.substring(0,3);
		comment("Inspection Code is: " + inspCode);
		if (AInfo['Disable Tie-In Req Until After'] != null) {
			disableASI = AInfo['Disable Tie-In Req Until After'];
			disableDateSplit = disableASI.split("/");
			disableDate = new Date( disableDateSplit[2], parseInt(disableDateSplit[0], 10) - 1, disableDateSplit[1] );
			comment("Disable date = "  +  AInfo['Disable Tie-In Req Until After']);
		}

		//@TODO: disableDate has no default value assigned.  Potential for undefined value error.
		if ((disableDate == null || disableDate < todayDate) && !matches(inspCode,"007","008","101","102","103","104","105","106","200","201","209","221","301","303","314","350","401","732","733","734","735") && !(checkInspectionResult("008 Elv Certificate-Under Cons","Pass") || checkInspectionResult("008 Elv Certificate-Under Cons","PASS"))) {
			changeStatus = true;
			addEleCert= true;
			showMessage = true;
			comment("The elevation certificate is missing. Cannot schedule further inspections until elevation certificate is recorded. Case is being put on hold status.");
		}
		
	}

	if (capStatus == "Active" && matches(AInfo['Type of Permit'],"Foundation","Addition", "New","New Commercial","New Duplex / Triplex","New Mobile Home","New Multi-Family Dwelling", " New Multi-Family","New SF Detached","New Townhome", "Remodel") && matches(AInfo['Flood Zone'],"NAVD A - No Base Flood Elev. Determined","NAVD AE - Base Flood Elev. Determined","NAVD VE Coastal Flooding, Velocity Wave; Elevation") && changeStatus == true && addEleCert == true) {
		updateAppStatus("Hold","Updated via Event Script - Needs Elevation Certificate");
		scheduleInspection("008 Elv Certificate-Under Cons",30);
	}

	if (capStatus == "Active" && matches(AInfo['Type of Permit'],"Foundation","Addition","New","New Commercial","New Duplex / Triplex", "New Multi-Family Dwelling","New Multi-Family", "New SF Detached","New Townhome")) {
		//branch("ES_BCP_TIEIN_INSP")
		
		inspCode = inspType.substring(0,3);
		comment("Inspection Code is: " + inspCode);
		disableDate = null;
		todayDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
		if (AInfo['Disable Tie-In Req Until After'] != null) {
			disableASI = AInfo['Disable Tie-In Req Until After'];
			disableDateSplit = disableASI.split("/");
			disableDate = new Date( disableDateSplit[2], parseInt(disableDateSplit[0], 10) - 1, disableDateSplit[1] );
		}

		if ((disableDate == null || disableDate < todayDate) && !matches(inspCode,"006","007","008","101","102","103","104","105","106","200","201","209","221","301","303","314","350","401","733","734","735") && !(checkInspectionResult("007 Tie In Survey","Pass") || checkInspectionResult("007 Tie In Survey","PASS"))) {
			changeStatus = true;
			addTieInSurvey = true;
			showMessage = true;
			comment("The Tie In Survey is missing. Cannot schedule further inspections until Tie In Survey is recorded. Case is being put on hold status.");
		}
	}

	if (capStatus == "Active" && matches(AInfo['Type of Permit'],"New","Foundation","Addition","New Commercial","New Duplex / Triplex","New Multi-Family Dwelling","New SF Detached","New Townhome") && changeStatus == true && addTieInSurvey == true) {
		updateAppStatus("Hold","Updated via Event Script - Needs Tie In Survey");
		scheduleInspection("007 Tie In Survey",30);
	}	
	
	if (matches(capStatus,"Revisions Needed", "In Review","Additional Info Required") && !matches(inspType, "735 Tree Preservation","734 Erosion Control Check" )) {
		showMessage = true;
		comment("Inspection Type is: " + inspType + ". Only 734 Erosion Control and 735 Tree Preservation inspections allowed before permit is issued.");
		cancel = true;
	}
	
}catch(err){
	logDebug("An error occurred in ISB:Building/Construction Permit/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170718 conversion end
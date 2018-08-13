//Accela_PROD/INCLUDES_CUSTOM/assignInsp4AMO_CLW.js
//custom function
//jec 170808 conversion begin
//function assigns inspector to inspection based on trade and district (iZone)
//ResCom is used when inspector staffing low or all licenses not obtained
//Modified 01/24/2017 to remove assignments to ENG and UTIL staff
//Modified 08/10/2018 AW: updated insp assignments to DROOT and MKNOTEK 
function assignInsp4AMO_CLW(inspectionType, iZone, resCom, inspectionID) {
	try {
		var inspCode = "";
		var inspTrade = "";
		var inspZone = iZone;
		var inspArea = "";
		var inspectorName = "";

		inspCode = inspectionType.substring(0, 3);
		comment("Insp code nbr is " + inspCode);
		comment("Res-Com is " + resCom);
		comment("Insp ID from global variable is " + inspId);
		comment("Get Insp passed in std choice is " + inspectionID);

		if (matches(inspCode, "050", "060", "070", "071", "101", "102", "103",
				"104", "105", "106", "107", "108", "109", "110", "115",
				"116", "117", "118", "119", "120", "121", "124", "125",
				"127", "128", "130", "135", "502", "505", "507", "601",
				"802", "901", "902", "906", "907", "912", "913", "917")) {
			inspTrade = "BLD";
		}
		if (matches(inspCode.substring(0, 1), "3", "4") ||
			inspectionType == "Mech-Check On Progress of Job" ||
			inspectionType == "Plum-Check On Progress of Job" ||
			inspCode == "801") {
			inspTrade = "MEC";
		}
		if (inspectionType.substring(0, 1) == "2" ||
			matches(inspCode, "040", "045", "503", "504", "903", "904", "919", "921") ||
			inspectionType == "Elec-Check On Progress of Job") {
			inspTrade = "ELE";
		}
		if (inspectionType.substring(0, 1) == "7") {
			inspTrade = "LNR";
			inspZone = "City";
		}
		//if (matches(inspectionType.substring(0, 3), "926", "931")) {
		//	inspTrade = "STR";
		//	inspZone = "City";
		//}
		if (matches(inspectionType.substring(0, 3), "927", "932", "925", "930")) {
			inspTrade = "UTL";
			inspZone = "City";
		}
		if (inspectionType.substring(0, 1) == "5" &&
			!matches(inspCode, "501", "502", "503", "504", "505", "507")) {
			inspTrade = "FIR";
			inspZone = "City";
		}
		if (matches(inspectionType.substring(0, 3), "000", "001", "006","903", "904", "919", "921", "926", "928", "931")) {
			inspTrade = "ENG";
			inspZone = "City";
		}
		//if (inspectionType.substring(0, 3) == "004") {
		//	inspTrade = "TRF";
		//	inspZone = "City";
		//}
		if (inspTrade == "") {
			inspTrade = "OTH";
		}

		inspArea = inspTrade + "-" + inspZone;

		comment("Insp Trade: " + inspTrade);
		comment("Insp Zone is " + inspZone);
		comment("Insp Area is " + inspArea);

		if (inspTrade != "OTH" && inspArea != "") {
			inspectorName = lookup("USER_DISTRICTS", inspArea);
			comment("Inspector is " + inspectorName);
		}
		//Fully Staffed
		//Script will first assign as though fully staffed
		//if we are short staffed, uncomment the proper trades below so
		// it will assign as Building specifies


		if (inspTrade == "OTH") {
			switch (inspCode) {
			//Remmove per Tara Kivett
			//case "006":
			//	assignInspection(inspectionID, "TMAHONY");
			//	comment("InspCode = " + inspCode + " Inspection assigned to Mahony");
			//	break;

			case "007":
				assignInspection(inspectionID, "MBAKER");
				comment("InspCode = " + inspCode + " Inspection assigned to MBAKER");
				break;

			case "008":
				assignInspection(inspectionID, "MKNOTEK");
				comment("InspCode = " + inspCode + " Inspection assigned to MKNOTEK" );
				break;

			case "009":
				assignInspection(inspectionID, "MKNOTEK");
				comment("InspCode = " + inspCode + " Inspection assigned to MKNOTEK");
				break;
			}

		}
		//ENG commercial inspections do not get assigned, per Tara Kivett 1/2018
		//ENG residential are now DROOT - 20180810 AW
		if (inspTrade == "ENG") {
			if (resCom == "RES") {
				assignInspection(inspectionID, "DROOT");
				comment("ENG-RES Inspection assigned to: DROOT");
			}
		}
		//UTL inspections do not get assigned per Tara Kivett
		//UTL should print their own tickets with Accela Rpt "Inspection Tickets - UTIL" under Building reports
		//if (inspTrade == "UTL") {
		//	if (resCom == "COM") {
		//		assignInspection(inspectionID, "TKUHNEL");
		//		comment("UTL_COM Inspection assigned to: Kuhnel");
		//	} else {
		//		assignInspection(inspectionID, "TCARRICK");
		//		comment("ENG-RES Inspection assigned to: Carrick");
		//	}
		//}

		if (inspTrade != "OTH" && inspTrade != "ENG" && inspTrade != "UTL") {
			assignInspection(inspectionID, inspectorName);
			comment("Inspection assigned to: " + inspectorName);
		}

		//if (inspectorName =="")
		//        {
		//            assignInspection(inspectionID, "TCARRICK");
		//           comment("Blank - Inspection assigned to: Carrick" );
		//        }


		//Short MEC inspectors
		//if (inspTrade == "MEC" || inspTrade == "PLM") {
		//    if (resCom == "RES") {
		//        assignInspection(inspectionID, "DROSS");
		//        comment("Short staffed - Inspection assigned to: Ross")
		//    }
		//    else {
		//        assignInspection(inspectionID, "DOMALLEY");
		//        comment("Short staffed - Inspection assigned to: OMalley")
		//    }
		//}

		//Short Electrical Inspectors
		//if (inspTrade == "ELE") {
		//    if (resCom == "RES") {
		//        assignInspection(inspectionID, "DCLARK");
		//        comment("Short staffed - Inspection assigned to: Clark")
		//    }
		//    else {
		//        assignInspection(inspectionID, "SMILLER");
		//        comment("Short staffed - Inspection assigned to: Miller")
		//    }
		//}

		//Short BLD Inspectors
		//if (inspTrade == "BLD" && resCom == "RES")
		// {
		//    assignInspection(inspectionID, "SLERO");
		//    comment("Short staffed - Inspection assigned to: Lero")
		// }
	} catch (err) {
		logDebug("An error occurred in custom function assignInsp4AMO_CLW Conversion: " + err.message);
		logDebug(err.stack);
	}

}

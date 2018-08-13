//Accela_PROD/SCRIPTS/EVENT/IRSA;BUILDING!~!~!~.js
//Branch
//jec 170717 conversion begin

try{

	var vExtendExp = false;
	

	if ((inspResult == "Pass" || inspResult == "Partial Pass") && matches(inspType.substring(0,3),"002","040","045","060","070","101","102","103","104","105","106","107","108","109","110","115","116","117","118","119","120","121","124","125","128","130","135","200","201","202","204","205","206","207","209","211","213","215","219","221","222","301","302","303","304","305","306","307","310","313","314","315","316","317","350","351","355","362","401","402","403","404","405","406","500","502","503","504","505","507","510","511","515","516","520","521","522","532","536","538","540","542","544","548","550","568","570","572","574","576","578","580","582","588","592","594","596","598","601", "801","802","901","906","907","912","913","917","925","926","927","930","931","932")) {
		vExtendExp = true;
		comment("Extend date = " + vExtendExp);
	}

	if (appMatch("Building/*/*/*") && (inspResult == "Pass" || inspResult == "Partial Pass") &&vExtendExp ==true) {
		inspObj = aa.inspection.getInspection(capId,inspId).getOutput();
		inspManualDate = inspObj.getInspectionDate().getMonth() + "/" + inspObj.getInspectionDate().getDayOfMonth() + "/" + inspObj.getInspectionDate().getYear();
		jsInspManualDate = new Date(dateAddMonths(inspManualDate,6));
		if (appMatch("Building/Sign/*/*")){

			editAppSpecific("Expired Date",jsDateToASIDate(jsInspManualDate));}

        else

			{editAppSpecific("Expired",jsDateToASIDate(jsInspManualDate));}

    }


	if (inspResult == "Red") {
		addFee("FRED","B_FIR","FINAL",1,"Y");
		updateAppStatus("Red","Updated via Event Script:Check Red Tag Condition");
	}

	if (inspResult == "Red1") {
		addFee("RE01","B_NCC","FINAL",1,"Y");
		updateAppStatus("Red","Updated via Event Script:Check Red Tag Condition");
	}
	
	if (inspResult == "Red2") {
		addFee("RE02","B_NCC","FINAL",1,"Y");
		updateAppStatus("Red","Updated via Event Script:Check Red Tag Condition");
	}

	if ((appMatch("Building/*/*/SWO") || appMatch("Building/*/*/HOU"))) {
		//branch("ES_UPDATE_BLDG_WF_TASKS")
		
		if (AInfo['Assigned Inspector'] != null) {
			inspUserId = lookup("BCP_INSPECTORS",AInfo['Assigned Inspector']);
		} else {
			inspUserId = null;
		}

		if (appMatch("Building/*/*/SWO")&&((inspType == "Initial Inspection") || (inspType == "Reinspection")) && matches(inspResult, "Fail","No Access")) {
			scheduleInspection("Reinspection",14,inspUserId);
		}

		if (appMatch("Building/*/*/HOU")&&((inspType == "Initial Inspection") || (inspType == "Reinspection")) && matches(inspResult, "Fail","No Access")) {
			scheduleInspection("Reinspection",30,inspUserId);
		}
	}
	
}catch(err){
	logDebug("An error occurred in IRSA:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170717 conversion end
//Accela_PROD/SCRIPTS/EVENT/ISA;BUILDING!~!~!~.js
//Branch
//jec 170718 conversion begin

try{

	var resCom = "COM";
	
	if ((appMatch("Building/Construction Permit/*/*")&&AInfo['Fee Type'] == "Building Code - Residential") ||(appMatch("Building/Over the Counter/*/*")&&AInfo['Dwelling'] == "Yes")) {
		resCom = "RES";
	}

	if (appMatch("Building/Construction Permit/*/*")  || appMatch("Building/Over the Counter/*/*")  || appMatch("Building/Sign/*/*")  || appMatch("Building/Fire/*/*")) {
		var InspectionTypeList = aa.env.getValue("InspectionTypeList");
		comment("inspection type list is " +InspectionTypeList);
		var InspectionIdList = aa.env.getValue("InspectionIdList");
		comment("Insp ID List is " +InspectionIdList );
		var inspIdArr = String(InspectionIdList).split("|");
		comment("Insp Id Arr is " + inspIdArr );
		var NumberOfInspections = aa.env.getValue("NumberOfInspections");
		comment("Inspection count is " + NumberOfInspections);
		var inspZone = AInfo['ParcelAttribute.InspectionDistrict'];
		comment("Insp Zone is " + inspZone);
		var inspTypeArr = String(InspectionTypeList).split("|");
		for (xx in inspTypeArr) 
			comment("In the loop... inspTypeArr is " + inspTypeArr);
			assignInsp4AMO_CLW(inspTypeArr[xx], inspZone,resCom,inspIdArr[xx]);
	}

}catch(err){
	logDebug("An error occurred in ISA:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170718 conversion end












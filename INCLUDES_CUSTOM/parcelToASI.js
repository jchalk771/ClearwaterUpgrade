//custom function
//jec 170714 conversion begin
function parcelToASI(){
	try{

		//ES_PARCEL_TO_ASI
		if (AInfo['ParcelAttribute.ZONING 1'] != null) {
			zon1 = AInfo['ParcelAttribute.ZONING 1'];
			editAppSpecific("Zoning 1",zon1);
			}

		if (AInfo['ParcelAttribute.ZONING 2'] != null) {
			zon2 = AInfo['ParcelAttribute.ZONING 2'];
			editAppSpecific("Zoning 2",zon2);
			}

		if (AInfo['ParcelAttribute.ZONING 3'] != null) {
			zon3 = AInfo['ParcelAttribute.ZONING 3'];
			editAppSpecific("Zoning 3",zon3);
			}

		if (AInfo['ParcelAttribute.LAND USE 1'] != null) {
			land1 = AInfo['ParcelAttribute.LAND USE 1'];
			editAppSpecific("Land Use 1",land1);
			}

		if (AInfo['ParcelAttribute.LAND USE 2'] != null) {
			land2 = AInfo['ParcelAttribute.LAND USE 2'];
			editAppSpecific("Land Use 2",land2);
			}

		if (AInfo['ParcelAttribute.LAND USE 3'] != null) {
			land3 = AInfo['ParcelAttribute.LAND USE 3'];
			editAppSpecific("Land Use 3",land3);
			}

		if (AInfo['ParcelAttribute.CHARACTER DISTRICT 1'] != null) {
			char1 = AInfo['ParcelAttribute.CHARACTER DISTRICT 1'];
			editAppSpecific("Character District 1",char1);
			}

		if (AInfo['ParcelAttribute.CHARACTER DISTRICT 2'] != null) {
			char2 = AInfo['ParcelAttribute.CHARACTER DISTRICT 2'];
			editAppSpecific("Character District 2",char2);
			}

		if (AInfo['ParcelAttribute.CHARACTER DISTRICT 3'] != null) {
			char3 = AInfo['ParcelAttribute.CHARACTER DISTRICT 3'];
			editAppSpecific("Character District 3",char3);
			}

		if (appMatch("Building/*/*/*")) {
			
			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "A") {
				editAppSpecific("Flood Zone","NAVD A - No Base Flood Elev. Determined");
			}

			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "A99") {
				editAppSpecific("Flood Zone","NAVD A99");
			}

			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "AE") {
				editAppSpecific("Flood Zone","NAVD AE - Base Flood Elev. Determined");
			}

			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "AH") {
				editAppSpecific("Flood Zone","NAVD AH");
			}

			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "AO") {
				editAppSpecific("Flood Zone","NAVD AO");
			}

			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "D") {
				editAppSpecific("Flood Zone","NAVD D");
			}

			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "VE") {
				editAppSpecific("Flood Zone","NAVD VE Coastal Flooding, Velocity Wave; Elevation");
			}

			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "X") {
				editAppSpecific("Flood Zone","NAVD X - Shaded - Outside 100 Yr Flood");
			}

			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "XU") {
				editAppSpecific("Flood Zone","NAVD X Unshaded - Outside 500 Yr Flood");
			}

			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "GX") {
				editAppSpecific("Flood Zone","NGVD - X Areas of 500 Yr Flood (Shaded)");
			}

			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "GA") {
				editAppSpecific("Flood Zone","NGVD A - No Base Flood Elev. Determined");
			}

			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "GAE") {
				editAppSpecific("Flood Zone","NGVD AE - Base Flood Elev. Determined");
			}

			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "GVE") {
				editAppSpecific("Flood Zone","NGVD VE Coastal Flooding, Velocity Wave; Elevation");
			}

			if (AInfo['ParcelAttribute.FLOOD ZONE'] == "GU") {
				editAppSpecific("Flood Zone","NGVD X Unshaded - Areas Outside 500 Yr Flood");
			}
		}

	}catch(err){
		logDebug("An error occurred in custom function parcelToASI Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170714 conversion end
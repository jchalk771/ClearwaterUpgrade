//custom function
//jec 170706 conversion begin
//formerly ES_ADD_BLDG_REQ_FEES
function addBldgReqFees(){
	try{
		
		if (AInfo['Fee Type'] == "Building Code - Residential") {
			updateFee("PLANR","B_NCC","FINAL",1,"N");
		}

		if (AInfo['Fee Type'] == "Building Code - Commercial") {
			updateFee("PLAN","B_NCC","FINAL",1,"N");
		}

		if (!appMatch("Building/Amendment/*/*")) {
			//branch("ES_BCP_ADD_TRADE_FEE")
			bcpAddTradeFee();
		}

		if (AInfo['Type of Permit'] == "New Mobile Home" && AInfo['Number of Trades'] > 0) {
			updateFee("PERMT","B_NCC","FINAL",AInfo['Number of Trades'] * 37,"N");
			removeFee("PERM","FINAL");
			removeFee("PLANR","FINAL");
		}

		if ((AInfo['Type of Permit'] == "Demo - Building" || AInfo['Type of Permit'] == "Demo - Partial" || AInfo['Online Permit Type'] =="Demolition") && AInfo['Total Area'] > 1000) {
			var dFee = (((AInfo['Total Area'] - 1000) *.1) + 53);
			comment("dFee = " + dFee);
			comment("Total area More than 1000");
			updateFee("DEMO","B_NCC","FINAL",dFee,"Y");
			removeFee("PERM","FINAL");
			removeFee("PERMT","FINAL");
			removeFee("PLANR","FINAL");
			removeFee("PLAN","FINAL");
			if (!feeExists("GRUB")) 
				addFee("GRUB","B_NCC","FINAL",1,"Y");
		}

		if ((AInfo['Type of Permit'] == "Demo - Building" || AInfo['Type of Permit'] == "Demo - Partial"|| AInfo['Online Permit Type'] =="Demolition") && AInfo['Total Area'] < 1000) {
			updateFee("DEMO","B_NCC","FINAL",53,"Y");
			removeFee("PERM","FINAL");
			removeFee("PERMT","FINAL");
			removeFee("PLANR","FINAL");
			removeFee("PLAN","FINAL");
			comment("Less than 1000!");
			if (!feeExists("GRUB")) 
				addFee("GRUB","B_NCC","FINAL",1,"Y");
		}

		if (AInfo['C-G'] == "CHECKED" && !feeExists("GRUB")) {
			addFee("GRUB","B_NCC","FINAL",1,"N");
		}

		if (matches(AInfo['Type of Permit'],"Addition","New Commercial","New Duplex / Triplex","New Mobile Home","New Multi-Family Dwelling","New SF Detached","New Townhome") && (AInfo['Living Area'] > 0 || AInfo['Commercial'] > 0)) {
			indoorSF = parseFloat(AInfo['Living Area']) + parseFloat(AInfo['Commercial']);
		}

		if (appMatch("Building/*/*/*") && !matches(AInfo['Type of Permit'], "Fence", "Marine", "Trenching", "Underground Fire Line") && !appMatch("Building/Engineering/*/*")  && !appMatch("Building/Enforcement/*/*")) {
			updateFee("DBPR", "B_NCC", "FINAL", 1, "N");
			updateFee("DCAF", "B_NCC", "FINAL", 1, "N");
		}

		if (AInfo['Number Requested'] > 0) {
			updateFee("TREE","B_NCC","FINAL",AInfo['Number Requested'],"N");
		}

		if (AInfo['Deficit'] > 0  && AInfo['Caliper Replaced'] != null && AInfo['Deficit'] > AInfo['Caliper Replaced']) {
			updateFee("TRFU","B_NCC","FINAL",48 * (AInfo['Deficit'] - AInfo['Caliper Replaced']),"N");
		}

		comment("Clearing and Grubbing is " + AInfo['Clearing and Grubbing']);
		
	}catch(err){
		logDebug("An error occurred in custom function addBldgReqFees Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end
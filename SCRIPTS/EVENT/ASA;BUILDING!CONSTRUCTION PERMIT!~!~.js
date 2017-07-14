//Branch
//jec 170714 conversion begin

try{

	if ((aa.env.getValue("From")!="AA")&& !matches(AInfo['Online Permit Type'], "Fence","Roof", "Windows, Doors and Garage Doors", "A/C Change Out")) {
		removeFee("PERMT","FINAL");
		removeFee("DBPR","FINAL");
		removeFee("DCAF","FINAL");
	}
	
	if (AInfo['Need Tree Permit'] == "Yes") {
		//branch("ES_ADD_PLN_TREE_FEES")
		addPlnTreeFees();
	}
	
	if ((aa.env.getValue("From")!="AA")&& matches(AInfo['Online Permit Type'], "Fence", "Roof", "Windows, Doors and Garage Doors", "A/C Change Out")) {
		updateFee("PERM", "B_NCC", "FINAL", 1, "Y");
	}

	if ((aa.env.getValue("From")!="AA")&& matches(AInfo['Online Permit Type'], "A/C Change Out","Demolition")) {
		removeFee("PLAN","FINAL");
		removeFee("PLANR","FINAL");
	}

	if ((AInfo['Online Permit Type']== "Demolition" ||AInfo['Type of Permit'] == "Demo - Building")) {
		updateFee("DBPR","B_NCC","FINAL",1,"Y");
		updateFee("DCAF","B_NCC","FINAL",1,"Y");
	}
	
	
}catch(err){
	logDebug("An error occurred in ASA:Building/Construction Permit/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170707 conversion end
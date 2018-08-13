//Accela_PROD/SCRIPTS/EVENT/FAA;~!~!~!~.js
//FAA in DEV
//FAA;~!~!~.js

//Branch
//jec 170706 conversion begin
try{
	var surchargeFeeStartDate=new Date();
	surchargeFeeStartDate.setFullYear(2010,9,01);
	feeReq=true;
	comment("Surcharge Start Date is: " + surchargeFeeStartDate);
	feeItemArray=aa.fee.getFeeItems(capId).getOutput();
	if (feeItemArray) {
		for (FI in feeItemArray) 
			if (feeItemArray[FI].getFeeCod().equals("NOFE")) 
				feeReq=false;
	}

	comment("Fee Reqd: " + feeReq);
	
	if (!appHasCondition("Building",null,"Fire - Final Inspection Required") && feeItemArray) {
		for (FI in feeItemArray) 
			if (feeItemArray[FI].getFeeCod().equals("FCOO"))
				addStdConditionCLW("Building","Fire - Final Inspection Required","Not Met");
	}
	
	if (appMatch("Building/*/*/*") && !appMatch("Building/Engineering/*/*")  && !appMatch("Building/Enforcement/*/*")) {
		issuedASI = AInfo['Issued'];
		issDate = Date.parse(issuedASI);
		issuedDate = new Date(issDate);
		comment("Issued Date is: " + issuedDate);
		if (!matches(AInfo['Type of Permit'], "Fence",  "Trenching", "Underground Fire Line") &&(feeReq==true) && ((AInfo['Issued']== null )|| (issuedDate > surchargeFeeStartDate))) {
			checkSurchargeFee();
		}
	}
	
}catch(err){
	logDebug("An error occurred in FAA:*/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end
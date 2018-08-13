function checkSurchargeFee()
///Accela_PROD/INCLUDES_CUSTOM/checkSurchargeFee.js
//updateFee not working correctly in ASIUA
//need to calculate fee like in FAA

{
	try{
		feeItemArray=aa.fee.getFeeItems(capId).getOutput(); 
		feeItemTotal = 0; 
		DBPR_Inv = 0; 
		DCAF_Inv = 0; 
		DBPR_FeeDue = 0;  //ADDED
		DCAF_FeeDue = 0;  //ADDED
		DBPR_Diff = 0; 
		DCAF_Diff = 0; 
		PermFeeTotal=0;
			
		if (feeItemArray) {
			for (FI in feeItemArray) 
				if (feeItemArray[FI].getFeeCod().equals("DBPR") && !matches(feeItemArray[FI].getFeeitemStatus(),"VOIDED","CREDITED")) 
					DBPR_Inv+=feeItemArray[FI].getFee();
			}

		comment("DBPR Invoiced: " + DBPR_Inv.toFixed(2));
			
		if (feeItemArray) {
			for (FI in feeItemArray) 
				if (feeItemArray[FI].getFeeCod().equals("DCAF") && !matches(feeItemArray[FI].getFeeitemStatus(),"VOIDED","CREDITED")) 
					DCAF_Inv+=feeItemArray[FI].getFee();
		}

		comment("DCAF Fees Invoiced: " + DCAF_Inv.toFixed(2));
			
		if (feeItemArray) {
			for (FI in feeItemArray) 
				if ((feeItemArray[FI].getFeeCod().equals("PERM")|| feeItemArray[FI].getFeeCod().equals("PERMT") || feeItemArray[FI].getFeeCod().equals("DEMO") || feeItemArray[FI].getFeeCod().equals("PERU") || feeItemArray[FI].getFeeCod().equals("PACP") || feeItemArray[FI].getFeeCod().equals("PARP") || feeItemArray[FI].getFeeCod().equals("PLAN") || feeItemArray[FI].getFeeCod().equals("PLANR") || feeItemArray[FI].getFeeCod().equals("MOVE") || feeItemArray[FI].getFeeCod().equals("SWIM") || feeItemArray[FI].getFeeCod().equals("POLE") ||feeItemArray[FI].getFeeCod().equals("AFT1") || feeItemArray[FI].getFeeCod().equals("AFT2")) && !matches(feeItemArray[FI].getFeeitemStatus(),"VOIDED","CREDITED")) 
					PermFeeTotal+=feeItemArray[FI].getFee();
		}

			
		DBPR_FeeDue = PermFeeTotal * .01; 
		DCAF_FeeDue = PermFeeTotal *.015;

		if(DBPR_FeeDue < 2)
			DBPR_FeeDue = 2;
		if(DCAF_FeeDue < 2)
			DCAF_FeeDue = 2;

		DBPR_Diff = (DBPR_FeeDue - DBPR_Inv).toFixed(2); 
		DCAF_Diff = (DCAF_FeeDue - DCAF_Inv).toFixed(2);
			
		comment("DBPR Difference: " + DBPR_Diff );
		comment("DCAF Difference: " + DCAF_Diff );
		if (DBPR_Diff > .005) {
			addFee("DBPR", "B_NCR","FINAL", parseFloat(DBPR_Diff),"N");
		}

		if (DCAF_Diff > .005) {
			addFee("DCAF", "B_NCR","FINAL", parseFloat(DCAF_Diff),"N");
		}
	}
	
	catch(err){
	logDebug("An error occurred in ASIUA - CkSurchargeFee: " + err. message);
	logDebug(err.stack);
	}
}

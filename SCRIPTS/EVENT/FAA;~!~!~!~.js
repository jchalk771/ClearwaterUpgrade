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
		if (!matches(AInfo['Type of Permit'], "Fence", "Marine", "Trenching", "Underground Fire Line") &&(feeReq==true) && ((AInfo['Issued']== null )|| (issuedDate > surchargeFeeStartDate))) {
			//branch("ES_STATE_FEE_UPDATE") - only called once, adding inline
			
			feeItemArray=aa.fee.getFeeItems(capId).getOutput(); 
			feeItemTotal = 0; 
			DBPR_Inv = 0; 
			DCAF_Inv = 0; 
			//SurFeeDue = 0;  //REMOVED PER LYDIA 7.18.17
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

			//Replacing as per Lydia 7.18.17, changes to calculation imposed by state
			/*if (PermFeeTotal <= 133.66) {
				SurFeeDue = 2.00;
			}

			if (PermFeeTotal > 133.66) {
				SurFeeDue = (PermFeeTotal*.015).toFixed(2);
			}

			comment("Surcharge Due: " + SurFeeDue);
			DBPR_Diff = (SurFeeDue - DBPR_Inv).toFixed(2);
			DCAF_Diff = (SurFeeDue - DCAF_Inv).toFixed(2);
			*/
			
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
				addFee("DBPR", "B_NCR","FINAL", parseFloat(DBPR_Diff),"Y");
			}

			if (DCAF_Diff > .005) {
				addFee("DCAF", "B_NCR","FINAL", parseFloat(DCAF_Diff),"Y");
			}
		}
	}
}catch(err){
	logDebug("An error occurred in FAA:*/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end
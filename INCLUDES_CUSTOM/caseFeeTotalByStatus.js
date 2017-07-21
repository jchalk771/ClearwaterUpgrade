//custom function
//jec 170721 conversion begin
//Used to ensure all fees added to a case are invoiced before permit is issued
function caseFeeTotalByStatus(feeStatus){
	try{

		//sums all fees with the status requested 
	     var targetFees = loadFees(capId);
	     var totalFeeAmt = 0;
	 
	     for (tFeeNum in targetFees) {
	  	    targetFee = targetFees[tFeeNum];
	   		if (targetFee.status == feeStatus) {
	   			totalFeeAmt += targetFee.amount;
	   		}
	     }
			
	     return totalFeeAmt;

	}catch(err){
		logDebug("An error occurred in custom function caseFeeTotalByStatus Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170721 conversion end
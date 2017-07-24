//custom function
//jec 170724 conversion begin
//Balance due impact fees - the balanceDue function does not work 
//when a fee is voided.
//Take out WIMP and SIMP in below function - they are due when permit is issued
//sums all fees with the status requested that are due at completion of the permit
function balanceDue_CompletionFees(feeStatus){
	try{

		var targetFees = loadFees(capId);

		var impactFeeAmt = 0;
		var impactFeeAmtPaid = 0;
		var impactFeeBalanceDue = 0;

		for (tFeeNum in targetFees) {
			targetFee = targetFees[tFeeNum];
			if ((targetFee.status == feeStatus) && (matches(targetFee.code, "DVBW", "IIMP", "LIMP", "OIMP", "PRKG", "RILF", "RIMP", "SDWK", "TIMP", "TRFU", "FPLAN"))) {
				impactFeeAmt += targetFee.amount;

				impactFeeAmtPaid += targetFee.amountPaid;
			}

		}

		impactFeeBalanceDue = (impactFeeAmt - impactFeeAmtPaid);
		comment("Impact Fee total is " + impactFeeAmt);
		comment("Impact fees paid is " + impactFeeAmtPaid);

		return impactFeeBalanceDue;
		
	}catch(err){
		logDebug("An error occurred in custom function balanceDue_CompletionFees Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170724 conversion end
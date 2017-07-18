//custom function
//jec 170718 conversion begin
function feeBalanceByStatus(feestr, feestatus){
	try{

		// Searches payment fee items and returns the unpaid balance of a fee item
		// Sums fee items if more than one exists.  Optional third parameter fee schedule
		var amtFee = 0;
		var amtPaid = 0;
		var feeSch;

		if (arguments.length == 3)
			feeSch = arguments[1];

		var feeResult = aa.fee.getFeeItems(capId);

		if (feeResult.getSuccess()) {
			var feeObjArr = feeResult.getOutput();
		} else {
			logDebug("**ERROR: getting fee items: " + capContResult.getErrorMessage());
			return false;
		}

		for (ff in feeObjArr)
			if ((!feestr || feestr.equals(feeObjArr[ff].getFeeCod())) && (!feeSch || feeSch.equals(feeObjArr[ff].getF4FeeItemModel().getFeeSchudle())) && feeObjArr[ff].getFeeitemStatus() == feestatus) {
				amtFee += feeObjArr[ff].getFee();
				var pfResult = aa.finance.getPaymentFeeItems(capId, null);

				if (pfResult.getSuccess()) {
					var pfObj = pfResult.getOutput();
					for (ij in pfObj)
						if (feeObjArr[ff].getFeeSeqNbr() == pfObj[ij].getFeeSeqNbr())
							amtPaid += pfObj[ij].getFeeAllocation();

				}
			}
		return amtFee - amtPaid;

	}catch(err){
		logDebug("An error occurred in custom function feeBalanceByStatus Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170718 conversion end



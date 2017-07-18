//custom function
//Used to calculate fees that must be paid before an inspection is allowed
//Excludes impact fees which are due when permit is completed
//DVBW - Developer Contribution - Beach
//IIMP - Irrigation Impact Fee
//LIMP - Recreation Land Impact Fee 
//OIMP - Open Space Impact Fee
//PRKG - Parking in Lieu of Fee
//RILF - Retention in Lieu of Fee 
//RIMP - Recreation Facility Impact Fee
//SDWK - Sidewalk in Lieu of Fee 
//TIMD - Transportation Impact - Downtown 
//TIMP - Transportation Impact Fee
//TRFU -  Tree Fund
//WIMP - Water Impact Fee
//SIMP - Sewer Impact Fee
//FPLN - Fire - New Constr/Renov Review, needs to be removed from list at completion of Morton Plant(BCP2015-01516)
//jec 170718 conversion begin
function unpaidIssFeesDue(capId) {
	try {

		var feeAmtDue = 0;
		var totalFeeDue = 0;
		var issueFeeAmtDue = 0;
		var issueFeeAmtPaid = 0;
		var impactFeeAmtDue = 0;
		var impactFeeAmtPaid = 0;
		var impactFeeFlag = false;

		var feeA = loadFees(capId)

			for (x in feeA) {
				thisFee = feeA[x];

				//logMessage("We have a fee " + thisFee.code + " status : " + thisFee.status);
				//comment("We have a fee " + thisFee.code + " status : " + thisFee.status);
				comment("********* Fee Code is " + thisFee.code);
				comment("********* Fee Status is " + thisFee.status);
				comment("********* Fee Amount is " + thisFee.amount);
				comment("********* Fee Amount Paid is " + thisFee.amountPaid);

				if (matches(thisFee.code, "DVBW", "IIMP", "LIMP", "OIMP", "PRKG", "RILF", "RIMP",
						"SDWK", "TIMD", "TIMP", "TRFU", "WIMP", "SIMP", "FPLN")) {
					impactFeeFlag = true;
				} else {
					impactFeeFlag = false;
				}
				comment("********* is this an impact fee = " + impactFeeFlag);

				if (impactFeeFlag == false) {
					if (thisFee.status == "CREDITED" || thisFee.status == "VOIDED") {
						issueFeeAmtDue = 0;
					}

					if (thisFee.status == "INVOICED")
						{
						issueFeeAmtDue = (thisFee.amount - thisFee.amountPaid);
					}
				}

				comment("*********  Impact Fee Amount Due is " + issueFeeAmtDue);

				totalFeeDue += issueFeeAmtDue;
				comment("Running total is " + totalFeeDue);
			}

			comment("Total issue fee balance is " + totalFeeDue);

		return totalFeeDue;

	} catch (err) {
		logDebug("An error occurred in custom function unpaidIssFeesDue Conversion: " + err.message);
		logDebug(err.stack);
	}
}
//jec 170718 conversion end
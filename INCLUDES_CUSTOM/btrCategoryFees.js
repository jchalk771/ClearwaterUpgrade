//custom function
//formerly ES_BTR_CATEGORY_FEES
//jec 170706 conversion begin
function btrCategoryFees(){
	try{
		BTRCATfee = 0;
		BTRCATtotalfee = 0;
		BTRCATnew = true;
		var BTRCurrentYear = new Date().getFullYear();
		var BTRFeeCommentNote = BTRCurrentYear + "-" + (BTRCurrentYear + 1);
		if (typeof(CATEGORIES) == "object") {
			for (eachrow in CATEGORIES) {
				//branch("ES_BTR_CATEGORY_FEES_LOOP")
				btrCategoryFeesLoop();
			}
		}	

		BTRCATopenDate = getAppSpecific("Date Opened");
		BTRCATopenDateJS = new Date( BTRCATopenDate );
		BTRCATHalfYear = false;
		if (BTRCATopenDate == null) {
			BTRCATopenDate = jsDateToASIDate(startDate);
			BTRCATopenDateJS = new Date( BTRCATopenDate );
		}

		if (matches(capStatus, "Renewal","Red")) {
			BTRCATnew = false;
		}

		if (BTRCATtotalfee > 0 && BTRCATnew == true && BTRCATopenDateJS >= new Date("04/01/" + startDate.getFullYear()) && BTRCATopenDateJS <= new Date("09/30/" + + startDate.getFullYear())) {
			updateFee("HALF","T_BTR","FINAL",BTRCATtotalfee,"N");
			logDebug( BTRCATtotalfee );
			BTRCATHalfYear = true;
		}

		if (BTRCATtotalfee > 0 && BTRCATHalfYear == false && BTRCATnew == true) {
			updateFee("LIC_","T_BTR","FINAL",BTRCATtotalfee,"N");
		}

		if (BTRCATtotalfee>0 && BTRCATHalfYear == false && BTRCATnew == false) {
			comment(BTRCATtotalfee);
		}

		if (BTRCATtotalfee>0 && BTRCATnew == false) {
			addFeeWithExtraData("LICN","T_BTR","FINAL",parseFloat(BTRCATtotalfee), "N", capId, BTRFeeCommentNote);
		}

		logDebug(BTRCATtotalfee);
	}catch(err){
		logDebug("An error occurred in custom function btrCategoryFees Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end
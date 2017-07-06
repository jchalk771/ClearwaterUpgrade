//custom function
//jec 170706 conversion begin
//formerly ES_ADD_PLN_TREE_FEES
function addPlnTreeFees(){
	try{
		
		if (AInfo['Number Requested'] > 0) {
			updateFee("TREE","P_ALL","FINAL",AInfo['Number Requested'],"Y");
		}

	}catch(err){
		logDebug("An error occurred in custom function addPlnTreeFees Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end
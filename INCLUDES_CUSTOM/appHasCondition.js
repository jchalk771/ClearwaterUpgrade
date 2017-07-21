//custom function
//jec 170721 conversion begin
//override of master script function - WTUB branches noted for use of 5th optional capId.
function appHasCondition(pType,pStatus,pDesc,pImpact){
	try{
		// Checks to see if conditions have been added to CAP
		// 06SSP-00223
		//

		var itemCap = capId;

		if (arguments.length == 5)
			itemCap = arguments[4]; // use cap ID specified in args

		if (pType == null)
			var condResult = aa.capCondition.getCapConditions(itemCap);
		else
			var condResult = aa.capCondition.getCapConditions(itemCap, pType);

		if (condResult.getSuccess())
			var capConds = condResult.getOutput();
		else {
			logMessage("**ERROR: getting cap conditions: " + condResult.getErrorMessage());
			logDebug("**ERROR: getting cap conditions: " + condResult.getErrorMessage());
			return false;
		}

		var cStatus;
		var cDesc;
		var cImpact;

		for (cc in capConds) {
			var thisCond = capConds[cc];
			var cStatus = thisCond.getConditionStatus();
			var cDesc = thisCond.getConditionDescription();
			var cImpact = thisCond.getImpactCode();
			var cType = thisCond.getConditionType();
			if (cStatus == null)
				cStatus = " ";
			if (cDesc == null)
				cDesc = " ";
			if (cImpact == null)
				cImpact = " ";
			//Look for matching condition

			if ((pStatus == null || pStatus.toUpperCase().equals(cStatus.toUpperCase())) && (pDesc == null || pDesc.toUpperCase().equals(cDesc.toUpperCase())) && (pImpact == null || pImpact.toUpperCase().equals(cImpact.toUpperCase())))
				return true; //matching condition found
		}
		return false; //no matching condition found
	
	}catch(err){
		logDebug("An error occurred in custom function appHasCondition Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170721 conversion end
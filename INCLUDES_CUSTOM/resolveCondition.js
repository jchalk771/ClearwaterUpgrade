//custom function
//jec 170706 conversion begin
//noted in ASIUA
function resolveCondition(pType, pStatus, pDesc, pImpact, nStatus, nImpact, nStatusType) {
	try{
		var condResult = aa.capCondition.getCapConditions(capId, pType);

		if (condResult.getSuccess())
			var capConds = condResult.getOutput();
		else {
			//logDebug("**ERROR: getting cap conditions: " + condResult.getErrorMessage());
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
				cStatus = "";
			if (cDesc == null)
				cDesc = "";
			if (cImpact == null)
				cImpact = "";
			//Look for matching condition
			if ((pStatus == null || pStatus.toUpperCase().equals(cStatus.toUpperCase())) && (pDesc == null || pDesc.toUpperCase().equals(cDesc.toUpperCase())) && (pImpact == null || pImpact.toUpperCase().equals(cImpact.toUpperCase()))) {
				if (nImpact != null || nImpact != undefined)
					thisCond.setImpactCode(nImpact);

				if (nStatusType != null || nStatusType != undefined)
					thisCond.setConditionStatusType(nStatusType);

				thisCond.setConditionStatus(nStatus);

				aa.print("Found condition needed to update: " + cDesc + " with Condition Status of " + nStatusType);

				aa.capCondition.editCapCondition(thisCond);
			}
		}
	}catch(err){
		logDebug("An error occurred in custom function resolveCondition Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end
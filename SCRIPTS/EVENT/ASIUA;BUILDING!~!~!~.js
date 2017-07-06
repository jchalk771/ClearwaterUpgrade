//Branch
//jec 170706 conversion begin

try{
	if (appMatch("Building/Construction Permit/*/*")) {
		//branch("ES_ADD_BLDG_REQ_FEES")
		addBldgReqFees();
	}

	//abandoned development approach?  only executing for one user that is currently disabled
	if (currentUserID == "MJOHNSON" && fileDate > 04/25/2010) {
		LPArray = getLicenseProfessional(capId);
		if (LPArray != null && typeof(LPArray) == "object") {
			for (eachLP in LPArray) {
				//branch("ES_CHECK_LP_ATT_EXP")
				checkLPAttExp();
				licCondArray = aa.caeCondition.getCAEConditions(refLPSeq).getOutput();
				if (typeof(licCondArray) == "object") {
					for (eachcond in licCondArray) {
						//branch("ES_CHECK_LP_COND")
						checkLPCond();
					}
				}
			}
		}
	}
	
	//@TODO: If this is a hold or lock, it will kill lower building branches
	if (!appMatch("Building/Enforcement/*/*") && AInfo['Type of Permit'] == "Demo - Building" && !appHasCondition("DRT Review",null,"Sewer Cut and Cap")) {
		addStdCondition("DRT Review","Sewer Cut and Cap","Not Met");
	}

}catch(err){
	logDebug("An error occurred in ASIUA:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end
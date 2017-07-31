//custom function
//jec 170718 conversion begin
//function comes from ASA
//the addStdCondition function in includes Accela functions does not take the status arguement
// optional status code, cap id
function addStdConditionCLW(cType, cDesc){
	try{

		var useStatus = "Applied";
		if (arguments.length == 3)
			useStatus = arguments[2]; // use status code in args

		var itemCap = capId;
		if (arguments.length == 4)
			itemCap = arguments[3]; // use cap ID specified in args


		scs = aa.capCondition.getStandardConditions(cType, cDesc).getOutput();

		for (i = 0; i < scs.length; i++) {
			var sc = scs[i];
			var addCapCondResult = aa.capCondition.addCapCondition(itemCap, sc.getConditionType(), sc.getConditionDesc(), sc.getConditionComment(), sysDate, null, sysDate, null, null, sc.getImpactCode(), systemUserObj, systemUserObj, useStatus, currentUserID, "A", "Applied", sc.getDisplayConditionNotice(), sc.getIncludeInConditionName(), sc.getIncludeInShortDescription(), sc.getInheritable(), sc.getLongDescripton(), sc.getPublicDisplayMessage(), sc.getResolutionAction(), null, null, 0, sc.getConditionGroup(), sc.getDisplayNoticeOnACA(), sc.getDisplayNoticeOnACAFee());
			if (addCapCondResult.getSuccess()) {
				logDebug("Successfully added condition (" + sc.getConditionDesc() + ")");
			} else {
				logDebug("**WARNING: adding condition (" + sc.getConditionDesc() + "): " + addCapCondResult.getErrorMessage());
			}
		}

	}catch(err){
		logDebug("An error occurred in custom function addStdConditionCLW Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170718 conversion end



//PaymentReceiveAtfer
//lm 07112017 Create new script to capture online payments made after permit application submitted

//Fires only for ACA, need cashier session event for in-house

//Objective - Notify staff when payment made to online permit by registered user
//Will add note to adhoc task as long as case is in proper status with no other outstanding conditions
try{  
     if (cap.isCreatedByACA()&& appMatch("Building/Construction Permit/*/*")&& publicUserID != "PUBLICUSER0")
	 {
		showDebug = true;
		var condResult = aa.capCondition.getCapConditions(capId);
		if (condResult.getSuccess())
			var capConds = condResult.getOutput();
		else
		{
			logMessage("**ERROR: getting cap conditions: " + condResult.getErrorMessage());
			logDebug("**ERROR: getting cap conditions: " + condResult.getErrorMessage());
			//return false;
		}
		//This works!!
		comment ("Number of conditions on case is " + capConds.length);
		//find non payment conditions
		var cStatus;
		var cDesc;
		var cImpact;
		var isFeeConditionMet;
		var cntNotMetConditions;
		var cntNonMetFeeConditions;
		
		//Initialize Variables
		isFeeConditionMet = "Yes";
		cntNotMetOtherConditions = 0;
		cntNotMetFeeConditions = 0;

		for (cc in capConds) 
		{
			var thisCond = capConds[cc];
			var cStatus = thisCond.getConditionStatus();
			var cDesc = thisCond.getConditionDescription();
			var cImpact = thisCond.getImpactCode();
			var cType = thisCond.getConditionType();
			comment("Type is "+cType);
			comment("Impact is "+cImpact);
			comment("Desc is "+cDesc);
			comment("Status is "+cStatus);
			//if (cStatus == "Not Met" && (cDesc != "Pay Fees" || cDesc != "Fire Fees"))
			//	{isFeeConditionMet = "No"}
			
			if (cStatus == "Not Met" && cType !="C of O"){ 
				//cntNotMetConditions = cntNotMetConditions + 1;
				if (cDesc == "Pay Fees"|| cDesc == "Fire Fees" || cDesc == "Fire - Final Inspection Required")
					{isFeeConditionMet = "No";
					 cntNotMetFeeConditions = cntNotMetFeeConditions + 1;}
				else
					{cntNotMetOtherConditions = cntNotMetOtherConditions + 1;}
			}
		
		}
		comment ("Is fee condition met " + isFeeConditionMet);
		comment("Count of unmet conditions is " + cntNotMetOtherConditions);
		comment("Count of unmet fee conditions is " + cntNotMetFeeConditions);
	//works to here
		if (!matches(capStatus,"Received","In Review","Revisions Needed", "Red")&& cntNotMetOtherConditions < 1)
		{
			comment("Inside last if.");
			if(isActiveAdhocTask("Online Customer Request")) 
			{
				updateTask("Online Customer Request", "NOTE", "**Online payment","", "ADHOC_TASKS");
				comment("Updated task");
			}
			
			else
			{
				addAdHocTask("ADHOC_TASKS","Online Customer Request", "Online payment");			          
				comment("Added adhoc task.");
			}
		}
	}
		email("Lydia.moreda@myClearwater.com","noReply@myclearwater.com", "PRA Test - "+ capIDString, "Hello, payment made on case. Source is " + cap.isCreatedByACA()+ ". The The number of outstanding other conditions is " + cntNotMetOtherConditions);
		comment("The end.");	
	
}catch(err){
	logDebug("An error occurred in PRA:Building/Construction Permit/*/*: Event: " + err. message);
	logDebug(err.stack);
}
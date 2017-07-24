//custom function  
//jec 170706 conversion begin  
//Noted in ASIUA  
function checkForDuplicateComment(vStdCommentType, revType, revComment) {  
	try{  
		var condResult = aa.capCondition.getCapConditions(capId, vStdCommentType);  

		if (condResult.getSuccess())  
			var capConds = condResult.getOutput();  
		else {  
 			logMessage("**ERROR: getting cap conditions: " +  condResult.getErrorMessage());  
			logDebug("**ERROR: getting cap conditions: " +  condResult.getErrorMessage());  
			return false;  
		}  
 
		var cStatus;  
		var cDesc;  
		var cComment;  
		var cImpact;  
		var duplicateComment = false;  
		comment("Before Loop, dupComment= " + duplicateComment);  
 
		for (cc in capConds) {  
			var thisCond = capConds[cc];  
			var cStatus = thisCond.getConditionStatus();  
			var cDesc = thisCond.getConditionDescription();  
			var cImpact = thisCond.getImpactCode();  
			var cType = thisCond.getConditionType();  
			var cComment = thisCond.getConditionComment();  
			var cCnt = 0;  
			comment("****************In the loop................... ");  
			comment("Condtion Type: " + cType);  
			//comment("ASI Type: " + revType);  
			comment("Condtion Description: " + cDesc);  
			//comment("ASI Comment: " + revComment);  
			comment("Condtion Comment: " + cComment);  

			//Look for matching condition  
			if (cDesc.toUpperCase().equals(revType.toUpperCase()) && cComment.toUpperCase().equals(revComment.toUpperCase())) {  
				comment("Everything is equal")  
				duplicateComment = true;  
			} else {  
				comment("Nothing is equal.")  
			}  

		}  

		return duplicateComment;  
		comment("DupComment Returned: " + duplicateComment);  
	}catch(err){  
		logDebug("An error occurred in custom function CheckForDuplicateComment Conversion: " + err. message);  
		logDebug(err.stack);  
	}  
}  
//jec 170706 conversion end  

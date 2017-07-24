//custom function
//jec 170724 conversion begin
//Checks for case created after workflow modified in PNU cases
//If case created after workflow modification, then moves case into Abatement, Court or Code Board
//see line 33 of std choice
//see line 6 of WTUA:CodeCompliance/*/PNU/*
function isNewPNU(){
	try{

		var scriptDate = new Date(2017, 3, 06);
		comment("Script Date is " + scriptDate);
		var vPNU_MonthCreated = fileDateObj.getMonth();
		if (vPNU_MonthCreated == 0) {
			var caseCreatedDate = new Date(fileDateObj.getYear(), 11, fileDateObj.getDayOfMonth());
			comment("Case Created is " + caseCreatedDate + ". Script Date is " + scriptDate);
		} else {
			var caseCreatedDate = new Date(fileDateObj.getYear(), fileDateObj.getMonth() - 1, fileDateObj.getDayOfMonth());
			comment("Case Created is " + caseCreatedDate + ". Script Date is " + scriptDate);
		}

		if (caseCreatedDate > scriptDate) {
			return true;
			comment("Case Created after WF Change. Value is true.");
		} else {
			return false;
			comment("Value is false.");
		}

	}catch(err){
		logDebug("An error occurred in custom function isNewPNU Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170724 conversion end
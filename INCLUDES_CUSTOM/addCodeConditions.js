//custom function
//formerly ES_ADD_CODE_CONDITIONS
//jec 170706 conversion begin
function addCodeConditions(){
	try{
		codeCond = null;
		if (typeof(VIOLATIONS) == "object") {
			for (eachrow in VIOLATIONS) {
				//branch("ES_ADD_CODE_CONDITIONS_LOOP")
				vioRow = VIOLATIONS[eachrow];
				if (vioRow["Violation Category"] != null) {
					codeCond = vioRow["Violation Category"] + " - " + vioRow["Violation Detail"];
					comment("The Code Condition Name is: " + codeCond);
				}

				if (appMatch("CodeCompliance/*/BIZ/*") && codeCond != null && !appHasCondition("BIZ",null,codeCond)) {
					addStdCondition("BIZ",codeCond,"Not Met");
				}

				if (appMatch("CodeCompliance/*/CDC/*") && codeCond != null && !appHasCondition("CDC",null,codeCond)) {
					addStdCondition("CDC",codeCond,"Not Met");
				}

				if (appMatch("CodeCompliance/*/PNU/*") && codeCond != null && !appHasCondition("PNU",null,codeCond)) {
					addStdCondition("PNU",codeCond,"Not Met");
				}
			}
		}
	}catch(err){
		logDebug("An error occurred in custom function addCodeConditions Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end
//Branch
//jec 170724 conversion begin

try{

	if ((appMatch("Planning/*/CSP/*") || appMatch("Planning/*/DRI/*") || appMatch("Planning/*/DVA/*") || appMatch("Planning/*/FLD/*") || appMatch("Planning/*/FLS/*") ||appMatch("Planning/*/PLT/*") || appMatch("Planning/*/TDR/*") || appMatch("Planning/*/REZ/*")||appMatch("Planning/*/LUP/*") || appMatch("Planning/*/ANX/*") || appMatch("Planning/*/HDA/*"))  && wfTask == "Determination of Completeness") {
		//branch("ES_CW_PLN_CALENDAR_NEXTMEETINGDATES")
	
		completedMonth = wfDateMMDDYYYY.substring(0,2);
		comment("the current month is" + completedMonth);
		if (wfStatus == "Incomplete") {
			resubDate=lookup("PLN_Incomplete_Resubmittal_Date",completedMonth);
			comment("Incom Date: " + resubDate);
			editAppSpecific("Incomplete",resubDate);
		}

		if (wfStatus =="Complete") {
			editAppSpecific("Completion Letter", wfDateMMDDYYYY);
		}

		if (wfStatus == "Complete") {
			DRCDate = lookup("PLN_DATES",completedMonth).substring(0,10);
			comment("the DRC Date will be: " + DRCDate);
			editAppSpecific("DRC",DRCDate);
			CDBDate = lookup("PLN_DATES",completedMonth).substring(11,21);
			comment("the CDB Date will be: " + CDBDate);
			editAppSpecific("CDB",CDBDate);
		}
	}

}catch(err){
	logDebug("An error occurred in WTUA:Planning/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170724 conversion end
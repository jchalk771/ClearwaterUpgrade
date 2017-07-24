//custom function
//jec 170724 conversion begin
function checkInspectionResult(insp2Check, insp2Result){
	try{

		var inspResultObj = aa.inspection.getInspections(capId);
	    if (inspResultObj.getSuccess()) {
	        var inspList = inspResultObj.getOutput();
	        for (xx in inspList)
	            if (String(insp2Check).equals(inspList[xx].getInspectionType()) && String(insp2Result).equals(inspList[xx].getInspectionStatus()))
	                return true;
	    }
	    return false;

	}catch(err){
		logDebug("An error occurred in custom function checkInspectionResult Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170724 conversion end
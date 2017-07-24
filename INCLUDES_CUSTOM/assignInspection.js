//custom function
//jec 170724 conversion begin
// updates the inspection and assigns to a new user
// requires the inspection id and the user name
function assignInspection(iNumber, iName){
	try{

		iObjResult = aa.inspection.getInspection(capId, iNumber);
		if (!iObjResult.getSuccess()) {
			logDebug("**ERROR retrieving inspection " + iNumber + " : " + iObjResult.getErrorMessage());
			return false;
		}

		iObj = iObjResult.getOutput();
		iNameResult = aa.person.getUser(iName);

		if (!iNameResult.getSuccess()) {
			logDebug("**ERROR retrieving inspector user model " + iName + " : " + iNameResult.getErrorMessage());
			return false;
		}

		iInspector = iNameResult.getOutput();
		iObj.setInspector(iInspector);
		aa.inspection.editInspection(iObj);
		
	}catch(err){
		logDebug("An error occurred in custom function assignInspection Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170724 conversion end
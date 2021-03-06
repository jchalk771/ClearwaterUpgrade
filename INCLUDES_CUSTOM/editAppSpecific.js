//custom function
//jec 170714 conversion begin
function editAppSpecific(itemName,itemValue)  // optional: itemCap
{
	try{
		var updated = false;
		var i=0;
		itemCap = capId;
		
		if (arguments.length == 3) 
			itemCap = arguments[2]; // use cap ID specified in args
	   	
	  	if (useAppSpecificGroupName) {
			if (itemName.indexOf(".") < 0) { 
				logDebug("**WARNING: editAppSpecific requires group name prefix when useAppSpecificGroupName is true");
				return false 
			}

			var itemGroup = itemName.substr(0,itemName.indexOf("."));
			var itemName = itemName.substr(itemName.indexOf(".")+1);
		}
	   	
	    var appSpecInfoResult = aa.appSpecificInfo.getByCapID(itemCap);
		if (appSpecInfoResult.getSuccess())	{
			var appspecObj = appSpecInfoResult.getOutput();
			if (itemName != "") {
				while (i < appspecObj.length && !updated) {
					if (appspecObj[i].getCheckboxDesc() == itemName && (!useAppSpecificGroupName || appspecObj[i].getCheckboxType() == itemGroup)) {
						appspecObj[i].setChecklistComment(itemValue);
						var actionResult = aa.appSpecificInfo.editAppSpecInfos(appspecObj);
						if (actionResult.getSuccess()) {
							logMessage("app spec info item " + itemName + " has been given a value of " + itemValue);
							logDebug("app spec info item " + itemName + " has been given a value of " + itemValue);
						} else {
							logDebug("**ERROR: Setting the app spec info item " + itemName + " to " + itemValue + " .\nReason is: " +   actionResult.getErrorType() + ":" + actionResult.getErrorMessage());
						}
						updated = true;
						AInfo[itemName] = itemValue;  // Update array used by this script
					}
					i++;
				} // while loop
			} // item name blank
		} // got app specific object	
		else { 
			logDebug( "**ERROR: getting app specific info for Cap : " + appSpecInfoResult.getErrorMessage()) 
		}

	}catch(err){
		logDebug("An error occurred in custom function editAppSpecific Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170714 conversion end





	
	
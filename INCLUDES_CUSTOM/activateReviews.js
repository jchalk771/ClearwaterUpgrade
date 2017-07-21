//custom function
//jec 170721 conversion begin
function activateReviews(){
	try{

		var revStartDate = new Date();
		comment("Review Start Date is " + revStartDate);
		var vStartTime = formatDateTime(revStartDate);
		comment("Hello, the start time is " + vStartTime);
		aa.debug("***********Debug ","RevStartDate is " + vStartTime);
		if (isTaskActive("Application Submittal")&& wfStatus =="Walk Through Review") {
			closeTask("Application Submittal","Online Submittal Processed", "Place review in Online Reviews task list");
			editAppSpecific("Bin Number","ACA");
		}

		if (isTaskActive("Application Submittal")&& wfStatus =="Log - Begin Reviews") {
			closeTask("Application Submittal","Route to Review", "Updated by WFAdhocTUA, line 4");
		}

		updateAppStatus("In Review","status set by WFAdhocUA scipt");
		deactivateTask("Plumbing Review");
		deactivateTask("Mechanical Review");
		deactivateTask("Engineering Review");
		deactivateTask("Environmental Review");
		deactivateTask("Land Resources Review");
		deactivateTask("Gas Review");
		deactivateTask("Electrical Review");
		deactivateTask("Planning Review");
		deactivateTask("Fire Review");
		deactivateTask("Traffic Engineering Review");
		deactivateTask("Stormwater Review");
		deactivateTask("Parks and Recreation Review");
		deactivateTask("Art Review");
		deactivateTask("Utility Review");
		deactivateTask("Building Review");
		
		//@TODO, somewhat repetitive, perhaps another custom function with task name param?
		if (AInfo['Building'] =="Yes"  || AInfo['Roofing'] =="Yes") {
			activateTask("Building Review");
			editTaskComment("Building Review", vStartTime );
			updateTaskAssignedDate("Building Review", revStartDate);
			clearTaskStatus("Building Review");
		}

		if (AInfo['Plumbing'] =="Yes") {
			activateTask("Plumbing Review");
			editTaskComment("Plumbing Review", vStartTime );
			updateTaskAssignedDate("Plumbing Review", revStartDate);
			clearTaskStatus("Plumbing Review");
		}

		if (AInfo['Electric'] =="Yes") {
			activateTask("Electrical Review");
			editTaskComment("Electrical Review", vStartTime );
			updateTaskAssignedDate("Electrical Review", revStartDate);
			clearTaskStatus("Electrical Review");
		}

		if (AInfo['Mechanical'] =="Yes") {
			activateTask("Mechanical Review");
			editTaskComment("Mechanical Review", vStartTime );
			updateTaskAssignedDate("Mechanical Review", revStartDate);
			clearTaskStatus("Mechanical Review");
		}

		if (AInfo['Gas Use'] =="Yes") {
			activateTask("Gas Review");
			editTaskComment("Gas Review", vStartTime );
			updateTaskAssignedDate("Gas Review", revStartDate);
			clearTaskStatus("Gas Review");
		}

		if (AInfo['Landscaping'] =="Yes" ||AInfo['Land Resources'] =="Yes") {
			activateTask("Land Resources Review");
			editTaskComment("Land Resources Review", vStartTime );
			updateTaskAssignedDate("Land Resources Review", revStartDate);
			clearTaskStatus("Land Resources Review");
		}

		if (AInfo['Planning/Zoning'] =="Yes") {
			activateTask("Planning Review");
			editTaskComment("Planning Review", vStartTime );
			updateTaskAssignedDate("Planning Review", revStartDate);
			clearTaskStatus("Planning Review");
		}

		if (AInfo['Engineering'] =="Yes") {
			activateTask("Engineering Review");
			editTaskComment("Engineering Review", vStartTime );
			updateTaskAssignedDate("Engineering Review", revStartDate);
			clearTaskStatus("Engineering Review");
		}

		if (AInfo['FIR'] =="Yes") {
			activateTask("Fire Review");
			editTaskComment("Fire Review", vStartTime );
			updateTaskAssignedDate("Fire Review", revStartDate);
			clearTaskStatus("Fire Review");
		}

		if (AInfo['Environmental'] =="Yes") {
			activateTask("Environmental Review");
			editTaskComment("Environmental Review", vStartTime );
			updateTaskAssignedDate("Environmental Review", revStartDate);
			clearTaskStatus("Environmental Review");
		}

		if (AInfo['Utilities'] =="Yes") {
			activateTask("Utility Review");
			editTaskComment("Utility Review", vStartTime );
			updateTaskAssignedDate("Utility Review", revStartDate);
			clearTaskStatus("Utility Review");
		}

		if (AInfo['Parks and Rec'] =="Yes") {
			activateTask("Parks and Recreation Review");
			editTaskComment("Parks and Recreation Review", vStartTime );
			updateTaskAssignedDate("Parks and Recreation Review", revStartDate);
			clearTaskStatus("Parks and Recreation Review");
		}

		if (AInfo['Traffic Operations'] =="Yes") {
			activateTask("Traffic Engineering Review");
			editTaskComment("Traffic Engineering Review", vStartTime );
			updateTaskAssignedDate("Traffic Engineering Review", revStartDate);
			clearTaskStatus("Traffic Engineering Review");
		}

		if (AInfo['Stormwater'] =="Yes") {
			activateTask("Stormwater Review");
			editTaskComment("Stormwater Review", vStartTime );
			updateTaskAssignedDate("Stormwater Review", revStartDate);
			clearTaskStatus("Stormwater Review");
		}

		if (isTaskActive("Permit Verification")) {
			deactivateTask("Permit Verification");
		}

		//@TODO - Lookup function, split and loop here?  noReply global?
		if (AInfo['Online Permit Type'] == "Fence") {
			var permitNbr = capId.getCustomID();
			email("ivan.dimitrov@myClearwater.com","noReply@myclearwater.com", "New Online Fence Permit - "+ permitNbr, "Please check your task list.");
			email("Luke.Moody@myClearwater.com","noReply@myclearwater.com", "New Online Fence Permit - "+ permitNbr, "Please check your task list.");
			email("Jeremy.Shaw@myClearwater.com","noReply@myclearwater.com", "New Online Fence Permit - "+ permitNbr, "Please check your task list.");
		}

		if (AInfo['Online Permit Type'] == "Fence") {
			var permitNbr = capId.getCustomID();
			email("Jason.Alber@myClearwater.com","noReply@myclearwater.com", "New Online Fence Permit - "+ permitNbr, "Please check your task list.");
			email("Christopher.Melone@myClearwater.com","noReply@myclearwater.com", "New Online Fence Permit - "+ permitNbr, "Please check your task list.");
			email("Michael.Kirn@myClearwater.com","noReply@myclearwater.com", "New Online Fence Permit - "+ permitNbr, "Please check your task list.");
		}

		if (AInfo['Online Permit Type'] == "Fence") {
			var permitNbr = capId.getCustomID();
			email("Bradford.Cheek@myClearwater.com","noReply@myclearwater.com", "New Online Fence Permit - "+ permitNbr, "Please check your task list.");
			email("lydia.moreda@myClearwater.com","noReply@myclearwater.com", "New Online Fence Permit - "+ permitNbr, "Please check your task list.");
			aa.debug("***********Debug ","Emails to ENG were sent.");
		}
		
	}catch(err){
		logDebug("An error occurred in custom function activateReviews Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170721 conversion end

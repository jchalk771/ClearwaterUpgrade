//custom function
//jec 170706 conversion begin
//version from WATUB @TODO - Consider consolidating with isActiveAdhocTasks and updating calls
//@TODO - notes from WTUB
//isTaskActive does not work when there are multiple completed tasks in wf history
//the adhoc task can be added multiple times
//isTaskActive returns the last value found
//need it to tell me if any adhoc task is active
function isAdhocTaskActive(wfstr){
	try{
		var useProcess = false;
		var processName = "";
		var adhocActiveFlag = false;
		if (arguments.length == 2) {
			processName = arguments[1]; // subprocess
			useProcess = true;
		}

		var workflowResult = aa.workflow.getTasks(capId);
		if (workflowResult.getSuccess())
			wfObj = workflowResult.getOutput();
		else {
			logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
			return false;
		}

		for (i in wfObj) {
			fTask = wfObj[i];
			comment("Task Desc is " + fTask.getTaskDescription());
			comment("Active Flag is " + fTask.getActiveFlag());
			if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && (!useProcess || fTask.getProcessCode().equals(processName)))
				if (fTask.getActiveFlag().equals("Y"))
					adhocActiveFlag = true;
			comment("AdhocActiveFlag is " + adhocActiveFlag);

		}
		return adhocActiveFlag;
		
	}catch(err){
		logDebug("An error occurred in custom function isAdhocTaskActive Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end
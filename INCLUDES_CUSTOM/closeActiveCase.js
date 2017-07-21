//custom function
//jec 170721 conversion begin
//optional process name
function closeActiveTask(wfstr, wfstat, wfcomment, wfnote){
	try{

		var useProcess = false;
		var processName = "";
		if (arguments.length == 5) {
			processName = arguments[4]; // subprocess
			useProcess = true;
		}

		var workflowResult = aa.workflow.getTasks(capId);
		if (workflowResult.getSuccess())
			var wfObj = workflowResult.getOutput();
		else {
			logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
			return false;
		}

		if (!wfstat)
			wfstat = "NA";

		for (i in wfObj) {
			var fTask = wfObj[i];
			comment("Task Desc is " + fTask.getTaskDescription());
			comment("Active Flag is " + fTask.getActiveFlag());
			if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && fTask.getActiveFlag().equals("Y") && (!useProcess || fTask.getProcessCode().equals(processName))) {
				comment("In the update part of the function!!!!");
				var dispositionDate = aa.date.getCurrentDate();
				var stepnumber = fTask.getStepNumber();
				var processID = fTask.getProcessID();

				if (useProcess)
					aa.workflow.handleDisposition(capId, stepnumber, processID, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "Y");
				else
					aa.workflow.handleDisposition(capId, stepnumber, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "Y");

				logMessage("Closing Workflow Task: " + wfstr + " with status " + wfstat);
				logDebug("Closing Workflow Task: " + wfstr + " with status " + wfstat);
			}
		}

	}catch(err){
		logDebug("An error occurred in custom function closeActiveTask Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170721 conversion end

//custom function
//jec 170724 conversion begin
// optional process name
function loopTask(wfstr,wfstat,wfcomment,wfnote){
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
			if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && (!useProcess || fTask.getProcessCode().equals(processName))) {
				var dispositionDate = aa.date.getCurrentDate();
				var stepnumber = fTask.getStepNumber();
				var processID = fTask.getProcessID();

				if (useProcess)
					aa.workflow.handleDisposition(capId, stepnumber, processID, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "L");
				else
					aa.workflow.handleDisposition(capId, stepnumber, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "L");

				logMessage("Closing Workflow Task: " + wfstr + " with status " + wfstat + ", Looping...");
				logDebug("Closing Workflow Task: " + wfstr + " with status " + wfstat + ", Looping...");
			}
		}

	}catch(err){
		logDebug("An error occurred in custom function loopTask Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170724 conversion end
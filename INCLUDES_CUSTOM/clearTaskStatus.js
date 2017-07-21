//custom function
//jec 170721 conversion begin
//created 5/3/2017
//Needed to clear disposition of wftask when it is activated by script and
//there was a previous disposition - See ticket 8360
function clearTaskStatus(wfstr){
	try{

		// Clear task status after activating the task
		var useProcess = false;
		var processName = "";
		if (arguments.length == 3) {
			processName = arguments[2]; // subprocess
			useProcess = true;
		}

		var workflowResult = aa.workflow.getTaskItems(capId, wfstr, processName, null, null, null);
		if (workflowResult.getSuccess())
			var wfObj = workflowResult.getOutput();
		else {
			logDebug("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
			return false;
		}

		for (i in wfObj) {
			var fTask = wfObj[i];
			if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase())) {
				comment("***************** Task is " + fTask.getTaskDescription());
				comment("Task Disposition is " + fTask.getDisposition())
				fTask.setDisposition(null);

				var fTaskModel = fTask.getTaskItem();
				//debugObject(fTask.getTaskItem());
				var tResult = aa.workflow.adjustTaskWithNoAudit(fTaskModel);

				comment("Task Disposition after update is " + fTask.getDisposition())

				if (tResult.getSuccess())
					logMessage("Success");
				else {
					logMessage("**ERROR: Failed to update comment on workflow task: " + tResult.getErrorMessage());
					return false;
				}
			}
		}

	}catch(err){
		logDebug("An error occurred in custom function clearTaskStatus Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170721 conversion end

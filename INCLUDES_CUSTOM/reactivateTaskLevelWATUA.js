//custom function
//jec 170720 conversion begin
//distinct from other event
function reactivateTaskLevelWATUA(tasklevel){
	try{

		var workflowResult = aa.workflow.getTasks(capId);

		if (workflowResult.getSuccess())
			var wfObj = workflowResult.getOutput();
		else {
			logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
			return false;
		}

		for (i in wfObj) {
			var fTask = wfObj[i];
			comment("Workflow Tasks is " + fTask.getTaskDescription());
			comment("Task ID is " + fTask.getCurrentTaskID());

			logMessage("Looking at a task " + fTask.getCurrentTaskID());
			var scriptDueDate = aa.date.parseDate(dateAdd(startDate, 3, true));
			comment("Due date is " + scriptDueDate);
			comment("Active Flag is " + fTask.getActiveFlag());
			// Found the task level we are looking for.  Reactivate the task and add 7 days to the due date
			if (fTask.getCurrentTaskID().equals(tasklevel) && fTask.getActiveFlag().equals("Y")) {
				comment("In the assignment loop.");
				wfObj[i].setDueDate(scriptDueDate);
				wfObj[i].setActiveFlag("Y");
				wfObj[i].setCompleteFlag("N");
				wfObj[i].setDisposition(null);
				wfObj[i].setDispositionComment("Review");
				var fTaskModel = wfObj[i].getTaskItem();
				var tResult = aa.workflow.adjustTask(fTaskModel);

				if (tResult.getSuccess())
					logMessage("Success");
				else {
					logMessage("**ERROR: Failed to update comment on workflow task: " + tResult.getErrorMessage());
					return false;
				}
			}
		}

	}catch(err){
		logDebug("An error occurred in custom function reactivateTaskLevelWATUA Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170720 conversion end
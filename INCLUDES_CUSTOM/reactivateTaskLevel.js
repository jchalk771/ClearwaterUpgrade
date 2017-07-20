//custom function
//jec 170720 conversion begin
function reactivateTaskLevel(tasklevel){
	try{

		var workflowResult = aa.workflow.getTasks(capId);
		var taskLevelStep = tasklevel.substring(0, 2);

		if (workflowResult.getSuccess())
			var wfObj = workflowResult.getOutput();
		else {
			logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
			return false;
		}

		for (i in wfObj) {
			var fTask = wfObj[i];
			var fTaskDesc = fTask.getTaskDescription();

			logMessage("Looking at a task " + fTask.getCurrentTaskID());
			var scriptDueDate = aa.date.parseDate(dateAdd(startDate, 3, true));
			var targetDueDate = aa.date.parseDate(AInfo["Target"]);

			var currentTaskStep = fTask.getCurrentTaskID().substring(0, 2);

			//set due date on adhoc task

			if (fTaskDesc.equals("Response to Comments")) {
				comment("**************Response to Comments");
				if (fTask.getActiveFlag().equals("Y") && fTask.getCompleteFlag().equals("N")) {
					comment("ActiveFlag: " + fTask.getActiveFlag());
					comment("Completed Flag: " + fTask.getCompleteFlag());
					fTask.setDueDate(scriptDueDate);
					var fTaskModel = fTask.getTaskItem();
					//debugObject(fTask.getTaskItem());
					var tResult = aa.workflow.adjustTaskWithNoAudit(fTaskModel);
				}
			}

			//set due date on all active tasks
			if (currentTaskStep.equals(taskLevelStep)) {
				if (countHistoryItemsForTask(fTask.getTaskDescription()) > 0) {
					fTask.setDueDate(scriptDueDate);
					fTask.setActiveFlag("Y");
					fTask.setCompleteFlag("N");
					fTask.setDisposition(null);
					fTask.setDispositionComment("Review");
					var fTaskModel = fTask.getTaskItem();
					//debugObject(fTask.getTaskItem());
					var tResult = aa.workflow.adjustTaskWithNoAudit(fTaskModel);
				} else {
					fTask.setDueDate(targetDueDate);
					var tResult = aa.workflow.adjustTaskWithNoAudit(fTaskModel);
				}
			}
		}

	}catch(err){
		logDebug("An error occurred in custom function reactivateTaskLevel Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170720 conversion end
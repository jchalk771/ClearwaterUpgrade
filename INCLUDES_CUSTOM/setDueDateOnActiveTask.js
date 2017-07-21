//custom function
//jec 170721 conversion begin
function setDueDateOnActiveTask(wfstr, wfRevDays){
	try{

		var workflowResult = aa.workflow.getTasks(capId);
		//var taskLevelStep = tasklevel.substring(0, 2);
		//comment("In NEW FUNCTION!!!!!!!!!tasklevelSTep = " + taskLevelStep);

		if (workflowResult.getSuccess())
			var wfObj = workflowResult.getOutput();
		else {
			logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
			return false;
		}

		for (i in wfObj) {
			var fTask = wfObj[i];
			var fTaskDesc = fTask.getTaskDescription();
			comment("In the for loop, wf task = " + fTaskDesc);
			logMessage("Looking at a task " + fTask.getCurrentTaskID());
			//var scriptDueDate = wfDueDate;
			var scriptDueDate = aa.date.parseDate(dateAdd(startDate, wfRevDays, true));
			comment("Script DUe DAte = " + scriptDueDate);

			var currentTaskStep = fTask.getCurrentTaskID().substring(0, 2);
			comment("currentTaskStep = " + currentTaskStep);
			comment("Active Flag = " + fTask.getActiveFlag());
			comment("Completed Flag = " + fTask.getCompleteFlag());

			//set due date on active Begin Reviews task

			if (fTaskDesc.equals(wfstr)) {
				comment("******************Inside First if stmt");
				if (fTask.getActiveFlag().equals("Y") && fTask.getCompleteFlag().equals("N")) {
					comment("!!!!!!!!!!!!!!Inside Second if stmt");
					comment("WF Task = " + fTask.getTaskDescription());
					comment("WF Status = " + fTask.getDisposition());
					comment("Due Date = " + scriptDueDate);

					fTask.setDueDate(scriptDueDate);
					//fTask.setDisposition(null);
					//fTask.setDispositionComment("Review");
					var fTaskModel = fTask.getTaskItem();
					//debugObject(fTask.getTaskItem());
					var tResult = aa.workflow.adjustTaskWithNoAudit(fTaskModel);
					comment("fTaskModel is " + fTaskModel);
					comment("tResult is " + tResult);
					comment("due date set on the task is: " + fTask.getDueDate());
					if (tResult.getSuccess())
						logMessage("Success");
					else {
						logMessage("**ERROR: Failed to update comment on workflow task: " + tResult.getErrorMessage());
						return false;
					}
				}
			}
		}
	}catch(err){
		logDebug("An error occurred in custom function setDueDateOnActiveTask Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170721 conversion end

//Reactivate the current task step, all tasks that were active
//noted in ACUB

function assignDueDateToTaskLevel(tasklevel, duedate) {
	var workflowResult = aa.workflow.getTasks(capID);
	if (workflowResult.getSuccess())

		var wfObj = workflowResult.getOutput();
	else {
		logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
		return false;
	}

	for (i in wfObj) {
		var fTask = wfObj[i];
		logMessage("Looking at a task " + fTask.getCurrentTaskID());
		var scriptDueDate = aa.date.parseDate(duedate);

		// Found the task level we are looking for.  Reactivate the task and add 7 days to the due date
		if (fTask.getCurrentTaskID().equals(tasklevel)) {
			wfObj[i].setDueDate(scriptDueDate);
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
}

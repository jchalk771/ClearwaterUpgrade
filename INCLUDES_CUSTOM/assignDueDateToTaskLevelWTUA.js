//custom function
//jec 170706 conversion begin
//Different from WATUA and WATAA, renaming
//@TODO - Examine differences and consider coming up with one universal version and replace all calls
/////////////////////////////////////////////////////////////////////
//Assign a due date to the task level supplied
//Added 04-25-2010
//Nicholas Dorrough - City of Clearwater
//Modified 5/3/2017 - added line wfObj[i].setDisposition(null);
//Discovered Activate task function did not clear the disposition
//from the task if it had been done before.
/////////////////////////////////////////////////////////////////////
function assignDueDateToTaskLevelWTUA(tasklevel, duedate) {
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
			logMessage("Looking at a task " + fTask.getCurrentTaskID());
			var scriptDueDate = aa.date.parseDate(duedate);

			// Found the task level we are looking for.  Reactivate the task and add 7 days to the due date
			if (fTask.getCurrentTaskID().equals(tasklevel)) {
				wfObj[i].setDueDate(scriptDueDate);
				wfObj[i].setDisposition(null);
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
		logDebug("An error occurred in custom function assignDueDateToTaskLevelWATAA Conversion: " + err. message);
		logDebug(err.stack);
	}
	
}
//jec 170706 conversion end

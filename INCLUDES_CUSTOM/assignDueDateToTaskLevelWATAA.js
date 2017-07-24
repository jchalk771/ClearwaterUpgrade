//custom function
//jec 170706 conversion begin
//Different from WATUA, renaming
// ///////////////////////////////////////////////////////////////////
// Assign a due date to the task level supplied
// Added 04-25-2010
// Nicholas Dorrough - City of Clearwater
// Updated 9/17/2013 by Lydia to include tasks missed in original activation
// and then added
// ///////////////////////////////////////////////////////////////////
function assignDueDateToTaskLevelWATAA(tasklevel, duedate) {
	try{
		var workflowResult = aa.workflow.getTasks(capId);
	    var taskLevelStep = tasklevel.substring(0, 2);

	    if (workflowResult.getSuccess())
	    	var wfObj = workflowResult.getOutput();
	    else {
	    	logMessage("**ERROR: Failed to get workflow object: " +	s_capResult.getErrorMessage());
	    	return false;
	    }

	    for (i in wfObj) {
	    	var fTask = wfObj[i];
	    	logMessage("Looking at a task " + fTask.getCurrentTaskID());

	    	//var scriptDueDate = aa.date.parseDate(duedate);
	    	//modified 9/17/2013 to correct tasks activated after initial reviews activated

	    	var scriptDueDate = aa.date.parseDate(dateAdd(startDate, 3, true));
	    	var targetDueDate = aa.date.parseDate(AInfo["Target"]);

	    	//OLD///////////////////////////////////////////////////////////
	    	// Found the task level we are looking for. Reactivate the task and add
	    	// 7 days to the due date
	    	//if (fTask.getCurrentTaskID().equals(tasklevel)) {
	    	//    wfObj[i].setDueDate(scriptDueDate);
	    	//    var fTaskModel = wfObj[i].getTaskItem();
	    	//    var tResult = aa.workflow.adjustTaskWithNoAudit(fTaskModel);

	    	//   if (tResult.getSuccess())
	    	//       logMessage("Success");
	    	//   else
	    	//   { logMessage("**ERROR: Failed to update comment on workflow task: " + tResult.getErrorMessage()); return false; }
	    	// }
	    	////////////////////////////////////////////////////////////////////////////////////////
	    	var currentTaskStep = fTask.getCurrentTaskID().substring(0, 2);
	    	if (currentTaskStep.equals(taskLevelStep)) {
	    		if (fTask.getActiveFlag().equals("Y") || fTask.getCompleteFlag().equals("Y")) {
	    			fTask.setDueDate(targetDueDate);
	    			var fTaskModel = fTask.getTaskItem();
	    			
	    			//debugObject(fTask.getTaskItem());
	    			
	    			var tResult = aa.workflow.adjustTaskWithNoAudit(fTaskModel);
	    			if (tResult.getSuccess())
	    				logMessage("Success");
	    			else {
	    				logMessage("**ERROR: Failed to update comment on workflow task: " +	tResult.getErrorMessage());
	    				return false;
	    			}
	    		}
	    	}
	    }

	}catch(err){
		logDebug("An error occurred in custom function assignDueDateToTaskLevelWATAA Conversion: " + err. message);
		logDebug(err.stack);
	}
	
}
//jec 170706 conversion end

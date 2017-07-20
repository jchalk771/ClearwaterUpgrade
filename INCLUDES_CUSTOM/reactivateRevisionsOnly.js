//custom function
//jec 170720 conversion begin
function reactivateRevisionsOnly(tasklevel, nbrDays){
	try{

		var workflowResult = aa.workflow.getTasks(capId);
		var taskLevelStep = tasklevel.substring(0, 2);
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
			var scriptDueDate = aa.date.parseDate(dateAdd(startDate, nbrDays, true));
			//comment("Script DUe DAte = " + scriptDueDate);
			var currentTaskStep = fTask.getCurrentTaskID().substring(0, 2);
			//comment("currentTaskStep = " + currentTaskStep);
			//comment("Active Flag = " + fTask.getActiveFlag());
			//comment("Completed Flag = " + fTask.getCompleteFlag());
			
			//set due date on adhoc task
			if (fTaskDesc.equals("Courtesy Review")) {
				comment("**************Courtesy Review");
				if (fTask.getActiveFlag().equals("Y") && fTask.getCompleteFlag().equals("N")) {
					comment("ActiveFlag: " + fTask.getActiveFlag());
					comment("Completed Flag: " + fTask.getCompleteFlag());
					fTask.setDueDate(scriptDueDate);
					var fTaskModel = fTask.getTaskItem();
					//debugObject(fTask.getTaskItem());
					var tResult = aa.workflow.adjustTaskWithNoAudit(fTaskModel);
				}
			}

			//set due date on all tasks with "Revisions Needed"
			if (currentTaskStep.equals(taskLevelStep)) {
				comment("******************Inside First if stmt");
				if (fTask.getActiveFlag().equals("N") && fTask.getCompleteFlag().equals("Y")) {
					comment("!!!!!!!!!!!!!!Inside Second if stmt");
					comment("WF Task = " + fTask.getTaskDescription());
					//comment("WF Status = " + fTask.getDisposition());
					comment("Due Date = " + scriptDueDate);
					if (fTask.getDisposition() == "Revision Needed") {
						comment("Revision Needed if stmt");
						fTask.setActiveFlag("Y");
						fTask.setCompleteFlag("N");
						fTask.setDueDate(scriptDueDate);
						fTask.setDisposition(null);
						fTask.setDispositionComment("Review");
						var fTaskModel = fTask.getTaskItem();
						//debugObject(fTask.getTaskItem());
						var tResult = aa.workflow.adjustTaskWithNoAudit(fTaskModel);

						if (tResult.getSuccess())
							logMessage("Success");
						else {
							logMessage("**ERROR: Failed to update comment on workflow task: " + tResult.getErrorMessage());
							return false;
						}
					}
				}
			}
		}
		
	}catch(err){
		logDebug("An error occurred in custom function reactivateRevisionsOnly Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170720 conversion end
//custom function
//jec 170823 conversion begin
//Assign doc to adhoc task or Review Task
//works
function assignDoc2AdhocTask(eligibleDocList) {
	try{
		var workflowResult = aa.workflow.getTasks(capId);
		if (workflowResult.getSuccess())
			var wfObj = workflowResult.getOutput();
		else {
			logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
			comment("No docs found.");
			return false;
		}

		for (i in wfObj) {
			var fTask = wfObj[i];
			var fTaskDesc = fTask.getTaskDescription();
			var vLength = fTaskDesc.length
				//var vStart = vLength - 6;
				//comment("Length is " + vLength);
				//Breaks here with NaN error
				//var fTaskLastLetters = fTaskDesc.substring(vStart, vLength);
				var fTaskLastLetters = fTaskDesc.substr(fTaskDesc.length - 5);
			comment("Last Letters of the task are " + fTaskLastLetters);

			comment("In the for loop, wf task = " + fTaskDesc);
			logMessage("Looking at a task " + fTask.getCurrentTaskID());
			var currentTaskStep = fTask.getCurrentTaskID().substring(0, 2);
			var fTaskModel = fTask.getTaskItem();
			comment("fTaskModel is " + fTaskModel);
			comment("currentTaskStep = " + currentTaskStep);
			comment("Active Flag = " + fTask.getActiveFlag());
			comment("Completed Flag = " + fTask.getCompleteFlag());
			comment("Task Model = " + fTaskModel);
			//find active adhoc task
			//finds the adhoc task, but not attaching to Review tasks ????
			// is not loopint through workflow
			if (fTaskDesc.equals("Online Customer Request"))
				//||fTaskLastLetters.equals("Review"))
			{
				comment("**************Task Found - " + fTaskDesc);
				if (fTask.getActiveFlag().equals("Y") && fTask.getCompleteFlag().equals("N")) {
					comment("This adhoc task is active and needs the document!!!!!");
					comment("fTAskModel for adhoc task is " + fTaskModel);
					var tResult = aa.workflow.adjustTaskWithNoAudit(fTaskModel);
					comment("tResult = " + tResult);
					//associateDoc2Task(eligibleDocList, fTaskModel);
					var result = aa.document.associateDoc2Task(eligibleDocList, fTaskModel);
					if (result.getSuccess()) {
						var count = result.getOutput();
						logDebug("Assign tasks to documents successfully!");
						comment("Document was attached.")
						return count;
					} else {
						logDebug("ERROR: Failed to create document and task associations: " + result.getErrorMessage());
						comment("Document did not attach.")
						return null;
					}
				}
			}
		}
	}catch(err){
		logDebug("An error occurred in custom function assignDoc2AdhocTask Conversion: " + err. message);
		logDebug(err.stack);
	}
	
}
//jec 170823 conversion end

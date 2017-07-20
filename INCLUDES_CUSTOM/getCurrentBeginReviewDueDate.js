//custom function
//jec 170720 conversion begin
//Get due date from current Begin Reviews, used for Plan Review
// optional process name.
function getCurrentBeginReviewDueDate(wfstr){
	try{

		comment("In the function. wfstr = "+ wfstr);
		var useProcess = false;
		var processName = "";
		   
	    if (arguments.length == 2) {
	    	processName = arguments[1]; // subprocess
		    useProcess = true;
		}
		
	    comment("Process Section: " + useProcess);
		var workflowResult = aa.workflow.getTasks(capId);
		if (workflowResult.getSuccess()) {
			wfObj = workflowResult.getOutput();
		    comment("wfObj: " + wfObj);
		}
		else {
		    logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage()); return false;
		}
		comment("Before Loop.");
		
		for (i in wfObj) {
			var fTask = wfObj[i];
		    comment("In the for loop, wf task = " + fTask.getTaskDescription());
		    comment("WF Status = " + fTask.getDisposition());
		    comment("Active Flag = " + fTask.getActiveFlag());
		    //comment("Process Code = " + fTask.getProcessCode());
		    //comment("Step NBR = " + fTask.getStepNumber());
		    var dueDate = wfObj[i].getDueDate();
		        
		    if ((fTask.getTaskDescription() == wfstr) && fTask.getActiveFlag()=="Y" && ((fTask.getDisposition() != "Not Applicable") || (fTask.getDisposition() != "Not Applicable"))) {
		    	comment("*************Begin Reviews and N/A");
		        comment("i = " + i);
		        var currentDueDate = new Date(dueDate.getMonth() + "/" + dueDate.getDayOfMonth() + "/" + dueDate.getYear());
		        comment("Current Begin Reviews Due Date: " + currentDueDate);
		    }
		}
		comment("Current due Date: " + currentDueDate);
		return currentDueDate;
		
	}catch(err){
		logDebug("An error occurred in custom function getCurrentBeginReviewDueDate Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170720 conversion end
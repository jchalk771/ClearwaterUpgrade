//custom function
//jec 170706 conversion begin
//tries to determine if adhoc task Online Customer Request is active
//noted in DUA
function isActiveAdhocTask(vAdhocTask){
	try{
		var vActive = false;
		var workflowResult = aa.workflow.getTasks(capId);
	 	if (workflowResult.getSuccess())
	  	 	wfObj = workflowResult.getOutput();
	  	else { 
	  		logMessage("**ERROR: Failed to get workflow object: "); 
	  		return false; 
	  	}
		
		for (i in wfObj) {
	   		fTask = wfObj[i];
			//comment("In the for loop, wf task = " + fTask.getTaskDescription());
	        //comment("WF Status = " + fTask.getDisposition());
	        //comment("Active Flag = " + fTask.getActiveFlag());
	       	//comment("Process Code = " + fTask.getProcessCode());
	        //comment("DispComment = " + fTask.getDispositionComment());
	        //comment("Disp Note = " + fTask.getDispositionNote());
	        //comment("Process ID = " + fTask.getProcessID());
	        //comment("Res Disp Comment = " + fTask.getResDispositionComment());
	        //comment("Res Task Desc = " + fTask.getResTaskDescription());
	        //comment("Asgn Staff = " + fTask.getAssignedStaff());
	        //comment("Asgn Date = " + fTask.getAssignmentDate());
	        //comment("Task ID: " + fTask.getCurrentTaskID());
	       	 //comment("Cmp Flag: " + fTask.getCompleteFlag());

			if (fTask.getTaskDescription().equals(vAdhocTask))
				if (fTask.getActiveFlag().equals("Y"))
					 vActive = true;
		}
		return vActive;
	}catch(err){
		logDebug("An error occurred in custom function isActiveAdhocTask Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end
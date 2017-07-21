//custom function
//jec 170721 conversion begin
//Get Review Status so I can verify all reviews satisfied and issue permit
//@ToDo - what is the second argument?
function getPlanReviewStatus(capId){
	try{

		var useProcess = false;
		var processName = "";
		//comment("ProcessName before if: " + processName);
		//comment("ArgLength: " + arguments.length);

		if (arguments.length == 3) {
			processName = arguments[2]; // subprocess
			//comment("processName is " + processName)
			useProcess = true;
		}

		//iniitialze variable
		var planRevFlag = "Approve";

		//comment("Initial PlanRevFlag = " + planRevFlag);

		var workflowResult = aa.workflow.getTasks(capId);
		if (workflowResult.getSuccess()) {
			var wfObj = workflowResult.getOutput();
			//comment("wf Success");
		} else {
			logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
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
			var wfTaskStatus = fTask.getDisposition();
			if (wfTaskStatus == "Revision Needed") {
				planRevFlag = "Revision Needed"
					//comment("*************"+fTask.getTaskDescription());
					//comment("i = " + i);
					//comment("WF Status Flag = " + planRevFlag);
			}
		}

		return planRevFlag;
		
	}catch(err){
		logDebug("An error occurred in custom function getPlanReviewStatus Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170721 conversion end
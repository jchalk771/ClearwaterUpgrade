//custom function
//jec 170720 conversion begin
//Get adhoc comment so I can put user name and date in front
//saves tech data entry time
function getWFComment(wfstr){
	try{

		//var useProcess = false;
		//var processName = "";
		//if (arguments.length == 3) {
		//	processName = arguments[2]; // subprocess
		//	useProcess = true;
		//}
		//iniitialze variable
		var adhocComment = 'Something';
		comment("adhocComment = " + adhocComment);
		comment("WF STR = " + wfstr);
		var workflowResult = aa.workflow.getTasks(capId);
		if (workflowResult.getSuccess()) {
			var wfObj = workflowResult.getOutput();
			comment("wf Success");
		} else {
			logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
			return false;
		}

		for (i in wfObj) {
			fTask = wfObj[i];
			comment("In the for loop, wf task = " + fTask.getTaskDescription());
			comment("WF Status = " + fTask.getDisposition());
			comment("Active Flag = " + fTask.getActiveFlag());
			//comment("Process Code = " + fTask.getProcessCode());
			//comment("DispComment = " + fTask.getDispositionComment());
			//comment("Disp Note = " + fTask.getDispositionNote());
			//comment("Process ID = " + fTask.getProcessID());
			//comment("Res Disp Comment = " + fTask.getResDispositionComment());
			//comment("Res Task Desc = " + fTask.getResTaskDescription());
			//comment("Asgn Staff = " + fTask.getAssignedStaff());
			//comment("Asgn Date = " + fTask.getAssignmentDate());

			if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && fTask.getActiveFlag().equals("Y")) {
				comment("*************" + wfstr);
				comment("i = " + i);
				comment("current User = " + currentUserID);
				adhocComment = (currentUserID + "-" + sysDateMMDDYYYY + "-" + fTask.getDispositionNote());
				comment("adhoc comment: " + adhocComment);
				comment("adhocComment = " + adhocComment);
				//fTask.setDispositionNote(adhocComment);
				//fTask.setDispositionComment(adhocComment);
				wfObj[i].setDispositionNote(adhocComment);
				//wfObj[i].setDispositionComment(adhocComment);
				comment("*******************************");
				var fTaskModel = wfObj[i].getTaskItem();
				var tResult = aa.workflow.adjustTaskWithNoAudit(fTaskModel);

				if (tResult.getSuccess())
					logMessage("Success");
				else {
					logMessage("**ERROR: Failed to update comment on workflow task: " + tResult.getErrorMessage());
					return false;
				}
			}
		}
		return adhocComment;

	}catch(err){
		logDebug("An error occurred in custom function getWFComment Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170720 conversion end
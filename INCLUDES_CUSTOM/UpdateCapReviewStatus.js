//custom function
//jec 170724 conversion begin
function UpdateCapReviewStatus(capId, taskLevel){
	try{

		var useProcess = false;
		var processName = "";
		//comment("ProcessName before if: " + processName);
		//comment("ArgLength: " + arguments.length);

		if (arguments.length == 3) {
			processName = arguments[2]; // subprocess
			comment("processName is " + processName)
			useProcess = true;
		}

		//iniitialze variable
		var planRevFlag = "In Review";
		var nbrRevs = 0;
		var nbrAppr = 0;
		var nbrReqd = 0;
		var nbrOutst = 0;

		comment("Initial PlanRevFlag = " + planRevFlag);

		var workflowResult = aa.workflow.getTasks(capId);
		if (workflowResult.getSuccess()) {
			var wfObj = workflowResult.getOutput();
			//comment("wf Success");
		} else {
			logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
			return false;
		}

		comment("Before Loop, Nbr Reqd = " + nbrReqd);
		comment("Loop starts now************************************************")
		for (i in wfObj) {

			fTask = wfObj[i];
			comment("In the for loop, wf task = " + fTask.getTaskDescription());
			comment("WF Status = " + fTask.getDisposition());
			comment("Active Flag = " + fTask.getActiveFlag());
			comment("Process Code = " + fTask.getProcessCode());
			comment("DispComment = " + fTask.getDispositionComment());
			//comment("Disp Note = " + fTask.getDispositionNote());
			comment("Process ID = " + fTask.getProcessID());
			//comment("Res Disp Comment = " + fTask.getResDispositionComment());
			//comment("Res Task Desc = " + fTask.getResTaskDescription());
			//comment("Asgn Staff = " + fTask.getAssignedStaff());
			//comment("Asgn Date = " + fTask.getAssignmentDate());
			//comment("Task ID: " + fTask.getCurrentTaskID());
			comment("Cmp Flag: " + fTask.getCompleteFlag());

			var wfTaskStatus = fTask.getDisposition();
			if (fTask.getCurrentTaskID().substring(0, 2).equals(taskLevel)) {
				if (fTask.getActiveFlag() == "Y" || fTask.getCompleteFlag() == "Y") {
					nbrReqd = nbrReqd + 1;
					comment("-----------Number Required after" + fTask.getTaskDescription() + " = " + nbrReqd);
					if (wfTaskStatus == "Revision Needed") {
						nbrRevs = nbrRevs + 1;
						comment("Task:" + fTask.getTaskDescription());
						comment("------------Revision Cnt = " + nbrRevs);
					}
					if ((wfTaskStatus == "Approve") || (wfTaskStatus == "Not Applicable")) {
						nbrAppr = nbrAppr + 1;
						comment("Task:" + fTask.getTaskDescription());
						comment("---------------Approve Cnt = " + nbrAppr);
						comment("WF Status Flag = " + planRevFlag);
					}
				} else //How many tasks activated incorrectly- Works, but not counting Rev and appr correctly
				{
					if (fTask.getActiveFlag() == "N" && fTask.getCompleteFlag() == "N") {
						if ((wfTaskStatus == "") || (wfTaskStatus == null) || (wfTaskStatus == "null")) {
							comment("-----------Ck Lvls = N and no value in status");
						} else {
							nbrReqd = nbrReqd + 1;
							if ((wfTaskStatus == "Approve") || (wfTaskStatus == "Not Applicable")) {
								nbrAppr = nbrAppr + 1;
							}
							if (wfTaskStatus == "Revision Needed") {
								nbrRevs = nbrRevs + 1;
							}
							comment("-----------Ck Lvls = N why a value in status? Number Reqd = " + nbrReqd);
							comment("---------------Approve Cnt = " + nbrAppr);
							comment("------------Revision Cnt = " + nbrRevs);
						}

					}

				}
			} //end of counts
		} //end of workflow loop
		//Summary Stats
		nbrOutst = nbrReqd - nbrAppr - nbrRevs;
		comment("**********Final Numbers************");
		comment(" # Required: " + nbrReqd);
		comment(" # Approved: " + nbrAppr);
		comment("# Outstanding = " + nbrOutst);
		comment("# Revisions = " + nbrRevs);

		if (nbrOutst == 0) {
			if (nbrRevs > 0) {
				planRevFlag = "Revisions Needed";
				updateAppStatus(planRevFlag, "Updated by Script")
			} else {
				planRevFlag = "Review Approved";
				updateAppStatus(planRevFlag, "Updated by Script")
			}
			//else
			//     planRevFlag = "In Review";
		}
		comment("Plan Review should be" + planRevFlag);
		return planRevFlag;

	}catch(err){
		logDebug("An error occurred in custom function UpdateCapReviewStatus Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170724 conversion end
//custom function
//jec 170706 conversion begin
//noted in DUA
function addAdHocTask(adHocProcess, adHocTask, adHocNote){
	try{
		//adHocProcess must be same as one defined in R1SERVER_CONSTANT
		//adHocTask must be same as Task Name defined in AdHoc Process
		//adHocNote can be variable
		//Optional 4 parameters = Assigned to User ID must match an AA user
		//Optional 5 parameters = CapID
		var thisCap = capId;
		var thisUser = currentUserID;
		if(arguments.length > 3)
			thisUser = arguments[3]
		if(arguments.length > 4)
			thisCap = arguments[4];
		var userObj = aa.person.getUser(thisUser);
		if (!userObj.getSuccess()) {
			logDebug("Could not find user to assign to");
			return false;
		}
		var taskObj = aa.workflow.getTasks(thisCap).getOutput()[0].getTaskItem()
		comment("taskObj is " + taskObj);
		taskObj.setProcessCode(adHocProcess);
		taskObj.setTaskDescription(adHocTask);
		taskObj.setDisposition("");
		taskObj.setDispositionNote(adHocNote);
		taskObj.setDispositionComment(adHocNote);
		taskObj.setProcessID(0);
		taskObj.setAssignmentDate(aa.util.now());
		//taskObj.setDueDate(aa.util.now());
		//taskObj.setAssignedUser(userObj.getOutput());
		wf = aa.proxyInvoker.newInstance("com.accela.aa.workflow.workflow.WorkflowBusiness").getOutput();
		wf.createAdHocTaskItem(taskObj);
		//Doesn't work! Next two lines breaks script - HOw to find task itemmodel???
		//var vItem = wf.GetAdhocTask("Document Uploaded Online");
		//comment("vItem is " + vItem);
		return taskObj;
	}catch(err){
		logDebug("An error occurred in custom function addAddHocTask Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end
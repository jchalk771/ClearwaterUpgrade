//custom function
//jec 170721 conversion begin
//send email to contact with Report
//Pass Report name as it appears in RptMngr, not the name of the SQL rpt
//Parameters come from the Report Parameter Name column in Report manager!!
//this function now used with plan review adhoc tasks
//report mngr must have default output set to pdf!
function emailRpt_Save2Case(rptName, pNbr, rptParams, noteParams, emailTo, templateName){
	try{

		comment("Cap ID is " + pNbr);

		var currentUserID = aa.env.getValue("CurrentUserID"); // Setting the User Name

		var id1 = capId.ID1;
		var id2 = capId.ID2;
		var id3 = capId.ID3;
		comment("ID1 is " + id1 + ". ID2 is " + id2 + " . ID3 is " + id3);

		var capIDScriptModel = aa.cap.createCapIDScriptModel(id1, id2, id3);
		comment("Cap ID Script Model is " + capIDScriptModel);

		//Report
		var reportName = rptName; // Setting ReportName of the report that is set in RM
		comment("Report Name is " + reportName);
		var report = aa.reportManager.getReportInfoModelByName(reportName);
		report = report.getOutput();
		comment("Report Info Model is " + report);
		report.setModule("Building"); // Setting the module
		report.setCapId(capId);
		comment("Is working to just before Parameters?")

		//Set Paramters of Report
		report.setReportParameters(rptParams);
		comment("Report has paramaters set.");

		//Set Report Permissions
		var hasPermission = aa.reportManager.hasPermission(reportName, currentUserID);
		comment("hasPermission is " + hasPermission);
		//only try to get the report if the user has permissions
		if (hasPermission.getOutput().booleanValue()) {
			var reportResult = aa.reportManager.getReportResult(report);
			comment("Report has permission.");
			if (reportResult.getSuccess()) {
				reportOutput = reportResult.getOutput();
				comment("Report Output done.");
				if (reportResult != null) {
					var reportFile = aa.reportManager.storeReportToDisk(reportOutput); //works
					logDebug("reportFile " + reportFile);
					reportFile = reportFile.getOutput();
					comment("Report saved to disk?");
					//Place in array, because function is looking for array of reports
					var reportFiles = new Array();
					reportFiles[0] = reportFile;

					//Try to run report and attach to notification template
					//comment("The reportFile is"+ reportFile);//Works

					//Try to send it in email
					var emailResult = null;
					//Must use Communication Mngr to use this object
					//emailResult = aa.document.sendEmailAndSaveAsDocument(emailFrom, emailTo, emailCC, templateName, params, capIDScriptModel, reportFile);
					emailResult = aa.document.sendEmailAndSaveAsDocument("noReply@myclearwater.com", emailTo, "", templateName, noteParams, capIDScriptModel, reportFiles);

					if (emailResult.getSuccess()) {
						logDebug("Sent email successfully!");
						comment("Email sent successfully!");
						return true;
					} else {
						//@TODO - result is undefined.  Did you mean emailResult.getErrorType()?
						logDebug("Failed to send mail. - " + emailResult.getErrorType());  //correcting to see true nature of error when failing
						comment("Failed to send mail. - " + emailResult.getErrorType());   //JEC,Accela 9.1.17
						return false;
					}
					
				} else {
					comment("Report Result was null.");
					comment("Unable to run report: " + reportName);
					return false;
				}

			} else {
				comment("Report OUtput did not work.");
				return false;
			}

		} else {
			logDebug("No permission to report: " + reportName + " for Admin" + systemUserObj);
			comment("No permission to report: " + reportName + " for Admin" + systemUserObj);
			return false;
		}
		//  comment("Made it to bottom of script.");
		//   return false;

	}catch(err){
		logDebug("An error occurred in custom function emailRpt_Save2Case Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170721 conversion end

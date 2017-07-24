var myCapId = "OB17-0045";
var myUserId = "ADMIN";

/* ASA  */  	//var eventName = "ApplicationSubmitAfter";
/* ASIUA */		//var eventName = "ApplicationSpecificInfoUpdateAfter";
/* WTUA */		//var eventName = "WorkflowTaskUpdateAfter";  wfTask = "Final Processing";	  wfStatus = "Permit Issued";  wfDateMMDDYYYY = "02/08/2016";
/* IRSA */		//var eventName = "InspectionResultSubmitAfter" ; inspResult = "Failed"; inspComment = "Comment";  inspType = "Roofing"
/* ISA  */		//var eventName = "InspectionScheduleAfter" ; inspType = "Roofing"
/* ISB ALT */	//var eventName = "InspectionMultipleScheduleBefore"; inspType = "Set Backs"
/* PRA  */		//var eventName = "PaymentReceiveAfter";  PaymentTotalPaidAmount = 100;


var useProductCustomScript = true;  	//This will pull the custom functions from the productized Custom Script area (Events->Custom Script)
										//false will pull the INCLUDES_CUSTOM that is in the Non-Productized script area (Events->Scripts)
var useProductIncludesScript = false;  	//This will pull the INCLUDES_ACCELA_GLOBALS and INCLUDES_ACCELA_FUNCTIONS from the productized script area (Events->Master Script)
										//false will pull the versions that are in the Non-Productized script area (Events->Scripts)	
var useProdEnterpriseCustomScript = false;  //SUPERAGENCIES ONLY
                                           //This will pull Enterprise wide custom functions from the parent agency's productized INCLUDES_CUSTOM if
                                           //the standard choice in the child agency references INCLUDES_CUSTOM as the SUPER_AGENCY_INCLUDE_SCRIPT
										   //within the MULTI_SERVICE_SETTINGS standard choice
										   //use false if the script is named something other than INCLUDES_CUSTOM and is stored in the non-productized 
										   //area within the parent agency


var runEvent = true; // set to true to simulate the event and run all branch scripts for the record type.  Assuming all are now scripts.

/* master script code don't touch */aa.env.setValue("EventName", eventName);var vEventName = eventName;var controlString = eventName;var tmpID = aa.cap.getCapID(myCapId).getOutput();if (tmpID != null) {	aa.env.setValue("PermitId1", tmpID.getID1());	aa.env.setValue("PermitId2", tmpID.getID2());	aa.env.setValue("PermitId3", tmpID.getID3());}aa.env.setValue("CurrentUserID", myUserId);var preExecute = "PreExecuteForAfterEvents";      var documentOnly = false;  var SCRIPT_VERSION = 3.0;var useSA = false;          var SA = null;var SAScript = null;var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_FOR_EMSE");   if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") {	useSA = true;                                                          	SA = bzr.getOutput().getDescription();                                 	bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_INCLUDE_SCRIPT");   	if (bzr.getSuccess()) {		SAScript = bzr.getOutput().getDescription();                       	}}if (SA) {              	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", SA, useProductIncludesScript));	eval(getScriptText("INCLUDES_ACCELA_GLOBALS", SA, useProductIncludesScript));	/* force for script test*/	showDebug = true;	eval(getScriptText(SAScript, SA, useProdEnterpriseCustomScript));            } else {                	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, useProductIncludesScript));	eval(getScriptText("INCLUDES_ACCELA_GLOBALS", null, useProductIncludesScript));}eval(getScriptText("INCLUDES_CUSTOM", null, useProductCustomScript));            if (documentOnly) {	doStandardChoiceActions2(controlString, false, 0);	aa.env.setValue("ScriptReturnCode", "0");	aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");	aa.abortScript();}var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX", vEventName);var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS";var doStdChoices = true;var doScripts = false;var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice).getOutput().size() > 0;if (bzr) {	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "STD_CHOICE");	doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "SCRIPT");	doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";}function getScriptText(vScriptName, servProvCode, useProductScripts) {	if (!servProvCode)		servProvCode = aa.getServiceProviderCode();	vScriptName = vScriptName.toUpperCase();	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();	try {		if (useProductScripts) {			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);		} else {			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");		}		return emseScript.getScriptText() + "";	} catch (err) {		return "";	}}logGlobals(AInfo);/*if (runEvent && typeof(doStandardChoiceActions) == "function" && doStdChoices) try {doStandardChoiceActions(controlString,true,0); } catch (err) { logDebug(err.message) }*/if (runEvent && typeof(doScriptActions) == "function" && doScripts)	doScriptActions();var z = debug.replace(/<BR>/g, "\r");aa.print(z);

//this is where we try our new code and functions
try {
	showDebug = true;

	//Your test code goes here or leave blank for existing event simulation.

} catch (err) {
	logDebug("A JavaScript Error occured: " + err.message + " In Line " + err.lineNumber);
}

aa.env.setValue("ScriptReturnCode", "1");
aa.env.setValue("ScriptReturnMessage", debug)



/*------------------------------------------------------------------------------------------------------
| Program : DocumentUploadAfterV3.0.js
| Event   : DocumentUploadAfter
|
| Usage   : Master Script by Accela.  See accompanying documentation and release notes.
|
| Client  : N/A
| Action  : N/A
|
| Notes   : In order for this event to work, ACA_CONFIGS value ENABLE_SYNCHRONOUS_UPLOAD value description must be set to YES
|
|------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------
| START User Configurable Parameters
|
|     Only variables in the following section may be changed.  If any other section is modified, this
|     will no longer be considered a "Master" script and will not be supported in future releases.  If
|     changes are made, please add notes above.
|------------------------------------------------------------------------------------------------------*/
var controlString = "DocumentUploadAfter";
var preExecute = "PreExecuteForAfterEvents";
var documentOnly = false;

/*------------------------------------------------------------------------------------------------------
| END User Configurable Parameters
------------------------------------------------------------------------------------------------------*/
var SCRIPT_VERSION = 3.0;
var useCustomScriptFile = true;
var useSA = false;
var SA = null;
var SAScript = null;
var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_FOR_EMSE");
if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") {
     useSA = true;
     SA = bzr.getOutput().getDescription();
     bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_INCLUDE_SCRIPT");
     if(bzr.getSuccess()) {
    	 SAScript = bzr.getOutput().getDescription();
	}
}
if (SA) {
	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", SA));
	eval(getScriptText("INCLUDES_ACCELA_GLOBALS", SA));
	eval(getScriptText(SAScript, SA));
} else {
	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS"));
	eval(getScriptText("INCLUDES_ACCELA_GLOBALS"));
}
eval(getScriptText("INCLUDES_CUSTOM", null, useCustomScriptFile));
if (documentOnly) {
	doStandardChoiceActions(controlString, false, 0);
	aa.env.setValue("ScriptReturnCode", "0");
	aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");
	aa.abortScript();
}
var prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX", vEventName);
var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS";
var doStdChoices = true; // compatibility default
var doScripts = false;
var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice).getOutput().size() > 0;
if (bzr) {
	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "STD_CHOICE");
	doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "SCRIPT");
	doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
}
function getScriptText(vScriptName, servProvCode, useProductScripts) {
	if(!servProvCode)
		servProvCode = aa.getServiceProviderCode();
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	try {
		if(useProductScripts) {
			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
		}
		else {
			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
		}
		return emseScript.getScriptText() + "";
	}catch (err) {
		return "";
	}
}
/*------------------------------------------------------------------------------------------------------
| BEGIN Event Specific Variables
------------------------------------------------------------------------------------------------------*/
var documentModelArray = aa.env.getValue("DocumentModelList");
logDebug("documentModelArray = " + documentModelArray);
var documentUploadedFrom = aa.env.getValue("From");
logDebug("documentUploadedFrom = " + documentUploadedFrom);
var documentUploadStatus = aa.env.getValue("UploadStatus");
logDebug("documentUploadStatus : " + documentUploadStatus);
/*------------------------------------------------------------------------------------------------------
| END Event Specific Variables
------------------------------------------------------------------------------------------------------*/
if (preExecute.length)
	doStandardChoiceActions(preExecute, true, 0);
logGlobals(AInfo);
/*------------------------------------------------------------------------------------------------------
| ===========Main=Loop================
|-----------------------------------------------------------------------------------------------------*/

//if (doStdChoices) doStandardChoiceActions(controlString,true,0);
//if (doScripts) doScriptActions();

if (capId) {
	// coming from ACA
	if (doStdChoices)
		doStandardChoiceActions(controlString, true, 0);
	
	if (doScripts)
		doScriptActions();
} else {
	capIdArray = aa.env.getValue("CapIDList").toArray();
	if (capIdArray) {
		for (var thisCapId in capIdArray) {
			aa.env.setValue("PermitId1", capIdArray[thisCapId].getID1());
			aa.env.setValue("PermitId2", capIdArray[thisCapId].getID2());
			aa.env.setValue("PermitId3", capIdArray[thisCapId].getID3());
			eval(getScriptText("INCLUDES_ACCELA_GLOBALS"));
			if (capId) {
				if (doStdChoices)
					doStandardChoiceActions(controlString, true, 0);
				if (doScripts)
					doScriptActions();
			}
		}
	}
}

if (feeSeqList.length){
	invoiceResult = aa.finance.createInvoice(capId, feeSeqList, paymentPeriodList);
	if (invoiceResult.getSuccess())
		logMessage("Invoicing assessed fee items is successful.");
	else
		logMessage("**ERROR: Invoicing the fee items assessed to app # " + capIDString + " was not successful.  Reason: " + invoiceResult.getErrorMessage());
}
/*------------------------------------------------------------------------------------------------------
| ===========END=Main=Loop================
-----------------------------------------------------------------------------------------------------*/
if (debug.indexOf("**ERROR") > 0){
	aa.env.setValue("ScriptReturnCode", "1");
	aa.env.setValue("ScriptReturnMessage", debug);
}else{
	aa.env.setValue("ScriptReturnCode", "0");
	if(showMessage)
		aa.env.setValue("ScriptReturnMessage", message);
	if(showDebug)
		aa.env.setValue("ScriptReturnMessage", debug);
}
/*------------------------------------------------------------------------------------------------------
| External Functions (used by Action entries)
------------------------------------------------------------------------------------------------------*/

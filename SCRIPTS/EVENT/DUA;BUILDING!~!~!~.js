//Branch
//jec 170706 conversion begin
try{
	//customization from master script
	//******************************
	//For PrintDocInfo function

	var docModel = aa.document.getCapDocumentList(capId, currentUserID).getOutput();
	if (docModel != "" && docModel != null) {
	    var docModelList = aa.util.newArrayList();
	    for (tDoc in docModel)
	        docModelList.add(docModel[tDoc]);

	    var eligibleDocList = printDocInfo(docModelList);
	}
	//*******************************************
	
	
	if (documentUploadedFrom == "ACA") {
		var eAddress = getPrimaryLicProEmail(capId);
		comment("Email is "+ eAddress);
		var vTaskActive = isActiveAdhocTask("Online Customer Request");
		comment("is the task active?" + vTaskActive);
		logDebug("******************Debugging**************","Is task active?" + vTaskActive + ". Doc Source is " + documentUploadedFrom);
	}

	
	if (appMatch("Building/Construction Permit/*/*") && documentUploadedFrom == "ACA" && docModel != "" && docModel != null) {
		//branch("ES_ONLINE_CUSTOMER_REQUEST") - only called once, added inline
		revStartDate = new Date();
		var vStartTime = formatDateTime(revStartDate);
		comment("Hello, the start time is " + vStartTime);
		if (capStatus=="Received" && isActiveAdhocTask("Online Customer Request")) {
			updateTask("Online Customer Request", "NOTE", vStartTime + "**NEW DOC UPLOADED BY CUSTOMER!!","", "ADHOC_TASKS");
			onlineCustomerRequest4(docModel, documentModelArray);
		}

		if (capStatus=="Received" && !isActiveAdhocTask("Online Customer Request")) {
			addAdHocTask("ADHOC_TASKS","Online Customer Request", vStartTime + " - Customer Added Document");
			onlineCustomerRequest4(docModel, documentModelArray);
		}

		if (matches(capStatus,"Additional Info Required","In Review","Review Approved", "Revisions Needed", "Active","Hold","Red")  &&  isActiveAdhocTask("Online Customer Request")) {
			updateTask("Online Customer Request", "NOTE", vStartTime + "**NEW DOC UPLOADED BY CUSTOMER!!","", "ADHOC_TASKS");
			onlineCustomerRequest4(docModel, documentModelArray);
		}

		if (matches(capStatus,"Additional Info Required","In Review","Review Approved", "Revisions Needed", "Active","Hold","Red") && !isActiveAdhocTask("Online Customer Request")) {
			addAdHocTask("ADHOC_TASKS","Online Customer Request", vStartTime + "**CASE UPDATED BY CUSTOMER!!");
			onlineCustomerRequest4(docModel, documentModelArray);
		}
	}

	if (documentUploadedFrom == "ACA" && cap.isCompleteCap()) {
		//@emailTest - comment for production deployment
			//email(testMasterAddress,"noReply@myclearwater.com", "Online - Permit " + capId.getCustomID(), "Document was uploaded today by "+eAddress );
		//@emailProd - uncomment for production deployment
			email("john.warner@myClearwater.com","noReply@myclearwater.com", "Online - Permit " + capId.getCustomID(), "Document was uploaded today by "+eAddress );
			email("lydia.moreda@myClearwater.com","noReply@myclearwater.com","Uploaded - Permit " + capId.getCustomID(), "Document was uploaded today by "+eAddress );
	}

}catch(err){
	logDebug("An error occurred in DUA:Building/*/*/*: Conversion: " + err. message);
	logDebug(err.stack);
}
//jec 170706 conversion end
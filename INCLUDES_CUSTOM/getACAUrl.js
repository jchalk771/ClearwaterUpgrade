//custom function
//jec 170717 conversion begin
function getACAUrl(){
	try{
		var acaUrl = "";
		var id1 = aa.env.getValue("PermitId1");
		var id2 = aa.env.getValue("PermitId2");
		var id3 = aa.env.getValue("PermitId3");
		var capResult = aa.cap.getCap(id1, id2, id3);
		
		if(!capResult.getSuccess()) {
		      return acaUrl;
		}
		
		var cap = capResult.getOutput().getCapModel();
		//acaUrl = acaWebServiceSite + "/urlrouting.ashx?type=1000";
		acaUrl = "https://epermit.myclearwater.com/CitizenAccess/Cap/CapDetail.aspx?";
		acaUrl += "&Module=" + cap.getModuleName();
		acaUrl += "&TabName=" + cap.getModuleName();
		acaUrl += "&capID1=" + id1 + "&capID2=" + id2 + "&capID3=" + id3;
		acaUrl += "&agencyCode=" + "CLEARWATER";
		return acaUrl;

	}catch(err){
		logDebug("An error occurred in custom function getACAUrl Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170717 conversion end
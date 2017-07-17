//custom function
//jec 170717 conversion begin
function checkSubmittalDate(){
	try{

		vAppDate = new Date();
		showMessage= true;
		comment ("App Date and time is " +  vAppDate );
		vAppMonth = vAppDate.getMonth() + 1;
		//showMessage= true; //commenting out, unneccessary - jec
		comment ("App Month is " +  vAppMonth );
		if (vAppMonth == 1) {
			vCurSubmittalDeadline = new Date(lookup("PLN_SUBMITTAL_DEADLINE", 1).substring(0,10) +" 12:00:00");
			vCurDRC = lookup("PLN_SUBMITTAL_DEADLINE", vAppMonth).substring(11,21);
			vNextDRC = lookup("PLN_SUBMITTAL_DEADLINE", vAppMonth+1).substring(11,21);
			comment("JAN submittal deadline is " + vCurSubmittalDeadline);
			comment("DRC date for JAN is " + vCurDRC + ". Next DRC is " + vNextDRC);
		}

		if (vAppMonth == 12) {
			vCurSubmittalDeadline = new Date(lookup("PLN_SUBMITTAL_DEADLINE", 12).substring(0,10) +" 12:00:00");
			vCurDRC = lookup("PLN_SUBMITTAL_DEADLINE", 12).substring(11,21);
			vNextDRC = lookup("PLN_SUBMITTAL_DEADLINE", 1).substring(11,21);
			comment("DEC submittal deadline is " +vCurSubmittalDeadline);
			comment("DRC date for DEC is " + vCurDRC + ". Next DRC is " + vNextDRC);
		}

		if (vAppMonth != 12 && vAppMonth != 1) {
			vCurSubmittalDeadline = new Date(lookup("PLN_SUBMITTAL_DEADLINE", vAppMonth).substring(0,10) +" 12:00:00");
			vCurDRC = lookup("PLN_SUBMITTAL_DEADLINE", vAppMonth).substring(11,21);
			vNextDRC = lookup("PLN_SUBMITTAL_DEADLINE", vAppMonth+1).substring(11,21);
			comment("Submittal deadline for current month " + vCurSubmittalDeadline );
			comment("DRC date for current month is " + vCurDRC + ". Next DRC is " + vNextDRC);
		}

		if (vAppDate > vCurSubmittalDeadline) {
			vMsg =  "Your application, if complete will be reviewed by the DRC on " + vNextDRC;
			comment("Submitted on " + vAppDate + "Message is " + vMsg);
			comment("App Date is " + vAppDate +", current submittal deadline is " + vCurSubmittalDeadline);
		}

		if (vAppDate <= vCurSubmittalDeadline) {
			vMsg =  "Your application, if complete will be reviewed by the DRC on " + vCurDRC;
			comment("Submitted on " + vAppDate + "Message is " + vMsg);
			comment("App Date is " + vAppDate +", current submittal deadline is " + vCurSubmittalDeadline);
		}

		var permitNbr = capId.getCustomID();
		comment("permitNbe is "+permitNbr);
		var eAddress = getPrimaryEmail(capId);
		comment("Email is" + eAddress);
		var noticeTemp = "ACA_MESSAGE_CK_SUBMITTAL_DATE";
		var rptArray = [];
		var noticeParams = aa.util.newHashtable();
		noticeParams.put("$$noticeMsg$$", vMsg);
		noticeParams.put("$$altID$$", permitNbr);
		comment("Made it to line 17");
		sendNotification("noReply@myClearwater.com", eAddress, "","ACA_MESSAGE_CK_SUBMITTAL_DATE", noticeParams, rptArray);
		email("lydia.moreda@myClearwater.com","aemoreda@aol.com", "Planning Submittal - " + permitNbr, "Your planning application was submitted on " + vAppDate + ". " + vMsg);
		aa.debug("Line 13", "Made it here");
		email("sherry.watkins@myClearwater.com","NoReply@myclearwater.com", "Planning Submittal - "+ permitNbr, "Your planning application was submitted on " + vAppDate + ". " + vMsg);
		aa.debug("Line 13", "Made it here");
		
	}catch(err){
		logDebug("An error occurred in custom function checkSubmittalDate Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170717 conversion end
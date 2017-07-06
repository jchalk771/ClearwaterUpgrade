//custom function
//jec 170706 conversion begin
//noted in DUA
function formatDateTime(startDate){
	try{
		var vHr = "";
		var vMin = "";
		//var vSec = startDate.getSeconds();
		//comment ("Seconds are " + vSec);
		//if (vSec<10)
		//   {vSec = "0"+ vSec;}
		//comment("Seconds is " + vSec);

		//var vMilSec = startDate.getMilliseconds();
		//if (vMilSec<10)
		//   {vMilSec = "0" +vMilSec;}
		//comment("Milli Seconds is " + vMilSec);
		      
	   var vYr = startDate.getFullYear();
	   comment("Year is " + vYr);
	   var vMon = startDate.getMonth() +1;
	   comment("Month is " + vMon);
	   if (vMon < 10) {
		   vMon = "0" + vMon;
	   }
		comment("A two digit vMon is " + vMon);
		var vDay = startDate.getDate();
		comment("Date is " + vDay);
		if (vDay < 10) {
			vDay = "0" + vDay;
		}

		if (startDate.getHours()< 10) { 
			vHr = "0" + startDate.getHours();
		}
		else {
			vHr = startDate.getHours();
		}
		comment("The hour is " + vHr);

		if (startDate.getMinutes()<10) {
			vMin = "0"+ startDate.getMinutes();
		}
		else {
			vMin = startDate.getMinutes();
		}
		var timeStart = vYr + "-" + vMon + "-" + vDay + " " + vHr + ":" + vMin;
		comment("In this thing, time is " + timeStart);
		return timeStart;
	}catch(err){
		logDebug("An error occurred in custom function formatDateTime Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end
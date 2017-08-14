//custom function
//jec 170706 conversion begin
//formerly ES_BCP_ADD_TRADE_FEE
function bcpAddTradeFee(){
	try{
		tradeCount = 0;
		tradeCountBLD = 0;
		tradeCountELE = 0;
		tradeCountPLM = 0;
		tradeCountMEC = 0;
		tradeCountROOF = 0;
		tradeCountGAS = 0;
		tradeCountCG = 0;
		if (AInfo['Building'] == "Yes" || AInfo['BLD'] =="CHECKED") {
			tradeCountBLD = 1;
			if(appMatch("Building/Construction Permit/*/*")) 
				editAppSpecific("BLD","CHECKED");
		}

		if (AInfo['Electric'] == "Yes" || AInfo['ELE'] =="CHECKED") {
			tradeCountELE = 1;
			if(appMatch("Building/Construction Permit/*/*"))  
				editAppSpecific("ELE","CHECKED");
		}

		if (AInfo['Plumbing'] == "Yes" || AInfo['PLM'] == "CHECKED") {
			tradeCountPLM = 1;
			if(appMatch("Building/Construction Permit/*/*"))
				editAppSpecific("PLM","CHECKED");
		}

		if (AInfo['Mechanical'] == "Yes" || AInfo['MEC']== "CHECKED") {
			tradeCountMEC = 1;
			if(appMatch("Building/Construction Permit/*/*")) 
				editAppSpecific("MEC","CHECKED");
		}

		if (AInfo['Roofing'] == "Yes") {
			editAppSpecific("ROOF","CHECKED");
			tradeCountROOF = 1;
		}

		if (AInfo['Gas Use'] == "Yes" || AInfo['GAS'] =="CHECKED") {
			tradeCountGAS = 1;
			if(appMatch("Building/Construction Permit/*/*"))
				editAppSpecific("GAS","CHECKED");
		}

		tradeCount = parseInt(tradeCountBLD) + parseInt(tradeCountELE) + parseInt(tradeCountPLM) + parseInt(tradeCountMEC) + parseInt(tradeCountROOF) + parseInt(tradeCountGAS);
		comment("Trade Count is: " + tradeCount);
		if (AInfo['Type of Permit']=="Pool - In Ground") {
			tradeCount = 1;
		}

		if (appMatch("Building/Construction Permit/*/*") && tradeCount <1) {
			editAppSpecific("Number of Trades",parseInt(tradeCount));
		}

		if (tradeCount > 0) {
			editAppSpecific("Number of Trades",parseInt(tradeCount));
			email("jchalk@accela.com","jchalk@accela.com", "Clearwater ACA Debug Message", "I made it to line 61 of bcpAddTradeFee.");
			updateFee("PERMT","B_NCC","FINAL",(parseInt(tradeCount)-1)*30,"N","Y");
		}

		if (appMatch("Building/Over the Counter/*/*") &&AInfo['Number of Trades']>1) {
			updateFee("PERMT","B_OTC","FINAL",(parseInt(AInfo['Number of Trades'])-1)*30,"N","Y");
		}

		//aa.debug("Line 13 of ES_BCP_ADD_TRADE_FEE","Trade Fee is " + feeAmount("PERMT")+". Fee Balance is " + feeBalance("PERMT"));
		aa.debug("Line 69 of bcpAddTradeFee","Trade Fee is " + feeAmount("PERMT")+". Fee Balance is " + feeBalance("PERMT"));
		//aa.debug("Line 14 of ES_BCP_ADD_TRADE_FEE","TradeNumber" + AInfo['Number of Trades']);
		aa.debug("Line 71 of bcpAddTradeFee","TradeNumber" + AInfo['Number of Trades']);
		if (AInfo['Online Permit Type'] =="Demolition" || AInfo['Type of Permit'] == "Demo - Building") {
			editAppSpecific("BLD","CHECKED");
		}
	}catch(err){
		logDebug("An error occurred in custom function bcpAddTradeFee Conversion: " + err. message);
		logDebug(err.stack);
	}
}
//jec 170706 conversion end
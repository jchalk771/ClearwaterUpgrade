//Accela_PROD/SCRIPTS/MASTERSCRIPTS/INCLUDES_CUSTOM_GLOBALS.js - Prod 2/9/2018
//formerly ES_CW_DEBUGGROUPS
//split into separate statements to support specific bizserver log debug (showDebug = 3) by individual as needed

if (currentUserID == "AWILHELM") showDebug = true;
if (currentUserID == "LMOREDA") showDebug = true;
if (currentUserID == "JWARNER") showDebug = true;
if (currentUserID == "MLOUIS") 	showDebug = true;
if (currentUserID == "NKRNETA") showDebug = true;
//if (currentUserID == "JCHALK")  showDebug = true;
//if (currentUserID == "DHEDD")   showDebug = true;

if ((lookup("ACA_CONFIGS","ACA_SITE")=="https://172.20.2.52/CitizenAccessDev/Admin/default.aspx") || (lookup("ACA_CONFIGS","ACA_SITE")=="https://172.20.2.52/CitizenAccessTest/Admin/default.aspx"))
	{testMasterAddress = "Lydia.Moreda@myClearwater.com; anelise.wilhelm@myclearwater.com";}
else
	//{testMasterAddress = "aemoreda@aol.com; nermina.krneta@myclearwater.com";}
	{testMasterAddress = "ivan.dimitrov@myclearwater.com; James.Benwell@MyClearwater.com; Wioletta.Dabrowski@MyClearwater.com; jeremy.shaw@myclearwater.com; jason.alber@myClearwater.com;christopher.melone@myClearwater.com; bradford.cheek@myclearwater.com";}
//testMasterAddress = "jchalk@accela.com; Lydia.Moreda@myClearwater.com";

//Staff names and phone for email templates sent for ACAmi  
var asgnStaff = "";
var asgnName = "";
asgnStaff = currentUserID;
asgnName = lookup("OnlineCustomerRequestStaff", asgnStaff);

//Following section did not work in 8.0.0.0.3(5)?
//Did not work in ACA in DEV nor PROD
//Parse Staff Name for email signature 
//var vName;
//vName = asgnName.substr(0, asgnName.indexOf(','));
//comment("vName is " + vName);

//figure out phone
//var vPhone;
//comment("Comma is in position " + asgnName.indexOf(','));
	
//vPhone =  asgnName.substr(asgnName.indexOf(',') +1,asgnName.length - asgnName.indexOf(','));
//comment("vPhone is " + vPhone);		
	
//Figure out email address
//comment("Space is in position " + asgnName.indexOf(' '));
//comment("Comma is in position " + asgnName.indexOf(','));
//var vEmail;
//vEmail = asgnName.slice(0,asgnName.indexOf(' '))+"." + asgnName.substr(asgnName.indexOf(' ') +1, asgnName.length - 5 - asgnName.indexOf(' ')-1)+"@myclearwater.com";
    		
//comment("vEmail is " + vEmail);


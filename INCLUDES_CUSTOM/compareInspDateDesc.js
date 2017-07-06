//Noted in ASIUA
function compareInspDateDesc(a,b) { 
	return (a.getScheduledDate().getEpochMilliseconds() < b.getScheduledDate().getEpochMilliseconds()); 
}
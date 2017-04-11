 var parser = {

	unknown : function(v) {
		return v;
	},
    bool : function(v) {
        return {raw:v, full:parseInt(v) == 1 ? true : false};
    },
    celcius : function(v) {
        val = parseFloat(v) / 10;
        return {raw:val, full:val.toFixed(2) + "°C"};
    },
    seconds : function(v) {
        return {raw:v, full:parseInt(v) + "s"};
    },
    pulses : function(v) {
        return {raw:v, full:parseInt(v) + "Imp."};
    },
	typecode : function(n) {
		codes = {
            0:"ERC",
			1:"SW1",
			2:"SW2",
			3:"WW1",
			4:"WW2",
			5:"L1I",
			6:"L2I",
			7:"L1A",
			8:"L2A",
			9:"KSW",
			10:"KLW",
			11:"SWC",
			12:"LWC",
			13:"L2G",
			14:"WZS",
			15:"L1I407",
			16:"L2I407",
			17:"L1A407",
			18:"L2A407",
			19:"L2G407",
			20:"LWC407",
			21:"L1AREV",
			22:"L2AREV",
			23:"WWC1",
			24:"WWC2",
			25:"L2G404",
			26:"WZW",
			27:"L1S",
			28:"L1H",
			29:"L2H",
			30:"WZWD",
			31:"ERC",
			40:"WWB_20",
			41:"LD5",
			42:"LD7",
			43:"SW 37_45",
			44:"SW 58_69",
			45:"SW 29_56",
			46:"LD5 (230V)",
			47:"LD7 (230 V)",
			48:"LD9",
			49:"LD5 REV",
			50:"LD7 REV",
			51:"LD5 REV 230V",
			52:"LD7 REV 230V",
			53:"LD9 REV 230V",
			54:"SW 291",
			55:"LW SEC",
			56:"HMD 2",
			57:"MSW 4",
			58:"MSW 6",
			59:"MSW 8",
			60:"MSW 10",
			61:"MSW 12",
			62:"MSW 14",
			63:"MSW 17",
			64:"MSW 19",
			65:"MSW 23",
			66:"MSW 26",
			67:"MSW 30",
			68:"MSW 4S",
			69:"MSW 6S",
			70:"MSW 8S",
			71:"MSW 10S",
			72:"MSW 13S",
			73:"MSW 16S",
			74:"MSW2-6S",
			75:"MSW4-16"}
		return codes[n];
	},
	bivalence : function(n) {
		levels = {
			1:"Ein Verdichter darf laufen",
			2:"Zwei Verdichter dürfen laufen",
			3:"Zusätzlicher Wärmeerzeuger darf mitlaufen"
			}
		return levels[n]
	},
	operating_state : function(n) {
		states = {
			0:"Heizen",
			1:"Warmwasser",
			2:"Schwimmbad / Photovoltaik",
			3:"EVU",
			4:"Abtauen",
			5:"Keine Anforderung",
			6:"Heizen ext. Energiequelle",
			7:"Kühlbetrieb"
		}
		return state[n];
	},
	ascii : function(v) {
		return String.fromCharCode(parseInt(v));
	},
	ip : function(v) {
		v = parseInt(v);
		return (v >> 24) & 0xFF + "." + (v >> 16) & 0xFF + "." + (v >> 8) & 0xFF + "." (v & 0xFF);
	},
	timestamp: function(v) {
		return {raw:parseInt(v), full: new Date(parseInt(v) * 1000)};
	},
	errorcode : function(v) {
		return parseInt(v);
	},
	errrocount : function(v) {
		return parseInt(v);	
	},
	switchoff : function(v) {
		codes = {
			1:"Wärmepumpe Störung",
			2:"Anlagen Störung",
			3:"Betriebsart Zweiter Wärmeerzeuger",
			4:"EVU-Sperre",
			5:"Lauftabtau (nur LW-Geräte)",
			6:"Temperatur Einsatzgrenze maximal",
			7:"Temperatur Einsatzgrenze minimal (bei LWD reversibel möglicherweise Abschaltung wegen Frostschutz bei Kühlbetrieb - Verdampfungstemperatur zu lange unter 0°C)",
			8:"Untere Einsatzgrenze",
			9:"Keine Anforderung"}
		return codes[v];
	},
	statuscode1 : function(v) {
		codes = {
			0:"Wärmepumpe läuft",
			1:"Wärmepumpe steht",
			2:"Wärmepumpe kommt",
			3:"Fehlercode Speicherplatz 0",
			4:"Abtauen",
			5:"Warte auf LIN-Verbindung",
			6:"Verdichter heizt auf",
			7:"Pumpenvorlauf"
			}
		return codes[v];
	},
	statuscode2 : function(v) {
		codes = {
			0:"seit",
			1:"in",
		}
		return codes[v];
	},
	statuscode3 : function(v) {
		codes = {
			0:"Heizbetrieb",
			1:"Keine Anforderung",
			2:"Netz-Einschaltverzögerung",
			3:"Schaltspielsperre",
			4:"Sperrzeit",
			5:"Brauchwasser",
			6:"Info Ausheizprogramm",
			7:"Abtauen",
			8:"Pumpenvorlauf",
			9:"Thermische Desinfektion",
			10:"Kühlbetrieb",
			12:"Schwimmbad / Photovoltaik",
			13:"Heizen ext. Energiequelle",
			14:"Brauchwasser ext. Energiequelle",
			16:"Durchflussüberachung",
			17:"Zweiter Wärmeerzeuger 1 Betrieb"    
		}
		return codes[v];
	},
    volt : function(v) {
        val = parseFloat(v) / 100;
        return {raw:val, full:val.toFixed(2) + "V"};
    },
    power : function(v) {
        val = parseFloat(v) / 10;
        return {raw:val, full:val.toFixed(2) + "kWh"};
    },
    flowrate : function(v) {
        val = parseFloat(v);
        return {raw:val, full:val.toFixed(2) + "l/h"};
    },
    kelvin : function(v) {
        val = parseFloat(v) / 10;
        return {raw:val, full:val.toFixed(2) + "K"};
    },
    bar : function(v) {
        val = parseFloat(v) / 100;
        return {raw:val, full:val.toFixed(2) + "bar"};
    },
    bar : function(v) {
        val = parseFloat(v) / 10;
        return {raw:val, full:val + "%"};
    },
    rpm : function(v) {
        val = parseInt(v);
        return {raw:val, full:val + "RPM"};
    },
	operating_state_sec : function(n) {
		states = {
			0:"Aus",
			1:"Kühlung",
			2:"Heizung",
			3:"Störung",
			4:"Übergang",
			5:"Abtauen",
			6:"Warte",
			7:"Warte",
			8:"Übergang",
			9:"Stop",
			10:"Manuell",
			11:"Simulation Start",
			12:"EVU Sperre"   
		}
		return state[n];
	},
    frequency : function(v) {
        val = parseInt(v);
        return {raw:val, full:val + "Hz"};
    },
    structure : {
		10:{"id":"ID_WEB_Temperatur_TVL", "description":"Vorlauftemperatur Heizkreis", "convert":"celcius"},
		11:{"id":"ID_WEB_Temperatur_TRL ", "description":"Rücklauftemperatur Heizkreis", "convert":"celcius"},
		12:{"id":"ID_WEB_Sollwert_TRL_HZ", "description":"Rücklauf-Soll Heizkreis", "convert":"celcius"},
		13:{"id":"ID_WEB_Temperatur_TRL_ext", "description":"Rücklauftemperatur im Trennspeicher.", "convert":"celcius"},
		14:{"id":"ID_WEB_Temperatur_THG", "description":"Heisgastemperatur", "convert":"celcius"},
		15:{"id":"ID_WEB_Temperatur_TA", "description":"Aussentemperatur", "convert":"celcius"},
		16:{"id":"ID_WEB_Mitteltemperatur", "description":"Durchschnittstemperatur Aussen über 24 h (Funktion Heizgrenze)", "convert":"celcius"},
		17:{"id":"ID_WEB_Temperatur_TBW", "description":"Warmwasser Ist-Temperatur", "convert":"celcius"},
		18:{"id":"ID_WEB_Einst_BWS_akt", "description":"Warmwasser Soll-Temperatur", "convert":"celcius"},
		19:{"id":"ID_WEB_Temperatur_TWE", "description":"Wärmequellen-Eintrittstemperatur", "convert":"celcius"},
		20:{"id":"ID_WEB_Temperatur_TWA", "description":"Wärmequellen-Austrittstemperatur", "convert":"celcius"},
		21:{"id":"ID_WEB_Temperatur_TFB1 ", "description":"Mischkreis 1 Vorlauftemperatur", "convert":"celcius"},
		22:{"id":"ID_WEB_Sollwert_TVL_MK1", "description":"Mischkreis 1 Vorlauf-Soll-Temperatur", "convert":"celcius"},
		23:{"id":"ID_WEB_Temperatur_RFV  ", "description":"Raumtemperatur Raumstation 1", "convert":"celcius"},
		24:{"id":"ID_WEB_Temperatur_TFB2", "description":"Mischkreis 2 Vorlauftemperatur", "convert":"celcius"},
		25:{"id":"ID_WEB_Sollwert_TVL_MK2", "description":"Mischkreis 2 Vorlauf-Soll-Temperatur", "convert":"celcius"},
		26:{"id":"ID_WEB_Temperatur_TSK", "description":"Fühler Solarkollektor", "convert":"celcius"},
		27:{"id":"ID_WEB_Temperatur_TSS", "description":"Fühler Solarspeicher", "convert":"celcius"},
		28:{"id":"ID_WEB_Temperatur_TEE", "description":"Fühler externe Energiequelle", "convert":"celcius"},
		29:{"id":"ID_WEB_ASDin", "description":"Eingang Abtauende, Soledruck, Durchfluss", "convert":"bool"},
		30:{"id":"ID_WEB_BWTin", "description":"Eingang Brauchwarmwasserthermostat", "convert":"bool"},
		31:{"id":"ID_WEB_EVUin", "description":"Eingang EVU Sperre", "convert":"bool"},
		32:{"id":"ID_WEB_HDin", "description":"Eingang Hochdruck Kältekreis", "convert":"bool"},
		33:{"id":"ID_WEB_MOTin", "description":"Eingang Motorschutz OK", "convert":"bool"},
		34:{"id":"ID_WEB_NDin", "description":"Eingang Niederdruck", "convert":"bool"},
		35:{"id":"ID_WEB_PEXin", "description":"Eingang Überwachungskontakt für Potentiostat", "convert":"bool"},
		36:{"id":"ID_WEB_SWTin", "description":"Eingang Schwimmbadthermostat", "convert":"bool"},
		37:{"id":"ID_WEB_AVout", "description":"Ausgang Abtauventil", "convert":"bool"},
		38:{"id":"ID_WEB_BUPout", "description":"Ausgang Brauchwasserpumpe/Umstellventil", "convert":"bool"},
		39:{"id":"ID_WEB_HUPout", "description":"Ausgang Heizungsumwälzpumpe", "convert":"bool"},
		40:{"id":"ID_WEB_MA1out", "description":"Ausgang Mischkreis 1 Auf", "convert":"bool"},
		41:{"id":"ID_WEB_MZ1out", "description":"Ausgang Mischkreis 1 Zu", "convert":"bool"},
		42:{"id":"ID_WEB_VENout", "description":"Ausgang Ventilation (Lüftung)", "convert":"bool"},
		43:{"id":"ID_WEB_VBOout", "description":"Ausgang Solepumpe/Ventilator", "convert":"bool"},
		44:{"id":"ID_WEB_VD1out", "description":"Ausgang Verdichter 1", "convert":"bool"},
		45:{"id":"ID_WEB_VD2out", "description":"Ausgang Verdichter 2", "convert":"bool"},
		46:{"id":"ID_WEB_ZIPout", "description":"Ausgang Zirkulationspumpe", "convert":"bool"},
		47:{"id":"ID_WEB_ZUPout", "description":"Ausgang Zusatzumwälzpumpe", "convert":"bool"},
		48:{"id":"ID_WEB_ZW1out", "description":"Ausgang Steuersignal Zusatzheizung v. Heizung", "convert":"bool"},
		49:{"id":"ID_WEB_ZW2SSTout", "description":"Ausgang Steuersignal Zusatzheizung/Störsignal", "convert":"bool"},
		50:{"id":"ID_WEB_ZW3SSTout", "description":"Ausgang Zusatzheizung 3", "convert":"bool"},
		51:{"id":"ID_WEB_FP2out", "description":"Ausgang Pumpe Mischkreis 2", "convert":"bool"},
		52:{"id":"ID_WEB_SLPout", "description":"Ausgang Solarladepumpe", "convert":"bool"},
		53:{"id":"ID_WEB_SUPout", "description":"Ausgang Schwimmbadpumpe", "convert":"bool"},
		54:{"id":"ID_WEB_MZ2out", "description":"Ausgang Mischkreis 2 Zu", "convert":"bool"},
		55:{"id":"ID_WEB_MA2out", "description":"Ausgang Mischkreis 2 Auf", "convert":"bool"},
		56:{"id":"ID_WEB_Zaehler_BetrZeitVD1", "description":"Betriebsstunden Verdichter 1", "convert":"seconds"},
		57:{"id":"ID_WEB_Zaehler_BetrZeitImpVD1", "description":"Impulse Verdichter 1", "convert":"pulses"},
		58:{"id":"ID_WEB_Zaehler_BetrZeitVD2", "description":"Betriebsstunden Verdichter 2", "convert":"seconds"},
		59:{"id":"ID_WEB_Zaehler_BetrZeitImpVD2", "description":"Impulse Verdichter 2", "convert":"pulses"},
		60:{"id":"ID_WEB_Zaehler_BetrZeitZWE1", "description":"Betriebsstunden Zweiter Wärmeerzeuger 1", "convert":"seconds"},
		61:{"id":"ID_WEB_Zaehler_BetrZeitZWE2", "description":"Betriebsstunden Zweiter Wärmeerzeuger 2", "convert":"seconds"}, 
		62:{"id":"ID_WEB_Zaehler_BetrZeitZWE3", "description":"Betriebsstunden Zweiter Wärmeerzeuger 3", "convert":"unknown"},
		63:{"id":"ID_WEB_Zaehler_BetrZeitWP", "description":"Betriebsstunden Wärmepumpe", "convert":"seconds"},
		64:{"id":"ID_WEB_Zaehler_BetrZeitHz", "description":"Betriebsstunden Heizung", "convert":"seconds"},
		65:{"id":"ID_WEB_Zaehler_BetrZeitBW", "description":"Betriebsstunden Warmwasser", "convert":"seconds"},
		66:{"id":"ID_WEB_Zaehler_BetrZeitKue", "description":"Betriebsstunden Kühlung", "convert":"seconds"},
		67:{"id":"ID_WEB_Time_WPein_akt", "description":"Wärmepumpe läuft seit", "convert":"seconds"},
		68:{"id":"ID_WEB_Time_ZWE1_akt", "description":"Zweiter Wärmeerzeuger 1 läuft seit", "convert":"seconds"},
		69:{"id":"ID_WEB_Time_ZWE2_akt", "description":"Zweiter Wärmeerzeuger 2 läuft seit", "convert":"seconds"},
		70:{"id":"ID_WEB_Timer_EinschVerz", "description":"Netzeinschaltverzögerung", "convert":"seconds"},
		71:{"id":"ID_WEB_Time_SSPAUS_akt", "description":"Schaltspielsperre Aus", "convert":"seconds"},
		72:{"id":"ID_WEB_Time_SSPEIN_akt", "description":"Schaltspielsperre Ein", "convert":"seconds"},
		73:{"id":"ID_WEB_Time_VDStd_akt", "description":"Verdichter-Standzeit", "convert":"seconds"},
		74:{"id":"ID_WEB_Time_HRM_akt", "description":"Heizungsregler Mehr-Zeit", "convert":"seconds"},
		75:{"id":"ID_WEB_Time_HRW_akt", "description":"Heizungsregler Weniger-Zeit", "convert":"seconds"},
		76:{"id":"ID_WEB_Time_LGS_akt", "description":"Thermische Desinfektion läuft seit", "convert":"seconds"},
		77:{"id":"ID_WEB_Time_SBW_akt", "description":"Sperre Warmwasser", "convert":"seconds"},
		78:{"id":"ID_WEB_Code_WP_akt", "description":"Wärmepumpentyp", "convert":"typecode"},
		79:{"id":"ID_WEB_BIV_Stufe_akt", "description":"Bivalenzstufe", "convert":"bivalence"},
		80:{"id":"ID_WEB_WP_BZ_akt", "description":"Betriebszustand", "convert":"operating_state"},
		81:{"id":"ID_WEB_SoftStand1", "description":"Softwarestand", "convert":"ascii"},
		82:{"id":"ID_WEB_SoftStand2", "description":"Softwarestand", "convert":"ascii"},
		83:{"id":"ID_WEB_SoftStand3", "description":"Softwarestand", "convert":"ascii"},
		84:{"id":"ID_WEB_SoftStand4", "description":"Softwarestand", "convert":"ascii"},
		85:{"id":"ID_WEB_SoftStand5", "description":"Softwarestand", "convert":"ascii"},
		86:{"id":"ID_WEB_SoftStand6", "description":"Softwarestand", "convert":"ascii"},
		87:{"id":"ID_WEB_SoftStand7", "description":"Softwarestand", "convert":"ascii"},
		88:{"id":"ID_WEB_SoftStand8", "description":"Softwarestand", "convert":"ascii"},
		89:{"id":"ID_WEB_SoftStand9", "description":"Softwarestand", "convert":"ascii"},
		90:{"id":"ID_WEB_SoftStand10", "description":"Softwarestand", "convert":"ascii"},
		91:{"id":"ID_WEB_AdresseIP_akt", "description":"IP Adresse", "convert":"ip"},
		92:{"id":"ID_WEB_SubNetMask_akt", "description":"Subnetzmaske", "convert":"ip"},
		93:{"id":"ID_WEB_Add_Broadcast", "description":"Broadcast Adresse", "convert":"ip"},
		94:{"id":"ID_WEB_Add_StdGateway", "description":"Standard Gateway", "convert":"ip"},
		95:{"id":"ID_WEB_ERROR_Time0", "description":"Zeitstempel Fehler 0 im Speicher", "convert":"timestamp"},
		96:{"id":"ID_WEB_ERROR_Time1", "description":"Zeitstempel Fehler 1 im Speicher", "convert":"timestamp"},
		97:{"id":"ID_WEB_ERROR_Time2", "description":"Zeitstempel Fehler 2 im Speicher", "convert":"timestamp"},
		98:{"id":"ID_WEB_ERROR_Time3", "description":"Zeitstempel Fehler 3 im Speicher", "convert":"timestamp"},
		99:{"id":"ID_WEB_ERROR_Time4", "description":"Zeitstempel Fehler 4 im Speicher", "convert":"timestamp"},
		100:{"id":"ID_WEB_ERROR_Nr0", "description":"Fehlercode Fehler 0 im Speicher", "convert":"errorcode"},
		101:{"id":"ID_WEB_ERROR_Nr1", "description":"Fehlercode Fehler 1 im Speicher", "convert":"errorcode"},
		102:{"id":"ID_WEB_ERROR_Nr2", "description":"Fehlercode Fehler 2 im Speicher", "convert":"errorcode"},
		103:{"id":"ID_WEB_ERROR_Nr3", "description":"Fehlercode Fehler 3 im Speicher", "convert":"errorcode"},
		104:{"id":"ID_WEB_ERROR_Nr4", "description":"Fehlercode Fehler 4 im Speicher", "convert":"errorcode"},
		105:{"id":"ID_WEB_AnzahlFehlerInSpeicher", "description":"Anzahl der Fehler im Speicher", "convert":"errorcount"},
		106:{"id":"ID_WEB_Switchoff_file_Nr0", "description":"Grund Abschaltung 0 im Speicher", "convert":"switchoff"},
		107:{"id":"ID_WEB_Switchoff_file_Nr1", "description":"Grund Abschaltung 1 im Speicher", "convert":"switchoff"},
		108:{"id":"ID_WEB_Switchoff_file_Nr2", "description":"Grund Abschaltung 2 im Speicher", "convert":"switchoff"},
		109:{"id":"ID_WEB_Switchoff_file_Nr3", "description":"Grund Abschaltung 3 im Speicher", "convert":"switchoff"},
		110:{"id":"ID_WEB_Switchoff_file_Nr4", "description":"Grund Abschaltung 4 im Speicher", "convert":"switchoff"},
		111:{"id":"ID_WEB_Switchoff_file_Time0", "description":"Zeitstempel Abschaltung 0 im Speicher", "convert":"timestamp"},
		112:{"id":"ID_WEB_Switchoff_file_Time1", "description":"Zeitstempel Abschaltung 1 im Speicher", "convert":"timestamp"},
		113:{"id":"ID_WEB_Switchoff_file_Time2", "description":"Zeitstempel Abschaltung 2 im Speicher", "convert":"timestamp"},
		114:{"id":"ID_WEB_Switchoff_file_Time3", "description":"Zeitstempel Abschaltung 3 im Speicher", "convert":"timestamp"},
		115:{"id":"ID_WEB_Switchoff_file_Time4", "description":"Zeitstempel Abschaltung 4 im Speicher", "convert":"timestamp"},
		116:{"id":"ID_WEB_Comfort_exists", "description":"Comfort Platine installiert", "convert":"bool"},
		117:{"id":"ID_WEB_HauptMenuStatus_Zeile1", "description":"Status Zeile 1", "convert":"statuscode1"},
		118:{"id":"ID_WEB_HauptMenuStatus_Zeile2", "description":"Status Zeile 2", "convert":"statuscode2"},
		119:{"id":"ID_WEB_HauptMenuStatus_Zeile3", "description":"Status Zeile 3", "convert":"statuscode3"},
		120:{"id":"ID_WEB_HauptMenuStatus_Zeit", "description":"Zeit seit / in (in kombination mit #118)", "convert":"timestamp"},
		121:{"id":"ID_WEB_HauptMenuAHP_Stufe", "description":"Stufe Ausheizprogramm", "convert":"unknown"},
		122:{"id":"ID_WEB_HauptMenuAHP_Temp", "description":"Temperatur Ausheizprogramm", "convert":"celcius"},
		123:{"id":"ID_WEB_HauptMenuAHP_Zeit", "description":"Laufzeit Ausheizprogramm", "convert":"seconds"},
		124:{"id":"ID_WEB_SH_BWW", "description":"Brauchwasser Symbol", "convert":"bool"},
		125:{"id":"ID_WEB_SH_HZ", "description":"Heizung Symbol", "convert":"bool"},
		126:{"id":"ID_WEB_SH_MK1", "description":"Mischkreis 1 Symbol", "convert":"bool"},
		127:{"id":"ID_WEB_SH_MK2", "description":"Mischkreis 2 Symbol", "convert":"bool"},
		128:{"id":"ID_WEB_Einst_Kurzrpgramm", "description":"Einstellung Kurzprogramm", "convert":"bool"},
		129:{"id":"ID_WEB_StatusSlave_1", "description":"Status Slave 1", "convert":"bool"},
		130:{"id":"ID_WEB_StatusSlave_2", "description":"Status Slave 2", "convert":"bool"},
		131:{"id":"ID_WEB_StatusSlave_3", "description":"Status Slave 3", "convert":"bool"},
		132:{"id":"ID_WEB_StatusSlave_4", "description":"Status Slave 4", "convert":"bool"},
		133:{"id":"ID_WEB_StatusSlave_5", "description":"Status Slave 5", "convert":"bool"},
		134:{"id":"ID_WEB_AktuelleTimeStamp", "description":"Aktuelle Zeit der Wärmepumpe", "convert":"timestamp"},
		135:{"id":"ID_WEB_SH_MK3", "description":"Mischkreis 3 Symbol", "convert":"bool"},
		136:{"id":"ID_WEB_Sollwert_TVL_MK3", "description":"Mischkreis 3 Vorlauf-Soll-Temperatur", "convert":"celcius"},
		137:{"id":"ID_WEB_Temperatur_TFB3", "description":"Mischkreis 3 Vorlauftemperatur", "convert":"celcius"},
		138:{"id":"ID_WEB_MZ3out", "description":"Ausgang Mischkreis 3 Zu", "convert":"bool"},
		139:{"id":"ID_WEB_MA3out", "description":"Ausgang Mischkreis 3 Auf", "convert":"bool"},
		140:{"id":"ID_WEB_FP3out", "description":"Pumpe Mischkreis 3", "convert":"bool"},
		141:{"id":"ID_WEB_Time_AbtIn", "description":"Zeit bis Abtauen", "convert":"seconds"},
		142:{"id":"ID_WEB_Temperatur_RFV2", "description":"Raumtemperatur Raumstation 2", "convert":"celcius"},
		143:{"id":"ID_WEB_Temperatur_RFV3", "description":"Raumtemperatur Raumstation 3", "convert":"celcius"},
		144:{"id":"ID_WEB_SH_SW", "description":"Schaltuhr Schwimmbad Symbol", "convert":"bool"},
		145:{"id":"ID_WEB_Zaehler_BetrZeitSW", "description":"Betriebsstunden Schwimmbad", "convert":"unknown"},
		146:{"id":"ID_WEB_FreigabKuehl", "description":"Freigabe Kühlung", "convert":"bool"},
		147:{"id":"ID_WEB_AnalogIn", "description":"Analoges Eingangssignal", "convert":"volt"},
		148:{"id":"ID_WEB_SonderZeichen", "description":"??", "convert":"bool"},
		149:{"id":"ID_WEB_SH_ZIP", "description":"Zirkulationspumpen Symbol", "convert":"bool"},
		150:{"id":"ID_WEB_WebsrvProgrammWerteBeobarten", "description":"??", "convert":"bool"},
		151:{"id":"ID_WEB_WMZ_Heizung", "description":"Wärmemengenzähler Heizung", "convert":"power"},
		152:{"id":"ID_WEB_WMZ_Brauchwasser", "description":"Wärmemengenzähler Brauchwasser", "convert":"power"},
		153:{"id":"ID_WEB_WMZ_Schwimmbad", "description":"Wärmemengenzähler Schwimmbad", "convert":"power"},
		154:{"id":"ID_WEB_WMZ_Seit", "description":"Wärmemengenzähler Gesamt", "convert":"power"},
		155:{"id":"ID_WEB_WMZ_Durchfluss", "description":"Wärmemengenzähler Durchfluss", "convert":"flowrate"},
		156:{"id":"ID_WEB_AnalogOut1", "description":"Analog Ausgang 1", "convert":"volt"},
		157:{"id":"ID_WEB_AnalogOut2", "description":"Analog Ausgang 2", "convert":"volt"},
		158:{"id":"ID_WEB_Time_Heissgas", "description":"Sperre zweiter Verdichter Heissgas", "convert":"seconds"},
		159:{"id":"ID_WEB_Temp_Lueftung_Zuluft", "description":"Zulufttemperatur", "convert":"celcius"},
		160:{"id":"ID_WEB_Temp_Lueftung_Abluft", "description":"Ablufttemperatur", "convert":"celcius"},
		161:{"id":"ID_WEB_Zaehler_BetrZeitSolar", "description":"Betriebstundenzähler Solar", "convert":"seconds"},
		162:{"id":"ID_WEB_AnalogOut3", "description":"Analog Ausgang 3", "convert":"volt"},
		163:{"id":"ID_WEB_AnalogOut4", "description":"Analog Ausgang 4", "convert":"volt"},
		164:{"id":"ID_WEB_Out_VZU", "description":"Zuluft Ventilator (Abtaufunktion)", "convert":"volt"},
		165:{"id":"ID_WEB_Out_VAB", "description":"Abluft Ventilator", "convert":"volt"},
		166:{"id":"ID_WEB_Out_VSK", "description":"Ausgang VSK", "convert":"bool"},
		167:{"id":"ID_WEB_Out_FRH", "description":"Ausgang FRH", "convert":"bool"},
		168:{"id":"ID_WEB_AnalogIn2", "description":"Analog Eingang 2", "convert":"volt"},
		169:{"id":"ID_WEB_AnalogIn3", "description":"Analog Eingang 3", "convert":"volt"},
		170:{"id":"ID_WEB_SAXin", "description":"Eingang SAX", "convert":"bool"},
		171:{"id":"ID_WEB_SPLin", "description":"Eingang SPL", "convert":"bool"},
		172:{"id":"ID_WEB_Compact_exists", "description":"Lüftungsplatine verbaut", "convert":"bool"},
		173:{"id":"ID_WEB_Durchfluss_WQ", "description":"Durchfluss Wärmequelle", "convert":"flowrate"},
		174:{"id":"ID_WEB_LIN_exists", "description":"LIN BUS verbaut", "convert":"bool"},
		175:{"id":"ID_WEB_LIN_ANSAUG_VERDAMPFER", "description":"Temperatur Ansaug Verdampfer", "convert":"celcius"},
		176:{"id":"ID_WEB_LIN_ANSAUG_VERDICHTER", "description":"Temperatur Ansaug Verdichter", "convert":"celcius"},
		177:{"id":"ID_WEB_LIN_VDH", "description":"Temperatur Verdichter Heizung", "convert":"celcius"},
		178:{"id":"ID_WEB_LIN_UH", "description":"Überhitzung", "convert":"kelvin"},
		179:{"id":"ID_WEB_LIN_UH_Soll", "description":"Überhitzung Soll ", "convert":"kelvin"},
		180:{"id":"ID_WEB_LIN_HD", "description":"Hochdruck", "convert":"bar"},
		181:{"id":"ID_WEB_LIN_ND", "description":"Niederdruck", "convert":"bar"},
		182:{"id":"ID_WEB_LIN_VDH_out", "description":"Ausgang Verdichterheizung", "convert":"bool"},
		183:{"id":"ID_WEB_HZIO_PWM", "description":"Steuersignal Umwälzpumpe", "convert":"percent"},
		184:{"id":"ID_WEB_HZIO_VEN", "description":"Ventilator Drehzahl", "convert":"rpm"},
		185:{"id":"ID_WEB_HZIO_EVU2", "description":"EVU 2", "convert":"bool"},
		186:{"id":"ID_WEB_HZIO_STB", "description":"Sicherheits-Tempeartur-Begrenzer Fussbodenheizung", "convert":"bool"},
		187:{"id":"ID_WEB_SEC_Qh_Soll", "description":"Leistung Sollwert", "convert":"power"},
		188:{"id":"ID_WEB_SEC_Qh_Ist", "description":"Leistung Istwert", "convert":"power"},
		189:{"id":"ID_WEB_SEC_TVL_Soll", "description":"Temperatur Vorlauf Soll", "convert":"celcius"},
		190:{"id":"ID_WEB_SEC_Software", "description":"Software Stand SEC Board", "convert":"unknown"},
		191:{"id":"ID_WEB_SEC_BZ", "description":"Betriebszustand SEC Board", "convert":"operating_state_sec"},
		192:{"id":"ID_WEB_SEC_VWV", "description":"Vierwegeventil", "convert":"unknown"},
		193:{"id":"ID_WEB_SEC_VD", "description":"Verdichterdrehzahl", "convert":"rpm"},
		194:{"id":"ID_WEB_SEC_VerdEVI", "description":"Verdichtertemperatur EVI (Enhanced Vapour Injection)", "convert":"celcius"},
		195:{"id":"ID_WEB_SEC_AnsEVI", "description":"Ansaugtemperatur EVI", "convert":"celcius"},
		196:{"id":"ID_WEB_SEC_UEH_EVI", "description":"Überhitzung EVI", "convert":"kelvin"},
		197:{"id":"ID_WEB_SEC_UEH_EVI_S", "description":"Überhitzung EVI Sollwert", "convert":"kelvin"},
		198:{"id":"ID_WEB_SEC_KondTemp", "description":"Kondensationstemperatur", "convert":"celcius"},
		199:{"id":"ID_WEB_SEC_FlussigEx", "description":"Flüssigtemperatur EEV (elektronisches Expansionsventil)", "convert":"celcius"},
		200:{"id":"ID_WEB_SEC_UK_EEV", "description":"Unterkühlung EEV", "convert":"celcius"},
		201:{"id":"ID_WEB_SEC_EVI_Druck", "description":"Druck EVI", "convert":"bar"},
		202:{"id":"ID_WEB_SEC_U_Inv", "description":"Spannung Inverter", "convert":"volt"},
		203:{"id":"ID_WEB_Temperatur_THG_2", "description":"Temperarturfühler Heissgas 2", "convert":"celcius"},
		204:{"id":"ID_WEB_Temperatur_TWE_2", "description":"Temperaturfühler Wärmequelleneintritt 2", "convert":"celcius"},
		205:{"id":"ID_WEB_LIN_ANSAUG_VERDAMPFER_2", "description":"Ansaugtemperatur Verdampfer 2", "convert":"celcius"},
		206:{"id":"ID_WEB_LIN_ANSAUG_VERDICHTER_2", "description":"Ansaugtemperatur Verdichter 2", "convert":"celcius"},
		207:{"id":"ID_WEB_LIN_VDH_2", "description":"Temperatur Verdichter 2 Heizung", "convert":"celcius"},
		208:{"id":"ID_WEB_LIN_UH_2", "description":"Überhitzung 2", "convert":"kelvin"},
		209:{"id":"ID_WEB_LIN_UH_Soll_2", "description":"Überhitzung Soll 2", "convert":"kelvin"},
		210:{"id":"ID_WEB_LIN_HD_2", "description":"Hochdruck 2", "convert":"bar"},
		211:{"id":"ID_WEB_LIN_ND_2", "description":"Niederdruck 2", "convert":"bar"},
		212:{"id":"ID_WEB_HDin_2", "description":"Eingang Druckschalter Hochdruck 2", "convert":"bool"},
		213:{"id":"ID_WEB_AVout_2", "description":"Ausgang Abtauventil 2", "convert":"bool"},
		214:{"id":"ID_WEB_VBOout_2", "description":"Ausgang Solepumpe/Ventilator 2", "convert":"bool"},
		215:{"id":"ID_WEB_VD1out_2", "description":"Ausgang Verdichter 1 / 2", "convert":"bool"},
		216:{"id":"ID_WEB_LIN_VDH_out_2", "description":"Ausgang Verdichter Heizung 2", "convert":"bool"},
		217:{"id":"ID_WEB_Switchoff2_file_Nr0", "description":"Grund Abschaltung 0 im Speicher", "convert":"switchoff"},
		218:{"id":"ID_WEB_Switchoff2_file2_Nr1", "description":"Grund Abschaltung 1 im Speicher", "convert":"switchoff"},
		219:{"id":"ID_WEB_Switchoff2_file2_Nr2", "description":"Grund Abschaltung 2 im Speicher", "convert":"switchoff"},
		220:{"id":"ID_WEB_Switchoff2_file2_Nr3", "description":"Grund Abschaltung 3 im Speicher", "convert":"switchoff"},
		221:{"id":"ID_WEB_Switchoff2_file2_Nr4", "description":"Grund Abschaltung 4 im Speicher", "convert":"switchoff"},
		222:{"id":"ID_WEB_Switchoff2_file_Time0", "description":"Zeitstempel Abschaltung 0 im Speicher", "convert":"timestamp"},
		223:{"id":"ID_WEB_Switchoff2_file_Time1", "description":"Zeitstempel Abschaltung 1 im Speicher", "convert":"timestamp"},
		224:{"id":"ID_WEB_Switchoff2_file_Time2", "description":"Zeitstempel Abschaltung 2 im Speicher", "convert":"timestamp"},
		225:{"id":"ID_WEB_Switchoff2_file_Time3", "description":"Zeitstempel Abschaltung 3 im Speicher", "convert":"timestamp"},
		226:{"id":"ID_WEB_Switchoff2_file_Time4", "description":"Zeitstempel Abschaltung 4 im Speicher", "convert":"timestamp"},
		227:{"id":"ID_WEB_RBE_RT_Ist", "description":"Raumtemperatur Istwert", "convert":"celcius"},
		228:{"id":"ID_WEB_RBE_RT_Soll", "description":"Raumtemperatur Sollwert", "convert":"celcius"},
		229:{"id":"ID_WEB_Temperatur_BW_oben", "description":"Temperatur Brauchwasser Oben", "convert":"celcius"},
		230:{"id":"ID_WEB_Code_WP_akt_2", "description":"Wärmepumpen Typ 2", "convert":"typecode"},
		231:{"id":"ID_WEB_Freq_VD", "sescription":"Verdichterfrequenz", "convert":"frequency"}
	}
};



module.exports = parser;

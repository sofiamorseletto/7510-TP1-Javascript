var Interpreter = function () {

    this.db;

	this.parseDB = function (db) {
        this.db = db;
    }

    this.parseFact = function(fact){
    	return fact.match(/[\s]*?([a-zA-Z]*)(\((.*[\w\s,$]*)\)).?/);
    }

    this.createMapFacts = function(fact, mapa){
    	var match = this.parseFact(fact);

		if ((match != null) && (!mapa.has(match[1]))) {
			mapa.set(match[1], [match[3]]);
		}else if (match != null){
			mapa.get(match[1]).push(match[3]);
		}else{
			//Mala database
		}
		return mapa;
    }

    this.parseFacts = function (db) {
    	var mapa = new Map();

    	for (var i = 0; i < db.length; i++) {
    		this.createMapFacts(db[i], mapa);
    	}
    	return mapa;
    }

    this.parseRules = function (db) {
    	var mapa = new Map();

    	for (var i = 0; i < db.length; i++) {
    		var match = db[i].match(/[\s]*?([a-zA-Z]*)(\((.*[\w\s,$]*)\)) :- (.*)/);

    		if (match != null) {
    			var facts = match[4].match(/[\s]?([\sa-zA-Z]*\([\sa-zA-Z,]*\))/g);
    			var ref = match[3].split(/,[\s]?/);			
    			mapa.set(match[1], [facts, ref]);
    		}
    	}
    	return mapa;
    }

    this.checkFact = function(parsedQuery, parsedFacts){
    	var key = parsedQuery[1];
    	var value = parsedQuery[3];
    	var dbValues = parsedFacts.get(key);
    	
    	return dbValues.some(function(e, i, a){ return e == value; });
    }

    this.checkRule = function (parsedQuery, parsedRules, parsedFacts){
    	var key = parsedQuery[1];
    	var arguments = parsedQuery[3].split(/,[\s]?/);
    	var rule = parsedRules.get(key);

        if(rule == undefined)
            return false;
        
    	var facts = rule[0];
    	var references = rule[1];
    	var inDb = true;
    	//Para cambiar palabras:
    	for(var j = 0; j < facts.length; j++){
    		var factita = facts[j];
	    	for(var i = 0; i < references.length; i++){
				factita = factita.replace(references[i], arguments[i]);
			}
			var found = this.checkFact(this.parseFact(factita), parsedFacts);
			if(!found)
				inDb = false;
		}
		return inDb;
    }

    this.checkQuery = function (query) {
    	var parsedQuery = this.parseFact(query);
    	var parsedRules = this.parseRules(this.db);
    	var parsedFacts = this.parseFacts(this.db);
    	if(this.checkFact(parsedQuery, parsedFacts) || this.checkRule(parsedQuery, parsedRules, parsedFacts))
    		return true;
        return false;
    }

}

module.exports = Interpreter;
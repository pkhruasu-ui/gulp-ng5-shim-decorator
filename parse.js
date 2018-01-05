

var SETTINGS = {
	ngModuleRegEx : /@NgModule\((.|\s)*?\)/g,
	metadataRegEx : /\((.|\s)*?\)/g
}

exports.parseNgModule = function parseNgModule(content){

	var moduleRegex = SETTINGS.ngModuleRegEx;
	var _this = this;
	var found_change = false;	
	var new_content = content.replace(moduleRegex,function(match, p1, offset, string){		
		var new_text = match;
		var metadata = match.match(SETTINGS.metadataRegEx);
		_this.found_change = true;
		// find metadata
		if(metadata.length > 0){
			
			new_text = '@CustomNgModule(' + metadata[0] + ')\n' + match;	
		}		
	
		return new_text;
	});

	if(_this.found_change){
		new_content = "import { CustomNgModule } from 'ng5-decorator';\n" + new_content;
	}

	return new_content;
}

function importNgModule(content){
	return 
}

exports.parseComponent = function parseComponent(content){
	var moduleRegex = /@Component\((.|\s)*?\)/g;
	var _this = this;
	var found_change = false;
	var new_content = content.replace(moduleRegex,function(match, p1, offset, string){
		var new_text = match;
		var metadata = match.match(/\((.|\s)*?\)/g);
		_this.found_change = true;
		// find metadata
		if(metadata.length > 0){
	
			new_text = '@CustomComponent' + metadata[0] + '\n' + match;	
		}
		
		return new_text;
	});

	if(_this.found_change){
		new_content = "import { CustomComponent } from 'ng5-decorator';\n" + new_content;
	}

	return new_content;
}

exports.parseInjectable = function parseInjectable(content){
	var moduleRegex = /@Injectable\((.|\s)*?\)/g;
	var _this = this;
	var found_change = false;
	var new_content = content.replace(moduleRegex,function(match, p1, offset, string){
		var new_text = match;
		var metadata = match.match(/\((.|\s)*?\)/g);
		_this.found_change = true;
		// find metadata
		if(metadata.length > 0){
	
			new_text = '@CustomInjectable' + metadata[0] + '\n' + match;	
		}
		
		return new_text;
	});

	if(_this.found_change){
		new_content = "import { CustomInjectable } from 'ng5-decorator';\n" + new_content;
	}

	return new_content;
}

exports.parseDirective = function parseDirective(content){
	var moduleRegex = /@Directive\((.|\s)*?\)/g;
	var _this = this;
	var found_change = false;
	var new_content = content.replace(moduleRegex,function(match, p1, offset, string){
		var new_text = match;
		var metadata = match.match(/\((.|\s)*?\)/g);
		_this.found_change = true;
		// find metadata
		if(metadata.length > 0){
	
			new_text = '@CustomDirective' + metadata[0] + '\n' + match;	
		}
		
		return new_text;
	});

	if(_this.found_change){
		new_content = "import { CustomDirective } from 'ng5-decorator';\n" + new_content;
	}

	return new_content;
}
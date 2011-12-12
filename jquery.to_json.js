(function($){
    $.fn.toJSON = function(options){
        
        options = $.extend({}, options);
        
        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };
        
        
        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };
        
        this.push_counter = function(key, i){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
			if(i === undefined){
				return push_counters[key]++;
			}
			else if(i !== undefined && i > push_counters[key]){
				return push_counters[key] = ++i;
			}
        };
        
        $.each($(this).serializeArray(), function(){
            
            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }
            
            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;
            
            while((k = keys.pop()) !== undefined){
                
                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');
                
                // push
                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }
                
                // fixed
                else if(k.match(patterns.fixed)){
					self.push_counter(reverse_key, k);
                    merge = self.build([], k, merge);
                }
                
                // named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }
            
            json = $.extend(true, json, merge);
        });
        
        return json;
    };
})(jQuery);

module VORLON.WebStandards.Rules.Files {
    export var filesMinification = <IFileRule>{
        id: "performances.minification",
        title: "Minify static files",
        description: "Minify CSS and JavaScript files to reduce your site's network bandwidth requirements, especially on mobile.",
       
        check: function(rulecheck: any, analyzeSummary: any) {
            rulecheck.items = rulecheck.items || [];
            rulecheck.type = "blockitems";    
            for (var n in analyzeSummary.files.stylesheets){   
                var isVorlonInjection = n.toLowerCase().indexOf("vorlon/plugins") >= 0;    
                if (!isVorlonInjection){             
                    var charPerLines = this.getAverageCharacterPerLine(analyzeSummary.files.stylesheets[n].content);                
                    if (charPerLines < 50){
                        rulecheck.failed = true;
                        rulecheck.items.push({
                            title : "minify " + n
                        });
                    }
                }
            }
            
            for (var n in analyzeSummary.files.scripts){     
                var isVorlonInjection = n.toLowerCase().indexOf("vorlon/plugins") >= 0;    
                if (!isVorlonInjection){             
                    var charPerLines = this.getAverageCharacterPerLine(analyzeSummary.files.scripts[n].content);                
                    if (charPerLines < 50){
                        rulecheck.failed = true;
                        rulecheck.items.push({
                            title : "minify " + n
                        });
                    }
                }
            }
        },
        
        getAverageCharacterPerLine : function(content : string){
            if (!content)
                return 1000;
                
            var lines = content.split('\n');
            if (lines.length == 0)
                return 1000;
                
            var total = 0;
            lines.forEach(function(l){
               total+= l.length; 
            });
            return total / lines.length
        }
    }
}

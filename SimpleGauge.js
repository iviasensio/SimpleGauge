define( [
	"qlik",
	"css!./style.css",
	"./Properties"
],
function ( qlik, style, properties ) {
	'use strict';	
	return {
		initialProperties : {
			version: 1.0,
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 5,
					qHeight : 1
				}]
			},			
		},
		definition: properties,
		support: {
			export: false,
			exportData: false,
			snapshot: false
		},
		
		resize: function ( $element, layout ) {
			render( $element, layout );
		},

		paint: function ( $element, layout) {
			var qTitleMatrix = new Array();						
			var qColorMatrix = new Array();
			var qSizeMatrix = new Array();
			var qAlignMatrix = new Array();
			var qFontMatrix = new Array();
			// the measures properties values			
			layout.qHyperCube.qMeasureInfo.forEach(function (measure) {
         		qTitleMatrix.push(measure.qFallbackTitle);
         		qColorMatrix.push(measure.meascolor.color);
         		qSizeMatrix.push(measure.meassize);
         		qAlignMatrix.push(measure.measalign);
         		qFontMatrix.push(measure.measfont);
         	})

			var qVal   = layout.qHyperCube.qGrandTotalRow[0].qNum;
            var qTxt   = layout.qHyperCube.qGrandTotalRow[0].qText;            
            var qTitle = qTitleMatrix[0];   
            var qFont  = qFontMatrix[0];
            
            var minVal = layout.minValue;
            var maxVal = layout.maxValue;	  
            var animeSecs = layout.animeSecs + 's';          
            var backgroundcolor  = qColorMatrix[0];
            var qBorderBool = layout.borderbool;
            var qBorderColor = layout.bordercolor.color;
            var qBorderWidth = layout.borderwidth + 'px';
            if(!qBorderBool){
            	qBorderWidth = 0;
            }
            // the css dynamic values
            var cssWidth = Math.round((qVal / maxVal) * 100);
            if(minVal < 0) {
            	cssWidth = Math.round(((maxVal + qVal) / (Math.abs(minVal) + maxVal))*100);            	
            }	
            
            var cssRadius = '20px 20px 20px 0px';
            var cssMarginLeft = '10px';
            var cssAMarginLeft = '20px';
            var cssMaxWidth = '50px';
            if(qTxt.length > 4){
            	cssMaxWidth = qTxt.length * 13 + 'px';
            }
           
            if(cssWidth>80){
            	if(cssWidth>100){
            		cssWidth = 100;
            	}
            	cssRadius = '20px 20px 0px 20px';	            	
            	switch ( true ) {
					case (qTxt.length<5):
						cssMarginLeft  = '-50px';
						cssAMarginLeft = '-45px';
						break;
					case (qTxt.length==5):
						cssMarginLeft  = '-65px';
						cssAMarginLeft = '-55px';
						break;
					case (qTxt.length==6):
						cssMarginLeft  = '-80px';
						cssAMarginLeft = '-65px';
						break;
					case (qTxt.length>6):
						cssMarginLeft  = '-90px';
						cssAMarginLeft = '-75px';
						break;
				}
            }else{
            	if(isNaN(cssWidth) || cssWidth < minVal){
            		cssWidth = 0;
            	}
            }
            
            /* The visualization */
            var html = 
            '<div qv-extension>' +
				'<div class="skills-box" style = "--my-border-width:' + qBorderWidth + ';--my-border-color:' + qBorderColor + '">' +
					'<div class="skills-container">' +
						'<div class="skills skills-color" style = "--my-anime-secs:' + animeSecs + ';--my-anime-width:' + cssWidth + '%;--my-max-width: ' + cssMaxWidth + ';--my-color-var: ' + backgroundcolor + ';--my-border-radius:' + cssRadius + ';--my-margin-left: ' + cssMarginLeft + ' ">' +
							'<a class="skills-a" style = "--my-a-margin-left: ' + cssAMarginLeft + ';--my-anime-secs: ' + animeSecs + ';font-family:' + qFont + '">' + qTxt + '</a>' +
						'</div>' +							
					'</div>' +
					'<div class="skills-content">' +
                        '<h5 class="skills-title" style = "font-family:' + qFont + ';--my-color-var: ' + backgroundcolor + '">' + qTitle + '</h5>' +
                    '</div>';
            
            if(qSizeMatrix.length > 1){
				var txtval1 = layout.qHyperCube.qGrandTotalRow[1].qText;
            	html += '<table class="skills-table">' +                        
				'<tr class="tr-first" style = "--my-first-size:' + qSizeMatrix[1] + 'px;--my-first-color:' + qColorMatrix[1] + '">' +
					'<td style = "font-family:' + qFontMatrix[1] + ';">' + qTitleMatrix[1] +'</td>' +
					'<td style = "font-family:' + qFontMatrix[1] + ';text-align:' + qAlignMatrix[1] + '">' + txtval1 + '</td>' +
				'</tr>';
				
				if(qSizeMatrix.length > 2){		
					var txtval2 = layout.qHyperCube.qGrandTotalRow[2].qText;
					html += '<tr class="tr-second" style = "--my-second-size:' + qSizeMatrix[2] + 'px;--my-second-color:' + qColorMatrix[2] + '">' +
						'<td style = "font-family:' + qFontMatrix[2] + ';">' + qTitleMatrix[2] +'</td>' +
						'<td style = "font-family:' + qFontMatrix[2] + ';text-align:' + qAlignMatrix[2] + '">' + txtval2 + '</td>' +
					'</tr>';											
				}

				if(qSizeMatrix.length > 3){		
					var txtval3 = layout.qHyperCube.qGrandTotalRow[3].qText;
					html += '<tr class="tr-second" style = "font-family:' + qFontMatrix[3] + ';--my-second-size:' + qSizeMatrix[3] + 'px;--my-second-color:' + qColorMatrix[3] + '">' +
						'<td style = "font-family:' + qFontMatrix[3] + ';">' + qTitleMatrix[3] +'</td>' +
						'<td style = "font-family:' + qFontMatrix[3] + ';text-align:' + qAlignMatrix[3] + '">' + txtval3 + '</td>' +
					'</tr>';											
				}

				if(qSizeMatrix.length > 4){		
					var txtval4 = layout.qHyperCube.qGrandTotalRow[4].qText;
					html += '<tr class="tr-second" style = "font-family:' + qFontMatrix[4] + ';--my-second-size:' + qSizeMatrix[4] + 'px;--my-second-color:' + qColorMatrix[4] + '">' +
						'<td style = "font-family:' + qFontMatrix[4] + ';">' + qTitleMatrix[4] +'</td>' +
						'<td style = "font-family:' + qFontMatrix[4] + ';text-align:' + qAlignMatrix[4] + '">' + txtval4 + '</td>' +
					'</tr>';											
				}
				html += '</table>';
			}
			if(layout.extrapbool){
            	html += '<p style = "margin: 10px 0px;"><a class="skills-footer" style = "color:' + layout.extrapcolor.color +';font-size:'+ layout.extrapsize + 'px;font-family:' + layout.extrapfont +'">' + layout.extraptext + '</a></p>';
            }
			html += '</div></div>';
			
			$element.html(html);					
		}
	};
});
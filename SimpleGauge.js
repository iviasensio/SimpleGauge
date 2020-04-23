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
			var qTextColorMatrix = new Array();				
			var qColorMatrix = new Array();
			var qTextColor = new Array();
			var qSizeMatrix = new Array();
			var qAlignMatrix = new Array();
			var qFontMatrix = new Array();
			var qLimitBool = new Array();
			var qLimitNum = new Array();
			var qLimitColor = new Array();
			var qLimitColorTextBool = new Array();
			// the measures properties values			
			layout.qHyperCube.qMeasureInfo.forEach(function (measure) {
         		qTitleMatrix.push(measure.qFallbackTitle);
         		if(measure.meastextcolor){
         			qTextColorMatrix.push(measure.meastextcolor.color);
         		}else{
         			qTextColorMatrix.push(measure.meascolor.color);
         		}
         		
         		qColorMatrix.push(measure.meascolor.color);
         		if(measure.meascolor.color == '#ffffff'){
         			qTextColor.push('#7b7a78')
         		}else{
         			qTextColor.push('#ffffff')
         		}
         		qSizeMatrix.push(measure.meassize);
         		qAlignMatrix.push(measure.measalign);
         		qFontMatrix.push(measure.measfont);
         		qLimitBool.push(measure.measlimitbool);
         		qLimitNum.push(measure.measlimitnum);
         		qLimitColor.push(measure.measlimitcolor.color);
         		qLimitColorTextBool.push(measure.measlimitcolortextbool);
         	})

			var qVal    = layout.qHyperCube.qGrandTotalRow[0].qNum;
            var qTxt    = layout.qHyperCube.qGrandTotalRow[0].qText;   
            var vExtraText = layout.extrattext;     
            var compareMaxVal = 80;
            if(layout.extratbool){
            	qTxt += '  ' + vExtraText;
            	compareMaxVal = 60;
            }    
            var qTitle  = qTitleMatrix[0];   
            var qFont   = qFontMatrix[0];
            
            var qLimitB = qLimitBool[0];
            var qLimitN = qLimitNum[0];
            var qLimitC = qLimitColor[0];
            var qLimitT = qLimitColorTextBool[0];
            
            var showMeasTitle = layout.showmeastitle;
            var minVal = layout.minValue;
            var maxVal = layout.maxValue;	  
            var animeSecs = layout.animeSecs + 's';          
            var backgroundcolor  = qColorMatrix[0];
            var textcolor = qTextColor[0];
            if(qLimitB && qLimitN >= qVal){
            	backgroundcolor = qLimitC;
            	if(qLimitC != '#ffffff'){
            		textcolor = '#ffffff';
            	}
            	if(qLimitT){
            		qTextColorMatrix[0] = qLimitC;
            	}
            }
           
            var qBorderBool = layout.borderbool;
            var qBorderColor = layout.bordercolor.color;
            var qBorderWidth = layout.borderwidth + 'px';
            var qBackgroundBox = 'transparent';

            if(!layout.backgroundbool){
            	qBackgroundBox = layout.backgroundcolorbox.color;
            }
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
              console.log(qTxt.length,cssWidth,compareMaxVal)         
            if(cssWidth>compareMaxVal){
            	if(cssWidth>100){ 
            		cssWidth = 100;
            	}
            	cssRadius = '20px 20px 0px 20px';	            	
            	switch ( true ) {
					case (qTxt.length<5):
						cssMarginLeft  = '-50px';
						cssAMarginLeft = '-45px';
						cssMaxWidth = qTxt.length * 13 + 'px';
						break;
					case (qTxt.length==5):
						cssMarginLeft  = '-65px';
						cssAMarginLeft = '-55px';
						cssMaxWidth = qTxt.length * 13 + 'px';
						break;
					case (qTxt.length==6):
						cssMarginLeft  = '-80px';
						cssAMarginLeft = '-65px';
						cssMaxWidth = qTxt.length * 13 + 'px';
						break;
					case (qTxt.length>6 && qTxt.length<11):
						cssMarginLeft  = '-100px';
						cssAMarginLeft = '-85px';
						cssMaxWidth = qTxt.length * 13 + 'px';
						break;
					case (qTxt.length>10):
						cssMarginLeft  = '-120px';
						cssAMarginLeft = '-105px';
						cssMaxWidth = qTxt.length * 10 + 'px';
						console.log('entro',cssMaxWidth)
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
				'<div class="skills-box" style = "--my-border-width:' + qBorderWidth + ';--my-border-color:' + qBorderColor + ';background:' + qBackgroundBox +'">' +
					'<div class="skills-container">' +
						'<div class="skills skills-color" style = "--my-anime-secs:' + animeSecs + ';--my-anime-width:' + cssWidth + '%;--my-max-width: ' + cssMaxWidth + ';--my-color-var: ' + backgroundcolor + ';color:' + textcolor + ';--my-border-radius:' + cssRadius + ';--my-margin-left: ' + cssMarginLeft + ' ">' +
							'<a class="skills-a" style = "--my-a-margin-left: ' + cssAMarginLeft + ';--my-anime-secs: ' + animeSecs + ';font-family:' + qFont + '">' + qTxt + '</a>' +
						'</div>' +							
					'</div>';
					if(showMeasTitle){
						html += '<div class="skills-content">' +
	                        '<h5 class="skills-title" style = "font-family:' + qFont + ';--my-color-var: ' + qTextColorMatrix[0] + ';font-size:' + qSizeMatrix[0] + 'px">' + qTitle + '</h5>' +
                    	'</div>';
                    }
            
            if(qSizeMatrix.length > 1){
				var txtval1 = layout.qHyperCube.qGrandTotalRow[1].qText;
				if(qLimitBool[1] && qLimitNum[1] >= layout.qHyperCube.qGrandTotalRow[1].qNum){
	            	qColorMatrix[1] = qLimitColor[1];
	            	if(qLimitColorTextBool[1]){
            			qTextColorMatrix[1] = qLimitColor[1];
            		}
	            }

            	html += '<table class="skills-table">' +                     
				'<tr class="tr-first" style = "--my-first-size:' + qSizeMatrix[1] + 'px">' +
					'<td style = "font-family:' + qFontMatrix[1] + ';">' + qTitleMatrix[1] +'</td>' +
					'<td style = "font-family:' + qFontMatrix[1] + ';text-align:' + qAlignMatrix[1] + ';color:' + qColorMatrix[1] + '">' + txtval1 + '</td>' +
				'</tr>';
				
				if(qSizeMatrix.length > 2){		
					var txtval2 = layout.qHyperCube.qGrandTotalRow[2].qText;
					if(qLimitBool[2] && qLimitNum[2] >= layout.qHyperCube.qGrandTotalRow[2].qNum){
	            		qColorMatrix[2] = qLimitColor[2];
	            		if(qLimitColorTextBool[2]){
            				qTextColorMatrix[2] = qLimitColor[2];
            			}
	            	}
					html += '<tr class="tr-second" style = "--my-second-size:' + qSizeMatrix[2] + 'px">' +
						'<td style = "font-family:' + qFontMatrix[2] + ';color:' + qTextColorMatrix[2] + '">' + qTitleMatrix[2] +'</td>' +
						'<td style = "font-family:' + qFontMatrix[2] + ';text-align:' + qAlignMatrix[2] + ';color:' + qColorMatrix[2] + '">' + txtval2 + '</td>' +
					'</tr>';											
				}

				if(qSizeMatrix.length > 3){		
					var txtval3 = layout.qHyperCube.qGrandTotalRow[3].qText;
					if(qLimitBool[3] && qLimitNum[3] >= layout.qHyperCube.qGrandTotalRow[3].qNum){
	            		qColorMatrix[3] = qLimitColor[3];
	            		if(qLimitColorTextBool[3]){
            				qTextColorMatrix[3] = qLimitColor[3];
            			}
	            	}
					html += '<tr class="tr-second" style = "font-family:' + qFontMatrix[3] + ';--my-second-size:' + qSizeMatrix[3] + 'px">' +
						'<td style = "font-family:' + qFontMatrix[3] + ';color:' + qTextColorMatrix[3] + '">' + qTitleMatrix[3] +'</td>' +
						'<td style = "font-family:' + qFontMatrix[3] + ';text-align:' + qAlignMatrix[3] + ';color:' + qColorMatrix[3] + '">' + txtval3 + '</td>' +
					'</tr>';											
				}

				if(qSizeMatrix.length > 4){		
					var txtval4 = layout.qHyperCube.qGrandTotalRow[4].qText;
					if(qLimitBool[4] && qLimitNum[4] >= layout.qHyperCube.qGrandTotalRow[4].qNum){
	            		qColorMatrix[4] = qLimitColor[4];
	            		if(qLimitColorTextBool[4]){
            				qTextColorMatrix[4] = qLimitColor[4];
            			}
	            	}
					html += '<tr class="tr-second" style = "font-family:' + qFontMatrix[4] + ';--my-second-size:' + qSizeMatrix[4] + 'px">' +
						'<td style = "font-family:' + qFontMatrix[4] + ';color:' + qTextColorMatrix[4] + '">' + qTitleMatrix[4] +'</td>' +
						'<td style = "font-family:' + qFontMatrix[4] + ';text-align:' + qAlignMatrix[4] + ';color:' + qColorMatrix[4] + '">' + txtval4 + '</td>' +
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
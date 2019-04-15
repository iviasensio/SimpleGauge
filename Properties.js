define([], function () {
    var vFontFamily = [{
                        value: "Heebo, sans-serif",
                        label: "Heebo"
                    },{
                        value: "QlikView Sans, sans-serif",
                        label: "QlikView Sans"
                    },{
                        value: "Arial",
                        label: "Arial"
                    }, {
                        value: "Calibri",
                        label: "Calibri"
                    }, {
                        value: "Comic Sans MS",
                        label: "Comic Sans MS"
                    }, {
                        value: "sans-serif",
                        label: "MS Sans Serif"
                    }, {
                        value: "Tahoma",
                        label: "Tahoma"
                    }, {
                        value: "Verdana",
                        label: "Verdana"
                    }, {
                        value: "Brush Script MT",
                        label: "Brush Script MT"
                    }, {
                        value: "Playfair Display, serif",
                        label: "Playfair Display"
                    }];
    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: {
                uses: "dimensions",
                min: 0,
                max: 0,
                show: false
            },
            measures: {
                uses: "measures",
                min: 1,
                max: 5,
                items: {
                    measColor: {
                        ref: "qDef.meascolor",
                        label: "Color",
                        type: "object",  
                        component: "color-picker",  
                        defaultValue: {  
                            color: "#4CAF50"  
                        }  
                    },
                    measSize: {
                        type: "number",
                        component: "slider",
                        label: "Letter Size",
                        ref: "qDef.meassize",
                        min: 10,
                        max: 25,
                        step: 1,
                        defaultValue: 18                                
                    },
                    measAlign: {
                        ref: "qDef.measalign",
                        type: "string",
                        component: "buttongroup",
                        options: [ {
                            value: 'left',
                            label: "left"
                        }, {
                            value: 'center',
                            label: "center"
                        }, {
                            value: "right",
                            label: "right"
                        }],
                        defaultValue: "center"                           
                    },
                    measFont: {
                        ref: "qDef.measfont",
                        type: "string",
                        component: "dropdown",
                        label: "Font Family",
                        options: vFontFamily,
                        defaultValue: "sans-serif"                        
                    }
                }
            },
            sorting: {
                uses: "sorting",
                show: false
            },
            settings: {
                uses: "settings",
                items: {
                    gaugeGroup: {
                        label: "Gauge settings",
                        type: "items",
                        items: {
                            minValue: {
                                type: "number",
                                ref: "minValue",
                                label: "minValue",
                                defaultValue: 0
                            },
                            maxValue: {
                                type: "number",
                                ref: "maxValue",
                                label: "maxValue",
                                defaultValue: 1
                            },                                                                        
                            animeSecs: {
                                type: "number",
                                ref: "animeSecs",
                                label: "Anime secs",
                                defaultValue: 2
                            },
                            borderBool: {
                                ref : "borderbool",
                                type : "boolean",
                                component : "switch",
                                label : "Set a border",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            borderColor: {
                                ref: "bordercolor",
                                label: "Border color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: "#f2f2f2"  
                                },
                                show : function(data) {
                                    return  data.borderbool;
                                }
                            },
                            borderWidth: {
                                type: "number",
                                component: "slider",
                                label: "Border width",
                                ref: "borderwidth",
                                min: 1,
                                max: 5,
                                step: 1,
                                defaultValue: 1,
                                show : function(data) {
                                    return  data.borderbool;
                                }                               
                            },
                            paragraphBool: {
                                ref : "extrapbool",
                                type : "boolean",
                                component : "switch",
                                label : "Extra paragraph",
                                options: [{
                                    value: true,
                                    label: "On"
                                }, {
                                    value: false,
                                    label: "Off"
                                }],
                                defaultValue: false
                            },
                            extraParagraph: {
                                ref : "extraptext",
                                label : "Extra paragraph", 
                                expression : "optional",
                                type : "string",
                                defaultValue : '',
                                show : function(data) {
                                    return  data.extrapbool;
                                }                                
                            },
                            extraParagraphSize: {
                                type: "number",
                                component: "slider",
                                label: "Letter Size",
                                ref: "extrapsize",
                                min: 10,
                                max: 25,
                                step: 1,
                                defaultValue: 18,
                                show : function(data) {
                                    return  data.extrapbool;
                                }                                
                            },
                            extraParagraphColor: {
                                ref: "extrapcolor",
                                label: "Text color",
                                type: "object",  
                                component: "color-picker",  
                                defaultValue: {  
                                    color: "#545352"  
                                },
                                show : function(data) {
                                    return  data.extrapbool;
                                }
                            },
                            extraParagraphFont: {
                                ref: "extrapfont",
                                type: "string",
                                component: "dropdown",
                                label: "Font Family",
                                options: vFontFamily,
                                defaultValue: "Playfair Display, serif",
                                show : function(data) {
                                    return data.extrapbool;
                                }
                            }
                        }
                    }                
                }
            }
        }
    }
});
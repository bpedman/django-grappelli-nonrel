function CustomFileBrowser(field_name, url, type, win) {
    
    var cmsURL = "/admin/filebrowser/?pop=2";
    cmsURL = cmsURL + "&type=" + type;
    
    tinyMCE.activeEditor.windowManager.open({
        file: cmsURL,
        width: 820,  // Your dimensions may differ - toy around with them!
        height: 500,
        resizable: "yes",
        scrollbars: "yes",
        inline: "no",  // This parameter only has an effect if you use the inlinepopups plugin!
        close_previous: "no",
    }, {
        window: win,
        input: field_name,
        editor_id: tinyMCE.selectedInstance.editorId,
    });
    return false;
}

function CustomCleanup(type, value) {
    switch (type) {
        case "get_from_editor":
            // remove multiple spaces
            value = value.replace(/\s{2,}/g, "&nbsp;");
            // remove multiple breaks
            value = value.replace(/(\<br \/\>){2,}/g, "<br />");
            // remove empty paragraphs
            value = value.replace(/\<p\>\s+\<\/p\>/g, "");
            value = value.replace(/\<p\>\<br \/\>\s\<\/p\>/g, "");
            value = value.replace(/\<p\>\s\<br \/\>\<\/p\>/g, "");
            // remove empty headlines
            value = value.replace(/\<h1\>\s+\<\/h1\>/g, "");
            value = value.replace(/\<h2\>\s+\<\/h2\>/g, "");
            value = value.replace(/\<h3\>\s+\<\/h3\>/g, "");
            value = value.replace(/\<h4\>\s+\<\/h4\>/g, "");
            value = value.replace(/\<h1\>(\&nbsp\;)+\<\/h1\>/g, "");
            value = value.replace(/\<h2\>(\&nbsp\;)+\<\/h2\>/g, "");
            value = value.replace(/\<h3\>(\&nbsp\;)+\<\/h3\>/g, "");
            value = value.replace(/\<h4\>(\&nbsp\;)+\<\/h4\>/g, "");
            // remove headlines with breaks
            value = value.replace(/\<h1\>\<br \/\>\<\/h1\>/g, "");
            value = value.replace(/\<h2\>\<br \/\>\<\/h2\>/g, "");
            value = value.replace(/\<h3\>\<br \/\>\<\/h3\>/g, "");
            value = value.replace(/\<h4\>\<br \/\>\<\/h4\>/g, "");
            // remove empty listelements
            value = value.replace(/\<li\>\s+\<\/li\>/g, "");
            value = value.replace(/\<li\>\s+\<br \/\>\<\/li\>/g, "");
            value = value.replace(/\<li\>\<br \/\>\<\/li\>/g, "");
            value = value.replace(/\<ol\>\s+\<\/ol\>/g, "");
            value = value.replace(/\<ul\>\s+\<\/ul\>/g, "");
    }
    return value;
}


tinyMCE.init({
    
    // main settings
    mode: "textareas",
    //elements: "summary, body",
    theme: "advanced",
    language: "de",
    skin: "grappelli",
    browsers: "gecko",
    dialog_type: "window",
    
    // general settings
    width: '700',
    height: '300',
    indentation : '10px',
    fix_list_elements : true,
    relative_urls: false,
    remove_script_host : true,
    accessibility_warnings : false,
    object_resizing: false,
    cleanup_on_startup: true,
    //forced_root_block: "p",
    remove_trailing_nbsp: true,
    
    // callbackss
    file_browser_callback: "CustomFileBrowser",
    //cleanup_callback : "CleanupCallback",
    execcommand_callback : "myCustomExecCommandHandler",
    
    // theme_advanced
    theme_advanced_toolbar_location: "top",
    theme_advanced_toolbar_align: "left",
    theme_advanced_statusbar_location: "bottom",
    theme_advanced_buttons1: "formatselect,styleselect,|,bold,italic,underline,|,bullist,numlist,blockquote,|,undo,redo,|,link,unlink,|,image,|,fullscreen,|,grappelli_adv",
    theme_advanced_buttons2: "search,|,pasteword,template,media,charmap,|,code,|,table,cleanup,grappelli_documentstructure",
    theme_advanced_buttons3: "",
    theme_advanced_path: false,
    theme_advanced_blockformats: "p,h2,h3,h4,pre",
    theme_advanced_styles: "[all] clearfix=clearfix;[p] small=small;[img] Image left-aligned=img_left;[img] Image left-aligned (nospace)=img_left_nospacetop;[img] Image right-aligned=img_right;[img] Image right-aligned (nospace)=img_right_nospacetop;[img] Image Block=img_block;[img] Image Block (nospace)=img_block_nospacetop;[div] column span-2=column span-2;[div] column span-4=column span-4;[div] column span-8=column span-8",
    theme_advanced_resizing : true,
    theme_advanced_resize_horizontal : false,
    theme_advanced_resizing_use_cookie : true,
    theme_advanced_styles: "Image left-aligned=img_left;Image left-aligned (nospace)=img_left_nospacetop;Image right-aligned=img_right;Image right-aligned (nospace)=img_right_nospacetop;Image Block=img_block",
    advlink_styles: "intern=internal;extern=external",
    
    // plugins
    plugins: "advimage,advlink,fullscreen,paste,media,searchreplace,grappelli,grappelli_contextmenu,template",
    advimage_update_dimensions_onchange: true,
    
    // table-div plugin
    table_styles: "24=column span-24;23=column span-23;22=column span-22;21=column span-21;20=column span-20;19=column span-19;18=column span-18;17=column span-17;16=column span-16;15=column span-15;14=column span-14;13=column span-13;12=column span-12;11=column span-11;10=column span-10;9=column span-9;8=column span-8;7=column span-7;6=column span-6;5=column span-5;4=column span-4;3=column span-3;2=column span-2;1=column span-1",
    
    // grid-plugin
    grid_templates: [
        {
            title: "2 Unterteilungen, symmetrisch",
            columns: 2,
            description: "2 Unterteilungen über die gesamte Breite mit jeweils 2 Unterbereichen.",
            src: '<table class="column span-12 last"><tr><td class="column span-6"><p></p></td><td class="column span-6 last"><p></p></td></tr></table>'
        },
        {
            title : "4 Unterteilungen, symmetrisch",
            columns: 4,
            description: "4 Unterteilungen über die gesamte Breite mit jeweils 4 Unterbereichen.",
            src: '<table class="column span-12 last"><tr><td class="column span-3"><p></p></td><td class="column span-3"><p></p></td><td class="column span-3"><p></p></td><td class="column span-3 last"><p></p></td></tr></table>'
        },
    ],
    
    // grappelli settings
    grappelli_adv_hidden: false,
    grappelli_show_documentstructure: 'on',
    
    // templates
    template_templates : [
        {
            title : "2 Spalten, symmetrisch",
            src : "/grappelli/tinymce/templates/2col/",
            description : "Symmetrical 2 Columns."
        },
        {
            title : "2 Spalten, symmetrisch mit Unterteilung",
            src : "/grappelli/tinymce/templates/4col/",
            description : "Asymmetrical 2 Columns: big left, small right."
        },
    ],
    
    elements
    valid_elements : ""
    + "-p,"
    + "a[href|target=_blank|class],"
    + "-strong/-b,"
    + "-em/-i,"
    + "-u,"
    + "-ol,"
    + "-ul,"
    + "-li,"
    + "br,"
    + "img[class|src|alt=|width|height]," + 
    + "-h2,-h3,-h4," + 
    + "-pre," +
    + "-blockquote," +
    + "-code," + 
    + "-div",
    extended_valid_elements: ""
    + "a[name|class|href|target|title|onclick],"
    + "img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],"
    + "br[clearfix],"
    + "-p[class<clearfix?summary?code],"
    + "h2[class<clearfix],h3[class<clearfix],h4[class<clearfix],"
    + "ul[class<clearfix],ol[class<clearfix],"
    + "div[class],"
    + "object[align<bottom?left?middle?right?top|archive|border|class|classid"
      + "|codebase|codetype|data|declare|dir<ltr?rtl|height|hspace|id|lang|name"
      + "|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
      + "|onmouseout|onmouseover|onmouseup|standby|style|tabindex|title|type|usemap"
      + "|vspace|width],"
    +"param[id|name|type|value|valuetype<DATA?OBJECT?REF],",
    valid_child_elements : ""
    + "h1/h2/h3/h4/h5/h6/a[%itrans_na],"
    + "table[thead|tbody|tfoot|tr|td],"
    + "strong/b/p/div/em/i/td[%itrans|#text],"
    + "body[%btrans|#text]",
    

    
});



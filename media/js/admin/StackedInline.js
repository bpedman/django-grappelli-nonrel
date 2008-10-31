$(document).ready(function(){
    
    /// BEHAVIOUR
    /// DELETED ITEMS will be moved to the end of the group.
    /// In case of an Error, deleted stay at this position.
    /// EXTRA ITEMS stay at their position, if they are not empty.
    /// In case of an Error, empty extra items are moved to the end of
    /// the list (just before predeleted items).
    
    /// STACKEDINLINE / BUTTONS
    $('div[name="inlinegroup"] a.closehandler').bind("click", function(){
        $(this).parent().parent().parent().find('div[name="inlinerelated"]').addClass('collapsed');
    });
    $('div[name="inlinegroup"] a.openhandler').bind("click", function(){
        $(this).parent().parent().parent().find('div[name="inlinerelated"]').removeClass('collapsed');
    });
    $('div[name="inlinegroup"] a.addhandler').bind("click", function(){
        new_item = $(this).parent().parent().parent().find('.items div[name="inlinerelated"]:last').clone(true).appendTo($(this).parent().parent().parent().children('.items'));
        new_item = $(this).parent().parent().parent().find('.items div[name="inlinerelated"]:last');
        items = $(this).parent().parent().parent().find('div[name="inlinerelated"]').length;
        /// change header
        header = new_item.find('h2:first').text().split("#");
        new_header = "<b>" + header[0] + "#" + parseInt(items) + "</b>";
        new_item.find('h2:first').html(new_header);
        /// replace IDs, NAMEs, HREFs & FORs ...
        new_html = new_item.html().replace(/-\d+-/g, "-" + parseInt(items - 1) + "-");
        new_item.html(new_html);
        /// reset all form-fields
        new_item.find(':input').val('');
        /// set TOTAL_FORMS to number of items
        new_item.parent().parent().find('input[id*="TOTAL_FORMS"]').val(parseInt(items));
        /// FILEBROWSER SPECIFIC: remove image preview
        new_item.find('img.preview').each(function(i) {
            $(this).attr('src', '');
            $(this).parent().parent().hide();
        });
        /// remove error-lists and error-classes
        new_item.find('ul.errorlist').remove();
        new_item.find('div[class*="errors"]').removeClass("errors");
        /// remove delete-button and button view on site
        new_item.find('a.deletelink').remove();
        new_item.find('a.viewsitelink').remove();
        /// add collapse-functionality
        new_item.find('h2.collapse-toggle').bind("click", function(e){
            $(this).parent().toggleClass('collapsed');
        });
    });
    
    /// DELETELINK
    $('div[name="inlinegroup"] input[name*="DELETE"]').hide();
    $('div[name="inlinerelated"] a.deletelink').bind("click", function(){
        $(this).prev('input').attr('checked', !$(this).prev('input').attr('checked'));
        delete_item = $(this).parent().parent().parent();
        if (delete_item.parent().hasClass('predelete-items')) {
            new_item = delete_item.clone(true).appendTo(delete_item.parent().prev());
        } else {
            new_item = delete_item.clone(true).appendTo(delete_item.parent().next());
        }
        delete_item.remove();
    });
    
    // REORDER INLINE-RELATED
    $('div[name="inlinegroup"].sortable').each(function(i) {
        items = new Array();
        predeleted_items_count = $(this).find('input[name*="DELETE"]:checked').length;
        empty_counter = $(this).find('input[value][id*="order"]').length - predeleted_items_count;
        $(this).find('div.inline-related').each(function(i) {
            /// if order field is not set (which is for empty items), set the counter
            /// so that these fields are shown before the predeleted_items
            if ($(this).find('input[id*="order"]').val()) {
                order_value = $(this).find('input[id*="order"]').val();
            } else {
                order_value = empty_counter;
                empty_counter++;
            }
            $(this).find('input[id*="order"]').val(order_value);
            items[parseInt(order_value)] = $(this);
        });
        items.sort();
        $(this).children('div.inline-related').remove();
        for (var i = 0; i < items.length; i++) {
            predelete_flag = $(items[i]).find('input[name*="DELETE"]:checked').length;
            if (predelete_flag) {
                $(this).children('.predelete-items').append(items[i]);
            } else {
                $(this).children('.items').append(items[i]);
            }
        }
    });
    
    // hide all ORDER inputs and their parent DIV
    // $('div[name="inlinerelated"] input[name*="order"]').hide();
    // $('div[name="inlinerelated"] input[name*="order"]').parent().hide();
    
    /// DRAG & DROP
    $('div[name="inlinegroup"] a.draghandler').mousedown(function(){
        // close all inline-related fieldsets before sorting
        $(this).parent().parent().parent().parent().children('div.inline-related').addClass('collapsed');
    });
    $('div[name="inlinegroup"].sortable .items').sortable({
        axis: 'y',
        items: 'div.inline-related',
        handle: '.draghandler',
        placeholder: 'placeholder',
        tolerance: 'intersect',
        helper: function(e, el) {
            $("div.sortablehelper").find('h2:first').text(el.find('h2:first').text());
            return $("div.sortablehelper")
                .clone()
                .width(el.width() + 'px')
                .height(el.height() + 'px');
        },
        update: function(e, ui) {
            /// remove display:block, generated by UI sortable
            $(this).removeAttr('style');
        }
    });
    
    // set ORDER_FIELDS on submit
    $("form").submit(function() {
        $('div[name="inlinegroup"].sortable').each(function() {
            counter = 0;
            predelete_counter = $(this).find('div.inline-related').length - $(this).find('input[name*="DELETE"]:checked').length;;
            //order_values = "INITIAL FORMS: " + $(this).find('input[id*="INITIAL_FORMS"]').val() + " / ";
            //order_values = order_values + "TOTAL FORMS: " + $(this).find('input[id*="TOTAL_FORMS"]').val() + " / ";
            //order_values = order_values + "ORDER: "
            $(this).find('div.inline-related').each(function(i) {
                input_values = "";
                fields = $(this).find(':input:not([name*="order"])').serializeArray();
                $.each(fields, function(i, field) {
                    input_values += field.value;
                });
                predelete_flag = $(this).find('input[name*="DELETE"]:checked').length;
                if (input_values == "") {
                    /// clear order-field for empty items
                    $(this).find('input[id*="order"]').val('');
                } else if (predelete_flag) {
                    /// reset order-field for predelete-item
                    $(this).find('input[id*="order"]').val(predelete_counter);
                    predelete_counter = predelete_counter + 1;
                } else {
                    /// reset order-field
                    $(this).find('input[id*="order"]').val(counter);
                    counter = counter + 1;
                }
                //$(this).find('input[id*="order"]').val(i);
                //order_values = order_values + $(this).find('input[id*="order"]').val() + " / ";
            });
            //$(this).find('input[id*="TOTAL_FORMS"]').val(counter);
            //order_values = order_values + "NEW TOTAL FORMS: " + $(this).find('input[id*="TOTAL_FORMS"]').val();
        });
        //alert(order_values);
        //return false;
    });
    
});




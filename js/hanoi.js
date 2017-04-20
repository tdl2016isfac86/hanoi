$(document).ready(function(){
   refreshDraggables();
   moves = 0;
});

function moveChildInDom(parent, child){
    $(child).detach();
    var target = parent;
    var next = target.children();
    
    while(next.length){
        target = next;  
        next = next.children();
    }
    $(target).append(child);
    moves++;
    $("#count").html(moves);
}

function refreshDraggables(){
    
     $('.base').each(function(){
        $(this).droppable({
            drop: function(event, ui){
                moveChildInDom($(this), $(ui.draggable));
                //$(ui.draggable).css({'top' : '0','left': '0'});
                var drop_el = $(this).offset();
                var drag_el = ui.draggable.offset();
                var left_end = (drop_el.left + ($(this).width() / 2)) - (drag_el.left + (ui.draggable.width() / 2));
                var top_end = (drop_el.top + ($(this).height() / 2)) - (drag_el.top + (ui.draggable.height() / 2));
                ui.draggable.animate({
                    top: '+=' + top_end,
                    left: '+=' + left_end
                });
                refreshDraggables();
            },
            accept: function(draggable){
                var target = $(this);
                var next = target.children();
                
                while ( next.length ){
                    target = next;
                    next = next.children();
                }
                
                var id = $(target).attr('id'); 
                var childNumber = 0;
                var draggableNumber = 0;
                
                if(id === "a" || id === "b" || id === "c"){ //Block is empty
                    return true;
                } else {
                    childNumber = parseInt(id.substr(1,id.length-1)); //parse child id to get number
                    draggableNumber = parseInt($(draggable).attr('id').substr(1,$(draggable).attr('id').length - 1)); //same for draggable id
                    if (draggableNumber < childNumber ){ //disc being placed is smaller than disc already in place
                        return true
                    }
                }
                return false;
            }
        });
        
        
        var target = $(this).children();
        var next = target;
            
        while( next.length ){
            target = next;
            next = next.children();
            if(target.draggable("instance") != undefined){
                target.draggable({
                    disabled: true
                });
            }
            
        }
        
        $(target).draggable({
            disabled: false,
            revert: "invalid"
        });
        
    });
}

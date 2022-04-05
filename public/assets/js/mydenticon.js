$('#make-identicon').click(function () {
    var input = $('#input_name').val();
    var md5hash = $.md5(input);
    $("#input-hash").text(md5hash);
    $('#identicon5-test').text(md5hash);
    var truncatedhashint = parseInt(md5hash.substring(0, 8), 16);
    $('#donpark-canvas').attr("title", "donpark " + truncatedhashint);
    render_identicon_canvases('donpark');
    $('#identicon5-test').identicon5({ size: 50 });
    make_identicon($("#dk-identicon"), md5hash);
});
function make_identicon(target, hash) {
    var grid_size = 5; //define the grid size (n x n )
    var border_size = 15; //unsued
    var square_size = 20; //the size of the squares that will be painted
    var step_size = square_size; //Reduce as necessary

    if (hash.length < 11) {
        //Not enough information
        //Won't be hit in this version, but necessary for plugin since user will provide their own hash
        return;
    }

    var color = hash.substring(hash.length - 6); //get last characters = 24 bits (for color information)
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", grid_size * square_size);
    canvas.setAttribute("height", grid_size * square_size);
    var context = canvas.getContext("2d");
    context.fillStyle = "#" + color;
    // context.fillStyle = "#" + (parseInt("FFFFFF", 16) - parseInt(color, 16)).toString(16); //Inverted color if you please
    var posx = 0;
    var posy = 0;
    var x = 0;
    var y = 0;
    var truncatedhash = hash.toString().substring(0, 8); //truncate and take first 8 characters => each hex character = 4 bits so total is 32 bits
   // var binaryhash = parseInt(truncatedhash, 16).toString(2); //unused. Fixed bug with bitshifting of integer
    var inthash = parseInt(truncatedhash, 16);

    var max_steps = (grid_size % 2 == 0) ? ((grid_size * grid_size) / 2) : ((grid_size * (grid_size + 1)) / 2); //unused
    for (var i = 0; i < max_steps; i++) {
            if((inthash & 1) == 1) {
            //turn square on
            posx = x * (square_size);
            posy = y * (square_size);
            context.fillRect(posx, posy, square_size, square_size);
            //Mirror image to other half
            context.fillRect((grid_size - x - 1) * square_size, posy, square_size, square_size);

        }
      
        inthash >>= 1; //shift right by 1 bit

        y += 1; //move down by one unit
        if (y == grid_size) {
            //Reached a border, loop around and move to the right
            x += 1;
            y = 0;
        }
    }

    target.html($(canvas));

}
function get(){
    var input = $('#input_name').val();
    var md5hash = $.md5(input);
    $("#input-hash").text(md5hash);
    $('#identicon5-test').text(md5hash);
    var truncatedhashint = parseInt(md5hash.substring(0, 8), 16);
    $('#donpark-canvas').attr("title", "donpark " + truncatedhashint);
    render_identicon_canvases('donpark');
    $('#identicon5-test').identicon5({ size: 50 });
    make_identicon($("#dk-identicon"), md5hash);
}
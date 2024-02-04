var player1 = []
var player2 = []
var fields1 = ["upper_left", "upper_middle", "upper_right", "middle_left", "middle_middle", "middle_right", "bottom_left", "bottom_middle", "bottom_right"]
var fields2 = fields1
var turn = "player"


function new_pressed(event)
{
    player1 = []
    player2 = []
    fields1 = ["upper_left", "upper_middle", "upper_right", "middle_left", "middle_middle", "middle_right", "bottom_left", "bottom_middle", "bottom_right"]
    fields2 = fields1
    turn = "player"
  
    for (let field of fields1)
    {
        document.getElementById(field).innerHTML = ""
    }
    document.getElementById("error").innerHTML = ""
    document.getElementById("error2").innerHTML = ""
}


function field_pressed(event)
{
    document.getElementById("error").innerHTML = ""
    document.getElementById("error2").innerHTML = ""
    if (fields2.length > 0)
    {
        if (turn == "player")
        {
            let trigger = event.srcElement;
            let field = trigger.id

            if (check_field(fields2, field) == true)
            {
                document.getElementById(trigger.id).innerHTML = "X"
                player1.push(trigger.id)
                
                let index = fields2.indexOf(trigger.id);
                //delete fields2[index]
                //console.log(index)
                fields2.splice(index, 1)

                turn = "computer"

                if (check_win(player1) == true)
                {
                    document.getElementById("error2").innerHTML = "Spieler hat gewonnen"
                    turn = "none"
                }

                if (fields2.length > 0)
                {
                    //console.log(field, player1, player2, fields2)
                    //console.log("h")
                    if (turn == "computer")
                    {
                        //console.log("C")
                        //document.getElementById("error").innerHTML = "Warte"

                        let field = generate_field(fields2, player1, player2)
                        player2.push(field)
                        let index = fields2.indexOf(field);
                        //delete fields2[index]
                        fields2.splice(index, 1)

                        //document.getElementById("error").innerHTML = ""

                        //console.log(field, player1, player2, fields2)

                        document.getElementById(field).innerHTML = "O"

                        turn = "player"

                        if (check_win(player2) == true)
                        {
                            document.getElementById("error2").innerHTML = "Computer hat gewonnen"
                            turn = "none"
                        }
                    }
                }
                else
                {
                    document.getElementById("error").innerHTML = "Unentschieden"
                    turn = "none"
                }
            } 

            else
            {
                document.getElementById("error2").innerHTML = "Wähle ein anderes Feld"
            }
        }
    }
    else
    {
        document.getElementById("error").innerHTML = "Unentschieden"
        turn = "none"
    }
}


function check_field(fields2, field)
{
    if (fields2.includes(field))
    {
        return true
    }
    return false
}


function check_win(player)
{
    if (player.includes("upper_left") && player.includes("upper_middle") && player.includes("upper_right") || player.includes("middle_left") && player.includes("middle_middle") && player.includes("middle_right") || player.includes("bottom_left") && player.includes("bottom_middle") && player.includes("bottom_right") || player.includes("upper_left") && player.includes("middle_middle") && player.includes("bottom_right") || player.includes("upper_right") && player.includes("middle_middle") && player.includes("bottom_left") || player.includes("upper_left") && player.includes("middle_left") && player.includes("bottom_left") || player.includes("upper_middle") && player.includes("middle_middle") && player.includes("bottom_middle") || player.includes("upper_right") && player.includes("middle_right") && player.includes("bottom_right"))
    {
        return true
    }
    else
    {
        return false
    }
}


function generate_field(fields2, player, player2)
{
    if (check_win(player) == true ||check_win(player2) == true || player1.length + player2.length > 8)
    {
        console.log(2)
        return none
    }
    let board = JSON.parse(JSON.stringify(fields2));
    let player_copy = JSON.parse(JSON.stringify(player));
    let player2_copy = JSON.parse(JSON.stringify(player2));
    let field = best_player2(board, player_copy, player2_copy).move

    return field
}


function best_player(board, player, player2) {
    //console.log(board, player, player2);
    if (check_win(player) == true || check_win(player2) == true || player.length + player2.length > 8) {
        return { move: "a", value: utility(player, player2) };
    }
    var v = 2;

    for (let move of board) {
        let board2 = JSON.parse(JSON.stringify(board));
        let index = board2.indexOf(move);
        board2.splice(index, 1);

        let player_2 = JSON.parse(JSON.stringify(player));
        player_2.push(move);
        let v_other = best_player2(board2, player_2, player2).value;
        if (v > v_other) {
            v = v_other;
            var best = move;
        }
    }
    //console.log(best, v);
    return { move: best, value: v };
}

function best_player2(board, player, player2) {
    //console.log(board, player, player2);
    if (check_win(player) == true || check_win(player2) == true || player.length + player2.length > 8) {
        return { move: "a", value: utility(player, player2) };
    }
    var v = -2;

    for (let move of board) {
        let board2 = JSON.parse(JSON.stringify(board));
        let index = board2.indexOf(move);
        board2.splice(index, 1);

        let player2_2 = JSON.parse(JSON.stringify(player2));
        player2_2.push(move);
        let v_other = best_player(board2, player, player2_2).value;
        if (v < v_other) {
            v = v_other;
            var best = move;
        }
    }
    //console.log(best, v);
    return { move: best, value: v };
}

function utility(player, player2) {
    if (check_win(player) == true) {
        return -1;
    }
    if (check_win(player2) == true) {
        return 1;
    }
    return 0;
}
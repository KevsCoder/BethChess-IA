var board = null
var game = new Chess()
var positionCount = 0

var whiteSquareGrey = '#a9a9a9'
var blackSquareGrey = '#696969'

function piecesCount(board) {
    $(".whitePieces").empty()
    $(".blackPieces").empty()

    var countPawnsBlack = 0
    var countRocksBlack = 0
    var countKnightsBlack = 0
    var countQueenBlack = 0
    var countBishopsBlack = 0

    var countPawnsWhite = 0
    var countKnightsWhite = 0
    var countBishopsWhite = 0
    var countRooksWhite = 0
    var countQueenWhite = 0


    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            var piece = board[i][j]

            if (piece === null) {
                continue
            }

            if (piece.type === 'p') {
                if (piece.color === 'w') {
                    countPawnsWhite++
                } else {
                    countPawnsBlack++
                }

            }

            if (piece.type === 'n') {
                if (piece.color === 'w') {
                    countKnightsWhite++
                } else {
                    countKnightsBlack++
                }
            }


            if (piece.type === 'b') {
                if (piece.color === 'w') {
                    countBishopsWhite++
                } else {
                    countBishopsBlack++
                }
            }

            if (piece.type === 'r') {
                if (piece.color === 'w') {
                    countRooksWhite++
                } else {
                    countRocksBlack++
                }
            }


            if (piece.type === 'q') {
                if (piece.color === 'w') {
                    countQueenWhite++
                } else {
                    countQueenBlack++
                }
            }

        }
    }


    //WhitePawns
    for (var i = 0; i < 8 - countPawnsWhite; i++) $(".whitePieces").append('<img src="img/chesspieces/chess24/wP.png" alt="" width="30px" height="30px">')
    //BlackPawns
    for (var i = 0; i < 8 - countPawnsBlack; i++) $(".blackPieces").append('<img  style="float: left;" src="img/chesspieces/chess24/bP.png" alt="" width="30px" height="30px">')

    //WhiteRooks
    for (var i = 0; i < 2 - countRooksWhite; i++) $(".whitePieces").append('<img src="img/chesspieces/chess24/wR.png" alt="" width="30px" height="30px">')
    //BlackRocks
    for (var i = 0; i < 2 - countRocksBlack; i++) $(".blackPieces").append('<img src="img/chesspieces/chess24/bR.png" alt="" width="30px" height="30px">')

    //WhiteBishops
    for (var i = 0; i < 2 - countBishopsWhite; i++) $(".whitePieces").append('<img src="img/chesspieces/chess24/wB.png" alt="" width="30px" height="30px">')
    //BlackRocks
    for (var i = 0; i < 2 - countBishopsBlack; i++) $(".blackPieces").append('<img src="img/chesspieces/chess24/bB.png" alt="" width="30px" height="30px">')

    //WhiteKnights
    for (var i = 0; i < 2 - countKnightsWhite; i++) $(".whitePieces").append('<img src="img/chesspieces/chess24/wN.png" alt="" width="30px" height="30px">')
    //BlackKnights
    for (var i = 0; i < 2 - countKnightsBlack; i++) $(".blackPieces").append('<img src="img/chesspieces/chess24/bN.png" alt="" width="30px" height="30px">')

    //WhiteKnights
    for (var i = 0; i < 1 - countQueenWhite; i++) $(".whitePieces").append('<img src="img/chesspieces/chess24/wQ.png" alt="" width="30px" height="30px">')
    //BlackKnights
    for (var i = 0; i < 1 - countQueenBlack; i++) $(".blackPieces").append('<img src="img/chesspieces/chess24/bQ.png" alt="" width="30px" height="30px">')




}

function removeGreySquares() {
    $('#myBoard .square-55d63').css('background', '')
}

function greySquare(square) {
    var $square = $('#myBoard .square-' + square)

    var background = whiteSquareGrey
    if ($square.hasClass('black-3c85d')) {
        background = blackSquareGrey
    }

    $square.css('background', background)
}

function onDragStart(source, piece, position, orientation) {
    // do not pick up pieces if the game is over



    if (game.game_over()) {
        return false
    }

    // only pick up pieces for White
    if (piece.search(/^b/) !== -1) return false


}

function renderMoveHistory(moves) {
    var historyElement = $('#move-history').empty();
    historyElement.empty();
    for (var i = 0; i < moves.length; i = i + 2) {
        historyElement.append('<span>' + moves[i] + ' ' + (moves[i + 1] ? moves[i + 1] : ' ') + '</span><br>')
    }
    historyElement.scrollTop(historyElement[0].scrollHeight);

}

function makeBestMove() {





    positionCount = 0
    var depth = 3

    var bestMove = minimaxRoot(depth, game, true)


    game.move(bestMove)
    board.position(game.fen())
    
    if (game.game_over()) {
        swal("Se termino el juego!", "");
    }
    return bestMove





}

function minimaxRoot(depth, game, isMaximisingPlayer) {

    var gameMoves = game.moves()
    var bestValue = -100000
    var bestMove = null
    for (var i = 0; i < gameMoves.length; i++) {
        var newMove = gameMoves[i]
        game.move(newMove)

        var value = minimax(depth - 1, game, -100000, 100000, !isMaximisingPlayer)
        game.undo()



        if (value >= bestValue) {
            bestValue = value
            bestMove = newMove
        }
    }


    return bestMove

}

function minimax(depth, game, alpha, beta, isMaximisingPlayer) {
    positionCount++;
    if (depth === 0) {
      
        return -evaluateBoard(game.board());
    }

    var newGameMoves = game.moves()

    if (isMaximisingPlayer) {
        var bestMove = -9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } else {
        var bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
        
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }


}


function onDrop(source, target) {
    // see if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })

    // illegal move
    if (move === null) return 'snapback'

   
    // make random legal move for black
    window.setTimeout(makeBestMove, 250)



}


function getPieceValue(piece, x, y) {
    if (piece === null) {
        return 0
    }

    if (piece.type === 'p') {
        return piece.color === 'w' ? 10 + pawnEvalWhite[x][y] : -10 - pawnEvalBlack[x][y]
    }

    if (piece.type === 'n') {
        return piece.color === 'w' ? 30 + knightEval[x][y] : -30 - knightEval[x][y]
    }


    if (piece.type === 'b') {
        return piece.color === 'w' ? 31 + bishopEvalWhite[x][y]: -31 - bishopEvalBlack[x][y]
    }

    if (piece.type === 'r') {
        return piece.color === 'w' ? 50 + rookEvalWhite[x][y] : -50 - rookEvalBlack[x][y]
    }


    if (piece.type === 'q') {
        return piece.color === 'w' ? 90 + evalQueen[x][y]: -90 - evalQueen[x][y]
    }


    if (piece.type === 'k') {
        return piece.color === 'w' ? 1000 + kingEvalWhite[x][y] : -1000 - kingEvalBlack[x][y]
    }
}

function evaluateBoard(board) {
    var totalEvaluation = 0
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
        }
    }

    return totalEvaluation
}

function onMouseoutSquare(square, piece) {
    removeGreySquares()
}

function onSnapEnd() {
    piecesCount(game.board())
    board.position(game.fen())
    
}

function onMouseoverSquare(square, piece) {
    // get list of possible moves for this square
    var moves = game.moves({
        square: square,
        verbose: true
    })

    // exit if there are no moves available for this square
    if (moves.length === 0) return

    // highlight the square they moused over
    greySquare(square)

    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to)
    }
}



var reverseArray = function(array) {
    return array.slice().reverse();
};

var pawnEvalWhite =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  3,  3,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
    [
        [-5.0, -0, -3.0, -3.0, -3.0, -3.0, -0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

var bishopEvalWhite = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen =
    [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var kingEvalBlack = reverseArray(kingEvalWhite);



// --- Begin Example JS --------------------------------------------------------
const chess = new Chess();
var config = {
    draggable: true,
    position: 'start',
    showNotation: true,
    pieceTheme: 'img/chesspieces/chess24/{piece}.png',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
}
board = Chessboard('myBoard', config)
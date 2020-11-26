var board = null
var game = new Chess()
var positionCount = 0

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



    if (game.game_over()) {
        alert("Se acabo el juego")
    }

    positionCount = 0
    var depth = 2
    // var d = new Date().getTime()
    var bestMove = minimaxRoot(depth, game, true)
    // var d2 = new Date().getTime()
    // var moveTime = (d2 - d)
    // var positionPerS = (positionCount * 1000 / moveTime)

    game.move(bestMove)
    board.position(game.fen())
    return bestMove







}

function minimaxRoot(depth, game, isMaximisingPlayer) {

    var gameMoves = game.moves()
    var bestValue = -100000
    var bestMove = null

    for (var i = 0; i < gameMoves.length; i++) {
        var newMove = gameMoves[i]
        game.move(newMove)

        var value = minimax(depth - 1, game, !isMaximisingPlayer)
        game.undo()

        

        if (value >= bestValue) {
            bestValue = value
            bestMove = newMove
        }
    }

    return bestMove

}

function minimax(depth, game, isMaximisingPlayer) {
    positionCount++

    

    if (depth === 0) {

      
     
        return -evaluateBoard(game.board())
    }

    var newGameMoves = game.moves()
    var bestMove = null

    if (isMaximisingPlayer) {
        var bestValue = -10000

        for(var i=0;i<newGameMoves.length;i++){
            game.move(newGameMoves[i])
            bestMove = Math.max(bestValue, minimax(depth-1, game, isMaximisingPlayer))
            game.undo()
        }

        return bestMove

    } else {
        var bestValue = -10000

        for(var i=0;i<newGameMoves.length;i++){
            game.move(newGameMoves[i])

            if(game.in_checkmate()){
                
                
                game.undo()
                return -999999
      
            }

            bestMove = Math.max(bestValue, minimax(depth-1, game, !isMaximisingPlayer))
            game.undo()
        }

        return bestMove
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

function onSnapEnd() {
    board.position(game.fen())
}

function getPieceValue(piece) {
    if (piece === null) {
        return 0
    }

    if (piece.type === 'p') {
        return piece.color === 'w' ? 10 : -10
    }

    if (piece.type === 'n') {
        return piece.color === 'w' ? 30 : -30
    }


    if (piece.type === 'b') {
        return piece.color === 'w' ? 31 : -31
    }

    if (piece.type === 'r') {
        return piece.color === 'w' ? 50 : -50
    }


    if (piece.type === 'q') {
        return piece.color === 'w' ? 90 : -90
    }


    if (piece.type === 'k') {
        return piece.color === 'w' ? 1000 : -1000
    }
}

function evaluateBoard(board) {
    var totalEvaluation = 0
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j]);
        }
    }

    return totalEvaluation
}


// --- Begin Example JS --------------------------------------------------------
const chess = new Chess();
var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}
board = Chessboard('myBoard', config)
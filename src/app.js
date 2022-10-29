window.addEventListener('DOMContentLoaded', () => {
  const tiles = Array.from(document.querySelectorAll('.tile'))
  const playerDisplay = document.querySelector('.display-player')
  const resetButton = document.querySelector('#reset')
  const announcer = document.querySelector('.announcer')

  let board = ['', '', '', '', '', '', '', '', '']
  let currentPlayer = 'X'
  let isGameActive = true

  const PLAYER_X_WON = 'PLAYER_X_WON'
  const PLAYER_O_WON = 'PLAYER_O_WON'
  const DRAW = 'DRAW'

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const handleResultValidation = () => {
    let roundWon = false

    for (let i = 0; i <= 7; i++) {
      const winCondition = winningCombinations[i]
      const a = board[winCondition[0]]
      const b = board[winCondition[1]]
      const c = board[winCondition[2]]
      if (a === '' || b === '' || c === '') {
        continue
      }

      if (a === b && b === c) {
        roundWon = true
        break
      }
    }

    if (roundWon) {
      announce(currentPlayer === 'X' ? PLAYER_X_WON : PLAYER_O_WON)
      isGameActive = false
      return
    }

    if (!board.includes('')) announce(DRAW)
  }

  const announce = (type) => {
    switch (type) {
      case PLAYER_O_WON:
        announcer.innerHTML = "Player <span class='playerO'>O</span> Won"
        break

      case PLAYER_X_WON:
        announcer.innerHTML = "Player <span class='playerX'>X</span> Won"
        break

      case DRAW:
        announcer.innerHTML = "Match was a <span class='draw'>Draw!</span>"
        break
    }

    announcer.classList.remove('hide')
  }

  const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O') {
      return false
    }

    return true
  }

  const updateBoard = (index) => {
    board[index] = currentPlayer
  }

  const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer
      tile.classList.add(`player${currentPlayer}`)
      updateBoard(index)
      handleResultValidation()
      changePlayer()
    }
  }

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`)
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    playerDisplay.innerHTML = currentPlayer
    playerDisplay.classList.add(`player${currentPlayer}`)
  }

  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', '']
    isGameActive = true
    announcer.classList.add('hide')

    if (currentPlayer === 'O') {
      changePlayer()
    }

    tiles.forEach((tile) => {
      tile.innerText = ''
      tile.classList.remove('playerO')
      tile.classList.remove('playerX')
    })
  }

  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index))
  })

  resetButton.addEventListener('click', resetBoard)
})

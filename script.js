'use strict'

let currentPlayer
const btnNewGame = document.querySelector('.button-new-game')

// read grid
const readGrid = function () {

  let gridsArr = Array
    .from(document.querySelectorAll('.grid'))
    .map(el => el.textContent)

  let xTotal = [] // array of x in the grid
  let oTotal = [] // array of y in the grid

  gridsArr.forEach(function (el, i) {
    if (el === 'x') {
      xTotal.push(i + 1)
    } else if (el === 'o')
      oTotal.push(i + 1)
  })

  findWinner(xTotal, oTotal)
}

// find winner
const findWinner = function (arrX, arrO) {

  const winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]] // winning combination
  const allGridsSelected = arrX.concat(arrO).length === 9
  let xWin
  let oWin

  winCombos.forEach(winCombo => {

    xWin = winCombo.every(elm => arrX.includes(elm))
    oWin = winCombo.every(elm => arrO.includes(elm))

    if (xWin) {
      document.querySelector('.cover').classList.add('cover--active')
      document.querySelector('.cover').textContent = 'Player X win'
    }

    if (oWin) {
      document.querySelector('.cover').classList.add('cover--active')
      document.querySelector('.cover').textContent = 'Player O win'
    }
  })

  const tie = allGridsSelected && !xWin && !oWin

  if (tie) {
    document.querySelector('.cover').classList.add('cover--active')
    document.querySelector('.cover').textContent = 'It\'s a Tie'
  }
}

// reset app to default mode
const init = function () {

  currentPlayer = 'x' // set currentPlayer to x
  resetGrid() // reset grid value to empty
  runGame()
}

// Reset grid value to empty
const resetGrid = function () {

  Array.from(document.querySelectorAll('.grid')).forEach(el => {
    el.textContent = ""
    el.classList.remove('yellow', 'red')
  })

  document.querySelector('.cover').classList.remove('cover--active')
}

// start the game
const runGame = function () {

  const grids = document.querySelectorAll('.grid')

  grids.forEach(function (grid) {

    grid.addEventListener('click', function (e) {

      if (currentPlayer === 'x' && e.target.innerText === '') {
        e.target.innerText = 'x'
        grid.classList.add('yellow')
        currentPlayer = 'o'
      } else if (currentPlayer === 'o' && e.target.innerText === '') {
        e.target.innerText = 'o'
        grid.classList.add('red')
        currentPlayer = 'x'
      }

      readGrid()
    })
  })
}

btnNewGame.addEventListener('click', function (e) {

  init()
})

init() // initialize the game 





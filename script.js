'use strict'

let currentPlayer
let gameState
const winCombo = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 6], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]] // winning combination

// reading the grids
// turning set of grids into a array
// get grid from dom and map it into array of grid values. 

const btnNewGame = document.querySelector('.button-new-game')
const grids = document.querySelectorAll('.grid')

// Functions ======================

// read the grid (it kind a need to be an array)
const readGrid = function () {

  let gridsArr = Array
    .from(document.querySelectorAll('.grid'))
    .map(el => el.textContent)

  let xtotal = [] // array of x in the grid
  let ytotal = [] // array of y in the grid

  gridsArr.forEach(function (el, i) {
    if (el === 'x') {
      xtotal.push(i + 1)
    } else if (el === 'y')
      ytotal.push(i + 1)
  })

  // can I refactor this to a function
  winCombo.forEach(win => {
    
    if (win.every(elm => xtotal.includes(elm))) {
      console.log(win)
      console.log(`x is the winner`)
      gameState = false
    } 

    if (win.every(elm => ytotal.includes(elm))) {
      console.log(win)
      console.log(`y is the winner`)
      gameState = false

    } 

  })

}

// reset app to default mode
const init = function () {

  gameState = true
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
}

// start the game
const runGame = function () {

  grids.forEach(function (grid) {


    grid.addEventListener('click', function (e) {

      if (gameState === true) {
        if (currentPlayer === 'x' && e.target.innerText === '') {
          e.target.innerText = 'x'
          grid.classList.add('yellow')
          currentPlayer = 'y'
        } else if (currentPlayer === 'y' && e.target.innerText === '') {
          e.target.innerText = 'y'
          grid.classList.add('red')
          currentPlayer = 'x'
        }

        readGrid()
      }

    })

  })

}

// Event Listener ===================

btnNewGame.addEventListener('click', function (e) {

  console.log('new game')
  init()

})

init() // initialize the game 





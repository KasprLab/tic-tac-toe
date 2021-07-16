'use strict'

let currentPlayer

const btnNewGame = document.querySelector('.button-new-game')

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

  findWinner(xtotal, ytotal)

}

// find winner
const findWinner = function (arrX, arrY){

  const winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]] // winning combination
  const allGridsSelected = arrX.concat(arrY).length === 9
  let xWin
  let yWin
  const tie = allGridsSelected && !xWin && !yWin

  winCombos.forEach(winCombo => {
    
    xWin = winCombo.every(elm => arrX.includes(elm))
    yWin = winCombo.every(elm => arrY.includes(elm))
   
    if (xWin) {
      console.log(`x is the winner`)
      document.querySelector('.cover').classList.add('cover--active')
      document.querySelector('.cover').textContent = 'Player X win'
     // gameState = false
    } 
    
    if (yWin) {
      console.log(`y is the winner`)
      document.querySelector('.cover').classList.add('cover--active')
     // gameState = false
    } 

  })

  if (tie){
    document.querySelector('.cover').classList.add('cover--active')
    console.log('tie')
  }



}

// reset app to default mode
const init = function () {

  // gameState = true
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

 //     if (gameState === true) {
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
//      }

    })

  })

}

btnNewGame.addEventListener('click', function (e) {

  init()

})

init() // initialize the game 





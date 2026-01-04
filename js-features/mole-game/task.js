const getHole = (index) => document.getElementById(`hole${index}`)

let dead = document.getElementById('dead')
let lost = document.getElementById('lost')

let deadCounter = 0
let lostCounter = 0

for (let holeIndex = 1; holeIndex <= 9; holeIndex++) {
  let hole = getHole(holeIndex)

  hole.addEventListener('click', function() {
      if (hole.classList.contains('hole_has-mole')) {
          deadCounter++
          dead.textContent = deadCounter
      } else {
          lostCounter++
          lost.textContent = lostCounter
      };
    
      if (deadCounter == 10) {
          alert('Вы победили!')
          resetGame()
      } else if (lostCounter == 5) {
          alert('Вы проиграли!')
          resetGame()
      }
})}

function resetGame() {
    deadCounter = 0
    dead.textContent = 0
    lostCounter = 0
    lost.textContent = 0
}
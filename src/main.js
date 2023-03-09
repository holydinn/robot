const board = document.getElementById("board");
const SQUARES_NUMBER = 81;
let addData = document.getElementById('add');
let clearData = document.getElementById('clear');

// let dataStr, data


function renameData(data) {
  let newData = []
  for (let i = 0; i < data.length; i++) {
    switch (data[i]) {
      case 'п':
        newData.push('f')
        break
      case 'нп':
        newData.push('r')
        break
      case 'нл':
        newData.push('l')
    }
  }
  return newData
}

function changePos(robot, command) {
  switch (command) {
    case'f':
      switch (robot.direction) {
        case'right':
          robot.x = robot.x + 70
          break
        case 'left':
          robot.x = robot.x - 70
          break
        case 'up':
          robot.y = robot.y - 70
          break
        case 'down':
          robot.y = robot.y + 70
      }
      break
    case'r':
      switch (robot.direction) {
        case'right':
          robot.direction = 'down'
          break
        case 'left':
          robot.direction = 'up'
          break
        case 'up':
          robot.direction = 'right'
          break
        case 'down':
          robot.direction = 'left'
      }
      break
    case'l':
      switch (robot.direction) {
        case'right':
          robot.direction = 'up'
          break
        case 'left':
          robot.direction = 'down'
          break
        case 'up':
          robot.direction = 'left'
          break
        case 'down':
          robot.direction = 'right'
      }
  }
}

function drawRobot(triangle) {
  triangle.style.top = `${Robot.y}px`
  triangle.style.left = `${Robot.x}px`
  switch (Robot.direction) {
    case'right':
      triangle.style.borderTop = '20px solid transparent'
      triangle.style.borderBottom = `20px solid transparent`
      triangle.style.borderLeft = `40px solid #ffff31`
      triangle.style.borderRight = `none`
      break
    case 'left':
      triangle.style.borderTop = '20px solid transparent'
      triangle.style.borderBottom = `20px solid transparent`
      triangle.style.borderRight = `40px solid #ffff31`
      triangle.style.borderLeft = `none`
      break
    case 'up':
      triangle.style.borderLeft = '20px solid transparent'
      triangle.style.borderRight = `20px solid transparent`
      triangle.style.borderBottom = `40px solid #ffff31`
      triangle.style.borderTop = `none`
      break
    case 'down':
      triangle.style.borderLeft = '20px solid transparent'
      triangle.style.borderRight = `20px solid transparent`
      triangle.style.borderTop = `40px solid #ffff31`
      triangle.style.borderBottom = `none`
  }
}

function restartRobot(robot) {
  Robot.x = 395
  Robot.y = 461
  Robot.direction = 'right'
  robot.style.display = 'block'
  robot.style.top = `${Robot.y}px`
  robot.style.left = `${Robot.x}px`
  robot.style.borderTop = '20px solid transparent'
  robot.style.borderBottom = `20px solid transparent`
  robot.style.borderLeft = `40px solid #ffff31`
  robot.style.borderRight = `none`
}

function startAlg() {
  let dataStr = document.getElementById('get_data').value;
  let regexp = /((нп|нл|п)|,)/g
  let data = dataStr.toLowerCase().split(/\s+/).join('')
  console.log(data)
  let newData = data.match(regexp)
  if (newData.join('') != data) {
    alert('Вы ввели некорректную последовательность комманд. Попробуйте еще раз')
    return;
  }
  console.log(newData)
  let lexemas = ['нп', 'нл', 'п']
  for (let i = 0; i < newData.length; i++) {
    if (!lexemas.includes(newData[i]) && i==newData.length-1) {
      alert('Вы ввели некорректную последовательность комманд. Попробуйте еще раз')
      return;
    }
    if (!lexemas.includes(newData[i]) && newData[i + 1] == ',') {
      alert('Вы ввели некорректную последовательность комманд. Попробуйте еще раз')
      return;
    }
    if (lexemas.includes(newData[i]) && lexemas.includes(newData[i+1])) {
      alert('Вы ввели некорректную последовательность комманд. Попробуйте еще раз')
      return;
    }
    if (newData[i] == ',' && newData[i + 1] == ',') {
      alert('Вы ввели некорректную последовательность комманд. Попробуйте еще раз')
      return;
    }

  }
  let commands = renameData(newData)  //олучаем отформатированные команды
  console.log('commands: ', commands)
  restartRobot(triangle)

  for (let i = 0; i < commands.length; i++) {
    changePos(Robot, commands[i])  //меняем состояние
    if (Robot.x > 680 || Robot.x < 105 || Robot.y > 742 || Robot.y < 170) {
      alert("Вы вышли за границу!")
      triangle.style.display = 'none'
      return
    }
    drawRobot(triangle) // отрисовываем новое состояние
    console.log('x: ', ((Robot.x - 115) / 70) + 1)
    console.log('y: ', ((Robot.y - 181) / 70) + 1)
    console.log('direction: ', Robot.direction)
  }

}

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  board.append(square);
}

let Robot = {
  x: 115 + 280,
  y: 461,
  direction: 'right'
}

//рисуем робота
const triangle = document.createElement("div");
triangle.classList.add("triangle");
triangle.style.top = `${Robot.y}px`
triangle.style.left = `${Robot.x}px`
board.append(triangle);

addData.addEventListener('click', startAlg);

clearData.addEventListener('click', () => {
  document.getElementById('get_data').value = ""
  triangle.style.display = 'none'
});



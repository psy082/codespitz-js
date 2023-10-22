let fs = require('fs');

// fs의 readFile 메소드는 callback 함수를 인자로 받았다.
// 그렇다면 reaFile을 호출한 부분에서는 
fs.readFile('config.json', function (err, contents) {
  if (err) {
    throw err;
  }

  doSomethingWith(contents)
  console.log("Done");
})

function run(tastDef) {

  // 이터레이터를 만들고, 어디에서나 이용 가능하도록 한다.
  let tast = tastDef();

  // 작업을 시작한다
  let result = tast.next();

  // next()를 호출하는 재귀함수
  function step() {

    // 더 작업할 부분이 있다면
    if (!result.done) {
      result = tast.next();
      step();
    }
  }

  // 위 과정을 시작
  step();
}

function run2(tastDef) {

  // 이터레이터를 만들고, 어디에서나 이용 가능하도록 한다.
  let tast = tastDef();

  // 작업을 시작한다.
  let result = tast.next();

  // next()를 호출하는 재귀함수
  function step() {

    // 더 작업할 부분이 있다면
    if(!result.done) {
      if(typeof result.value === "function") {
        result.value(function(err, data) {
          if(err) {
            result = task.throw(err);
            return;
          }

          result = task.next(data);
          step();
        })
      }
    }
  }

  // 위 과정을 시작
  step();             
}
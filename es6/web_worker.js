// 이 함수는 실행 부분이 postMessage 밖에 없다(나머지는 다 선언문)
// postMessage 함수도 nonblock 함수이다.
const backRun = (f, end, ...arg) => {
  // binary 객체를 만들어 준다
  // es6 array buffer -> binary file을 만들 수 있도록 바뀜
  // blob(html5)은 array buffer(js)와 호환된다
  // 1 byte단위로 뭔가를 쓸 수 있다.
  // file객체 안에 binary 정보만을 포함하는 내부 byte array의 구조체 => blob
  // form data 객체에 멀티미디어 파일을 업로드 할 때 form data 객체가 받는 인자
  // 인자로 배열과 파일이 무슨 타입인지에 대한 MIME 타입을 객체로 받는다.
  const blob = new Blob(
    [
      `
    onmessage = e => postMessage((${f})(e.data));
  `
    ],
    { type: "text/javascript" }
  );
  const url = URL.createObjectURL(blob);
  const worker = new Worker(url);
  worker.onmessage = e => end(e.data);
  worker.onerror = e => end(null);
  worker.postMessage(arg);
};
backRun(v => v[0] + v[1], console.log, 3, 5);

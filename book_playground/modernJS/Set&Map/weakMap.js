let Person = (function () {
  let privateData = {},
    privateId = 0;

  function Person(name) {

    //  Object.defineProperty() 정적 메서드는 객체에 직접 새로운 속성을 정의하거나 
    //  이미 존재하는 속성을 수정한 후, 그 객체를 반환합니다.
    Object.defineProperty(this, "_id", {
      value: privateId++
    });

    privateData[this._id] = {
      name: name
    };
  }

  Person.prototype.getName = function () {
    return privateData[this._id].name;
  };

  return Person;
})();



let pPerson = (() => {
  let privateData = new WeakMap();

  function pPerson(name) {
    privateData.set(this, {
      name: name
    });
  }

  pPerson.prototype.getName = function () {
    return privateData(this).name;
  }

  return pPerson;
})();
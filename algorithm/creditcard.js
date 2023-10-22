const card_nums = ["3285-3764-9934-2453", "3285376499342453", "3285-3764-99342453", "0000000000000000", "3285376499342459", "3285-3764-9934-2452"];

const dash_form = /(\d{4})-(\d{4})-(\d{4})-(\d{4})/;
const digit_form = /\d{16}/;
const forms = [dash_form, digit_form];

const formCheck = (card_number, forms) => {
  for(const form of forms) {
    if(form.exec(card_number)) return true;
  }
  return false;
}

const LuhnCheck = (card_number) => {
  let count = 1, odd = 0, even = 0;
  for(let digit of card_number) {
    if(digit === '-') continue;
    digit = parseInt(digit);
    if(count % 2 !== 0) {                       // 오른쪽에서부터 짝수번째 숫자
      let temp;
      if((temp = digit * 2) >= 10) digit = Math.floor(temp/10) + temp%10;
      else digit = temp;
      console.log('even', count, digit);
      even = even + digit
    } else {
      console.log('odd', count, digit);
      odd = odd + digit                         // 오른쪽에서부터 홀수번째 숫자
    }
    count++;
  }
  if((odd + even) % 10 === 0) return 1;
  return 0;
}

const validation = (card_number, forms) => {
  if(!formCheck(card_number, forms)) return 0;
  return LuhnCheck(card_number);
}

const solution = (card_nums) => {
  let answer = card_nums.map(card_num => validation(card_num, forms));
  return answer;
}

console.log(solution(card_nums))
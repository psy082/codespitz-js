const data1 = ["10/05 10/12 2400", "10/05 10/10 2500", "10/07 10/15 2300", "10/08 10/30 3000", "10/15 11/03 3000", "10/20 11/01 3500", "11/02 11/11 4000"]
const data2 = ["10/05 10/12 2400", "10/05 10/12 2400", "10/05 10/12 2400", "10/05 10/12 2400", "10/05 10/12 2400", "10/05 10/12 2400", "10/05 10/12 2400"]

const dateToInt = date => {
  date = date.split('/');
  return parseInt(date[0]) * 100 + parseInt(date[1]);
}

const parse = offer => {
  offer = offer.split(' ');
  return {
    'start': dateToInt(offer[0]),
    'end': dateToInt(offer[1]),
    'salary': parseInt(offer[2])
  }
}

const convertData = offers => {
  return offers.map(offer => parse(offer));
}

const getMostEarlyOffers = (offers, curr) => {
  let selectedOffers = [];
  for (let i = curr; i < offers.length; i++) {
    if (offers[i]['start'] > offers[curr]['start']) {
      curr = i;
      break;
    }
    selectedOffers.push(offers[i]);
  }
  return {
    selectedOffers,
    curr
  };
}

const getMostOffers = (offers, label) => {
  let mostlabelOffers = [],
    currMost = offers[0][label];
  for (let i = 0; i < offers.length; i++) {
    if (offers[i][label] === currMost) {
      mostlabelOffers.push(offers[i])
    } else {
      if (offers[i][label] > currMost) {
        mostlabelOffers = [offers[i]];
        currMost = offers[i][label];
      }
    }
  }
  return mostlabelOffers
}

const randomlyChoose = offers => {
  const max = offers.length;
  return offers[Math.floor(Math.random() * (max))];
}

const isBetterOffers = (curr, currEnd, currSalary, offers) => {
  let result = false,
    i = curr;
  while (i < offers.length && offers[i]['start'] < currEnd) {
    if (offers[i]['salary'] > currSalary) {
      result = true;
      break;
    }
    i++;
  }
  return result;
}

function solution(offers) {
  offers = convertData(offers);
  let selectedOffers, curr = 0;
  while (curr < offers.length) {
    ({
      selectedOffers,
      curr
    } = getMostEarlyOffers(offers, curr));
    selectedOffers = getMostOffers(selectedOffers, 'salary');

    if (selectedOffers.length > 1) {
      selectedOffers = getMostOffers(selectedOffers, 'end');
    }

    if (selectedOffers.length > 1) {
      selectedOffers = randomlyChoose(selectedOffers);
    } else selectedOffers = selectedOffers[0];

    if (!isBetterOffers(curr, selectedOffers['end'], selectedOffers['salary'], offers)) return selectedOffers;
  }
  return selectedOffers;
}

console.log(solution(data2));
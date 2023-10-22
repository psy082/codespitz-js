function maxPlayOfMusic(play_list, listen_time) {
  let maxCount = 0;
  let currCount = 1;
  let startIdx = 0;
  let accIdx = 0;
  let leftTime = listen_time - (play_list[startIdx] - 1);
  while(accIdx < play_list.length){
    leftTime += (play_list[startIdx] - 1);
    currCount -= 1;
    
    while((leftTime -= (play_list[accIdx++])) > -1) {
      console.log(leftTime, accIdx);
      currCount++;
    }
    leftTime += play_list[--accIdx];
    currCount--;

    startIdx++;
    maxCount = Math.max(maxCount, currCount);

  }
  return maxCount;
}

const test = [[[2, 3, 1, 4], 3], [[1, 2, 3, 4], 5], [[1, 2, 3, 4], 20]]

const idx = 1

console.log(maxPlayOfMusic(test[idx][0], test[idx][1]));
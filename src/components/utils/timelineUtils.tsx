import { Task } from '../../templates/task';

/***This function calculates the numerical difference between date 1 and date 2
 * * @param date1 first day, usually the Start Date
 * @param date2 second day, usually the End Date
 * @returns
 */
 export function dateDiffInDays(date1: Date, date2: Date): number {
    //Milliseconds per day
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  console.log("days:" + Math.floor((utc2 - utc1) / _MS_PER_DAY));
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

/**
 * This function calculates the tota; amount of points in the document
 * @param tasks array of tasks state
 * @returns
 */
export function calcTotalPoints(tasks: Task[]): number {
  // calculates total points in assignment given
  let total = 0;
  for (let i = 0; i < tasks.length; i++) {
    total += parseInt(tasks[i].points, 10);
  }
  console.log("totalPoints:", total);
  return total;
}

/**
 * This function calculates the day that a task should be completed on and returns a string
 * It calculates it by counting up until the index number given, and adding the sum for each arrayValue
 * and if the sum ever exceeds the pointsperDay, then the Day goes up, rinse and repeat for all tasks.
 * @param tasks array of tasks
 * @param index current task function is on
 * @param totalDays totalDays given
 * @param totalPoints totalPoints calculated
 * @returns
 */
 export function calcDays(
    tasks: Task[],
    index: number,
    totalDays: number,
    totalPoints: number
  ): string {
    let dayCount: number = 1;
    let daySum: number = 0;
    let pointsperDay: number = Math.ceil(totalPoints / totalDays);
    let dayArray: number[] = [...tasks].map((task) => task.points).map(Number);
    for (let i = 0; i <= index; i++) {
      daySum += dayArray[i];
      if (daySum >= pointsperDay) {
        dayCount++;
        daySum = 0;
      }
    }
    return "Day " + dayCount.toString();
  }
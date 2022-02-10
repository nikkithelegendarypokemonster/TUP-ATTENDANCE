import { getOver, gaps } from "./sched.js";
import { timediff, tDec } from "./date";

//function to return regular hrs estimated
function reghrs(start, end, tin, tout) {
  var x, y, regular;

  start = new Date(start);
  end = new Date(end);
  tin = new Date(tin);
  tout = new Date(tout);

  if (tDec(tin) > tDec(start) && tDec(tin) <= tDec(end)) {
    x = timediff(
      start.getHours(),
      tin.getHours(),
      start.getMinutes(),
      tin.getMinutes()
    );
  } else {
    x = 0;
  }
  if (tDec(tout) >= tDec(start) && tDec(tout) < tDec(end)) {
    y = timediff(
      tout.getHours(),
      end.getHours(),
      tout.getMinutes(),
      end.getMinutes()
    );
  } else {
    y = 0;
  }
  if (
    (tDec(tin) < tDec(start) && tDec(tout) <= tDec(start)) ||
    (tDec(tin) >= tDec(end) && tDec(tout) > tDec(end))
  ) {
    regular = 0;
  } else if (
    tDec(tin) >= tDec(start) &&
    tDec(tin) <= tDec(end) &&
    tDec(tout) <= tDec(end) &&
    tDec(tout) >= tDec(start)
  ) {
    regular = timediff(
      tin.getHours(),
      tout.getHours(),
      tin.getMinutes(),
      tout.getMinutes()
    );
    // ) -
    // x -
    // y;
  } else {
    regular =
      timediff(
        start.getHours(),
        end.getHours(),
        start.getMinutes(),
        end.getMinutes()
      ) -
      x -
      y;
  }

  //this formula if number is greater than 0.60 do this to get the actual hour to minutte conversion
  if (regular % Math.floor(regular) > 0.6) {
    regular = Math.round(regular) - (regular % Math.floor(regular));
  }
  regular = Math.round(regular * 100) / 100;

  return regular;
}

//function to return overload hrs estimated
function ovhrs(user, tin, tout) {
  //filter out all overload data in between TimeIn and TimeOut
  // var overload_sched=user.Overload[0].filter(function (sched){
  //   return tDec(tin)<=tDec(sched.Start) && tDec(tout)>=tDec(sched.End)
  // })
  var over = getOver(user);
  // tin = new Date(tin);
  // tout = new Date(tout);

  //user.schedule.length > 0
  if (over !== undefined) {
    var sched = over;
    var arr = [];
    // Push array that is pasok
    var keys = Object.keys(sched);

    for (var i = 0; i < keys.length; i++) {
      if (
        new Date(tin).getHours() <= new Date(sched[i]?.start).getHours() &&
        new Date(tout).getHours() >= new Date(sched[i]?.start).getHours()
      ) {
        arr.push(sched[i]);
      }
    }
    // for (const key of keys) {
    //   if (
    //     new Date(tin).getHours() <= new Date(sched[key]?.start).getHours() &&
    //     new Date(tout).getHours() >= new Date(sched[key]?.start).getHours()
    //   ) {
    //     //put the objects in a array

    //     arr.push(sched[key]);
    //   }
    // }

    // Sorting for assurance.
    if (arr.length > 0) {
      //sort array by start time
      arr.sort((a, b) => {
        return new Date(a.start).getHours() - new Date(b.start).getHours();
      });
      //formula x=(Login-Logout)-(calculate the gaps in between overloads)
      //calculate overload gaps
      // Calculate Overlaod Gaps
      var x =
        timediff(
          tin.getHours(),
          tout.getHours(),
          tin.getMinutes(),
          tout.getMinutes()
        ) - gaps(arr);
      if (tDec(tin) < tDec(new Date(arr[0].start))) {
        x =
          x -
          timediff(
            tin.getHours(),
            new Date(arr[0].start).getHours(),
            tin.getMinutes(),
            new Date(arr[0].start).getMinutes()
          );
      }
      if (tDec(tout) > tDec(new Date(arr[arr.length - 1].end))) {
        x =
          x -
          timediff(
            tout.getHours(),
            new Date(arr[arr.length - 1].end).getHours(),
            tout.getMinutes(),
            new Date(arr[arr.length - 1].end).getMinutes()
          );
      }

      //Convertion lang
      //this formula if number is greater than 0.60 do this to get the actual hour to minutte conversion
      if (x % Math.floor(x) > 0.6) {
        x = Math.round(x) - (x % Math.floor(x));
      }
      // Round off.
      x = Math.round(x * 100) / 100;
      return x;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}

// function to return estimated fte hrs
function fte(sched) {
  var start = new Date(sched?.start);
  var end = new Date(sched?.end);
  return timediff(
    start.getHours(),
    end.getHours(),
    start.getMinutes(),
    end.getMinutes()
  );
}
export { reghrs, ovhrs, fte };

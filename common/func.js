export function escapeSpecialChars(str) {
  if (typeof str !== "string")
    throw new TypeError(
      "escapeSpecialChars function expects input in type String"
    );

  const escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;",
    "=": "&#x3D;"
  };

  return str.replace(/[&<>"'`=]/g, function(m) {
    return escape[m];
  });
}

export function abbreviate_number(num, fixed) {
  if (num === null) {
    return null;
  } // terminate early
  if (num === 0) {
    return "0";
  } // terminate early
  if (typeof num === "string") {
    if (num.indexOf("/") > -1 || num.indexOf("-") > -1) {
      return num;
    }
    try {
      let new_num = parseFloat(num);
      if (isNaN(new_num)) {
        return num;
      }
    } catch (error) {
      return num;
    }
  } else if (typeof num === "object") {
    return num;
  }
  fixed = !fixed || fixed < 0 ? 0 : fixed; // number of decimal places to show
  let f = "";
  if (num < 0) {
    num = Math.abs(num);
    f = "-";
  }
  if (num > 0 && num <= 9999) {
    return num;
  }
  // terminate early
  let b = num.toPrecision(2).split("e"), // get power
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c =
      k < 1
        ? num.toFixed(0 + fixed)
        : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
    d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
    e = d + ["", "K", "M", "B", "T"][k]; // append power
  return f + e;
}

export function replaceNullOrTempty(
  data,
  replaceNotEmpty = "",
  repaceEmplty = ""
) {
  if (!data || data === "" || data === null) return repaceEmplty;
  if (replaceNotEmpty === "") return data;
  return replaceNotEmpty;
}

export function isNullOrTempty(data) {
  if (!data || data === "" || data === null) return true;
  return false;
}

export function substrByNum(str, number, defaultLastPrefix = "...") {
  if (str.length > number) {
    return `${str.substr(0, number)}${defaultLastPrefix}`;
  }
  return str;
}

export function formatMoney(
  amount,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {}
}

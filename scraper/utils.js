import fs from "fs";

export async function writeToJsonFile(jsonContent, fileName) {
  console.log("Writing to json file");

  fs.writeFile(`./${fileName}.json`, jsonContent, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

export function validateFields(cin, pin) {
  if (cin.length !== 21) {
    return {
      error: `Invalid CIN: ${cin}. CIN should be exactly 21 characters.`,
    };
  }
  if (pin.length !== 6) {
    return {
      error: `Invalid PIN: ${pin}. PIN should be exactly 6 characters.`,
    };
  }
  return null;
}

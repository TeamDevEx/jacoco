const xml2js = require('xml2js');

const builder = require('xmlbuilder');

const fs = require('fs');

const jacocoXML = fs.readFileSync('jacoco.xml').toString();

let jacoco_json = [];

xml2js.parseString(jacocoXML, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    const subject = result.report.counter;

    for (const jacoco_counter of subject) {
      const obj = {
        type: jacoco_counter.$.type,
        missed: jacoco_counter.$.missed,
        covered: jacoco_counter.$.covered,
      };

      jacoco_json.push(obj);
    }
    console.log(jacoco_json);
  }
});

const root = builder.create('report');

jacoco_json.forEach((counter) => {
  const node = root.ele('counter');
  Object.keys(counter).forEach((key) => {
    node.att(key, counter[key]);
  });
});

const converted_jacoco_json = root.toString({ pretty: true });

console.log(converted_jacoco_json);

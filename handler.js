const kin = require('./kintoneHandler');
const wait = ms => new Promise(resolve => setTimeout(resolve, ms * 1000));

module.exports.main = async event => {
  const appID = await kin.main.createApp();
  await kin.main.deployApp(appID);
  await wait(5);
  await kin.main.setFields(appID);
  await kin.main.setJSFile(appID);
  await kin.main.deployApp(appID);
  await wait(5);
  await kin.main.postRecords(appID);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: '錬kin術 発動!'
    }),
  };
};
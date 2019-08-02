const req = require('request-promise');
const moment = require('moment');
const hagarenData = require('./hagarenData');

let params_origin = {
  method: 'POST',
  url: '',
  headers: {
    'X-Cybozu-Authorization': process.env.CYBOZU_AUTH,
    'Authorization' :`Basic ${process.env.CYBOZU_BASIC_AUTH}`,
    'Content-Type': 'application/json',
  },
  body: ''
};

exports.main = {
  createApp: () => {
    let url = `https://${process.env.CYBOZU_DOMAIN}/k/v1/preview/app.json`;
    let body = JSON.stringify({
      name: `錬kin術！ ${moment().add('H', 9).format('HH:mm:ss')} `,
      space: 745,
      thread: 1398,
    });
    let params = {...params_origin, url, body};
    return req(params).then(resp => JSON.parse(resp).app).catch(err => console.log(err));
  },
  deployApp: APPID => {
    let url = `https://${process.env.CYBOZU_DOMAIN}/k/v1/preview/app/deploy.json`;
    let body = JSON.stringify({
      apps: [{app: APPID}]
    });
    let params = {...params_origin, url, body};
    return req(params).then(resp => console.log(resp)).catch(err => console.log(err));
  },
  setFields: APPID => {
    let url = `https://${process.env.CYBOZU_DOMAIN}/k/v1/preview/app/form/fields.json`;
    let body = JSON.stringify({
      app: APPID,
      properties: {
        name: {
          type: 'SINGLE_LINE_TEXT',
          code: 'name',
          label: '名前',
          noLabel: false,
          required: false,
          minLength: '',
          maxLength: '',
          expression: '',
          hideExpression: false,
          unique: false,
          defaultValue: ''
        },
        detail: {
          type: 'MULTI_LINE_TEXT',
          code: 'detail',
          label: '説明文',
          noLabel: false,
          required: false,
          defaultValue: ''
        },
        url: {
          type: 'SINGLE_LINE_TEXT',
          code: 'url',
          label: '画像のURL',
          noLabel: false,
          required: false,
          minLength: '',
          maxLength: '',
          expression: '',
          hideExpression: false,
          unique: false,
          defaultValue: ''
        },
      }
    });
    let params = {...params_origin, url, body};
    return req(params).then(resp => console.log(resp)).catch(err => console.log(err));
  },
  postRecords: APPID => {
    let url = `https://${process.env.CYBOZU_DOMAIN}/k/v1/records.json`;
    let body = JSON.stringify({
      app: APPID,
      records: hagarenData.data,
    });
    let params = {...params_origin, url, body};
    return req(params).then(resp => console.log(resp)).catch(err => console.log(err));
  },
  setJSFile: APPID => {
    let url = `https://${process.env.CYBOZU_DOMAIN}/k/v1/preview/app/customize.json`;
    let method = 'PUT';
    let body = JSON.stringify({
      app: APPID,
      scope: 'ALL',
      desktop: {
        js: [{
          type: 'URL',
          url: 'https://bb-soracombtn-ep-plus-de-serverlessdeploymentbuck-2b9emewvrdgb.s3-ap-northeast-1.amazonaws.com/renkin.js'
        }],
        css: []
      },
      mobile: {
        js: [],
        css: []
      },
    });
    let params = {...params_origin, url, method, body};
    return req(params).then(resp => console.log(resp)).catch(err => console.log(err));
  },
};
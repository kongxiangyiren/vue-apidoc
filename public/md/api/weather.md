接口地址 `https://api.kongxiangyiren.top/api/weather`

输出类型 `JSON`

请求方式 `GET`

请求示例 `https://api.kongxiangyiren.top/api/weather`

参考：`https://www.sojson.com/blog/305.html`

本接口数据缓存 1 小时

## 返回参数

| 参数          | 类型   | 说明                        |
| ------------- | ------ | --------------------------- |
| code          | number | 状态码,0 为成功，其他为错误 |
| msg           | string | 状态信息                    |
| data          | object | 天气数据信息                |
| data.ip       | string | IP 地址                     |
| data.date     | string | 当前天气的当天日期          |
| data.time     | string | 系统更新时间                |
| data.cityInfo | string | 请求城市信息                |
| data.data     | string | 天气信息                    |

## 返回示例

```json
{
  "code": 0,
  "msg": "OK",
  "data": {
    "ip": "127.0.0.1", // 本机的ip
    "date": "20180922", //当前天气的当天日期
    "time": "2018-09-22 12:37:21", //系统更新时间
    "cityInfo": {
      "city": "天津市", //请求城市
      "cityKey": "101030100", //请求ID
      "parent": "天津", //上级，一般是省份
      "updateTime": "12:32" //天气更新时间
    },
    "data": {
      "shidu": "22%", //湿度
      "pm25": 15.0, //pm2.5
      "pm10": 46.0, //pm10
      "quality": "优", //空气质量
      "wendu": "24", //温度
      "ganmao": "各类人群可自由活动", //感冒提醒（指数）
      "forecast": [
        //今天+未来14天
        {
          "date": "22",
          "ymd": "2018-09-22", //年月日  （新增）
          "week": "星期六", //星期 （新增）
          "sunrise": "05:57",
          "high": "高温 26.0℃",
          "low": "低温 15.0℃",
          "sunset": "18:10",
          "aqi": 55.0,
          "fx": "西北风",
          "fl": "4-5级",
          "type": "晴",
          "notice": "愿你拥有比阳光明媚的心情"
        },
        {
          "date": "23",
          "ymd": "2018-09-22", //年月日  （新增）
          "week": "星期日", //星期 （新增）
          "sunrise": "05:58",
          "high": "高温 23.0℃",
          "low": "低温 14.0℃",
          "sunset": "18:09",
          "aqi": 29.0,
          "fx": "西北风",
          "fl": "4-5级",
          "type": "晴",
          "notice": "愿你拥有比阳光明媚的心情"
        },
        {
          "date": "24",
          "ymd": "2018-09-22", //年月日  （新增）
          "week": "星期一", //星期 （新增）
          "sunrise": "05:59",
          "high": "高温 24.0℃",
          "low": "低温 15.0℃",
          "sunset": "18:07",
          "aqi": 25.0,
          "fx": "西北风",
          "fl": "<3级",
          "type": "晴",
          "notice": "愿你拥有比阳光明媚的心情"
        },
        {
          "date": "25",
          "ymd": "2018-09-22", //年月日  （新增）
          "week": "星期二", //星期 （新增）
          "sunrise": "06:00",
          "high": "高温 24.0℃",
          "low": "低温 16.0℃",
          "sunset": "18:05",
          "aqi": 56.0,
          "fx": "西南风",
          "fl": "<3级",
          "type": "晴",
          "notice": "愿你拥有比阳光明媚的心情"
        },
        {
          "date": "26",
          "ymd": "2018-09-22", //年月日  （新增）
          "week": "星期三", //星期 （新增）
          "sunrise": "06:01",
          "high": "高温 24.0℃",
          "low": "低温 17.0℃",
          "sunset": "18:04",
          "aqi": 86.0,
          "fx": "西南风",
          "fl": "3-4级",
          "type": "阴",
          "notice": "不要被阴云遮挡住好心情"
        }
      ]
    }
  }
}
```
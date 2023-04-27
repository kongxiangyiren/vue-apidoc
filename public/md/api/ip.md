接口地址 `https://api.kongxiangyiren.top/api/ip`

输出类型 `JSON`

请求方式 `GET`

请求示例 `https://api.kongxiangyiren.top/api/ip?ip=8.8.8.8`

## 请求参数

| 名称 | 示例    | 必填 | 类型   | 说明    |
| ---- | ------- | ---- | ------ | ------- |
| ip   | 8.8.8.8 | 否   | string | IP 地址 |

## IPv4 返回参数

| 参数          | 类型   | 说明                        |
| ------------- | ------ | --------------------------- |
| code          | number | 状态码,0 为成功，其他为错误 |
| message       | string | 状态信息                    |
| data          | object | IP 数据信息                 |
| data.ip       | string | IP 地址                     |
| data.country  | string | IP 所在国家                 |
| data.district | string | IP 所在地区                 |
| data.province | string | IP 所在省份                 |
| data.city     | string | IP 所在城市                 |
| data.isp      | string | IP 服务商                   |
| data.ipv4     | string | 是否为 IPv4                 |
| data.ipv6     | string | 是否为 IPv6                 |

## IPv4 返回示例

```json
{
  "code": 0,
  "msg": "OK",
  "data": {
    "ip": "223.5.5.5",
    "country": "中国",
    "district": "",
    "province": "浙江省",
    "city": "杭州市",
    "isp": "阿里云",
    "ipv4": true,
    "ipv6": false
  }
}
```

## IPv6 返回参数

| 参数          | 类型   | 说明                                        |
| ------------- | ------ | ------------------------------------------- |
| code          | number | 状态码,0 为成功，其他为错误                 |
| msg           | string | 状态信息                                    |
| data          | object | IP 数据信息                                 |
| data.ip       | string | IP 地址                                     |
| data.location | string | IP 所在位置                                 |
| data.country  | string | IP 所在位置, data.location 去除空格后的信息 |
| data.local    | string | IP 所在位置 ,data.location 空格后的信息     |
| data.type     | string | IP 类型                                     |
| data.ipv4     | string | 是否为 IPv4                                 |
| data.ipv6     | string | 是否为 IPv6                                 |

## IPv6 返回示例

```json
{
  "code": 0,
  "msg": "OK",
  "data": {
    "ip": "2400:3200::1",
    "location": "中国\t浙江省\t杭州市 阿里云计算有限公司",
    "country": "中国\t浙江省\t杭州市",
    "local": "阿里云计算有限公司",
    "type": "normal",
    "ipv4": false,
    "ipv6": true
  }
}
```

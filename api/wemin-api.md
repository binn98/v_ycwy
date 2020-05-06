#### 请求token接口
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/reglogin/gettoken`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
code | string | | 小程序静默模式下的code值

**成功示例** 
``` 
{
    "code":"0",
    "message":"",
    "data":null
}
```

***
#### 发送手机验证码所需参数
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/reglogin/mobiletoken`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
mobile | number | 11 | 手机号
code | number | | 验证码



***
#### 发送手机验证码
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/reglogin/sendmobilecode`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
mobile | number | 11 | 手机号
tsid | number | | 
token | string | | 验证参数



***
#### 验证码登录接口
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/reglogin/codelogin`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
mobile | number | 11 | 手机号
code | number | | 验证码


***
#### 微信授权手机号登录
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/reglogin/weminmobilelogin`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
iv | string |  | 微信加密算法的初始向量
encrypted_data | string | | 包括敏感数据在内的完整用户信息的加密数据




***
#### 我的地址列表
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/address/list`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
is_default | int | | 显示默认 传2


***
#### 新增/编辑地址
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/address/setting`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
id | int | 11 | id(编辑时传参)
mobile | number | 11 | 手机号
link_name | string | | 联系人
province | string | | 省
city | string | | 市
area | string | | 区
address | string | | 详细地址
is_default | int | | 是否默认 1,否 2,是



***
#### 删除地址
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/address/del`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
id | int |  |  地址id

***
#### 用户地址详情
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/address/details`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
id | int |  |  地址id 




***
#### 物流公司
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/logistics/company`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|


***
#### 回收收货地址
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/logistics/receiving`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|


***
#### 衣物订单列表
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/order/goods`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
status | int |  |  回收状态(0,可回收 10,已回收) |
time | sting |  |  时间区间(30/60/90) |


***
#### 衣物回收 预约回收&自行寄回
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/order/recovery`

参数 | 类型| 是否必填 | 长度 |  描述|备注|
---|---|---|---|---|---|
addr_id | int | | |  用户地址id | 预约回收类型传参 |
goods_id | int | 是 | |  商品id | |
logistic_id | int | 是 | |  快递公司id | |
logistic_num | string |  | |  快递单号 | 自行寄送类型传参 |
rec_id | int | 是 | |  回收收货地址id | |
time | string |  | |  预约上门取件时间 | 预约回收类型传参 |
remark | string |  | | 备注  | |
rec_type | int | 是  | |  回收类型  | 10,预约回收 20,自行寄送 |


***
#### 衣物回收 预约回收-填写快递单号
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/order/numsetting`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
order_id | int |  |  回收订单id |
express_num | sting |  |  快递单号 |



***
#### 回收订单详情
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/order/details`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
order_id | int |  |  回收表id |

***
#### 取消预约
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/order/cancel`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
order_id | int |  |  回收表id |


***
#### 我的优惠券
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/coupon/list`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
status | int |  |  使用状态 | 10,未使用 20,已使用 30,已失效


#### 返回参数

- list: 优惠券列表数据
- login_code:
- total:
- total_page:
- usable_new: 可用优惠券统计
- usable_new.usable_num: 可用优惠券总数
- usable_new.usable_money: 可用优惠券总额


***
#### 用户信息
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/user/info`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|


***
#### 优惠使用规则
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/explain/couponrule`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|


***
#### 查看物流动态
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/order/logistics`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---
logistic_code | string |  |  快递公司编码 |
logistic_num | string |  |  快递单号 |


***
#### 回收回收规则
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/explain/recoveryrule`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|



***
#### 协议
#### 请求url 
- `https://devapi.yichuwuyou.com/wmrecovery/1.2.0/explain/protocol`

参数 | 类型|长度| 描述|备注|
---|---|---|---|---|
keyname|string| | 协议识别字符| 用户服务协议:protocol 用户隐私协议:privacy
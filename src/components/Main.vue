<template>
  <div class="flex">
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="企业用户列表" name="1">
        <el-table>
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="企业开户" name="2">
        <el-form style="width: 50%;" ref="form" :model="form1" label-width="180px">
          <el-form-item label="注册邮箱">
            <el-input v-model="form1.regEmail"></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="form1.userName"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码">
            <el-input v-model="form1.idNo"></el-input>
          </el-form-item>
          <el-form-item label="证件有效期">
            <el-input placeholder="yyyyMMdd，如19950510" v-model="form1.idExp"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码证">
            <el-upload
              list-type="picture"
              action=''
              accept=".png"
              :limit="1"
              :auto-upload="false"
              :on-change="getFile1"
            >
              <el-button style="margin: 0" size="small" type="primary">选择图片上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="企业地址">
            <el-input v-model="form1.address"></el-input>
          </el-form-item>
          <el-form-item label="银行编码">
            <el-input v-model="form1.bankCode"></el-input>
          </el-form-item>
          <el-form-item label="支行名称">
            <el-input v-model="form1.brabankName"></el-input>
          </el-form-item>
          <el-form-item label="开户行所在省市编码">
            <el-input v-model="form1.cityCode"></el-input>
          </el-form-item>
          <el-form-item label="企业基本户帐号">
            <el-input v-model="form1.basicacctNo"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人姓名">
            <el-input v-model="form1.legalreptName"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人手机号">
            <el-input v-model="form1.legalreptPhone"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人身份证号">
            <el-input v-model="form1.legalreptIdno"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人身份证到期日">
            <el-input placeholder="yyyyMMdd，如19950510" v-model="form1.legalreptIdexp"></el-input>
          </el-form-item>
          <el-form-item label="企业银行帐号">
            <el-input v-model="form1.linkedAcctno"></el-input>
          </el-form-item>
          <el-form-item v-if="showPass" label="密码">
            <div id="ipt_pwd2" class="ipt_pwd">
              <span id="LOGPASS2_SHOW">请输入密码</span>
              <input id="LOGPASS2" class="default input_search el-input__inner" type="password" disabled="disabled"/>
              <div id="keyboardBtn2" class="ipt_pwd_rjp default"></div>
            </div>
          </el-form-item>
          <el-form-item label="绑定手机号">
            <el-input v-model="form1.regPhone"></el-input>
          </el-form-item>
          <el-form-item label="获取验证码">
            <div class="flex-box">
              <el-input v-model="code"></el-input>
              <el-button :disabled="disabled" class="send_btn" @click="sendCode">获取验证码</el-button>
              <el-button :disabled="verifyBtn" class="send_btn" @click="verifyCode">验证手机号</el-button>
            </div>
          </el-form-item>
          <el-form-item label="法定代表人身份证人像面">
            <el-upload
              list-type="picture"
              action=''
              accept=".png"
              :limit="1"
              :auto-upload="false"
              :on-change="getFile2"
            >
              <el-button style="margin: 0" size="small" type="primary">选择图片上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="法定代表人身份证国徽面">
            <el-upload
              list-type="picture"
              action=''
              accept=".png"
              :limit="1"
              :auto-upload="false"
              :on-change="getFile3"
            >
              <el-button style="margin: 0" size="small" type="primary">选择图片上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit1">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="外部代发" name="3">
        <el-form style="width: 50%;" ref="form" :rules="rules" :model="form2" label-width="180px">
          <el-form-item label="姓名">
            <el-input v-model="form2.bankAcctname"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form2.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input v-model="form2.bankAcctno"></el-input>
          </el-form-item>
          <el-form-item label="金额">
            <el-input type="number" v-model="form2.totalAmount"></el-input>
          </el-form-item>
          <el-form-item prop="postscript" label="交易附言">
            <el-input
              type="textarea"
              :rows="2"
              :required="true"
              placeholder="交易附言，大于50000时必填"
              v-model="form2.postscript">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit2">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {getPass, accountPay, applyCode, verifyCode, transfer, getList} from "../assets/request";
import debounce from "lodash/debounce";
function initPassword(options = {}) {
  // eslint-disable-next-line
  const passowrd = new showKeyBord({
    'png': '//mpay-static.oss-cn-hangzhou.aliyuncs.com/html/lib/state-secret/img', // 图片路径，用这个就行了，也可以下载到本地
    'click_objId': '#keyboardBtn2', // 触发显示键盘的Dom节点Id
    'regExp1': '[\\S\\s]', // 输入过程限制的正则，不匹配正则的字符不让输入
    'regExp2': '^[\\S\\s]{6,12}$', // 输入完成后的正则，与getValid()对应，判断输入值是否匹配该正则
    'Input_texId': '#LOGPASS2', // 接收内容的Dom节点Id
    'parent_objId': '#ipt_pwd2', // 将键盘插入到何处的Dom节点Id
    'placeholderId': '#LOGPASS2_SHOW', // span标签的id，该span用于模拟Input_texId的placeholder
    'len': '12', // 表示最大允许输入多少个字符[可以不传递]
    'keyBordLeft': '',
    'keyBordTop': '',
    'chaosMode': 0, // 混乱模式,0:无混乱;1:打开时乱一次;2:每输入一个字符乱一次,默认值0
    'clickStatus': 0, // 按键状态,0:鼠标划过、悬浮时按键无变化;1:鼠标划过、悬浮时按键的颜色变化,默认值0
    'titlefont': '安全支付输入',
    'backfont': '退 格',
    'capsfont': '切换大/小写',
    'surefont': '确定',
    'isen': false,
    'callBack': () => {
    }, // 密码校验成功回调
    'errorCallBack': () => {
    }, // 密码校验失败回调
    'rsaPublicKey': options.rsa_public_content, // RSA加密必须参数，国密加密可不要
    'sm2KeyHex': options.sm2_key_hex, // 国密加密必须参数，RSA加密可不要
    'license': options.license, // 必须参数
  })
  passowrd.initOptions()
  return passowrd
}

export default {
  name: "Main",
  data() {
    return {
      activeIndex: '1',
      form1: {},
      form2: {},
      imageUrl: '',
      passwordInstance: '',
      options: '',
      showPass: false,
      sending: false,
      code: '',
    }
  },
  watch: {
    'form1.linkedAcctno'() {
      this.handleInput()
    }
  },
  computed: {
    disabled() {
      return !(this.form1.linkedAcctno && this.form1.regPhone && !this.sending)
    },
    verifyBtn() {
      return !(this.form1.linkedAcctno && this.form1.regPhone && this.code)
    },
    submitDisabled() {
      return this.verifyBtn
    },
    rules() {
      return {
        postscript: [
          { required: Number(this.form2.totalAmount) > 50000, message: '交易附言，大于50000时必填' }
        ],
      }
    }
  },
  mounted() {
    this.handleInput = debounce(this.handleInput, 1000)
    this.getList()
  },
  methods: {
    handleInput() {
      if (this.options) {
        return
      }
      getPass({
        linkedAcctno: this.form1.linkedAcctno
      }).then((res) => {
        this.showPass = true
        this.$nextTick(() => {
          this.options = JSON.parse(res.data.data)
          this.passwordInstance = initPassword(this.options)
        })
      })
    },
    getFile1(file) {
      this.getBase64(file.raw).then(res => {
        const params = res.split(',')
        if (params.length > 0) {
          this.proofImage = params[1]
          this.form1.unifiedCode = this.proofImage
        }
      })
    },
    getFile2(file) {
      this.getBase64(file.raw).then(res => {
        const params = res.split(',')
        if (params.length > 0) {
          this.proofImage = params[1]
          this.form1.idPortrait = this.proofImage
        }
      })
    },
    getFile3(file) {
      this.getBase64(file.raw).then(res => {
        const params = res.split(',')
        if (params.length > 0) {
          this.proofImage = params[1]
          this.form1.idEmblem = this.proofImage
        }
      })
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    sendCode() {
      applyCode({
        linkedAcctno: this.form1.linkedAcctno,
        regPhone: this.form1.regPhone
      }).then((res) => {
        if (res.data.code === 0) {
          this.sending = true
          this.$message.success('发送成功')
          let timer = setTimeout(() => {
            this.sending = false
            timer = null
          }, 60 * 1000)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    verifyCode() {
      verifyCode({
        linkedAcctno: this.form1.linkedAcctno,
        regPhone: this.form1.regPhone,
        verifyCode: this.code
      }).then((res) => {
        if (res.data.code === 0) {
          this.$message.success('验证成功')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    onSubmit1() {
      this.passwordInstance.setRandKey(this.options.random_value) // 先设置随机key
      this.form1.password = this.passwordInstance.getOutputSM() // 国密加密密码
      this.form1.randomKey = this.options.random_key
      console.log(this.form1.password, this.form1.randomKey)
      accountPay(this.form1).then((res) => {
        if (res.data.code === 0) {
          this.$message.error('提交成功')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    onSubmit2() {
      transfer(this.form2).then((res) => {
        if (res.data.code === 0) {
          this.$message.error('提交成功')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    getList() {
      console.log('获取表格数据')
      getList({}).then((res) => {
        if (res.data.code === 0) {
          this.$message.error('提交成功')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<style>
.flex {
  padding: 25px;
}

.el-tabs__nav-scroll {
  padding: 10px;
}

.el-button {
  padding: 14px 50px;
  margin: 20px 15px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.ipt_pwd {
  width: 245px;
  height: 37px;
  position: relative;
  margin-right: 20px;
}

.flex-box {
  display: flex;
  flex-direction: row;
}

.send_btn {
  color: #FFF;
  width: 150px;
  padding: 0;
  background-color: #409EFF;
  border-color: #409EFF;
  font-size: 12px;
  border-radius: 3px;
  text-align: center;
  margin: 0 10px;
}
</style>

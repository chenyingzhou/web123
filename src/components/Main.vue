<template>
  <div class="flex">
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="企业用户列表" name="1">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="userName"
            label="用户名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="lianBankAccount"
            label="银行卡号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="amtBalcur"
            label="资金余额">
          </el-table-column>
          <el-table-column
            prop="amtBalaval"
            label="可用余额">
          </el-table-column>
          <el-table-column
            prop="amtBalfrz"
            label="冻结余额">
          </el-table-column>
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
          <el-form-item label="付款方">
            <el-select style="width: 100%" v-model="form2.userId" placeholder="请选择">
              <el-option
                v-for="item in tableData"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="showPass2" label="密码">
            <div id="ipt_pwd3" class="ipt_pwd">
              <span id="LOGPASS3_SHOW">请输入密码</span>
              <input id="LOGPASS3" class="default input_search el-input__inner" type="password" disabled="disabled"/>
              <div id="keyboardBtn3" class="ipt_pwd_rjp default"></div>
            </div>
          </el-form-item>
          <el-form-item label="收款姓名">
            <el-input v-model="form2.bankAcctname"></el-input>
          </el-form-item>
          <el-form-item label="收款手机号">
            <el-input v-model="form2.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="收款银行卡号">
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
      <el-tab-pane label="内部代发" name="4">
        <el-form style="width: 50%;" ref="form" :rules="rules" :model="form3" label-width="180px">
          <el-form-item label="付款方">
            <el-select style="width: 100%" v-model="form3.userId" placeholder="请选择">
              <el-option
                v-for="item in tableData"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="showPass3" label="密码">
            <div id="ipt_pwd4" class="ipt_pwd">
              <span id="LOGPASS4_SHOW">请输入密码</span>
              <input id="LOGPASS4" class="default input_search el-input__inner" type="password" disabled="disabled"/>
              <div id="keyboardBtn4" class="ipt_pwd_rjp default"></div>
            </div>
          </el-form-item>
          <el-form-item label="收款方">
            <el-select style="width: 100%" v-model="form3.toUserId" placeholder="请选择">
              <el-option
                v-for="item in tableData"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额">
            <el-input type="number" v-model="form3.totalAmount"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit3">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="400px"
      center>
      <span> 验证码：<el-input v-model="form4.verifyCode"></el-input></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmfn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getPass, accountPay, applyCode, verifyCode, transfer, getList, transferInner,confirm} from "../assets/request";
import debounce from "lodash/debounce";
function initPassword(options = {},click_objId,Input_texId,parent_objId,placeholderId) {
  // eslint-disable-next-line
  const passowrd = new showKeyBord({
    'png': '//mpay-static.oss-cn-hangzhou.aliyuncs.com/html/lib/state-secret/img', // 图片路径，用这个就行了，也可以下载到本地
    'click_objId': click_objId, // 触发显示键盘的Dom节点Id
    'regExp1': '[\\S\\s]', // 输入过程限制的正则，不匹配正则的字符不让输入
    'regExp2': '^[\\S\\s]{6,12}$', // 输入完成后的正则，与getValid()对应，判断输入值是否匹配该正则
    'Input_texId': Input_texId, // 接收内容的Dom节点Id
    'parent_objId': parent_objId, // 将键盘插入到何处的Dom节点Id
    'placeholderId': placeholderId, // span标签的id，该span用于模拟Input_texId的placeholder
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
      tableData:[],
      activeIndex: '1',
      form1: {},
      form2: {},
      form3: {},
      form4:{},
      imageUrl: '',
      passwordInstance: '',
      options: '',
      //外部代发 下拉选择付款方密码框
      passwordInstance2: '',
      options2: '',
      showPass2: false,
      //内部代发 下拉选择付款方密码框
      passwordInstance3: '',
      options3: '',
      showPass3: false,
      //模态框
      centerDialogVisible:false,

      showPass: false,
      sending: false,
      code: '',
    }
  },
  watch: {
    'form1.linkedAcctno'() {
      this.handleInput()
    },
    'form2.userId'() {
      this.handleInputMutpli(this.form2.userId,2)
    },
    'form3.userId'() {
      this.handleInputMutpli(this.form3.userId,3)
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
          this.passwordInstance = initPassword(this.options,'#keyboardBtn2','#LOGPASS2','#ipt_pwd2','#LOGPASS2_SHOW')
        })
      })
    },
    //下拉选择付款方密码框
    handleInputMutpli(value,type) {
      if(type===2){
        if (this.options2) {
          return
        }
      }else{
        if (this.options3) {
          return
        }
      }

      getPass({
        linkedAcctno: value
      }).then((res) => {
        if(type===2){
          this.showPass2 = true
          this.$nextTick(() => {
            this.options2= JSON.parse(res.data.data)
            this.passwordInstance2 = initPassword(this.options2,'#keyboardBtn3','#LOGPASS3','#ipt_pwd3','#LOGPASS3_SHOW')
          })
        }else{
          this.showPass3 = true
          this.$nextTick(() => {
            this.options3= JSON.parse(res.data.data)
            this.passwordInstance3 = initPassword(this.options3,'#keyboardBtn4','#LOGPASS4','#ipt_pwd4','#LOGPASS4_SHOW')
          })
        }

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
      this.passwordInstance2.setRandKey(this.options2.random_value) // 先设置随机key
      this.form2.password = this.passwordInstance2.getOutputSM() // 国密加密密码
      this.form2.randomKey = this.options2.random_key
      transfer(this.form2).then((res) => {
        if (res.data.code === 0) {
          if(res.data.data.token){
            this.form4 = res.data.data;
            this.centerDialogVisible = true;
          }
          this.$message.error('提交成功')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    onSubmit3() {
      this.passwordInstance3.setRandKey(this.options3.random_value) // 先设置随机key
      this.form3.password = this.passwordInstance3.getOutputSM() // 国密加密密码
      this.form3.randomKey = this.options3.random_key
      transferInner(this.form3).then((res) => {
        if (res.data.code === 0) {
          if(res.data.data.token){
            this.form4 = res.data.data;
            this.centerDialogVisible = true;
          }
          this.$message.error('提交成功')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    confirmfn(){
      confirm(this.form4).then((res) => {
        if (res.data.code === 0) {
          this.$message.error('提交成功')
        } else {
          this.$message.error(res.data.msg)
        }
        this.centerDialogVisible = false;
      })
    },
    getList() {
      getList({}).then((res) => {
        console.log(res)
        this.tableData = res.data.data;
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

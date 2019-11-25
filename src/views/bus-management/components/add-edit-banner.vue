<template>
  <div class="dialog">
    <div class="dialog-cont tac">
      <el-form ref="form" :model="form" label-width="100px" size="mini" :rules='rules'>
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="22">
                <el-form-item label="图片" prop="pic">
                    <el-upload
                    class="avatar-uploader"
                    action="http://192.168.1.105:6698/file/upload-file"
                    :show-file-list="false"
                    :with-credentials="true"
                    :on-success="handleAvatarSuccess">
                    <img v-if="form.pic" :src="baseURL+form.pic" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"
                      style="width: 120px; height: 120px;line-height: 120px;">
                    </i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="广告名称" prop="advert_name">
                  <el-input v-model="form.advert_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="排序" prop="sort">
                  <el-input v-model.number="form.sort"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
               <el-form-item label="广告位置" prop='position'>
                    <el-select v-model="form.position" placeholder="请选择">
                        <el-option v-for="item in devicetype" :key='item.value' :label='item.name' :value='item.value'></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="广告链接" prop='link'>
                  <el-input type="text" v-model="form.link"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="状态" prop="available">
                    <el-radio-group v-model="form.available">
                        <el-radio :label='1'>启用</el-radio>
                        <el-radio :label='0'>禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <!-- <el-col :span="8">
            <el-row>
              <el-col :span="21">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess">
                  <img v-if="form.pic" :src="form.pic" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"
                    style="width: 120px; height: 120px;line-height: 120px;">
                  </i>
                </el-upload>
              </el-col>
            </el-row>
          </el-col> -->
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cancel">取 消</el-button>
      <el-button size="mini" type="primary" :loading="loading" @click="confirm('form')">确 定</el-button>
    </div>
  </div>
</template>

<script>
import validate from '@/utils/validate';
import { baseURL } from '@/utils/plugins/request';

export default {
  props: ['data', 'parent'],
  data() {
    return {
      validate,
      loading: false,
      form: this.parent,
      DLchoosePerm: {
        visible: false,
      },
      devicetype: [
        { name: '商城首页轮播', value: 'shop_index' },
        { name: '外卖首页轮播', value: 'takeout_head' },
        { name: '外卖中间处banner', value: 'takeout_middle' },
      ],
      rules: {
        pic: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        sort: [{ type: 'number', message: '请输入数字', trigger: 'blur' }],
        advert_name: [{ required: true, message: '广告名称不能为空', trigger: 'blur' }],
        link: [{ required: true, message: '广告链接不能为空', trigger: 'blur' }],
      },
      baseURL,
    };
  },
  created() {
  },
  methods: {
    handleAvatarSuccess(res) {
      this.form.pic = res.result.url;
    },
    cancel() {
      this.$emit('callback');
    },
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$http.post('/advert/add-edit-advert', this.form).then((data) => {
            this.$emit('callback', data);
          }).catch(() => {}).finally(() => {
            this.loading = false;
          });
        }
      });
    },
    choosePerm() {
      this.DLchoosePerm.visible = true;
    },
    choosePermCb(data) {
      this.DLchoosePerm.visible = false;
      if (data) {
        this.form.parentName = data.name;
        this.form.parentId = data.id;
      }
    },
  },
};
</script>

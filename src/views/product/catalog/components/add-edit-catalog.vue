<template>
  <div class="dialog">
    <div class="dialog-cont tac">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="24">
            <el-row>
              <el-col :span="24">
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
                <el-form-item label="分类名称" prop="category_name">
                  <el-input v-model="form.category_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="佣金比例" prop="commission">
                  <el-input v-model="form.commission"></el-input>
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
              <el-col :span="24">
                <el-form-item label="广告图片" prop="banner">
                    <el-upload
                    class="avatar-uploader"
                    action="http://192.168.1.105:6698/file/upload-file"
                    :show-file-list="false"
                    :with-credentials="true"
                    :on-success="handleAvatarSuccess2">
                    <img v-if="form.banner" :src="baseURL+form.banner" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"
                      style="width: 120px; height: 120px;line-height: 120px;">
                    </i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="广告图链接" prop="banner_url">
                  <el-input v-model="form.banner_url"></el-input>
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
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
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
      <el-button size="mini" type="primary" :loading="loading" @click="confirm">确 定</el-button>
    </div>
    <el-dialog title="选择权限" :visible.sync="DLchoosePerm.visible" width="500px" append-to-body>
      <choose-perm v-if="DLchoosePerm.visible" @callback="choosePermCb"></choose-perm>
    </el-dialog>
  </div>
</template>

<script>
import { baseURL } from '@/utils/plugins/request';
import validate from '@/utils/validate';
import choosePerm from './choose-perm';

export default {
  components: {
    choosePerm,
  },
  props: ['data', 'parent'],
  data() {
    return {
      validate,
      loading: false,
      form: this.parent,

      DLchoosePerm: {
        visible: false,
      },
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
    if (this.data) this.form = Object.assign({}, this.data);
  },
  methods: {
    handleAvatarSuccess(res) {
      this.form.pic = res.result.url;
    },
    handleAvatarSuccess2(res) {
      this.form.banner = res.result.url;
    },
    cancel() {
      this.$emit('callback');
    },
    confirm() {
      this.loading = true;
      this.$http.post('/category/add-edit-category', this.form).then((data) => {
        this.$emit('callback', data);
      }).catch(() => {}).finally(() => {
        this.loading = false;
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

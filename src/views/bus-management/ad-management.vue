<template>
  <div class="ad-management">
    <div class="search-form">
      <div></div>
      <div class="actions">
        <el-button type="primary" size="mini" @click="addBanner">新增</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      ref="multipleTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      stripe
      border>
      <el-table-column
        prop="sort"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="advert_name"
        label="广告名称">
      </el-table-column>
      <el-table-column
        prop="position"
        label="广告位置">
        <template slot-scope="scope">
          <span class="eclipse2">{{scope.row.position | posFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="pic"
        label="封面">
        <template slot-scope="scope" v-if="scope.row.pic">
          <img :src="scope.row.pic" alt="" style="width: 100%">
        </template>
      </el-table-column>
      <el-table-column
        prop="link"
        label="广告链接">
      </el-table-column>
      <el-table-column
        label="状态"
        width="130">
        <template slot-scope="scope">
            <el-switch class="switchajax" v-model="scope.row.available" disabled @click.native='lockuser(scope.$index,scope.row)' :active-value='1' :inactive-value='0'></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width='170'>
        <template slot-scope="scope">
          <el-button type="text" size="small"  @click="editBanner(scope.row)" >编辑</el-button>
          <el-button type="text" size="small" @click="dele(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="DLaddEditBanner.title" :visible.sync="DLaddEditBanner.visible" width="600px">
      <add-edit-banner
        :parent="DLaddEditBanner.parent || {}"
        :data="DLaddEditBanner.data"
        v-if="DLaddEditBanner.visible"
        @callback="addEditBannerCb"
      ></add-edit-banner>
    </el-dialog>
  </div>
</template>

<script>
import addEditBanner from './components/add-edit-banner';

export default {
  name: 'adManagement',
  data() {
    return {
      tableData: [],
      loading: false,
      DLaddEditBanner: {
        title: '编辑广告图',
        data: null,
        parent: null,
        visible: false,
      },
      devicetype: [
        { name: '商城首页轮播', value: 'shop_index' },
        { name: '外卖首页轮播', value: 'takeout_head' },
        { name: '外卖中间处banner', value: 'takeout_middle' },
      ],
    };
  },
  components: {
    addEditBanner,
  },
  activated() {
    console.log('lalala');
    this.getBannerList();
  },
  methods: {
    getBannerList() {
      this.loading = true;
      this.$http.get('/advert/get-advert').then((data) => {
        this.tableData = data.result;
      }).finally(() => {
        this.loading = false;
      });
    },
    addBanner() {
      // 新增目录
      this.DLaddEditBanner.title = '新增目录';
      this.DLaddEditBanner.parent = {
        advert_name: '',
        sort: '',
        position: '',
        link: '',
        available: '',
        pic: '',
      };
      this.DLaddEditBanner.visible = true;
    },
    editBanner(rowData) {
      this.DLaddEditBanner.title = '编辑目录';
      this.DLaddEditBanner.parent = JSON.parse(JSON.stringify(rowData));
      this.DLaddEditBanner.visible = true;
    },
    dele(index, rowData) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$http.post('/advert/del-advert', { advert_id: rowData.advert_id }).then(() => {
          this.tableData.splice(index, 1);
        }).finally(() => {
          this.loading = false;
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    addEditBannerCb(data) {
      this.DLaddEditBanner.visible = false;
      if (data) this.getBannerList();
    },
    lockuser(num, rowdata) { // 禁用启用
      this.roleindex = num;
      const islock = rowdata.available === 1 ? 0 : 1;
      console.log('pppp', islock, rowdata.available);
      const req = {};
      req.advert_id = rowdata.advert_id;
      req.available = islock;
      this.$http.post('/advert/change-advert-state', req).then(() => {
        this.tableData[this.roleindex].available = islock;
      });
    },
  },
  filters: {
    posFilter(val) {
      const devicetype = [
        { name: '商城首页轮播', value: 'shop_index' },
        { name: '外卖首页轮播', value: 'takeout_head' },
        { name: '外卖中间处banner', value: 'takeout_middle' },
      ];
      const data = devicetype.filter(item => item.value === val);
      return data[0].name;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>

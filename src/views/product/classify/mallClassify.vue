<template>
    <div class="mall-calssify">
      <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      border>
        <el-table-column prop="id" label="排序"></el-table-column>
        <el-table-column prop="id" label="分类名称"></el-table-column>
        <el-table-column prop="id" label="分类图片">
          <template slot-scope="scope">
            <img :src="scope.row.url" alt="分类图片">
          </template>
        </el-table-column>
        <el-table-column prop="id" label="上级分类"></el-table-column>
        <el-table-column prop="id" label="创建时间"></el-table-column>
        <el-table-column prop="id" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row,scope.$index)">启用</el-button>
            <!-- <el-button type="danger" size="mini" @click="edit(scope.row,scope.$index)">禁用</el-button> -->
          </template>
        </el-table-column>
        <el-table-column
        fiex='right'
        label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row,scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: 'mallClassify',
  data() {
    return {
      tableData: [],
      loading: false,
    };
  },
  mounted() {
    console.log('lalala');
  },
  activated() {
    this.loading = true;
    this.$http.get('/category/get-category').then((data) => {
      this.tableData = data.result;
    }).finally(() => {
      this.loading = false;
    });
  },
};
</script>

<style lang="scss" scoped></style>

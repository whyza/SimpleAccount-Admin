<template>
  <div class="app-container">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;margin-bottom: 20px;"
      border
      row-key="classify"
    >
      <el-table-column prop="classify" label="分类Id" sortable align="center"></el-table-column>
      <el-table-column prop="classfyName" label="分类名称" sortable align="center"></el-table-column>
      <el-table-column prop="icon" label="图标" align="center">
        <template slot-scope="scope">
          <i :class="'iconfont'+' '+ scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="创建日期" sortable align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatetime" label="更新时间" sortable align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updatetime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope" v-if="scope.row.classify > 9">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form
        status-icon
        label-position="left"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
        ref="ruleFrom"
      >
        <el-form-item label="分类Id">
          <el-input v-model="formLabelAlign.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <i :class="'iconfont'+' '+ formLabelAlign.icon"></i>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-select v-model="value" placeholder="请选择" @change="changeValue">
            <el-option
              v-for="item in options"
              :key="item.classify"
              :label="item.classfyName"
              :value="item.classify"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="check">
          <el-input v-model="formLabelAlign.classfyName"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button type="primary" :loading="loading" @click="saveClassify('ruleForm')">保存</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  getClassifyInfo,
  queryBigBillClassfy,
  updateBillClassify
} from "@/api/classify";

import { showMessage } from "@/utils/showMessage";

import "../../assets/fonts/iconfont.css";
export default {
  data() {
    var validate = (rule, value, callback) => {
      // console.log(value)
      if (this.formLabelAlign.classfyName === "") {
        callback(new Error("请输入分类名称"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      classifyType: 0,
      search: "",
      tableData: [],
      dialogVisible: false,
      value: "",
      options: [],
      formLabelAlign: {
        id: "",
        classfyName: "",
        icon: ""
      },
      ruleFrom: {
        check: ""
      },
      rules: {
        check: [{ validator: validate, trigger: "blur" }]
      },
      classify: 1
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogVisible = !this.dialogVisible;
      this.formLabelAlign.id = row.classify;
      this.formLabelAlign.icon = row.icon;
      this.value = "如需更改，请重新选择";
      this.formLabelAlign.classfyName = row.classfyName;
      this.classify = row.fclassfyId;
      // this.value = this.formLabelAlign.classfyName;
      this.queryBigBillClassfy();
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    getClassifyInfo() {
      getClassifyInfo("queryAdminClassify", {
        classifyType: this.classifyType
      }).then(res => {
        this.tableData = res;
      });
    },
    queryBigBillClassfy() {
      queryBigBillClassfy("queryBigBillClassfy", {
        classifyType: this.classifyType
      }).then(res => {
        this.options = res;
      });
    },
    changeValue(value) {
      this.classify = value;
    },
    saveClassify() {
      this.$refs.ruleFrom.validate(valid => {
        this.loading = true;
        var data = {
          icon: this.formLabelAlign.icon,
          fclassfyId: this.classify,
          classfyName: this.formLabelAlign.classfyName,
          classify: this.formLabelAlign.id,
          userId: 0
        };
        if (valid) {
          updateBillClassify("updateBillClassify", data).then(res => {
              this.$notify({
                title: res.data === 200?"成功":"失败",
                message: res.message,
                type: res.data === 200 ?"success":"warning"
              });
              if(res.data === 200){
                this.getClassifyInfo();
              }
              this.dialogVisible = false;
              this.loading = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    this.getClassifyInfo();
  }
};
</script>
<style>
</style>

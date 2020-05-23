<template>
  <div class="page-wrap">
    <div class="buildAddr" v-if="dataAddress<=0||showAddAddr==true">
      <van-address-edit
        :area-list="areaList"
        :address-info="oeditAddress"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        save-button-text="确认"
      />
    </div>
    <div class="addrList" v-else>
      <div class="listbox">
        <div class="item flex-c" v-for="(item,index) in dataAddress" :key="index" @click="selAddr(item)">
          <div class="left">
            <span class="f-28 one-row-hide w100">{{item.name}}</span>
            <div class="btn flex-c" v-if="item.is_default==2">默认</div>
          </div>
          <div class="middle">
            <span class="f-28">{{item.tel}}</span>
            <div class="c-66">{{item.province}} {{item.city}} {{item.area}} {{item.address}}</div>
          </div>
          <div class="right">
            <span class="iconfont icon-bianji2" @click.stop="editAddress(item)"></span>
            <span class="iconfont icon-shanchu" @click.stop="delAddress(item.id)"></span>
          </div>
        </div>
      </div>
      <div class="btnbox">
        <div class="g-btn-ff4" @click="addNewAddress()">新建地址</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import areaList from '../area'

  export default {
    name: "addrList",
    data() {
      return {
        areaList: areaList,
        oeditAddress: {},
        oAddress: {},
        showAddAddr: false,
        editId: null,
        source:'',//来源
      }
    },
    computed: {
      ...mapState(['dataAddress'])
    },
    mounted() {
      this.loadAddress()
      this.source = this.$route.query.source||'goods' //如果存在并为'mine' 个人中心而来 点击地址不返回上一页

    },
    methods: {
      ...mapMutations(["setUserAddressID"]),
      ...mapActions(["loadAddress"]),
      //保存地址
      onSave(val) {
        this.$toast.loading('正在保存')
        let oAddress = this.oAddress
        oAddress.name = val.name
        oAddress.tel = val.tel
        oAddress.province = val.province
        oAddress.city = val.city
        oAddress.area = val.county
        oAddress.address = val.addressDetail
        oAddress.code = val.areaCode
        val.isDefault ? oAddress.is_default = 2 : oAddress.is_default = 1
        this.editId ? oAddress.id = this.editId : ''
        this.$post('user/addAddress', {...oAddress}).then(res => {
          if (res.code == 200) {
            this.showAddAddr = false;
            this.editId = null
            this.loadAddress()
          }
          this.$toast.clear()
        })
      },
      //修改地址
      editAddress(val) {
        this.oeditAddress.name = val.name
        this.oeditAddress.tel = val.tel
        this.oeditAddress.addressDetail = val.address
        val.is_default == 2 ? this.oeditAddress.isDefault = true : this.oeditAddress.isDefault = false
        this.oeditAddress.areaCode = val.code
        this.editId = val.id
        this.showAddAddr = true;
        console.log(this.oeditAddress);
      },
      //新建地址
      addNewAddress() {
        this.showAddAddr = true;
        this.oeditAddress = {}
      },
      //删除地址
      delAddress(id) {
        this.$dialog.confirm({
          message: '确认删除地址?'
        }).then(() => {
          this.$toast.loading('正在删除')
          this.$post('user/deleAddress', {id: id}).then(res => {
            if (res.code == 200) {
              this.$toast('删除地址成功')
              this.showAddAddr = false;
              this.loadAddress()
            }
            this.$toast.clear()
          })
        }).catch((res) => {
          this.$toast.clear()
        });

      },
      //选择地址
      selAddr(item) {
        if(this.source=='mine'){}
        else {
          this.setUserAddressID(item)
          this.$router.go(-1)
        }

      }
    }
  }
</script>

<style scoped lang="less">
  .buildAddr {
    /deep/ .van-cell {
      padding: 15px 12px 15px 12px;
    }

    /deep/ .van-cell:not(:last-child)::after {
      left: 12px;
      right: 12px;
    }

    /deep/ .van-field__control {
      text-align: right;
    }

    /deep/ .van-address-edit-detail {
      padding: 0;
    }

    /deep/ .van-switch--on {
      background-color: #FFB400;
    }

    /deep/ .van-switch-cell {
      border-top: 12px solid #F3F3F3;
      margin-top: -1px;
    }

    /deep/ .van-address-edit__buttons {
      background-color: #F3F3F3;
      margin-top: -1px;
    }

    /deep/ .van-button--danger {
      width: 351px;
      height: 40px;
      background: rgba(255, 74, 3, 1);
      border-radius: 8px;
      border: 1px solid rgba(255, 74, 3, 1);
      font-size: 17px;
    }

    /deep/ .van-button {
      line-height: 30px;
    }
  }

  /deep/.van-picker-column__item{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .addrList .btnbox {
    margin: 40px 12px;
  }

  .listbox {
    padding: 0 12px;
    background: #ffffff;

    .item:last-child {
      border-bottom: 0;
    }

    .item {
      padding: 15px 0;
      border-bottom: 1px solid #eeeeee;

      .left {
        font-size: 14px;
        text-align: center;
        width: 50px;

        .btn {
          color: #FFB400;
          width: 36px;
          height: 17px;
          border: 1px solid rgba(255, 180, 0, 1);
          border-radius: 9px;
          margin: 8px auto 0;
        }
      }

      .middle {
        flex: 1;
        padding: 0 20px;

        .f-28 {
          margin-bottom: 10px;
        }

        .c-66 {
          width: 240px;
          line-height: 16px;
        }
      }

      .right {
        text-align: center;

        .icon-shanchu {
          font-size: 20px;
          margin-top: 5px;
        }
      }
    }
  }
</style>

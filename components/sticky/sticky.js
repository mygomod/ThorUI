//吸顶容器组件
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    scrollTop: {
      type: Number,
      observer(val) {
        this.updateStickyChange();
      }
    }
  },
  data: {
    timer: null,
    top: 0,
    height: 0,
    isFixed: false
  },
  lifetimes: {
    ready: function() {
      //在组件在视图层布局完成后执行
      this.updateScrollChange()
    },
    moved: function() {
      //在组件实例被移动到节点树另一个位置时执行
      this.updateScrollChange()

    },
    detached: function() {
      //在组件实例被从页面节点树移除时执行
      this.updateScrollChange()
    }
  },
  methods: {
    updateStickyChange() {
      const data = this.data;
      const top = data.top;
      const height = data.height;
      const scrollTop=this.data.scrollTop
      this.setData({
        isFixed: (scrollTop >= top && scrollTop < top + height) ? true : false
      },()=>{
        //console.log(this.data.isFixed)
      })
    },
    updateScrollChange() {
        if (this.data.timer) {
          clearTimeout(this.data.timer)
          this.setData({
            timer: null
          })
        }
        this.data.timer = setTimeout(() => {
          const className = '.sticky-container';
          const query = wx.createSelectorQuery().in(this);
          query.select(className).boundingClientRect((res) => {
            if (res) {
              this.setData({
                top: res.top,
                height: res.height
              })
            }
          }).exec()
        }, 0)
        this.setData({
          timer: this.data.timer
        })
    }
  }
});
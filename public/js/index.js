$(function () {
  // 提示框 顶部居中显示
  toastr.options = { positionClass: 'toast-top-center' }

  // 获取图书信息
  getList()

  // 获取数据
  function getList() {
    $.ajax({
      url: '/index',
      method: 'get',
      dataType: 'json',
      success(msg) {
        console.log(msg)

        var html = template('tpl', {
          data: msg.data,
        })
        $('#tbody').html(html)

        // 有数据了才能编辑
        editBook()
      },
      error(err) {
        console.log(err)
      },
    })
  }

  // 添加图书 点击添加按钮时,才给提交按钮绑定事件
  $('#addBtn').click(function () {
    // 显示 模态框
    $('#myModal').modal('show')
    $('#btn_submit')
      .off('click')
      .click(function () {
        let data = $('#form').serialize()
        console.log(data)

        $.ajax({
          url: '/add',
          method: 'post',
          dataType: 'json',
          data: data,
          success(msg) {
            console.log(msg)
            if (msg.code !== 0) return toastr.error('添加失败！')

            // 关闭 模态框
            $('#myModal').modal('hide')

            // 添加成功 刷新数据
            getList()
            toastr.success('添加成功！')
          },
          error(err) {
            console.log(err)
          },
        })
      })
  })

  // 编辑图书
  function editBook() {
    // 根据 id 获取图书
    $('.edit').on('click', 'a:eq(0)', function () {
      // console.log(1);
      $('#myModal').modal('show')

      // 修改图书的 id
      let id = $(this).parent().siblings().eq(0).text()
      console.log(id)

      $.ajax({
        url: '/editPage?editid=' + id,
        method: 'get',
        dataType: 'json',
        success(msg) {
          console.log(msg)
          $('#form').find('input[name=name]').val(msg.data.name)
          $('#form').find('input[name=author]').val(msg.data.author)
          $('#form').find('input[name=category]').val(msg.data.category)
          $('#form').find('input[name=description]').val(msg.data.description)

          // 修改图书信息
          $('#btn_submit')
            .off('click')
            .click(function () {
              let data = $('#form').serialize()
              data += id ? `&id=${id}` : ''

              console.log(data)

              $.ajax({
                url: '/edit',
                method: 'post',
                dataType: 'json',
                data: data,
                success(msg) {
                  console.log(msg)
                  if (msg.code !== 0) return toastr.error('修改失败！')
                  // 关闭 模态框
                  $('#myModal').modal('hide')
                  // 修改成功 刷新数据
                  getList()
                  toastr.success('修改成功！')
                },
                error(err) {
                  console.log(err)
                },
              })
            })
        },
        error(err) {
          console.log(err)
        },
      })
    })
    // 删除图书
    $('.edit').on('click', 'a:eq(1)', function () {
      // console.log(2);
      // 删除图书的 id
      let id = $(this).parent().siblings().eq(0).text()
      console.log(id)

      let flag = confirm(`确定要删除 id 为 ${id} 的数据吗?`)

      if (flag) {
        $.ajax({
          url: '/delete?deleteid=' + id,
          method: 'get',
          dataType: 'json',
          success(msg) {
            console.log(msg)
            if (msg.code !== 0) return toastr.error('删除失败！')
            // 删除成功 刷新数据
            getList()
            toastr.success('删除失败！')
          },
          error(err) {
            console.log(err)
          },
        })
      }
    })
  }

  // 模态框关闭时
  $('#myModal').on('hidden.bs.modal', function (e) {
    // 重置表单
    $('#form')[0].reset()
  })
})

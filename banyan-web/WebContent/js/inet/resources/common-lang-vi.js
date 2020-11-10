/*--------------------------------------------
 |              R E S O U R C E S             |
 ============================================*/
iNet.ns(
  "iNet.resources.grid",
  "iNet.resources.Notify",
  "iNet.resources.ajaxLoading",
  "iNet.resources.message",
  "iNet.resources.message.button",
  "iNet.resources.form",
  "iNet.resources.form.select"
);
if (iNet.resources.grid) {
  iNet.apply(iNet.resources.grid, {
    beforePageText: 'Trang',
    afterPageText: 'của {0}',
    firstText: 'Trang đầu',
    prevText: 'Trang trước',
    nextText: 'Trang sau',
    lastText: 'Trang cuối',
    displayMsg: 'Hiển thị <b>{0}</b> - <b>{1}</b> trong tổng số <b>{2}</b>',
    emptyMsg: 'Không có dữ liệu để hiển thị',
    refreshText: 'Nạp lại',
    searchText: 'Tìm kiếm',
    searchPlaceholder: 'Từ khóa'
  });
}
if(iNet.resources.Notify){
  iNet.apply(iNet.resources.Notify, {
    title: 'Thông báo'
  });
}
if (iNet.resources.ajaxLoading) {
  iNet.apply(iNet.resources.ajaxLoading, {
    loading: 'Đang tải dữ liệu ...',
    saving: 'Đang lưu dữ liệu ...',
    deleting: 'Đang xóa dữ liệu...',
    acting:'Đang thực hiện tác vụ...'
  });
}
if (iNet.resources.message.button) {
  iNet.apply(iNet.resources.message.button, {
    save: 'Lưu',
    update: 'Cập nhật',
    create: 'Tạo mới',
    close: 'Đóng',
    ok: 'Đồng ý',
    cancel: 'Hủy bỏ',
    edit: 'Sửa đổi',
    lock: 'Khóa',
    unlock: 'Mở khóa',
    del: 'Xóa',
    test: 'Kiểm tra',
    exit: 'Thoát',
    approve:'Duyệt',
    reject:'Từ chối',
    download:'Tải về',
    view:'Xem'
  });
}
if (iNet.resources.message) {
  iNet.apply(iNet.resources.message, {
    confirm_update:'Dữ liệu đã thay đổi.Bạn có muốn cập nhật không ?',
    dialog_confirm_title: 'Xóa ?',
    dialog_confirm_content: 'Bạn có chắc là đồng ý muốn xóa không ?',
    emptyMsg: 'Không có dữ liệu để hiển thị',
    warning_title: 'Cảnh báo',
    account_config_error: 'Tài khoản của bạn chưa được cấu hình.<br/> Vui lòng liên hệ với quản trị hệ thống để được cấu hình !'
  });
}
if (iNet.resources.form.select) {
  iNet.apply(iNet.resources.form.select, {
    choose: 'Chọn 1 giá trị',
    no_matches_found:'Không tìm thấy dữ liệu ',
    searching: 'Đang tìm kiếm...',
    please_enter:'Nhập tối thiểu ',
    more_char:' ký tự để tìm kiếm',
    only_select:'Bạn có thể chọn ',
    load_more:'Đang tải dữ liệu...',
    item:' giá trị'
  });
}


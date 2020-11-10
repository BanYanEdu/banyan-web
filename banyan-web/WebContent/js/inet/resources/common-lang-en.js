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
if (iNet.resources.Grid) {
  iNet.apply(iNet.resources.Grid, {
    beforePageText: 'Page',
    afterPageText: 'of {0}',
    firstText: 'First page',
    prevText: 'Previous page',
    nextText: 'Next page',
    lastText: 'Last page',
    displayMsg: 'Displaying <b>{0}</b> - <b>{1}</b> of <b>{2}</b>',
    emptyMsg: 'No data to display',
    refreshText: 'Refresh',
    searchText: 'Search',
    searchPlaceholder: 'Keyword'
  });
}
if(iNet.resources.Notify){
  iNet.apply(iNet.resources.Notify, {
    title: 'title'
  });
}
if (iNet.resources.ajaxLoading) {
  iNet.apply(iNet.resources.ajaxLoading, {
    loading: 'Loading data ...',
    saving: 'Saving data ...',
    deleting: 'Deleting data ...',
    acting:'Acting...'
  });
}
if (iNet.resources.message.button) {
  iNet.apply(iNet.resources.message.button, {
    save: 'Save',
    update: 'Update',
    create: 'Create',
    close: 'Close',
    ok: 'OK',
    cancel: 'Cancel',
    edit: 'Edit',
    lock: 'Lock',
    unlock: 'Unlock',
    del: 'Delete',
    test: 'Test',
    exit: 'Exit',
    approve:'Approve',
    reject:'Reject',
    download:'Download',
    view:'View'
  });
}
if (iNet.resources.message) {
  iNet.apply(iNet.resources.message, {
    confirm_update:'Data is changed. Are you sure you want to update ?',
    dialog_confirm_title: 'Delete ?',
    dialog_confirm_content: 'Are you sure you want to delete ?',
    emptyMsg: 'No data to display',
    warning_title: 'Warning',
    account_config_error: 'Your account has not been accessed. <br/> Please contact the system administrator to config !'
  });
}
if (iNet.resources.form.select) {
  iNet.apply(iNet.resources.form.select, {
    choose: 'Select a option',
    no_matches_found: 'No matches found',
    searching: 'Searching...',
    please_enter: 'Please enter ',
    more_char:' more characters',
    only_select:'You can only select ',
    load_more:'Loading more results...',
    item:' items'
  });
}
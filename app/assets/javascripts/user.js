$(function() {

  function appendUser(user) {
    var html = `<div class= chat-group-user clearfix>
                  <p class="chat-group-user__name">
                    ${user.name}
                  </p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    $("#user-search-result").append(html);
  }

  function appendNoUser(no_user_message) {
    var html = `<div>${no_user_message}</div>`
    $("#user-search-result").append(html);
  }

  function appendUserToGroup(userId, userName) {
    var html = `<div class='chat-group-user clearfix js-chat-member'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $("#chat-group-users").append(html)
  }

  $(".user-search-field").on("keyup", function() {
    var input = $(".user-search-field.chat-group-form__input").val();
    $.ajax({
      type: 'GET',
      url: ' /users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(users){
           appendUser(users);
        });
        } else {
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  $(document).on("click", ".chat-group-user__btn--add", function(){
    var userId = $(this).attr("data-user-id");
    var userName = $(this).attr("data-user-name")
    appendUserToGroup(userId, userName)
    $(this).parent().remove();
  });
  $(document).on("click", ".js-remove-btn",function(){
    $(this).parent().remove();
  });
});


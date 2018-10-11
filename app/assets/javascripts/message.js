$(function(){

  function buildHTML(message){
    if (message.image){
      var messageImg =  `<img src = "${message.image}", class = "lower-message__image"> </img>`
    }else{
      var messageImg = ""
    }
    var html = `<div class= "message-box clearfix" >
                  <div class="message-box__name">
                    ${message.name}
                  </div>
                  <div class="message-box__date" >
                    ${message.created_at}
                  </div>
                </div>
                <div class= "message-box__body">
                  <p class="lower-message__content">
                    ${message.content}
                    ${messageImg}
                  </p>
                </div>`
    return html;
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-contents__message').append(html);
      $('.main-contents__message').animate({scrollTop: $('.main-contents__message')[0].scrollHeight});
      $('.submit').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
  })
})

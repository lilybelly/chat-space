$(function(){

  function buildHTML(message){
    if (message.content) {
      var messageContent = message.content
    } else {
      var messageContent = ""
    }
    if (message.image){
      var messageImg =  `<img src = "${message.image}", class = "lower-message__image"> </img>`
    }else{
      var messageImg = ""
    }
    var html = `<div class= "message-box clearfix" , id="${message.id}">
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

  var interval = setInterval(function(){

    var presentMessageId = $('.message-box:last').attr('id')
    var presentHTML = window.location.href

    if (presentHTML.match(/\/groups\/\d+\/messages/)){
      $.ajax ({
        url: presentHTML,
        type: 'GET',
        data: {id: presentMessageId},
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(json){
        var insertHTML = "";
        json.forEach(function(message){
          if (message.id > presentMessageId){
            insertHTML += buildHTML(message);
            $('.main-contents__message').append(insertHTML);
            $('.main-contents__message').animate({scrollTop: $('.main-contents__message')[0].scrollHeight});
          }
        });
      })

      .fail(function(data){
        alert('error')
      });

    } else {
      clearInterval(interval)
    }
  }, 5000);
});


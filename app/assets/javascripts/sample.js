<body>
<input type="checkbox" checked>

<script>
    $('input').click(function() {
      var check = $(this).prop('checked');
      console.log( check );
    })
</script>
</body>





//this is for label Animation
$('.form-control').each(function () {
  $(this).on('blur', function () {
    if ($(this).val().trim() != "") {
      $(this).addClass('has-val');
    }
    else {
      $(this).removeClass('has-val');
    }
  })
})
//to disable all input field if base_url and specific data is not present
$(".select2").prop('disabled', true);
$("input").prop('disabled', true);

//after page ready
$(document).ready(function () {

  //this is for enable GPS 
  $("#_gps_chkBtn").click(function () {
    $("#_gps_chkBtn").hide();
    $("#_spinner_Btn").show();
    window.AppInventor.setWebViewString("gps_chkBtn");
  });

  /* 
  |   Start getting URL and Location name Using WebViewString    
  */
  var base_url, appInventor_locationName;

  var appInterval = window.setInterval(function () {
    var appInventor_InputValue = window.AppInventor.getWebViewString();
    //var appInventor_InputValue = "http://localhost/app*adwerwerwwwwefrw";
    values = appInventor_InputValue.split('*');
    base_url = values[0]; //url will be provided from app using WebViewString
    appInventor_locationName = values[1]; //location name will be provided from app using WebViewString
    appInventorPlaceName();
  }, 1000);

  //checking GPS enabled or not
  var gpsEnableChecking = window.setInterval(function () {
    if (!appInventor_locationName) { //location have no place_name
      $("#_gps_chkBtn").show();
      $("#_spinner_Btn").hide();
    }
  }, 20000);


  // Get place_name and display on GPS button section
  function appInventorPlaceName() {
    if (appInventor_locationName) {
      document.getElementById('_place_name').innerHTML = appInventor_locationName;
      document.getElementById('input_place_name').value = appInventor_locationName;
      $("#_gps_chkBtn").hide();
      $(".pick-add").hide();
      clearInterval(appInterval);
      storeList(); //call another function to get store list
    }//end of if condition        
  }// function end

  var store_list;
  //get store names after place_name has value
  function storeList() {
    if (base_url) {
      $.ajax({
        method: 'GET',
        url: base_url + "/api/store/list",
        dataType: "json",
        success: function (data) {
          $(".select2").prop('disabled', false);
          $(".select-focus-input").hide();
          for (var count = 0; count < data.stores.length; count++) {
            $(".select2").append('<option value="' + data.stores[count].store_id + '" >' + data.stores[count].store_name + '</option>');
          }

        },
      });//end of Ajax
    }//end if condition       
  }//function end

  $('.select2').change(function () {
    $(".select-focus-input").show();
    $('.select2').addClass('has-val');
    $("input").prop('disabled', false);
  })
  //Form Submit functionality
  $('#address_formSubmit').on('click', '#add_subBtn', function (event) {
    event.preventDefault();
    $("#add_subBtn").hide()
    $("#submit_spinnerBtn").show();
    $("#error-alt-phone").html(" ");
    $("#error-store").html(" ");
    var postData = new FormData($("#address_formSubmit")[0]);
    $.ajax({
      method: 'POST',
      url: base_url + '/api/add/address',
      data: postData,
      dataType: 'json',
      processData: false,
      contentType: false,
      cache: false,
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function (data) {
        console.log(data);
        if (data.errors) {
          $("#submit_spinnerBtn").hide();
          $("#add_subBtn").show()
          if (data.errors.alt_phone) {
            $("#error-alt-phone").html(data.errors.alt_phone);
          }
          if (data.errors.alt_phone) {
            $("#error-store").html(data.errors.store_id);
          }
        }
        if (data.success == 1) {
          window.AppInventor.setWebViewString("address_saved");
          //alert('address saved');
        }

      },
      error: function (badResponse) {
        window.AppInventor.setWebViewString(badResponse);
        //console.log(badResponse);
        $("#submit_spinnerBtn").hide();
        $("#add_subBtn").show()
      }

    });
  });
});

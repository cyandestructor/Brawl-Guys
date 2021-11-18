$(document).ready(function(){
	
	$(".btnRegister").click(function(){
		var username = $(".txtUsername").val();
		var user_name = $(".txtUser_Name").val();
		var password = $(".txtPassword").val();
		var email = $(".txtEmail").val();

		console.log("Username: " + username, "User name: " + user_name, "email: " + email, "Password: " + password)
		registerUser(username, user_name, email, password);
	});

	function registerUser(username, user_name, user_email, user_password){
		var userData = {
			vAction: 'I',
			username: username,
			user_name: user_name,
			user_email: user_email,
			user_password: user_password
		};

		console.log(userData);

		$.ajax({
			url: '../php/controllers/register.php',
			type: 'POST',
			data: userData,
			dataType: 'json',
			success: function(data){
				Swal.fire(
                  'Account created successfully',
                  '',
                  'success'
                ).then(function (result) {
                    if (result.value) {
                        window.location = "login.php";
                    }
                })
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.warn(XMLHttpRequest.responseText);
	                alert("Status de papu: " + textStatus);
	                alert("Error papu: " + errorThrown);
	            	}
		})
	}
});
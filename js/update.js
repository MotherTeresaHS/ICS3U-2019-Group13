function update() {
    // get the user info from API Gate
    first_name =  document.getElementById("Name").value;
	last_name =  document.getElementById("lastName").value;
    const api_url = 'https://dwf7d1jmd9.execute-api.us-east-1.amazonaws.com/prod/update-info?' + email_address + '&' + first_name + '&' + last_name;
    const api_response = await fetch(api_url);
    const api_data = await(api_response).json();
    console.log(api_data);
	alert("Updated")
}
function getUserAttributes() {
	var data = { 
		UserPoolId : _config.cognito.userPoolId,
    ClientId : _config.cognito.clientId
	};
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
	var cognitoUser = userPool.getCurrentUser();

	if (cognitoUser != null) {
  	cognitoUser.getSession(function(err, session) {
      if (err) {
      	alert(err);
        return;
      }
      //console.log('session validity: ' + session.isValid());
      
      cognitoUser.getUserAttributes(function(err, result) {
				if (err) {
					console.log(err);
					return;
				}
				// user email address
				console.log(result[2].getValue());
				update(result[2].getValue()) 
			});

  	});
	} else {
		console.log("Already signed-out")
	}
}
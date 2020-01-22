async function update(email_address) {
  // get the user info from API Gate
  period1 = document.getElementById("period1").value;
  period2 = document.getElementById("period2").value;
  period3 = document.getElementById("period3").value;
  period4 = document.getElementById("period4").value;


  const api_url = 'https://qmvpg5o7v3.execute-api.us-east-1.amazonaws.com/prod/update-classes?' + 'email_address=' + email_address + '&period1=' + period1 + '&period2=' + period2 + '&period3=' + period3 + '&period4=' + period4;
  alert("Updated")
  const api_response = await fetch(api_url);
  const api_data = await (api_response).json();
  console.log(api_data);

}

function getUserAttributes() {
  var data = {
    UserPoolId: _config.cognito.userPoolId,
    ClientId: _config.cognito.clientId
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
  var cognitoUser = userPool.getCurrentUser();

  if (cognitoUser != null) {
    cognitoUser.getSession(function (err, session) {
      if (err) {
        alert(err);
        return;
      }
      //console.log('session validity: ' + session.isValid());

      cognitoUser.getUserAttributes(function (err, result) {
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
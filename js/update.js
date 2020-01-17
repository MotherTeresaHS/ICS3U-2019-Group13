async function getUser(email_address) {
    // get the user info from API Gate
    
    const api_url = 'https://73m0qekp2j.execute-api.us-east-1.amazonaws.com/prod/user-profile?email_address=' + email_address;
    const api_response = await fetch(api_url);
    const api_data = await(api_response).json();
    console.log(api_data);
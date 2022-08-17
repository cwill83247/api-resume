function userInformationHTML(user) {     //gets called by our promise takes the parameter of user which is the object that is returned from the github api i.e url, name, username etc...
    //below returns using template literal and the user.html_url and user.login for example are refeencing the object and property retured by API and building the html using divs
    return `                                   
        <h2>${user.name}                    
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

function repoInformationHTML(repos) {       //the repose part is returned by the github api as a value 
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {   //map method is builtin returns an array  and works like a foreach statement to iterate through repos - each one becomes a repo
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });
//creating a paragraph below unordered  list ---  and join 
    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}

function fetchGitHubInformation(event) {             //function name   this what we call ont he onImput event
    var username = $("#gh-username").val();          //value that is in the gh-username field   the .val gets the value
    if (!username) {                                    //if no username present  so blank
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);        //ask to enter username in the user data DIV
        return;                                                                         //so we return back ot the screen as don't want ot query github
    }

    $("#gh-user-data").html(                          //otherwise if text has been entered so th else form the if statements in the user-data div                                   
        `<div id="loader">                  
            <img src="assets/css/loader.gif" alt="loading..." />    
        </div>`);

//add the div loader animated gif but loads out there
//template literals to add a loader div with the image    

$.when(                                                             //start of the promise 
    $.getJSON(`https://api.github.com/users/${username}`),   //passign in getJSON function   then the variable value of username that we obtained
    $.getJSON(`https://api.github.com/users/${username}/repos`)   //this endpoint is spepcific to the repos 
    ).then(
    function(firstResponse, secondResponse) {                      //function firstresponse and second repsonse initally store results form the getJSON call 
        var userData = firstResponse[0];
        var repoData = secondResponse[0];                                //we store the repsonse in variable userData and repoData 
        $("#gh-user-data").html(userInformationHTML(userData));   // using Jquery put into the DIV the results from our Function userInformationHTML passign userData as the argument
        $("#gh-repo-data").html(repoInformationHTML(repoData));     //jquery to call another function repoInformationHTML  ( passing in parameter repoData)
    },
    function(errorResponse) {                                           //error response if statement - this is built into JS
        if (errorResponse.status === 404) {                                 //this is part of syntax  the 404 are standard numbers
            $("#gh-user-data").html(
                `<h2>No info found for user ${username}</h2>`);
        } else {
            console.log(errorResponse);                                            
            $("#gh-user-data").html(
                `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);   //it puts into our div the error  
        }
    });

}

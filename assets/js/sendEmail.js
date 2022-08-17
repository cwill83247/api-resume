console.log("Hello!"); //used this to see if the JS file was being called from my HTML form  .. 

function sendMail(contactForm) {
    emailjs.send("service_t0wzzqf","template_er21lmi", {    //spefic to our template
        "from_name": contactForm.name.value,                   //parameters being pulled from the form  and matches the paramater name in the email temaple in emailjs
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
    .then(                                                         //the  then method for our promise 
        function(response) {                                      //response is part of JS
            console.log("SUCCESS", response);
        },
        function(error) {                                                 //error is part of JS
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}


/*
if (window.console) {
  console.log("Welcome to your Play application's JavaScript!");
}
*/
/*
 active-div     selecter     | function-btns                |  input            |  alert
 #div-list     #btn-list     | #btn-list                    |                   |
 #div-get      #btn-get      | #btn-retrieve                |  #get-mail        |
 #div-form     #btn-form     | #btn-create #btn-update      |                   |
 #div-delete   #btn-delete   | #btn-dele                    |  #delete-mail     |

 #info-box

 .row-customer
 */

console.log("Testing Message");

//main
jQuery(document).ready(function() {
    initialization();
    functionSwitch();
    httpRequest();

});

function httpRequest() {
    //Get All ok
    $("#btn-list").click(function() {
        $(".row-customer").remove();
        var urlGetAllCustomers = "customers" ;
        listAllCustomers(urlGetAllCustomers);
    });

    //Get ok
    $("#btn-retrieve").click(function() {
        var email = spaceTrim($("#get-mail").val().toLowerCase()) ;

        if(isEmail(email)) {
            var urlGetCustomer = "customer/" + email;
            console.log(urlGetCustomer);
            getCustomer(urlGetCustomer);
        } else {
            $("#info-box").html("Invalid email address. Please enter a valid email address");
        }
    });


    //Create  ok --> responding message
    $("#btn-create").click(function(){
        var email = spaceTrim($("#form-email").val().toLowerCase());

        if(isEmail(email)) {
            var urlAddCustomer = "customers";
            addCustomer(urlAddCustomer);
        } else {
            $("#info-box").html("Invalid email address. Please enter a valid email address");
        }
    });

    //Update
    $("#btn-update").click(function() {
        var email = spaceTrim($("#form-email").val().toLowerCase());
        var urlUpdateCustomer = "customer/" + email;
        console.log(urlUpdateCustomer);
        updateCustomer(urlUpdateCustomer);
    });

    //Delete  ok --> responding message incorrect
    $("#btn-dele").click(function() {
        var email = spaceTrim($("#delete-mail").val().toLowerCase());
        if (isEmail(email)) {
            var urlDeleteCustomer = "customer/" + email ;
            console.log(urlDeleteCustomer);
            deleteCustomer(urlDeleteCustomer);
        } else {
            $("#info-box").html("Invalid email address. Please enter a valid email address")
        }
    });
}

function spaceTrim(spaces) {
    return $.trim(spaces.replace(/\s/g,''));
}

function isEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return ( $email.length > 0 && emailReg.test($email));
}

function checkEmpty() {

}

/*

 */

function initialization() {
    $("#div-list").hide();
    $("#div-get").hide();
    $("#div-form").hide();
    $("#div-delete").hide();

}

function functionSwitch() {
    //hideProgresses();

    $("#btn-list").click(function() {
        $("#div-list").show();
        $("#div-get").hide();
        $("#div-form").hide();
        $("#div-delete").hide();
    });

    $("#btn-get").click(function() {
        $("#div-list").hide();
        $("#div-get").show();
        $("#div-form").hide();
        $("#div-delete").hide();
    });

    $("#btn-form").click(function() {
        $("#div-list").hide();
        $("#div-get").hide();
        $("#div-form").show();
        $("#div-delete").hide();
    });

    $("#btn-delete").click(function() {
        $("#div-list").hide();
        $("#div-get").hide();
        $("#div-form").hide();
        $("#div-delete").show();
    });
}

/*
    Http Request
 */

//LIST -->  GET All Customers  (Done)
function listAllCustomers(urlGetAllCustomers) {

    jQuery.ajax({url: urlGetAllCustomers,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            success: function(resultData) {
                //here is your json.
                // process it

                $("#info-box").html("All customers have been listed");

                console.log(resultData);

                $('#Jemail').html(resultData.email);

                $.each(resultData, function(customersIndex, customer) {
                    var html = '<tr class="row-customer"><td class="text-center">'                                                      + customer.name + '</td><td>'
                        + customer.email + '</td><td class="text-center">'
                        + customer.telephone + '</td><td class="text-center">'
                        + customer.address.street +'</td><td class="text-center">'
                        + customer.address.city +'</td><td class="text-center">'
                        + customer.address.state +'</td><td class="text-center">'
                        + customer.address.zip +'</td></tr>';
                    $('#customers').append(html);

                });
            },
            error : function(jqXHR, textStatus, errorThrown) {
                $("#info-box").html("Error: unable to get access to database");
                console.log("listAllCustomers() ERROR");
            },
            timeout: 120000,
        })
        .done(function(){
            console.log("listAllCustomers() Complete!")
        })
        .fail(function() {
            console.log("listAllCustomers() FAIL");
        })
        .always(function() {
            console.log("Done!");
        });
}


//GET  Customer (Done)
function getCustomer(urlGetCustomer) {

    jQuery.ajax({url: urlGetCustomer,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            success: function(resultData) {
                //here is your json.
                // process it

                $("#info-box").html("Customer with email address:  " + spaceTrim($('#get-mail').val().toLowerCase()) + " has been listed");
                console.log(resultData);

                if (resultData == undefined || resultData == null) {
                    console.log("Error: unable to retrieve customer information");
                } else {
                    $("#Jname").html(resultData.name);
                    $("#Jemail").html(resultData.email);
                    $("#Jtelephone").html(resultData.telephone);

                    $("#Jaddress_street").html(resultData.address.street);
                    $("#Jaddress_city").html(resultData.address.city);
                    $("#Jaddress_state").html(resultData.address.state);
                    $("#Jaddress_zip").html(resultData.address.zip);
                }

            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log("getCustomer() ERROR");
                $("#info-box").html("No matched customer");

                $("#Jname").html("");
                $("#Jemail").html("");
                $("#Jtelephone").html("");

                $("#Jaddress_street").html("");
                $("#Jaddress_city").html("");
                $("#Jaddress_state").html("");
                $("#Jaddress_zip").html("");
            },
            timeout: 120000,
        })
        .done(function(){
            console.log("getCustomer()  Complete!")
        })
        .fail(function() {
            console.log("getCustomer FAIL");
        })
        .always(function() {
            console.log("End!");
        });
}


//ADD Customer --> POST (
function addCustomer(urlAddCustomer) {

    jQuery.ajax({url: urlAddCustomer,
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: formToJSON(),
            success: function(resultData) {
                //here is your json.
                // process it
                $("#info-box").html("A new customer has been created");
                console.log(resultData);
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log(formToJSON());
                $("#info-box").html("Error: a customer with email: " + spaceTrim($("#form-email").val().toLowerCase()) +" already exists");
            },
            timeout: 120000,
        })
        .done(function(){
            console.log("addCustomer() Complete!")
        })
        .fail(function() {
            console.log("addCustomer() FAIL");
        })
        .always(function() {
            console.log("Done!");
        });
}



//Update Customer --> PUT (
function updateCustomer(urlUpdateCustomer) {

    jQuery.ajax({url: urlUpdateCustomer,
            type: "PUT",
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: formToJSON(),
            success: function(resultData) {
                //here is your json.
                // process it

                $("#info-box").html("Customer information has been updated");

            },
            error : function(jqXHR, textStatus, errorThrown) {
                $("#info-box").html("Error: Unable to update customer. Incorrect email address");
                console.log("updateCustomer() ERROR");
            },
            timeout: 120000,
        })
        .done(function(){
            console.log("updateCustomer() Complete!")
        })
        .fail(function() {
            console.log("updateCustomer FAIL");
        })
        .always(function() {
            console.log("Done!");
        });
}


//Remove Customer --> DELETE (Response Incorrect
function deleteCustomer(urlDeleteCustomer) {
    jQuery.ajax({url: urlDeleteCustomer,
            type: "DELETE",
            contentType: 'application/json; charset=utf-8',
            success: function(resultData) {
                //here is your json.
                // process it

                $("#info-box").html("Customer with email address:  " + spaceTrim($('#delete-mail').val().toLowerCase()) + " has been deleted");
            },
            error : function(jqXHR, textStatus, errorThrown) {
                $("#info-box").html("Error: unable to delete, since no customer with email: " + spaceTrim($('#delete-mail').val().toLowerCase())  + " exists");
                console.log("deleteCustomer() ERROR");
            },
            timeout: 120000,
        })
        .done(function(){
            console.log("deleteCustomer() Complete!")
        })
        .fail(function() {
            console.log("deleteCustomer() FAIL");
        })
        .always(function() {
            console.log("Done");
        });
}




//fromToJSON
function formToJSON() {
    var address = new Object();
    address.street = $("#form-street").val();
    address.city = $("#form-city").val();
    address.state = $("#form-state").val();
    address.zip = $("#form-zip").val();

    var customer = new Object();
    customer.email = spaceTrim($("#form-email").val().toLowerCase());
    customer.name = $("#form-name").val();
    customer.telephone = $("#form-telephone").val();



    customer.address = address;

    console.log("---- formToJSON: ----")
    console.log(customer);
    console.log("--- ----")

    return JSON.stringify(customer);
}
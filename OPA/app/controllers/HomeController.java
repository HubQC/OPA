package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.Address;
import models.Customer;
import play.*;
import play.api.db.Database;
import play.libs.Json;
import play.mvc.*;

import play.twirl.api.Html;
import services.CustomerService;
import views.html.*;

import java.security.Provider;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

    CustomerService customerService = new CustomerService();

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
    public Result index() {
        Result pageNotFound = notFound("<h1>Page not found</h1>").as("text/html");
        //return ok(index.render("Hello World"));
        //return pageNotFound;
        return ok(index.render("This is information box"));
    }

    //GET ALL
    public Result getCustomers() {

        List<Customer> customers = customerService.getAllCustomers();

        JsonNode json = Json.toJson(customers);
        Result jsonResult = ok(json);

        return  jsonResult;

    }

    //GET
    public Result getCustomer(String key) {

        if(!customerService.containsKey(key)) {
            return badRequest(index.render("Couldn't find customer with email: " + key));
        }

        Customer customer = customerService.getCustomer(key);
        JsonNode json = Json.toJson(customer);

        if(json == null) {
            return notFound(Json.toJson(new Customer()));
        }

        Result JsonResult = ok(json);

        return ok(Json.toJson(customer));
    }


    //POST
    public Result addCustomer() {
        JsonNode json = request().body().asJson();

        if (json == null) {
            return badRequest(index.render("Expecting JSON data"));
        }

        if (customerService.containsKey(json.get("email").asText())) {
            return badRequest(index.render("Customer has already existed"));
        } else {
            Customer newCustomer = new Customer(json.get("name").asText(), json.get("email").asText(), json.get("telephone").asText(),
                    new Address(json.get("address").get("street").asText(),
                            json.get("address").get("city").asText(),
                            json.get("address").get("state").asText(),
                            json.get("address").get("zip").asText())
            );

            return ok(Json.toJson(customerService.putCustomer(newCustomer.getEmail(), newCustomer)));
        }
    }

    //PUT --> only Update in this app
    public Result updateCustomer(String key) {

        JsonNode json = request().body().asJson();

        if (json == null) {
            return badRequest("Expecting JSON data");
        }
        if (!customerService.containsKey(key)) {
            return badRequest("Couldn't find customer with email: " + key);
        } else {
            //String x = json.get("address").get("street").asText();

            Customer newCustomer = new Customer(json.get("name").asText(), json.get("email").asText(), json.get("telephone").asText(),
                    new Address(json.get("address").get("street").asText(),
                            json.get("address").get("city").asText(),
                            json.get("address").get("state").asText(),
                            json.get("address").get("zip").asText())
            );

            return ok(Json.toJson(customerService.putCustomer(key, newCustomer)));
        }
    }

    //DELETE
    public Result deleteCustomer(String key) {
        if (!customerService.containsKey(key)) {
            return badRequest(index.render("Couldn't find customer with email: " + key));
        } else {
            customerService.deleteCustomer(key);
            return ok(index.render("Successfully delete customer with key: " + key));
        }
    }

}

package services;

import database.Database;
import models.Address;
import models.Customer;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Chen on 3/22/16.
 */
public class CustomerService {

    Database database = new Database();

    private Map<String, Customer> customers= database.getCustomers();


    public CustomerService() {
        Customer c1 = new Customer("Name", "example@example.com", "123-456-7890", new Address("street", "city", "MA", "zip"));
        Customer c2 = new Customer("Chen", "cqi@wpi.edu", "508-714-1086", new Address("Old Lincoln St", "Worcester", "MA", "01605"));

        customers.put(c1.getEmail(), c1);
        customers.put(c2.getEmail(), c2);

    }

    //GET ALL
    public List<Customer> getAllCustomers() {
        return new ArrayList<>(customers.values());
    }

    //GET
    public Customer getCustomer(String key) {
        return customers.get(key);
    }

    //POST
    public Customer postCustomer(Customer customer) {
        customers.put(customer.getEmail(), customer);
        return customer;
    }

    //PUT
    public Customer putCustomer(String key, Customer customer) {
        customers.put(key, customer);
        return customer;
    }

    //DELETE
    public Customer deleteCustomer(String key) {
        return customers.remove(key);
    }

    //containsKey
    public boolean containsKey(String key) {
        return customers.containsKey(key);
    }

}

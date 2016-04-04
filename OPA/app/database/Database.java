package database;

import models.Address;
import models.Customer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Chen on 3/20/16.
 */
public class Database {

    public static Map<String, Customer> database = new HashMap<>();

    public Map<String, Customer> getCustomers() {
        return database;
    }

}

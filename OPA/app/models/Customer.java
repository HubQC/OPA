package models;

import play.api.Configuration;
import play.api.Environment;
import play.api.inject.Binding;
import play.api.inject.Module;
import scala.collection.Seq;

/**
 * Created by Chen on 3/20/16.
 */

public class Customer extends Module {
    private String name;
    private String email;
    private String telephone;
    private Address address;

    //Constructor
    public Customer(String name, String email, String telephone, Address address) {
        this.name = name;
        this.email = email;
        this.telephone = telephone;
        this.address = address;
    }

    public Customer() {

    }

    //Name
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    //Email
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    //Telephone
    public String getTelephone() {
        return telephone;
    }
    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    //Address
    public Address getAddress() {
        return address;
    }
    public void setAddress(Address address) {
        this.address = address;
    }

    //
    public Seq<Binding<?>> bindings(Environment environment, Configuration configuration) {
        return seq(
                bind(Customer.class).to(Customer.class)
        );
    }
}

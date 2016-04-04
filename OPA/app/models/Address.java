package models;

/**
 * Created by Chen on 3/20/16.
 */
public class Address {
    private String street;
    private String city;
    private String state;
    private String zip;

    //Constructor
    public Address(String street, String city, String state, String zip) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public Address(){

    }

    //Street
    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }

    //City
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }

    //State
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }

    //Zip
    public String getZip() {
        return zip;
    }
    public void setZip(String zip) {
        this.zip = zip;
    }
}

package online.inabsurdum.jambox.user;

public class UserNotFoundException extends Exception {

    public UserNotFoundException() {
        super("User was not found");
    }

    public UserNotFoundException(String user) {
        super("User: " + user + " was not found");
    }
}

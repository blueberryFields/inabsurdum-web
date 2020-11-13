package online.inabsurdum.jambox.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<Void> handleCreateUser(@RequestBody UserDTO userDTO) {
        try {
            userService.createUser(userDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (UsernameTakenException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    //    CORS-ERROR fix?
    //    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<ReducedUserDTO> getUser(@PathVariable Long id) {
        try {

            return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error finding user");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ReducedUserDTO> login(@RequestBody LoginFormDTO loginFormDTO) {
        return new ResponseEntity<>(userService.login(loginFormDTO), HttpStatus.OK);
    }


}

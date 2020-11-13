package online.inabsurdum.jambox.user;

import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    public ReducedUserDTO getUserById(Long id) throws Exception;

    public void createUser(UserDTO userDTO) throws UsernameTakenException;

    public ReducedUserDTO login(LoginFormDTO loginFormDTO);
}

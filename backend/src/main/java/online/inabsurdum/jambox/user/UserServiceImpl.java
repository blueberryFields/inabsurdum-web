package online.inabsurdum.jambox.user;

import online.inabsurdum.jambox.security.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import online.inabsurdum.jambox.security.SecurityException;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public ReducedUserDTO getUserById(Long id) throws Exception {
        Optional<User> result = userRepository.findById(id);
        User user = result.orElseThrow(UserNotFoundException::new);
        return new ReducedUserDTO(user);
    }

    @Override
    public void createUser(UserDTO userDTO) throws UsernameTakenException {
        if (userRepository.existsUserByUsername(userDTO.getUsername())) {
            throw new UsernameTakenException(userDTO.getUsername());
        } else {
            User user = new User();
            user.setUsername(userDTO.getUsername());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            user.setBandName(userDTO.getBandName());
            user.setRoles(userDTO.getRoles());
            userRepository.save(user);
        }
    }

    @Override
    public ReducedUserDTO login(LoginFormDTO loginFormDTO) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginFormDTO.getUsername(), loginFormDTO.getPassword()));
            User user = userRepository.findByUsername(loginFormDTO.getUsername());
            ReducedUserDTO reducedUserDTO = new ReducedUserDTO(user);
            reducedUserDTO.setJwt(jwtTokenProvider.createToken(user.getUsername(), user.getRoles(), user.getId()));
            return reducedUserDTO;
        } catch (Exception e) {
            throw new SecurityException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}

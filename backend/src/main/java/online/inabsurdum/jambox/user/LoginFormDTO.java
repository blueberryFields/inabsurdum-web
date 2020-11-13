package online.inabsurdum.jambox.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
class LoginFormDTO {
    private String username;
    private String password;
}
